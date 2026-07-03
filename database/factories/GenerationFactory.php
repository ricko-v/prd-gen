<?php

namespace Database\Factories;

use App\Models\Generation;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Generation>
 */
class GenerationFactory extends Factory
{
    protected $model = Generation::class;

    public function definition(): array
    {
        $type = fake()->randomElement(array_keys(Generation::types()));

        return [
            'project_id' => Project::factory(),
            'type' => $type,
            'title' => ucfirst(str_replace('_', ' ', $type)).' - '.fake()->words(3, true),
            'markdown' => fake()->paragraphs(3, true),
            'json_content' => null,
            'status' => 'completed',
            'error_message' => null,
        ];
    }

    public function pending(): static
    {
        return $this->state(fn () => ['status' => 'pending']);
    }

    public function generating(): static
    {
        return $this->state(fn () => ['status' => 'generating']);
    }

    public function failed(): static
    {
        return $this->state(fn () => [
            'status' => 'failed',
            'error_message' => 'AI service unavailable',
        ]);
    }

    public function ofType(string $type): static
    {
        return $this->state(fn () => [
            'type' => $type,
            'title' => ucfirst(str_replace('_', ' ', $type)),
        ]);
    }
}
