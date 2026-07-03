import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    FolderOpen,
    Plus,
    FileText,
    MessageSquare,
    Sparkles,
    ArrowRight,
    Clock,
    Layers,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Workspace, Project } from '@/types';

interface Props {
    workspaces: (Workspace & { projects: Project[] })[];
}

export default function Dashboard({ workspaces: workspaceList }: Props) {
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const workspaceForm = useForm({
        name: '',
        description: '',
    });

    const projectForm = useForm({
        workspace_id: '',
        name: '',
        description: '',
        idea: '',
    });

    function handleWorkspaceSubmit(e: React.FormEvent) {
        e.preventDefault();
        workspaceForm.post('/workspaces', {
            onSuccess: () => {
                workspaceForm.reset();
                setIsWorkspaceOpen(false);
            },
        });
    }

    function handleProjectSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!projectForm.data.workspace_id) {
return;
}

        projectForm.post(`/workspaces/${projectForm.data.workspace_id}/projects`, {
            onSuccess: () => {
                projectForm.reset();
                setIsProjectOpen(false);
            },
        });
    }

    function handleQuickStart() {
        if (workspaceList.length === 0) {
            setIsWorkspaceOpen(true);
        } else {
            projectForm.setData('workspace_id', String(workspaceList[0].id));
            setIsProjectOpen(true);
        }
    }

    const totalProjects = workspaceList.reduce((acc, w) => acc + (w.projects?.length ?? 0), 0);
    const totalInterviews = workspaceList.reduce(
        (acc, w) => acc + (w.projects?.reduce((a, p) => a + (p.interviews_count ?? 0), 0) ?? 0),
        0
    );
    const totalPrds = workspaceList.reduce(
        (acc, w) => acc + (w.projects?.reduce((a, p) => a + (p.prds_count ?? 0), 0) ?? 0),
        0
    );

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto rounded-xl p-6">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 border">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold">PRD Generator</h1>
                        </div>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Ubah ide produk Anda menjadi Dokumen Kebutuhan Produk yang komprehensif dengan wawancara berbasis AI.
                        </p>
                    </div>
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -right-5 -bottom-5 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Workspace</p>
                                    <p className="text-3xl font-bold">{workspaceList.length}</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <Layers className="h-6 w-6 text-blue-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Proyek</p>
                                    <p className="text-3xl font-bold">{totalProjects}</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <FolderOpen className="h-6 w-6 text-purple-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Wawancara</p>
                                    <p className="text-3xl font-bold">{totalInterviews}</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <MessageSquare className="h-6 w-6 text-green-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">PRD Dihasilkan</p>
                                    <p className="text-3xl font-bold">{totalPrds}</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-orange-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Dialog open={isWorkspaceOpen} onOpenChange={setIsWorkspaceOpen}>
                        <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50 group">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Plus className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Workspace Baru</p>
                                        <p className="text-sm text-muted-foreground">Atur proyek Anda</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Buat Workspace</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleWorkspaceSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        value={workspaceForm.data.name}
                                        onChange={(e) => workspaceForm.setData('name', e.target.value)}
                                        placeholder="Workspace Saya"
                                    />
                                    {workspaceForm.errors.name && <p className="text-sm text-destructive">{workspaceForm.errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi (opsional)</Label>
                                    <Input
                                        id="description"
                                        value={workspaceForm.data.description}
                                        onChange={(e) => workspaceForm.setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat..."
                                    />
                                </div>
                                <Button type="submit" disabled={workspaceForm.processing} className="w-full">
                                    Buat Workspace
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Link href="/workspaces">
                        <Card className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50 group h-full">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                    <FolderOpen className="h-6 w-6 text-purple-500" />
                                </div>
                                <div>
                                    <p className="font-semibold">Semua Workspace</p>
                                    <p className="text-sm text-muted-foreground">Kelola workspace Anda</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Dialog open={isProjectOpen} onOpenChange={setIsProjectOpen}>
                        <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50 group" onClick={handleQuickStart}>
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                        <Zap className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Mulai Cepat</p>
                                        <p className="text-sm text-muted-foreground">Buat proyek dengan AI</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Buat Proyek Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleProjectSubmit} className="space-y-4">
                                {workspaceList.length > 1 && (
                                    <div className="space-y-2">
                                        <Label>Workspace</Label>
                                        <Select
                                            value={projectForm.data.workspace_id}
                                            onValueChange={(v) => projectForm.setData('workspace_id', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih workspace" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {workspaceList.map((w) => (
                                                    <SelectItem key={w.id} value={String(w.id)}>
                                                        {w.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="project-name">Nama Proyek *</Label>
                                    <Input
                                        id="project-name"
                                        value={projectForm.data.name}
                                        onChange={(e) => projectForm.setData('name', e.target.value)}
                                        placeholder="Aplikasi Keren Saya"
                                    />
                                    {projectForm.errors.name && <p className="text-sm text-destructive">{projectForm.errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="project-description">Deskripsi</Label>
                                    <Input
                                        id="project-description"
                                        value={projectForm.data.description}
                                        onChange={(e) => projectForm.setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="project-idea">Ide Produk *</Label>
                                    <Textarea
                                        id="project-idea"
                                        value={projectForm.data.idea}
                                        onChange={(e) => projectForm.setData('idea', e.target.value)}
                                        placeholder="Jelaskan ide produk Anda..."
                                        rows={4}
                                    />
                                    {projectForm.errors.idea && <p className="text-sm text-destructive">{projectForm.errors.idea}</p>}
                                </div>
                                <Button type="submit" disabled={projectForm.processing} className="w-full">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Buat Proyek
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Recent Workspaces */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Workspace Terbaru</h2>
                        <Link href="/workspaces">
                            <Button variant="ghost" size="sm">
                                Lihat Semua
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {workspaceList.length === 0 ? (
                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center justify-center p-12">
                                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                                    <FolderOpen className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <CardTitle className="mb-2">Belum ada workspace</CardTitle>
                                <CardDescription className="mb-6 text-center max-w-md">
                                    Buat workspace pertama Anda untuk mulai mengatur proyek dan menghasilkan PRD dengan AI.
                                </CardDescription>
                                <Dialog open={isWorkspaceOpen} onOpenChange={setIsWorkspaceOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="lg">
                                            <Plus className="mr-2 h-5 w-5" />
                                            Buat Workspace Pertama
                                        </Button>
                                    </DialogTrigger>
                                </Dialog>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {workspaceList.slice(0, 6).map((workspace) => (
                                <Link key={workspace.id} href={`/workspaces/${workspace.id}`}>
                                    <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 group">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <FolderOpen className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                                                            {workspace.name}
                                                        </CardTitle>
                                                        {workspace.description && (
                                                            <CardDescription className="line-clamp-1">
                                                                {workspace.description}
                                                            </CardDescription>
                                                        )}
                                                    </div>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <FolderOpen className="h-4 w-4" />
                                                    {workspace.projects?.length ?? 0} proyek
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {new Date(workspace.updated_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                            {workspace.projects && workspace.projects.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1">
                                                    {workspace.projects.slice(0, 3).map((project) => (
                                                        <Badge key={project.id} variant="secondary" className="text-xs">
                                                            {project.name}
                                                        </Badge>
                                                    ))}
                                                    {workspace.projects.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{workspace.projects.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = undefined;
