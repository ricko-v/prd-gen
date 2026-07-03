<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

class SprintGenerator implements Agent
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
You are an expert Agile Project Manager specializing in sprint planning and estimation.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All sprint names, goals, descriptions, risks, assumptions, and content MUST be written in Indonesian.

Generate a comprehensive sprint plan based on the provided PRD and project information.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

PRD Content:
{$this->prdContent}

Generate the output in Markdown format with the following structure:

# Sprint Plan

## Project Overview
- **Estimated Duration:** X sprints (Y weeks)
- **Team Size:** Assumed 3-5 developers
- **Sprint Length:** 2 weeks

## Epic Breakdown

| Epic | Story Points | Priority | Sprint |
|------|-------------|----------|--------|
| Authentication | 21 | High | 1 |
| ... | ... | ... | ... |

## Sprint Details

### Sprint 1: [Theme] (Week 1-2)
**Sprint Goal:** [goal]

| Story | Points | Assignee Role | Status |
|-------|--------|---------------|--------|
| US-001: User Registration | 5 | Backend | To Do |
| US-002: User Login | 3 | Backend | To Do |
| ... | ... | ... | ... |

**Total Points:** 21
**Risks:** [risks for this sprint]

### Sprint 2: [Theme] (Week 3-4)
...

## Timeline

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Sprint 1
    Authentication    :a1, 2024-01-01, 14d
    section Sprint 2
    Core Features     :a2, after a1, 14d
    ...
```

## Risks and Dependencies
- [risk 1]
- [risk 2]

## Assumptions
- [assumption 1]
- [assumption 2]

---

Include:
- Epic-level breakdown with story points
- Sprint-by-sprint plan with assigned stories
- A Gantt chart (Mermaid) showing timeline
- Risk assessment per sprint
- Dependencies between stories
- Velocity assumptions
- Buffer for bug fixes and technical debt
PROMPT;
    }
}
