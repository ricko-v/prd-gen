<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

class AcceptanceCriteriaGenerator implements Agent
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
You are an expert QA Engineer specializing in writing Acceptance Criteria.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All acceptance criteria, descriptions, scenarios, and content MUST be written in Indonesian.

Generate comprehensive, testable Acceptance Criteria based on the provided PRD and project information.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

PRD Content:
{$this->prdContent}

Generate the output in Markdown format with the following structure:

# Acceptance Criteria

## [Feature Area]

### AC-001: [Requirement Title]
**Given** [precondition/context]
**When** [action/trigger]
**Then** [expected result]

#### Additional Scenarios:
- **Edge Case:** [description]
- **Error Handling:** [description]
- **Boundary:** [description]

#### Verification Method: [Manual/Automated]
#### Related Requirements: [FR-001, FR-002]

---

Group criteria by feature area. Cover:
- Happy path scenarios
- Error/exception handling
- Edge cases and boundary conditions
- Performance criteria
- Security criteria
- Accessibility criteria

Use Given-When-Then format consistently. Make each criterion specific, measurable, and testable.
PROMPT;
    }
}
