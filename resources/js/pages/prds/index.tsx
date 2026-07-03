import { Head, Link, router } from '@inertiajs/react';
import { Plus, FileText, ArrowLeft, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Workspace, Project, Prd } from '@/types';

interface Props {
    workspace: Workspace;
    project: Project;
    prds: Prd[];
}

export default function PrdsIndex({ workspace, project, prds: prdList }: Props) {
    const baseUrl = `/workspaces/${workspace.id}/projects/${project.id}`;

    function handleGenerate() {
        router.post(`${baseUrl}/prds/generate`);
    }

    return (
        <>
            <Head title={`PRD - ${project.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={baseUrl}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">Versi PRD</h1>
                            <p className="text-sm text-muted-foreground">{project.name}</p>
                        </div>
                    </div>
                    <Button onClick={handleGenerate} disabled={project.status === 'draft'}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Buat Versi Baru
                    </Button>
                </div>

                {prdList.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-12">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">Belum ada PRD</CardTitle>
                        <CardDescription className="mb-4">
                            Selesaikan wawancara dan buat PRD pertama Anda
                        </CardDescription>
                        <Button onClick={handleGenerate} disabled={project.status === 'draft'}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Buat PRD
                        </Button>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {prdList.map((prd) => (
                            <Link key={prd.id} href={`${baseUrl}/prds/${prd.id}`}>
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">
                                                {prd.title ?? `PRD v${prd.version}`}
                                            </CardTitle>
                                            <Badge variant="outline">v{prd.version}</Badge>
                                        </div>
                                        <CardDescription>
                                        Dibuat {new Date(prd.created_at).toLocaleDateString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {prd.markdown?.substring(0, 150)}...
                                        </p>
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

PrdsIndex.layout = undefined;
