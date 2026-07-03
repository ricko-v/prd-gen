import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, Save, Eye, Edit3, FileText, RefreshCw } from 'lucide-react';
import { useState, useCallback } from 'react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { Workspace, Project, Prd } from '@/types';

interface Props {
    workspace: Workspace;
    project: Project;
    prd: Prd;
}

export default function PrdsShow({ workspace, project, prd }: Props) {
    const [markdown, setMarkdown] = useState(prd.markdown ?? '');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [title, setTitle] = useState(prd.title ?? '');

    const baseUrl = `/workspaces/${workspace.id}/projects/${project.id}`;
    const hasError = markdown.startsWith('Error:') || markdown.includes('Error generating PRD');

    const handleSave = useCallback(() => {
        setIsSaving(true);
        router.patch(
            `${baseUrl}/prds/${prd.id}`,
            { markdown, title },
            {
                preserveScroll: true,
                onFinish: () => setIsSaving(false),
            }
        );
    }, [markdown, title, baseUrl, prd.id]);

    const handleRegenerate = useCallback(() => {
        setIsRegenerating(true);
        router.post(`${baseUrl}/prds/generate`, {}, {
            onFinish: () => setIsRegenerating(false),
        });
    }, [baseUrl]);

    const handleExportMarkdown = useCallback(() => {
        window.location.href = `${baseUrl}/prds/${prd.id}/export/markdown`;
    }, [baseUrl, prd.id]);

    const handleExportPdf = useCallback(() => {
        window.location.href = `${baseUrl}/prds/${prd.id}/export/pdf`;
    }, [baseUrl, prd.id]);

    return (
        <>
            <Head title={`${prd.title ?? 'PRD'} v${prd.version}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={baseUrl}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">{prd.title ?? 'PRD Tanpa Judul'}</h1>
                            <p className="text-sm text-muted-foreground">Versi {prd.version}</p>
                        </div>
                        <Badge variant="outline">v{prd.version}</Badge>
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
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="outline" size="sm" onClick={handleExportMarkdown} disabled={hasError}>
                            <Download className="mr-2 h-4 w-4" />
                            Markdown
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleExportPdf} disabled={hasError}>
                            <FileText className="mr-2 h-4 w-4" />
                            PDF
                        </Button>
                    </div>
                </div>

                {hasError && (
                    <Card className="border-destructive">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-destructive">
                                <RefreshCw className="h-4 w-4" />
                                <p className="text-sm font-medium">Pembuatan PRD gagal. Klik "Buat ulang" untuk mencoba lagi.</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

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
                                        placeholder="Judul PRD"
                                    />
                                </div>
                                <Textarea
                                    value={markdown}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                    className="flex-1 resize-none border-none rounded-none font-mono text-sm p-4"
                                        placeholder="Tulis PRD Anda dalam Markdown..."
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
            </div>
        </>
    );
}

PrdsShow.layout = undefined;
