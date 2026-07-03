<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

class ApiGenerator implements Agent
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
You are an expert API Architect specializing in designing RESTful APIs.

IMPORTANT: Always respond in Indonesian (Bahasa Indonesia). All descriptions, notes, and explanations MUST be written in Indonesian. Endpoint paths, HTTP methods, JSON keys, and technical identifiers remain in English.

Generate a comprehensive API specification based on the provided PRD and project information.

Project: {$this->projectName}
Description: {$this->projectDescription}
Product Idea: {$this->productIdea}

{$this->memoryContext}

PRD Content:
{$this->prdContent}

Generate the output in Markdown format with the following structure:

# API Specification

## Base URL
`/api/v1`

## Authentication
- Bearer Token (JWT)
- ...

## Endpoints

### [Resource Name]

#### GET /api/v1/[resource]
**Description:** [description]

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number |
| ... | ... | ... | ... |

**Response (200):**
```json
{
  "data": [...],
  "meta": { "current_page": 1, "total": 100 }
}
```

#### POST /api/v1/[resource]
**Description:** [description]

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (optional)"
}
```

**Response (201):**
```json
{
  "data": { ... }
}
```

**Errors:**
- 422: Validation failed
- 401: Unauthorized

---

Include:
- All CRUD endpoints for each resource
- Request/response examples in JSON
- Query parameters for filtering/pagination
- Error responses (400, 401, 403, 404, 422, 500)
- Authentication/authorization details
- Rate limiting notes
- Versioning strategy
PROMPT;
    }
}
