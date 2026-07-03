import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Workspace } from '@/types';

interface Props {
    workspace: Workspace;
}

export default function ProjectsCreate({ workspace }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        idea: '',
        ai_provider: '',
        ai_model: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/workspaces/${workspace.id}/projects`);
    }

    return (
        <>
            <Head title="Buat Proyek" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <Link href={`/workspaces/${workspace.id}`}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Buat Proyek</h1>
                        <p className="text-sm text-muted-foreground">di {workspace.name}</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Detail Proyek</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Proyek *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Aplikasi Keren Saya"
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat proyek"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="idea">Ide Produk *</Label>
                                <Textarea
                                    id="idea"
                                    value={data.idea}
                                    onChange={(e) => setData('idea', e.target.value)}
                                    placeholder="Jelaskan ide produk Anda dalam beberapa kalimat..."
                                    rows={4}
                                />
                                {errors.idea && <p className="text-sm text-destructive">{errors.idea}</p>}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="ai_provider">Penyedia AI</Label>
                                    <Select value={data.ai_provider} onValueChange={(v) => setData('ai_provider', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Default (OpenAI)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="openai">OpenAI</SelectItem>
                                            <SelectItem value="anthropic">Anthropic</SelectItem>
                                            <SelectItem value="gemini">Gemini</SelectItem>
                                            <SelectItem value="openrouter">OpenRouter</SelectItem>
                                            <SelectItem value="deepseek">DeepSeek</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ai_model">Model AI</Label>
                                    <Input
                                        id="ai_model"
                                        value={data.ai_model}
                                        onChange={(e) => setData('ai_model', e.target.value)}
                                        placeholder="gpt-4o, claude-3, dll."
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={processing} className="w-full">
                                Buat Proyek
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProjectsCreate.layout = undefined;
