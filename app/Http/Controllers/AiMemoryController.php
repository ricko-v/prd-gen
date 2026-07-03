<?php

namespace App\Http\Controllers;

use App\Models\AiMemory;
use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiMemoryController extends Controller
{
    public function index(Workspace $workspace, Project $project): JsonResponse
    {
        $memories = $project->aiMemories()->get();

        return response()->json($memories);
    }

    public function store(Request $request, Workspace $workspace, Project $project): JsonResponse
    {
        $request->validate([
            'key' => ['required', 'string', 'max:255'],
            'value' => ['required', 'string', 'max:5000'],
        ]);

        $memory = $project->aiMemories()->updateOrCreate(
            ['key' => $request->input('key')],
            ['value' => $request->input('value')]
        );

        return response()->json($memory);
    }

    public function destroy(Workspace $workspace, Project $project, AiMemory $memory): JsonResponse
    {
        $memory->delete();

        return response()->json(['message' => 'Memory deleted.']);
    }
}
