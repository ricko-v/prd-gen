<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $workspaces = $request->user()
            ->workspaces()
            ->with(['projects' => function ($query) {
                $query->withCount(['interviews', 'prds'])->latest()->limit(3);
            }])
            ->withCount('projects')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'workspaces' => $workspaces,
        ]);
    }
}
