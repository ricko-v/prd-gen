import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Save, Eye, Edit3, RefreshCw } from 'lucide-react';
import { useState, useCallback } from 'react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { Workspace, Project, Generation } from '@/types';

interface Props {
    workspace: Workspace;
    project: Project;
    generation: Generation;
}

function getStatusBadge(status: string) {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
        pending: 'secondary',
        generating: 'default',
        completed: 'outline',
        failed: 'destructive',
    };

    return <Badge variant={variants[status] ?? 'secondary'}>{status}</Badge>;
}

export default function GenerationsShow({ workspace, project, generation }: Props) {
    const [markdown, setMarkdown] = useState(generation.markdown ?? '');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [title, setTitle] = useState(generation.title ?? '');

    const baseUrl = `/workspaces/${workspace.id}/projects/${project.id}`;
    const hasError = generation.status === 'failed' || markdown.startsWith('Error:') || markdown.includes('Error generating');

    const handleSave = useCallback(() => {
        setIsSaving(true);
        router.patch(
            `${baseUrl}/generations/${generation.id}`,
            { markdown, title },
            {
                preserveScroll: true,
                onFinish: () => setIsSaving(false),
            }
        );
    }, [markdown, title, baseUrl, generation.id]);

    const handleRegenerate = useCallback(() => {
        setIsRegenerating(true);
        router.post(`${baseUrl}/generations`, { type: generation.type }, {
            onFinish: () => setIsRegenerating(false),
        });
    }, [baseUrl, generation.type]);

    return (
        <>
            <Head title={`${generation.title}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`${baseUrl}/generations`}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">{generation.title}</h1>
                            <div className="flex items-center gap-2">
                                {getStatusBadge(generation.status)}
                                <span className="text-sm text-muted-foreground">
                                    {new Date(generation.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRegenerate}
                            disabled={isRegenerating}
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                            {isRegenerating ? 'Membuat ulang...' : 'Buat ulang'}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? (
                                <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Pratinjau
                                </>
                            ) : (
                                <>
                                    <Edit3 className="mr-2 h-4 w-4" />
                                    Edit
                                </>
                            )}
                        </Button>
                        {isEditing && (
                            <Button size="sm" onClick={handleSave} disabled={isSaving}>
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        )}
                    </div>
                </div>

                {hasError && (
                    <Card className="border-destructive">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-destructive">
                                <RefreshCw className="h-4 w-4" />
                                <p className="text-sm font-medium">
                                    {generation.error_message ?? 'Pembuatan gagal. Klik "Buat ulang" untuk mencoba lagi.'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {generation.status === 'generating' && (
                    <Card>
                        <CardContent className="p-8">
                            <div className="flex flex-col items-center justify-center gap-3">
                                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                                <p className="text-lg font-medium">Membuat konten...</p>
                                <p className="text-sm text-muted-foreground">Mohon tunggu sebentar.</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {generation.status !== 'generating' && (
                    <Card className="flex-1 overflow-hidden">
                        <CardContent className="p-0 h-full overflow-auto">
                            {isEditing ? (
                                <div className="h-full flex flex-col">
                                    <div className="border-b p-4">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full text-lg font-semibold bg-transparent border-none outline-none"
                                            placeholder="Judul"
                                        />
                                    </div>
                                    <Textarea
                                        value={markdown}
                                        onChange={(e) => setMarkdown(e.target.value)}
                                        className="flex-1 resize-none border-none rounded-none font-mono text-sm p-4"
                                        placeholder="Konten..."
                                    />
                                </div>
                            ) : (
                                <div className="p-6">
                                    <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h1:text-2xl prose-h1:font-bold prose-h1:border-b prose-h1:pb-2 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h3:text-lg prose-h3:font-medium prose-p:text-base prose-p:leading-7 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-table:border-collapse prose-th:border prose-th:p-2 prose-td:border prose-td:p-2 prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:text-foreground prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg">
                                        <MarkdownRenderer>{markdown}</MarkdownRenderer>
                                    </article>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

GenerationsShow.layout = undefined;
