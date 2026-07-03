# PRD Generator - Development Plan

> A self-hosted AI-powered Product Requirement Document Generator built with Laravel 13, React 19, Inertia.js, and Laravel AI.

---

# Vision

Build an open, self-hosted platform that helps founders, product managers, and software teams transform ideas into production-ready Product Requirement Documents (PRDs) through AI-driven interviews and specialized AI agents.

Instead of acting as a chatbot, the application acts as an AI Product Manager.

---

# Goals

## Primary Goals

- Generate high-quality PRDs
- Reduce requirement gathering time
- Standardize documentation
- Support multiple AI providers
- Self-hosted and privacy-friendly

## Non Goals (MVP)

- Project management
- Source code generation
- UI design generation
- Team collaboration
- Issue tracking

Those features may be added in later versions.

---

# Target Users

- Startup Founder
- Product Manager
- Software House
- Freelancer
- Internal IT Team
- Business Analyst

---

# Tech Stack

## Backend

- Laravel 13
- Laravel AI
- Laravel Reverb
- Queue
- Horizon
- PostgreSQL
- Redis

## Frontend

- React 19
- Inertia.js
- Tailwind CSS
- shadcn/ui
- TanStack Table
- TanStack Query
- Tiptap Editor
- React Flow (future)

---

# Architecture

```
Workspace
    ├── Projects
    │      ├── Interviews
    │      ├── PRDs
    │      ├── Versions
    │      ├── Exports
    │      └── AI Memory
    │
    └── Settings
```

---

# Core Workflow

```
Create Workspace
        │
        ▼
Create Project
        │
        ▼
Describe Product Idea
        │
        ▼
AI Product Manager Interview
        │
        ▼
AI analyzes completeness
        │
        ▼
Generate PRD
        │
        ▼
Review & Edit
        │
        ▼
Save Version
        │
        ▼
Export
```

---

# Modules

---

## 1. Authentication

Features

- Login
- Register
- Password Reset
- Profile

Future

- OAuth
- SSO

---

## 2. Workspace

Features

- Create workspace
- Workspace settings
- Members (future)

---

## 3. Projects

Fields

- Name
- Description
- Status
- Tags
- AI Provider
- Model
- Temperature

Actions

- Create
- Update
- Delete
- Archive

---

## 4. AI Interview

Purpose

Instead of generating a PRD immediately, AI gathers missing requirements.

Conversation example

```
User

I want to build a laundry application.

↓

AI

Who are the target users?

↓

User

Small laundry businesses.

↓

AI

Do customers pay online?

↓

...
```

Completion Criteria

AI should determine whether enough information has been collected.

Output

```
Interview Summary

Business Goals

Functional Requirements

Missing Information

Confidence Score
```

---

## 5. AI Memory

Project-specific knowledge.

Example

```
Technology Stack

Laravel

React

Tailwind

MySQL

AWS

Target Market

Indonesia

Business Type

Marketplace
```

Every AI request should include this memory.

---

## 6. PRD Generator

Generate

- Executive Summary
- Problem Statement
- Goals
- Success Metrics
- Scope
- Personas
- User Journey
- User Stories
- Functional Requirements
- Non Functional Requirements
- Acceptance Criteria
- Risks
- Milestones
- Future Scope

Output Format

Markdown

---

## 7. Markdown Editor

Use

- Tiptap

Features

- Live preview
- Slash command
- Tables
- Mermaid
- AI Rewrite
- AI Expand
- AI Summarize

---

## 8. Versioning

Every generation creates a new version.

```
Version 1

↓

Version 2

↓

Version 3
```

Features

- Compare versions
- Restore version
- Rename version

---

## 9. Export

Supported Formats

- Markdown
- PDF
- DOCX
- HTML

Future

- Notion
- Confluence

---

# AI Agent System

Instead of one giant prompt, the platform uses multiple AI agents.

---

## Idea Analyzer Agent

Responsibility

Analyze idea quality.

Output

```
Domain

Complexity

Business Type

Missing Information

Confidence
```

---

## Product Manager Agent

Responsibility

Interview the user.

Never generates the PRD.

Only asks questions.

---

## Requirement Agent

Generate

- Functional Requirements
- Non Functional Requirements
- Business Rules

---

## PRD Agent

Generate the final PRD.

---

## UX Agent

Generate

- User Flow
- Screen List
- Navigation
- UX Notes

---

## Database Agent

Generate

- Entities
- Relationships
- ERD (Mermaid)

---

## API Agent

Generate

- REST API
- Request
- Response
- Authentication

---

## Estimation Agent

Generate

- Story Points
- Sprint Plan
- Timeline

---

## QA Agent

Generate

- Test Cases
- Acceptance Tests
- Edge Cases

---

# AI Provider Support

Supported Providers

- OpenAI
- Gemini
- Claude
- OpenRouter
- Ollama
- LM Studio
- OpenAI Compatible APIs

Configuration

```
Provider

Model

API Key

Base URL

Temperature

Top P

Max Tokens
```

---

# Database Design

## workspaces

- id
- owner_id
- name
- slug
- created_at

---

## projects

- id
- workspace_id
- name
- description
- status
- ai_provider
- ai_model

---

## interviews

- id
- project_id

---

## interview_messages

- id
- interview_id
- role
- content

---

## ai_memories

- id
- project_id
- key
- value

---

## prds

- id
- project_id
- version
- markdown
- json

---

## exports

- id
- project_id
- type
- path

---

# UI Pages

Authentication

- Login
- Register

Dashboard

- Overview
- Recent Projects

Workspace

- Settings

Projects

- Project List
- Create Project
- Project Detail

Interview

- Chat Interface

PRD

- Editor
- Version History
- Diff Viewer

Settings

- AI Providers
- Models
- Export

---

# Roadmap

## Phase 1 (MVP)

- Authentication
- Workspace
- Projects
- AI Interview
- AI Memory
- PRD Generation
- Markdown Editor
- Versioning
- Export Markdown
- Export PDF

---

## Phase 2

- Mermaid diagrams
- User Story Generator
- Acceptance Criteria Generator
- Database Generator
- API Generator
- Sprint Generator

---

## Phase 3

- Team Collaboration
- Comments
- AI Review
- Requirement Traceability
- GitHub Integration
- Jira Integration
- Linear Integration

---

## Phase 4

- RAG
- Company Knowledge Base
- Custom AI Agents
- Plugin System
- Marketplace
- Multi Workspace
- Enterprise Features

---

# Future Features

- Voice Interview
- Image Upload
- Whiteboard
- Requirement Diagram
- BPMN Generator
- UML Generator
- Sequence Diagram
- Architecture Diagram
- Risk Analysis
- Cost Estimation
- Agile Sprint Planning
- Release Planning
- AI Reviewer
- Requirement Validator
- Duplicate Requirement Detection

---

# Guiding Principles

- AI should ask before assuming.
- Every generated document must be editable.
- Every AI output should be versioned.
- AI should remember project context.
- Self-hosted first.
- Provider agnostic.
- Markdown-first.
- Privacy by default.
- Extensible architecture.
- Developer-friendly.
