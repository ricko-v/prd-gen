<?php

namespace App\Http\Controllers;

use App\Models\Prd;
use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Ai\AiManager;
use Laravel\Ai\Messages\Message;

class PrdController extends Controller
{
    public function index(Workspace $workspace, Project $project): Response
    {
        $prds = $project->prds()->latest('version')->get();

        return Inertia::render('prds/index', [
            'workspace' => $workspace,
            'project' => $project,
            'prds' => $prds,
        ]);
    }

    public function show(Workspace $workspace, Project $project, Prd $prd): Response
    {
        return Inertia::render('prds/show', [
            'workspace' => $workspace,
            'project' => $project,
            'prd' => $prd,
        ]);
    }

    public function generate(Workspace $workspace, Project $project)
    {
        $latestVersion = $project->prds()->max('version') ?? 0;

        $markdown = $this->generatePrdContent($project);

        $prd = $project->prds()->create([
            'version' => $latestVersion + 1,
            'markdown' => $markdown,
            'title' => "{$project->name} - PRD v".($latestVersion + 1),
        ]);

        $project->update(['status' => 'generated']);

        return redirect()->route('prds.show', [$workspace, $project, $prd])
            ->with('success', 'PRD generated successfully.');
    }

    public function update(Request $request, Workspace $workspace, Project $project, Prd $prd)
    {
        $request->validate([
            'markdown' => ['required', 'string'],
            'title' => ['sometimes', 'string', 'max:255'],
        ]);

        $prd->update([
            'markdown' => $request->input('markdown'),
            'title' => $request->input('title', $prd->title),
        ]);

        return back()->with('success', 'PRD updated successfully.');
    }

    private function generatePrdContent(Project $project): string
    {
        $interview = $project->latestInterview;
        $memories = $project->aiMemories()->get();

        $conversationSummary = '';
        if ($interview) {
            $messages = $interview->messages()->oldest()->get();
            $conversationSummary = $messages->map(fn ($m) => "{$m->role}: {$m->content}")->implode("\n\n");
        }

        $memoryContext = $memories->map(fn ($m) => "{$m->key}: {$m->value}")->implode("\n");

        $prompt = <<<PROMPT
Buatlah Dokumen Kebutuhan Produk (PRD) yang komprehensif berdasarkan informasi berikut. Seluruh konten HARUS dalam Bahasa Indonesia.

Project: {$project->name}
Description: {$project->description}
Product Idea: {$project->idea}

{$memoryContext}

Interview Summary:
{$conversationSummary}

Buatlah PRD dalam format Markdown dengan bagian-bagian berikut:
# {$project->name} - Dokumen Kebutuhan Produk

## Ringkasan Eksekutif
## Pernyataan Masalah
## Tujuan dan Sasaran
## Metrik Keberhasilan
## Ruang Lingkup
## Pengguna Target / Persona
## Perjalanan Pengguna
## User Story
## Kebutuhan Fungsional
## Kebutuhan Non-Fungsional
## Kriteria Penerimaan
## Risiko dan Mitigasi
## Milestone
## Ruang Lingkup Masa Depan

Buatlah konten yang detail dan siap produksi.
PROMPT;

        try {
            $ai = app(AiManager::class);
            $provider = $ai->textProvider($project->ai_provider ?: 'gemini');
            $gateway = $provider->textGateway();

            $response = $gateway->generateText(
                provider: $provider,
                model: $project->ai_model ?? 'gemini-3.1-flash-lite',
                instructions: 'Anda adalah seorang penulis teknis yang berspesialisasi dalam Dokumen Kebutuhan Produk. Buatlah PRD yang komprehensif dan siap produksi dalam format Markdown. Seluruh konten HARUS dalam Bahasa Indonesia.',
                messages: [
                    new Message('user', $prompt),
                ],
            );

            return (string) $response;
        } catch (\Exception $e) {
            Log::error('PRD Generation Error: '.$e->getMessage(), [
                'exception' => $e,
                'project_id' => $project->id,
                'provider' => $project->ai_provider,
                'model' => $project->ai_model,
            ]);

            return "# {$project->name} - PRD\n\nError: ".$e->getMessage();
        }
    }
}
