<?php

namespace App\Http\Controllers;

use App\Models\Prd;
use App\Models\Project;
use App\Models\Workspace;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\CommonMark\GithubFlavoredMarkdownConverter;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function markdown(Workspace $workspace, Project $project, Prd $prd): StreamedResponse
    {
        $filename = Str::slug($prd->title ?? $project->name).'-v'.$prd->version.'.md';

        return response()->streamDownload(function () use ($prd) {
            echo $prd->markdown;
        }, $filename, [
            'Content-Type' => 'text/markdown',
        ]);
    }

    public function pdf(Workspace $workspace, Project $project, Prd $prd)
    {
        $html = $this->markdownToHtml($prd->markdown);
        $filename = Str::slug($prd->title ?? $project->name).'-v'.$prd->version.'.pdf';

        $pdf = Pdf::loadHTML($html);

        $path = "exports/{$project->id}/{$filename}";
        Storage::put($path, $pdf->output());

        $project->exports()->create([
            'prd_id' => $prd->id,
            'type' => 'pdf',
            'path' => $path,
        ]);

        return $pdf->download($filename);
    }

    private function markdownToHtml(string $markdown): string
    {
        $converter = new GithubFlavoredMarkdownConverter([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);

        $body = $converter->convert($markdown)->getContent();

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #111; margin-top: 1.5em; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
        h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
        code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f5f5f5; padding: 12px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 1em 0; padding: 0.5em 1em; color: #666; }
    </style>
</head>
<body>{$body}</body>
</html>
HTML;
    }
}
