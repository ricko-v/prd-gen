<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'workspace_id' => Workspace::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->optional()->sentence(),
            'status' => 'draft',
            'ai_provider' => null,
            'ai_model' => null,
            'idea' => null,
        ];
    }

    public function interviewing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'interviewing',
            'idea' => fake()->sentence(),
        ]);
    }

    public function generated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'generated',
            'idea' => fake()->sentence(),
        ]);
    }
}
