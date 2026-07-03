export interface Workspace {
    id: number;
    owner_id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    projects_count?: number;
}

export interface Project {
    id: number;
    workspace_id: number;
    name: string;
    description: string | null;
    status: 'draft' | 'interviewing' | 'generated';
    ai_provider: string | null;
    ai_model: string | null;
    idea: string | null;
    created_at: string;
    updated_at: string;
    interviews_count?: number;
    prds_count?: number;
    latest_interview?: Interview | null;
    latest_prd?: Prd | null;
    ai_memories?: AiMemory[];
}

export interface Interview {
    id: number;
    project_id: number;
    status: 'active' | 'completed';
    summary: string | null;
    analysis: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
    messages?: InterviewMessage[];
}

export interface InterviewMessage {
    id: number;
    interview_id: number;
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
    updated_at: string;
}

export interface AiMemory {
    id: number;
    project_id: number;
    key: string;
    value: string;
    created_at: string;
    updated_at: string;
}

export interface Prd {
    id: number;
    project_id: number;
    version: number;
    markdown: string | null;
    json_content: Record<string, unknown> | null;
    title: string | null;
    created_at: string;
    updated_at: string;
}

export interface Export {
    id: number;
    project_id: number;
    prd_id: number;
    type: 'markdown' | 'pdf' | 'docx' | 'html';
    path: string;
    created_at: string;
    updated_at: string;
}

export type GenerationType = 'user_stories' | 'acceptance_criteria' | 'database_schema' | 'api_spec' | 'sprint_plan';

export interface Generation {
    id: number;
    project_id: number;
    type: GenerationType;
    title: string;
    markdown: string | null;
    json_content: Record<string, unknown> | null;
    status: 'pending' | 'generating' | 'completed' | 'failed';
    error_message: string | null;
    created_at: string;
    updated_at: string;
}
