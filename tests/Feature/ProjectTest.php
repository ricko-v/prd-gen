<?php

use App\Models\Project;
use App\Models\User;
use App\Models\Workspace;

test('guest cannot access projects', function () {
    $workspace = Workspace::factory()->create();
    $this->get("/workspaces/{$workspace->id}/projects")->assertRedirect('/login');
});

test('user can view projects index', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    Project::factory()->count(3)->create(['workspace_id' => $workspace->id]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects")
        ->assertSuccessful();
});

test('user can create project', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects", [
            'name' => 'My Project',
            'description' => 'Test project',
            'idea' => 'A test product idea',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('projects', [
        'workspace_id' => $workspace->id,
        'name' => 'My Project',
    ]);
});

test('user can view project', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}")
        ->assertSuccessful();
});

test('user can update project', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);

    $this->actingAs($user)
        ->patch("/workspaces/{$workspace->id}/projects/{$project->id}", [
            'name' => 'Updated Project',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'Updated Project',
    ]);
});

test('user can delete project', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);

    $this->actingAs($user)
        ->delete("/workspaces/{$workspace->id}/projects/{$project->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('projects', [
        'id' => $project->id,
    ]);
});

test('project requires name', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects", [
            'name' => '',
        ])
        ->assertSessionHasErrors('name');
});
