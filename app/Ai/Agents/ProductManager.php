<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Messages\Message;
use Laravel\Ai\Promptable;
use Stringable;

class ProductManager implements Agent, Conversational
{
    use Promptable;

    protected array $conversationMessages = [];

    protected string $projectName = '';

    protected string $projectDescription = '';

    protected string $productIdea = '';

    protected string $memoryContext = '';

    public function forProject(string $name, string $description, string $idea, string $memory = ''): static
    {
        $this->projectName = $name;
        $this->projectDescription = $description;
        $this->productIdea = $idea;
        $this->memoryContext = $memory;

        return $this;
    }

    public function withMessages(array $messages): static
    {
        $this->conversationMessages = $messages;

        return $this;
    }

    public function instructions(): Stringable|string
    {
        return <<<PROMPT
You are an experienced AI Product Manager conducting an interview to gather requirements for a product.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All your questions, summaries, and responses MUST be in Indonesian.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

Your goal is to ask focused questions to understand:
1. Target users and their needs
2. Core features and functionality
3. Business goals and success metrics
4. Technical requirements and constraints
5. User journey and workflows

Rules:
- Ask ONE question at a time
- Be conversational but focused
- Build on previous answers
- When you have enough information (at least covering users, features, business goals), indicate completion by starting your message with [COMPLETE] followed by a brief summary
- Keep questions clear and concise
PROMPT;
    }

    public function messages(): iterable
    {
        return collect($this->conversationMessages)
            ->map(fn ($msg) => new Message($msg['role'], $msg['content']))
            ->all();
    }
}
