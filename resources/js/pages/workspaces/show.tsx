import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, FolderOpen, MessageSquare, FileText } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Workspace, Project } from '@/types';

interface Props {
    workspace: Workspace & { projects: Project[] };
}

export default function WorkspacesShow({ workspace }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        idea: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/workspaces/${workspace.id}/projects`, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    }

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
            <Head title={workspace.name} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{workspace.name}</h1>
                        {workspace.description && (
                            <p className="text-muted-foreground">{workspace.description}</p>
                        )}
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Proyek Baru
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Buat Proyek</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Proyek</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Aplikasi Keren Saya"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi (opsional)</Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat proyek"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="idea">Ide Produk</Label>
                                    <Textarea
                                        id="idea"
                                        value={data.idea}
                                        onChange={(e) => setData('idea', e.target.value)}
                                        placeholder="Jelaskan ide produk Anda dalam beberapa kalimat..."
                                        rows={4}
                                    />
                                    {errors.idea && <p className="text-sm text-destructive">{errors.idea}</p>}
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    Buat Proyek
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {workspace.projects.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-12">
                        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">Belum ada proyek</CardTitle>
                        <CardDescription className="mb-4">Buat proyek pertama Anda untuk mulai membuat PRD</CardDescription>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Buat Proyek
                                </Button>
                            </DialogTrigger>
                        </Dialog>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {workspace.projects.map((project) => (
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

WorkspacesShow.layout = undefined;
