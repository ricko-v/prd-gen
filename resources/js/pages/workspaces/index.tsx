import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, FolderOpen, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Workspace } from '@/types';

export default function WorkspacesIndex({ workspaces: workspaceList }: { workspaces: Workspace[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/workspaces', {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    }

    function handleDelete(workspace: Workspace) {
        if (confirm('Apakah Anda yakin ingin menghapus workspace ini?')) {
            router.delete(`/workspaces/${workspace.id}`);
        }
    }

    return (
        <>
            <Head title="Workspace" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Workspace</h1>
                        <p className="text-muted-foreground">Kelola workspace dan proyek Anda</p>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Workspace Baru
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Buat Workspace</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Workspace Saya"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi (opsional)</Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat..."
                                    />
                                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    Buat Workspace
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {workspaceList.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-12">
                        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">Belum ada workspace</CardTitle>
                        <CardDescription className="mb-4">Buat workspace pertama Anda untuk memulai</CardDescription>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Buat Workspace
                                </Button>
                            </DialogTrigger>
                        </Dialog>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {workspaceList.map((workspace) => (
                            <Card key={workspace.id} className="relative">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <Link href={`/workspaces/${workspace.id}`} className="flex-1">
                                            <CardTitle className="hover:underline">{workspace.name}</CardTitle>
                                        </Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/workspaces/${workspace.id}`}>
                                                        <FolderOpen className="mr-2 h-4 w-4" />
                                                        Buka
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(workspace)}
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {workspace.description && (
                                        <CardDescription>{workspace.description}</CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <Link href={`/workspaces/${workspace.id}`}>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <FolderOpen className="mr-1 h-4 w-4" />
                                            {workspace.projects_count ?? 0} proyek
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

WorkspacesIndex.layout = undefined;
