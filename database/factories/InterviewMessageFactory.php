<?php

namespace Database\Factories;

use App\Models\Interview;
use App\Models\InterviewMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InterviewMessage>
 */
class InterviewMessageFactory extends Factory
{
    protected $model = InterviewMessage::class;

    public function definition(): array
    {
        return [
            'interview_id' => Interview::factory(),
            'role' => 'user',
            'content' => fake()->sentence(),
        ];
    }

    public function assistant(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'assistant',
            'content' => fake()->paragraph(),
        ]);
    }
}
