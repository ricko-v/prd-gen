<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

class DatabaseGenerator implements Agent
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
You are an expert Database Architect specializing in designing database schemas.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All descriptions, design decisions, explanations, and content MUST be written in Indonesian. Table and column names remain in English (snake_case).

Generate a comprehensive database schema based on the provided PRD and project information.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

PRD Content:
{$this->prdContent}

Generate the output in Markdown format with the following structure:

# Database Schema

## ERD Diagram

```mermaid
erDiagram
    USER ||--o{ PROJECT : creates
    PROJECT ||--o{ TASK : contains
    ...
```

## Tables

### users
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | bigint | PK, auto_increment | |
| name | varchar(255) | NOT NULL | |
| email | varchar(255) | UNIQUE, NOT NULL | |
| ... | ... | ... | ... |

### [table_name]
...

## Indexes
- idx_users_email ON users(email)
- ...

## Foreign Keys
- projects.workspace_id REFERENCES workspaces(id) ON DELETE CASCADE
- ...

## Design Decisions
- [Explain key design choices]
- ...

---

Include:
- All tables with columns, types, constraints
- A Mermaid ERD diagram
- Indexes for common queries
- Foreign key relationships
- Design decisions and rationale
- Consider soft deletes where appropriate
- Use snake_case for table and column names
PROMPT;
    }
}
