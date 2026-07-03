<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Workspace;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Workspace $workspace): Response
    {
        $projects = $workspace->projects()
            ->withCount(['interviews', 'prds'])
            ->latest()
            ->paginate(12);

        return Inertia::render('projects/index', [
            'workspace' => $workspace,
            'projects' => $projects,
        ]);
    }

    public function create(Workspace $workspace): Response
    {
        return Inertia::render('projects/create', [
            'workspace' => $workspace,
        ]);
    }

    public function store(StoreProjectRequest $request, Workspace $workspace)
    {
        $project = $workspace->projects()->create($request->validated());

        return redirect()->route('projects.show', [$workspace, $project])
            ->with('success', 'Project created successfully.');
    }

    public function show(Workspace $workspace, Project $project): Response
    {
        $project->load([
            'latestInterview.messages' => function ($query) {
                $query->latest('created_at')->limit(50);
            },
            'latestPrd',
            'aiMemories',
        ]);

        return Inertia::render('projects/show', [
            'workspace' => $workspace,
            'project' => $project,
        ]);
    }

    public function edit(Workspace $workspace, Project $project): Response
    {
        return Inertia::render('projects/edit', [
            'workspace' => $workspace,
            'project' => $project,
        ]);
    }

    public function update(UpdateProjectRequest $request, Workspace $workspace, Project $project)
    {
        $project->update($request->validated());

        return back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Workspace $workspace, Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index', $workspace)
            ->with('success', 'Project deleted successfully.');
    }
}
