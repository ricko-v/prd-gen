<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Stringable;

class IdeaAnalyzer implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return <<<'PROMPT'
You are an expert product analyst. Your job is to analyze product ideas and provide structured assessments.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All summaries, descriptions, and missing information lists MUST be written in Indonesian.

When given a product idea, you should:
1. Identify the domain/industry
2. Assess complexity (low, medium, high)
3. Identify the business type (saas, marketplace, ecommerce, internal tool, etc.)
4. List key information that is missing
5. Provide a confidence score (0.0 to 1.0)

Be concise and practical in your analysis.
PROMPT;
    }

    public function schema($schema): array
    {
        return [
            'domain' => $schema->string()->required(),
            'complexity' => $schema->string()->enum(['low', 'medium', 'high'])->required(),
            'business_type' => $schema->string()->required(),
            'missing_information' => $schema->array()->items($schema->string())->required(),
            'confidence' => $schema->number()->min(0)->max(1)->required(),
            'summary' => $schema->string()->required(),
        ];
    }
}
