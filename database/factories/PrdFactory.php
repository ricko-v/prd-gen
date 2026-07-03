<?php

namespace Database\Factories;

use App\Models\Prd;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Prd>
 */
class PrdFactory extends Factory
{
    protected $model = Prd::class;

    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'version' => 1,
            'markdown' => '# Product Requirement Document\n\n## Executive Summary\n\nTest PRD content.',
            'json_content' => null,
            'title' => (string) fake()->words(3, true).' PRD',
        ];
    }
}
