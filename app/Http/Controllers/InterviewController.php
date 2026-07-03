<?php

namespace App\Http\Controllers;

use App\Http\Requests\Interview\StoreInterviewMessageRequest;
use App\Models\Interview;
use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Ai\AiManager;
use Laravel\Ai\Messages\Message;

class InterviewController extends Controller
{
    public function show(Workspace $workspace, Project $project, Interview $interview): Response
    {
        $interview->load(['messages' => function ($query) {
            $query->oldest();
        }]);

        return Inertia::render('interviews/show', [
            'workspace' => $workspace,
            'project' => $project,
            'interview' => $interview,
        ]);
    }

    public function store(Workspace $workspace, Project $project)
    {
        $interview = $project->interviews()->create([
            'status' => 'active',
        ]);

        $project->update(['status' => 'interviewing']);

        return redirect()->route('interviews.show', [$workspace, $project, $interview])
            ->with('success', 'Interview started.');
    }

    public function sendMessage(
        StoreInterviewMessageRequest $request,
        Workspace $workspace,
        Project $project,
        Interview $interview
    ): JsonResponse {
        $userMessage = $interview->messages()->create([
            'role' => 'user',
            'content' => $request->validated('content'),
        ]);

        $aiResponse = $this->getAiResponse($interview, $project);

        $assistantMessage = $interview->messages()->create([
            'role' => 'assistant',
            'content' => $aiResponse,
        ]);

        return response()->json([
            'user_message' => $userMessage,
            'assistant_message' => $assistantMessage,
        ]);
    }

    public function complete(
        Workspace $workspace,
        Project $project,
        Interview $interview
    ) {
        $interview->update([
            'status' => 'completed',
        ]);

        return redirect()->route('projects.show', [$workspace, $project])
            ->with('success', 'Interview completed. You can now generate a PRD.');
    }

    private function getAiResponse(Interview $interview, Project $project): string
    {
        $messages = $interview->messages()
            ->oldest()
            ->get()
            ->map(fn ($msg) => [
                'role' => $msg->role,
                'content' => $msg->content,
            ])
            ->toArray();

        $memory = $project->aiMemories()
            ->get()
            ->map(fn ($m) => "{$m->key}: {$m->value}")
            ->implode("\n");

        $systemPrompt = <<<PROMPT
You are an AI Product Manager conducting an interview to gather requirements for a product.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All your questions, summaries, and responses MUST be in Indonesian.

Project: {$project->name}
Description: {$project->description}
Product Idea: {$project->idea}

{$memory}

Your goal is to ask focused questions to understand:
1. Target users and their needs
2. Core features and functionality
3. Business goals and success metrics
4. Technical requirements and constraints
5. User journey and workflows

Ask ONE question at a time. Be conversational but focused.
When you have enough information, indicate that the interview is complete by starting your message with [COMPLETE].
PROMPT;

        try {
            $ai = app(AiManager::class);
            $provider = $ai->textProvider($project->ai_provider ?: 'gemini');
            $gateway = $provider->textGateway();

            $response = $gateway->generateText(
                provider: $provider,
                model: $project->ai_model ?? 'gemini-3.1-flash-lite',
                instructions: $systemPrompt,
                messages: collect($messages)->map(fn ($m) => new Message($m['role'], $m['content']))->all(),
            );

            return (string) $response;
        } catch (\Exception $e) {
            Log::error('AI Interview Error: '.$e->getMessage(), [
                'exception' => $e,
                'project_id' => $project->id,
                'provider' => $project->ai_provider,
                'model' => $project->ai_model,
            ]);

            return 'Maaf, saya mengalami kesalahan: '.$e->getMessage();
        }
    }
}
