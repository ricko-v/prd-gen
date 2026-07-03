import { Head, Link, router } from '@inertiajs/react';
import { MessageSquare, FileText, Sparkles, Brain, ArrowRight, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Workspace, Project, Interview, Prd, AiMemory } from '@/types';

interface Props {
    workspace: Workspace;
    project: Project & {
        latest_interview: (Interview & { messages: Array<{ role: string; content: string }> }) | null;
        latest_prd: Prd | null;
        ai_memories: AiMemory[];
    };
}

export default function ProjectsShow({ workspace, project }: Props) {
    function getStatusBadge(status: string) {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
            draft: 'secondary',
            interviewing: 'default',
            generated: 'outline',
        };

        return <Badge variant={variants[status] ?? 'default'}>{status}</Badge>;
    }

    function handleStartInterview() {
        router.post(`/workspaces/${workspace.id}/projects/${project.id}/interviews`);
    }

    function handleGeneratePrd() {
        router.post(`/workspaces/${workspace.id}/projects/${project.id}/prds/generate`);
    }

    const baseUrl = `/workspaces/${workspace.id}/projects/${project.id}`;

    return (
        <>
            <Head title={project.name} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{project.name}</h1>
                            {getStatusBadge(project.status)}
                        </div>
                        {project.description && (
                            <p className="text-muted-foreground mt-1">{project.description}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                    {/* Interview Card */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Wawancara AI</CardTitle>
                            </div>
                            <CardDescription>
                                Jawab pertanyaan AI untuk mengumpulkan kebutuhan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1 justify-end">
                            {project.latest_interview ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant={project.latest_interview.status === 'completed' ? 'outline' : 'default'}>
                                            {project.latest_interview.status}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            {project.latest_interview.messages?.length ?? 0} pesan
                                        </span>
                                    </div>
                                    <Link href={`${baseUrl}/interviews/${project.latest_interview.id}`}>
                                        <Button variant="outline" className="w-full">
                                            Lanjutkan Wawancara
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button onClick={handleStartInterview} className="w-full">
                                    Mulai Wawancara
                                    <MessageSquare className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* PRD Card */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">PRD</CardTitle>
                            </div>
                            <CardDescription>
                                Buat dan edit Dokumen Kebutuhan Produk Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1 justify-end">
                            {project.latest_prd ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">v{project.latest_prd.version}</Badge>
                                        <span className="text-sm text-muted-foreground">
                                            {project.latest_prd.title}
                                        </span>
                                    </div>
                                    <Link href={`${baseUrl}/prds/${project.latest_prd.id}`}>
                                        <Button variant="outline" className="w-full">
                                            Lihat PRD
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Button
                                        onClick={handleGeneratePrd}
                                        disabled={project.status === 'draft'}
                                        className="w-full"
                                    >
                                        Buat PRD
                                        <Sparkles className="ml-2 h-4 w-4" />
                                    </Button>
                                    {project.status === 'draft' && (
                                        <p className="text-xs text-muted-foreground text-center">
                                            Selesaikan wawancara terlebih dahulu
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* AI Memory Card */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Brain className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Memori AI</CardTitle>
                            </div>
                            <CardDescription>
                                Konteks proyek untuk agen AI
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1 justify-end">
                            {project.ai_memories && project.ai_memories.length > 0 ? (
                                <div className="space-y-2">
                                    {project.ai_memories.slice(0, 3).map((memory) => (
                                        <div key={memory.id} className="flex items-center gap-2 text-sm">
                                            <span className="font-medium">{memory.key}:</span>
                                            <span className="text-muted-foreground truncate">{memory.value}</span>
                                        </div>
                                    ))}
                                    {project.ai_memories.length > 3 && (
                                        <p className="text-xs text-muted-foreground">
                                            +{project.ai_memories.length - 3} lainnya
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Belum ada memori tersimpan</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* AI Generators Card */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Wand2 className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Generator AI</CardTitle>
                            </div>
                            <CardDescription>
                                User story, kriteria penerimaan, skema DB, spesifikasi API, rencana sprint
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1 justify-end">
                            <Link href={`${baseUrl}/generations`}>
                                <Button variant="outline" className="w-full">
                                    Buka Generator
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Product Idea */}
                {project.idea && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Ide Produk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{project.idea}</p>
                        </CardContent>
                    </Card>
                )}

                {/* PRD History */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Versi PRD</CardTitle>
                            <Link href={`${baseUrl}/prds`}>
                                <Button variant="ghost" size="sm">Lihat Semua</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {project.latest_prd ? (
                            <div className="text-sm text-muted-foreground">
                                Latest: v{project.latest_prd.version} - {project.latest_prd.title}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Belum ada PRD yang dibuat</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProjectsShow.layout = undefined;
