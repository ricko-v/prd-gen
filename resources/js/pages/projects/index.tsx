import { Head, Link, router } from '@inertiajs/react';
import { Plus, FolderOpen, MessageSquare, FileText, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Workspace, Project } from '@/types';

interface Props {
    workspace: Workspace;
    projects: {
        data: Project[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function ProjectsIndex({ workspace, projects }: Props) {
    function getStatusBadge(status: string) {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
            draft: 'secondary',
            interviewing: 'default',
            generated: 'outline',
        };

        return <Badge variant={variants[status] ?? 'default'}>{status}</Badge>;
    }

    return (
        <>
            <Head title={`Proyek - ${workspace.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/workspaces/${workspace.id}`}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">Proyek</h1>
                            <p className="text-sm text-muted-foreground">{workspace.name}</p>
                        </div>
                    </div>
                    <Link href={`/workspaces/${workspace.id}/projects/create`}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Proyek Baru
                        </Button>
                    </Link>
                </div>

                {projects.data.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-12">
                        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">Belum ada proyek</CardTitle>
                        <CardDescription className="mb-4">Buat proyek pertama Anda untuk mulai membuat PRD</CardDescription>
                        <Link href={`/workspaces/${workspace.id}/projects/create`}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Buat Proyek
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects.data.map((project) => (
                            <Link key={project.id} href={`/workspaces/${workspace.id}/projects/${project.id}`}>
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{project.name}</CardTitle>
                                            {getStatusBadge(project.status)}
                                        </div>
                                        {project.description && (
                                            <CardDescription className="line-clamp-2">
                                                {project.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="h-4 w-4" />
                                                {project.interviews_count ?? 0}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-4 w-4" />
                                                {project.prds_count ?? 0}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

ProjectsIndex.layout = undefined;
