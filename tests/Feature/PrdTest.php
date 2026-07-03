<?php

use App\Models\Prd;
use App\Models\Project;
use App\Models\User;
use App\Models\Workspace;

test('guest cannot access prds', function () {
    $workspace = Workspace::factory()->create();
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $this->get("/workspaces/{$workspace->id}/projects/{$project->id}/prds")->assertRedirect('/login');
});

test('user can view prds index', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    Prd::factory()->count(3)->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}/prds")
        ->assertSuccessful();
});

test('user can view prd', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $prd = Prd::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}/prds/{$prd->id}")
        ->assertSuccessful();
});

test('user can update prd', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $prd = Prd::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->patch("/workspaces/{$workspace->id}/projects/{$project->id}/prds/{$prd->id}", [
            'markdown' => '# Updated PRD',
            'title' => 'Updated Title',
        ])
        ->assertRedirect();

    $prd->refresh();
    expect($prd->markdown)->toBe('# Updated PRD');
    expect($prd->title)->toBe('Updated Title');
});

test('prd update requires markdown', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $prd = Prd::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->patch("/workspaces/{$workspace->id}/projects/{$project->id}/prds/{$prd->id}", [
            'markdown' => '',
        ])
        ->assertSessionHasErrors('markdown');
});

test('user can export prd as markdown', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $prd = Prd::factory()->create([
        'project_id' => $project->id,
        'markdown' => '# Test PRD',
    ]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}/prds/{$prd->id}/export/markdown")
        ->assertSuccessful()
        ->assertHeader('Content-Type', 'text/markdown; charset=UTF-8');
});
