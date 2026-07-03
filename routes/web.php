<?php

use App\Http\Controllers\AiMemoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\GenerationController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\PrdController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // Workspaces
    Route::get('workspaces', [WorkspaceController::class, 'index'])->name('workspaces.index');
    Route::post('workspaces', [WorkspaceController::class, 'store'])->name('workspaces.store');
    Route::get('workspaces/{workspace}', [WorkspaceController::class, 'show'])->name('workspaces.show');
    Route::patch('workspaces/{workspace}', [WorkspaceController::class, 'update'])->name('workspaces.update');
    Route::delete('workspaces/{workspace}', [WorkspaceController::class, 'destroy'])->name('workspaces.destroy');

    // Projects
    Route::get('workspaces/{workspace}/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('workspaces/{workspace}/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('workspaces/{workspace}/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('workspaces/{workspace}/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('workspaces/{workspace}/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::patch('workspaces/{workspace}/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('workspaces/{workspace}/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // Interviews
    Route::post('workspaces/{workspace}/projects/{project}/interviews', [InterviewController::class, 'store'])->name('interviews.store');
    Route::get('workspaces/{workspace}/projects/{project}/interviews/{interview}', [InterviewController::class, 'show'])->name('interviews.show');
    Route::post('workspaces/{workspace}/projects/{project}/interviews/{interview}/messages', [InterviewController::class, 'sendMessage'])->name('interviews.messages');
    Route::post('workspaces/{workspace}/projects/{project}/interviews/{interview}/complete', [InterviewController::class, 'complete'])->name('interviews.complete');

    // AI Memory
    Route::get('workspaces/{workspace}/projects/{project}/memories', [AiMemoryController::class, 'index'])->name('memories.index');
    Route::post('workspaces/{workspace}/projects/{project}/memories', [AiMemoryController::class, 'store'])->name('memories.store');
    Route::delete('workspaces/{workspace}/projects/{project}/memories/{memory}', [AiMemoryController::class, 'destroy'])->name('memories.destroy');

    // PRDs
    Route::get('workspaces/{workspace}/projects/{project}/prds', [PrdController::class, 'index'])->name('prds.index');
    Route::get('workspaces/{workspace}/projects/{project}/prds/{prd}', [PrdController::class, 'show'])->name('prds.show');
    Route::post('workspaces/{workspace}/projects/{project}/prds/generate', [PrdController::class, 'generate'])->name('prds.generate');
    Route::patch('workspaces/{workspace}/projects/{project}/prds/{prd}', [PrdController::class, 'update'])->name('prds.update');

    // Exports
    Route::get('workspaces/{workspace}/projects/{project}/prds/{prd}/export/markdown', [ExportController::class, 'markdown'])->name('exports.markdown');
    Route::get('workspaces/{workspace}/projects/{project}/prds/{prd}/export/pdf', [ExportController::class, 'pdf'])->name('exports.pdf');

    // Generations (Phase 2)
    Route::get('workspaces/{workspace}/projects/{project}/generations', [GenerationController::class, 'index'])->name('generations.index');
    Route::post('workspaces/{workspace}/projects/{project}/generations', [GenerationController::class, 'generate'])->name('generations.generate');
    Route::get('workspaces/{workspace}/projects/{project}/generations/{generation}', [GenerationController::class, 'show'])->name('generations.show');
    Route::patch('workspaces/{workspace}/projects/{project}/generations/{generation}', [GenerationController::class, 'update'])->name('generations.update');
    Route::delete('workspaces/{workspace}/projects/{project}/generations/{generation}', [GenerationController::class, 'destroy'])->name('generations.destroy');
});

require __DIR__.'/settings.php';
