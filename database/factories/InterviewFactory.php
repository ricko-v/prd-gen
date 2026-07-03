<?php

namespace Database\Factories;

use App\Models\Interview;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Interview>
 */
class InterviewFactory extends Factory
{
    protected $model = Interview::class;

    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'status' => 'active',
            'summary' => null,
            'analysis' => null,
        ];
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'summary' => fake()->paragraph(),
            'analysis' => [
                'domain' => 'web',
                'complexity' => 'medium',
                'business_type' => 'saas',
                'confidence' => 0.8,
            ],
        ]);
    }
}
