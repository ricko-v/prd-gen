<?php

use App\Models\Interview;
use App\Models\Project;
use App\Models\User;
use App\Models\Workspace;

test('guest cannot access interviews', function () {
    $workspace = Workspace::factory()->create();
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $this->post("/workspaces/{$workspace->id}/projects/{$project->id}/interviews")->assertRedirect('/login');
});

test('user can start interview', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects/{$project->id}/interviews")
        ->assertRedirect();

    $this->assertDatabaseHas('interviews', [
        'project_id' => $project->id,
        'status' => 'active',
    ]);

    $project->refresh();
    expect($project->status)->toBe('interviewing');
});

test('user can view interview', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $interview = Interview::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}/interviews/{$interview->id}")
        ->assertSuccessful();
});

test('user can send message to interview', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $interview = Interview::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects/{$project->id}/interviews/{$interview->id}/messages", [
            'content' => 'I want to build a laundry app',
        ])
        ->assertSuccessful();

    $this->assertDatabaseHas('interview_messages', [
        'interview_id' => $interview->id,
        'role' => 'user',
        'content' => 'I want to build a laundry app',
    ]);
});

test('user can complete interview', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->interviewing()->create(['workspace_id' => $workspace->id]);
    $interview = Interview::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects/{$project->id}/interviews/{$interview->id}/complete")
        ->assertRedirect();

    $interview->refresh();
    expect($interview->status)->toBe('completed');
});

test('interview message requires content', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);
    $project = Project::factory()->create(['workspace_id' => $workspace->id]);
    $interview = Interview::factory()->create(['project_id' => $project->id]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects/{$project->id}/interviews/{$interview->id}/messages", [
            'content' => '',
        ])
        ->assertSessionHasErrors('content');
});
