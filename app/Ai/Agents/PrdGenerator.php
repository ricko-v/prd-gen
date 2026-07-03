<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

class PrdGenerator implements Agent
{
    use Promptable;

    protected string $projectName = '';

    protected string $projectDescription = '';

    protected string $productIdea = '';

    protected string $memoryContext = '';

    protected string $interviewSummary = '';

    public function forProject(string $name, string $description, string $idea, string $memory = ''): static
    {
        $this->projectName = $name;
        $this->projectDescription = $description;
        $this->productIdea = $idea;
        $this->memoryContext = $memory;

        return $this;
    }

    public function withInterview(string $summary): static
    {
        $this->interviewSummary = $summary;

        return $this;
    }

    public function instructions(): Stringable|string
    {
        return <<<PROMPT
You are an expert technical writer specializing in Product Requirement Documents (PRDs).

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). The entire PRD document, including all section headings, descriptions, and content MUST be written in Indonesian. Use Indonesian business/technical terminology.

Generate a comprehensive, production-ready PRD in Markdown format based on the provided information.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

Interview Summary:
{$this->interviewSummary}

Structure the PRD with these sections:
# {$this->projectName} - Product Requirement Document

## Executive Summary
## Problem Statement
## Goals and Objectives
## Success Metrics
## Scope (In Scope / Out of Scope)
## Target Users / Personas
## User Journey
## User Stories
## Functional Requirements
## Non-Functional Requirements
## Acceptance Criteria
## Risks and Mitigations
## Milestones
## Future Scope

Make the content detailed, specific, and actionable. Use the interview data to populate sections with real details.
PROMPT;
    }
}
