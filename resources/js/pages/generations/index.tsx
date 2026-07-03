import { Head, Link, router } from '@inertiajs/react';
import type { FileText} from 'lucide-react';
import { ArrowLeft, Plus, Users, CheckCircle, Database, Code, Calendar, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Workspace, Project, Generation, GenerationType } from '@/types';

interface Props {
    workspace: Workspace;
    project: Project;
    generations: Generation[];
}

const generatorTypes: { type: GenerationType; label: string; description: string; icon: typeof FileText }[] = [
    { type: 'user_stories', label: 'User Stories', description: 'Buat user story dengan kriteria penerimaan', icon: Users },
    { type: 'acceptance_criteria', label: 'Kriteria Penerimaan', description: 'Buat kriteria penerimaan Given-When-Then', icon: CheckCircle },
    { type: 'database_schema', label: 'Skema Database', description: 'Buat skema database dengan diagram ERD', icon: Database },
    { type: 'api_spec', label: 'Spesifikasi API', description: 'Buat dokumentasi API RESTful', icon: Code },
    { type: 'sprint_plan', label: 'Rencana Sprint', description: 'Buat rencana sprint agile dengan timeline', icon: Calendar },
];

function getStatusBadge(status: string) {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
        pending: 'secondary',
        generating: 'default',
        completed: 'outline',
        failed: 'destructive',
    };

    return <Badge variant={variants[status] ?? 'secondary'}>{status}</Badge>;
}

export default function GenerationsIndex({ workspace, project, generations }: Props) {
    const baseUrl = `/workspaces/${workspace.id}/projects/${project.id}`;

    function handleGenerate(type: GenerationType) {
        router.post(`${baseUrl}/generations`, { type });
    }

    function handleDelete(generationId: number) {
        if (confirm('Hapus generasi ini?')) {
            router.delete(`${baseUrl}/generations/${generationId}`);
        }
    }

    const grouped = generatorTypes.map((config) => ({
        ...config,
        items: generations.filter((g) => g.type === config.type),
    }));

    return (
        <>
            <Head title={`Generator - ${project.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <Link href={baseUrl}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Generator AI</h1>
                        <p className="text-muted-foreground">{project.name}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {grouped.map((group) => (
                        <Card key={group.type} className="flex flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <group.icon className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">{group.label}</CardTitle>
                                </div>
                                <CardDescription>{group.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 justify-end gap-3">
                                {group.items.length > 0 && (
                                    <div className="space-y-2">
                                        {group.items.slice(0, 3).map((item) => (
                                            <div key={item.id} className="flex items-center justify-between gap-2 rounded-md border p-2">
                                                <Link href={`${baseUrl}/generations/${item.id}`} className="flex-1 truncate text-sm hover:underline">
                                                    {item.title}
                                                </Link>
                                                <div className="flex items-center gap-1">
                                                    {getStatusBadge(item.status)}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {group.items.length > 3 && (
                                            <p className="text-xs text-muted-foreground">+{group.items.length - 3} lainnya</p>
                                        )}
                                    </div>
                                )}
                                <Button
                                    variant={group.items.length > 0 ? 'outline' : 'default'}
                                    className="w-full"
                                    onClick={() => handleGenerate(group.type)}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Buat {group.label}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
