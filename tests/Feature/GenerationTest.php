<?php

use App\Models\Generation;
use App\Models\Project;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest can not access generations', function () {
    $workspace = Workspace::factory()->create();
    $project = Project::factory()->create(['workspace_id' => $workspace]);

    $this->get("/workspaces/{$workspace->id}/projects/{$project->id}/generations")
        ->assertRedirect('/login');
});

test('authenticated user can view generations index', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user]);
    $project = Project::factory()->create(['workspace_id' => $workspace]);
    $generations = Generation::factory(3)->create(['project_id' => $project]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}/generations")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('generations/index')
            ->has('generations', 3)
        );
});

test('authenticated user can view generation show', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user]);
    $project = Project::factory()->create(['workspace_id' => $workspace]);
    $generation = Generation::factory()->create(['project_id' => $project]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}/projects/{$project->id}/generations/{$generation->id}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('generations/show')
            ->where('generation.id', $generation->id)
        );
});

test('authenticated user can generate content', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user]);
    $project = Project::factory()->create(['workspace_id' => $workspace]);

    // This test verifies the route and validation work.
    // Actual AI generation is tested via integration/manual testing.
    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects/{$project->id}/generations", [
            'type' => 'user_stories',
        ])
        ->assertSessionHasNoErrors();
});

test('generation requires valid type', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user]);
    $project = Project::factory()->create(['workspace_id' => $workspace]);

    $this->actingAs($user)
        ->post("/workspaces/{$workspace->id}/projects/{$project->id}/generations", [
            'type' => 'invalid_type',
        ])
        ->assertSessionHasErrors('type');
});

test('authenticated user can update generation', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user]);
    $project = Project::factory()->create(['workspace_id' => $workspace]);
    $generation = Generation::factory()->create(['project_id' => $project]);

    $this->actingAs($user)
        ->patch("/workspaces/{$workspace->id}/projects/{$project->id}/generations/{$generation->id}", [
            'markdown' => '# Updated Content',
            'title' => 'Updated Title',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('generations', [
        'id' => $generation->id,
        'markdown' => '# Updated Content',
        'title' => 'Updated Title',
    ]);
});

test('authenticated user can delete generation', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user]);
    $project = Project::factory()->create(['workspace_id' => $workspace]);
    $generation = Generation::factory()->create(['project_id' => $project]);

    $this->actingAs($user)
        ->delete("/workspaces/{$workspace->id}/projects/{$project->id}/generations/{$generation->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('generations', ['id' => $generation->id]);
});

test('generation model has correct types', function () {
    $types = Generation::types();

    expect($types)->toHaveKeys(['user_stories', 'acceptance_criteria', 'database_schema', 'api_spec', 'sprint_plan']);
});

test('generation model status helpers work', function () {
    $generation = Generation::factory()->create(['status' => 'completed']);

    expect($generation->isCompleted())->toBeTrue();
    expect($generation->isPending())->toBeFalse();
    expect($generation->isGenerating())->toBeFalse();
    expect($generation->isFailed())->toBeFalse();
});
