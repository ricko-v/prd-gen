<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workspace\StoreWorkspaceRequest;
use App\Http\Requests\Workspace\UpdateWorkspaceRequest;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceController extends Controller
{
    public function index(Request $request): Response
    {
        $workspaces = $request->user()
            ->workspaces()
            ->withCount('projects')
            ->latest()
            ->get();

        return Inertia::render('workspaces/index', [
            'workspaces' => $workspaces,
        ]);
    }

    public function store(StoreWorkspaceRequest $request)
    {
        $workspace = $request->user()->workspaces()->create($request->validated());

        return redirect()->route('workspaces.show', $workspace)
            ->with('success', 'Workspace created successfully.');
    }

    public function show(Workspace $workspace): Response
    {
        $workspace->load(['projects' => function ($query) {
            $query->withCount(['interviews', 'prds'])->latest();
        }]);

        return Inertia::render('workspaces/show', [
            'workspace' => $workspace,
        ]);
    }

    public function update(UpdateWorkspaceRequest $request, Workspace $workspace)
    {
        $workspace->update($request->validated());

        return back()->with('success', 'Workspace updated successfully.');
    }

    public function destroy(Workspace $workspace)
    {
        $workspace->delete();

        return redirect()->route('workspaces.index')
            ->with('success', 'Workspace deleted successfully.');
    }
}
