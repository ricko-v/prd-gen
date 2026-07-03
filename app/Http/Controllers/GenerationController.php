<?php

namespace App\Http\Controllers;

use App\Ai\Agents\AcceptanceCriteriaGenerator;
use App\Ai\Agents\ApiGenerator;
use App\Ai\Agents\DatabaseGenerator;
use App\Ai\Agents\SprintGenerator;
use App\Ai\Agents\UserStoryGenerator;
use App\Models\Generation;
use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Ai\AiManager;
use Laravel\Ai\Messages\Message;

class GenerationController extends Controller
{
    public function index(Workspace $workspace, Project $project): Response
    {
        $generations = $project->generations()->latest()->get();

        return Inertia::render('generations/index', [
            'workspace' => $workspace,
            'project' => $project,
            'generations' => $generations,
        ]);
    }

    public function show(Workspace $workspace, Project $project, Generation $generation): Response
    {
        return Inertia::render('generations/show', [
            'workspace' => $workspace,
            'project' => $project,
            'generation' => $generation,
        ]);
    }

    public function generate(Request $request, Workspace $workspace, Project $project)
    {
        $request->validate([
            'type' => ['required', 'string', 'in:user_stories,acceptance_criteria,database_schema,api_spec,sprint_plan'],
        ]);

        $type = $request->input('type');
        $typeLabel = Generation::types()[$type];

        $generation = $project->generations()->create([
            'type' => $type,
            'title' => "{$typeLabel} - {$project->name}",
            'status' => 'generating',
        ]);

        $markdown = $this->generateContent($project, $type);

        $hasError = str_starts_with($markdown, 'Error:') || str_contains($markdown, 'Error generating');

        $generation->update([
            'markdown' => $markdown,
            'status' => $hasError ? 'failed' : 'completed',
            'error_message' => $hasError ? $markdown : null,
        ]);

        return redirect()->route('generations.show', [$workspace, $project, $generation])
            ->with($hasError ? 'error' : 'success', $hasError ? 'Generation failed. Please try again.' : "{$typeLabel} generated successfully.");
    }

    public function update(Request $request, Workspace $workspace, Project $project, Generation $generation)
    {
        $request->validate([
            'markdown' => ['required', 'string'],
            'title' => ['sometimes', 'string', 'max:255'],
        ]);

        $generation->update([
            'markdown' => $request->input('markdown'),
            'title' => $request->input('title', $generation->title),
        ]);

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Workspace $workspace, Project $project, Generation $generation)
    {
        $generation->delete();

        return redirect()->route('generations.index', [$workspace, $project])
            ->with('success', 'Generation deleted.');
    }

    private function generateContent(Project $project, string $type): string
    {
        $memories = $project->aiMemories()->get();
        $memoryContext = $memories->map(fn ($m) => "{$m->key}: {$m->value}")->implode("\n");

        $prdContent = '';
        $latestPrd = $project->latestPrd;
        if ($latestPrd) {
            $prdContent = $latestPrd->markdown ?? '';
        }

        $agent = match ($type) {
            'user_stories' => (new UserStoryGenerator)
                ->forProject($project->name, $project->description ?? '', $project->idea ?? '', $memoryContext)
                ->withPrd($prdContent),
            'acceptance_criteria' => (new AcceptanceCriteriaGenerator)
                ->forProject($project->name, $project->description ?? '', $project->idea ?? '', $memoryContext)
                ->withPrd($prdContent),
            'database_schema' => (new DatabaseGenerator)
                ->forProject($project->name, $project->description ?? '', $project->idea ?? '', $memoryContext)
                ->withPrd($prdContent),
            'api_spec' => (new ApiGenerator)
                ->forProject($project->name, $project->description ?? '', $project->idea ?? '', $memoryContext)
                ->withPrd($prdContent),
            'sprint_plan' => (new SprintGenerator)
                ->forProject($project->name, $project->description ?? '', $project->idea ?? '', $memoryContext)
                ->withPrd($prdContent),
            default => null,
        };

        if (! $agent) {
            return 'Error: Unknown generation type.';
        }

        try {
            $ai = app(AiManager::class);
            $provider = $ai->textProvider($project->ai_provider ?: 'gemini');
            $gateway = $provider->textGateway();

            $response = $gateway->generateText(
                provider: $provider,
                model: $project->ai_model ?? 'gemini-3.1-flash-lite',
                instructions: (string) $agent->instructions(),
                messages: [
                    new Message('user', 'Buatlah konten yang diminta berdasarkan PRD dan informasi proyek yang diberikan dalam instruksi. Seluruh konten HARUS dalam Bahasa Indonesia.'),
                ],
            );

            return (string) $response;
        } catch (\Exception $e) {
            Log::error("Generation Error ({$type}): ".$e->getMessage(), [
                'exception' => $e,
                'project_id' => $project->id,
                'type' => $type,
            ]);

            return 'Error: '.$e->getMessage();
        }
    }
}
