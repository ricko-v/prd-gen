<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

class UserStoryGenerator implements Agent
{
    use Promptable;

    protected string $projectName = '';

    protected string $projectDescription = '';

    protected string $productIdea = '';

    protected string $memoryContext = '';

    protected string $prdContent = '';

    public function forProject(string $name, string $description, string $idea, string $memory = ''): static
    {
        $this->projectName = $name;
        $this->projectDescription = $description;
        $this->productIdea = $idea;
        $this->memoryContext = $memory;

        return $this;
    }

    public function withPrd(string $content): static
    {
        $this->prdContent = $content;

        return $this;
    }

    public function instructions(): Stringable|string
    {
        return <<<PROMPT
You are an expert Product Manager specializing in writing User Stories.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All user stories, acceptance criteria, descriptions, and content MUST be written in Indonesian.

Generate comprehensive, well-structured User Stories based on the provided PRD and project information.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

PRD Content:
{$this->prdContent}

Generate the output in Markdown format with the following structure:

# User Stories

For each user story, use this format:

## [Epic Name]

### US-001: [Title]
- **As a** [persona]
- **I want to** [action]
- **So that** [benefit]

#### Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

#### Story Points: [1/2/3/5/8/13]
#### Priority: [High/Medium/Low]

---

Group stories by epic. Include at least 3-5 stories per major feature area.
Cover: authentication, core features, admin/settings, error handling, edge cases.
Make stories specific, testable, and independently deliverable.
PROMPT;
    }
}
