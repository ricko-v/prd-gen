<?php

use App\Models\User;
use App\Models\Workspace;

test('guest cannot access workspaces', function () {
    $this->get('/workspaces')->assertRedirect('/login');
});

test('user can view workspaces index', function () {
    $user = User::factory()->create();
    Workspace::factory()->count(3)->create(['owner_id' => $user->id]);

    $this->actingAs($user)
        ->get('/workspaces')
        ->assertSuccessful();
});

test('user can create workspace', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/workspaces', [
            'name' => 'My Workspace',
            'description' => 'Test workspace',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('workspaces', [
        'owner_id' => $user->id,
        'name' => 'My Workspace',
    ]);
});

test('user can view workspace', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);

    $this->actingAs($user)
        ->get("/workspaces/{$workspace->id}")
        ->assertSuccessful();
});

test('user can update workspace', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);

    $this->actingAs($user)
        ->patch("/workspaces/{$workspace->id}", [
            'name' => 'Updated Name',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('workspaces', [
        'id' => $workspace->id,
        'name' => 'Updated Name',
    ]);
});

test('user can delete workspace', function () {
    $user = User::factory()->create();
    $workspace = Workspace::factory()->create(['owner_id' => $user->id]);

    $this->actingAs($user)
        ->delete("/workspaces/{$workspace->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('workspaces', [
        'id' => $workspace->id,
    ]);
});

test('workspace requires name', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/workspaces', [
            'name' => '',
        ])
        ->assertSessionHasErrors('name');
});
