import { Head, Link, router } from '@inertiajs/react';
import { Send, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Workspace, Project, Interview, InterviewMessage } from '@/types';

interface Props {
    workspace: Workspace;
    project: Project;
    interview: Interview & { messages: InterviewMessage[] };
}

export default function InterviewsShow({ workspace, project, interview }: Props) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<InterviewMessage[]>(interview.messages ?? []);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const baseUrl = `/workspaces/${workspace.id}/projects/${project.id}`;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!message.trim() || isLoading) {
return;
}

        const userMessage: InterviewMessage = {
            id: Date.now(),
            interview_id: interview.id,
            role: 'user',
            content: message,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentMessage = message;
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${baseUrl}/interviews/${interview.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ content: currentMessage }),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim pesan');
            }

            const data = await response.json();

            if (data.user_message && data.assistant_message) {
                setMessages((prev) => {
                    const withoutTemp = prev.filter((m) => m.id !== userMessage.id);

                    return [...withoutTemp, data.user_message, data.assistant_message];
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    interview_id: interview.id,
                    role: 'assistant',
                    content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    function handleComplete() {
        router.post(`${baseUrl}/interviews/${interview.id}/complete`);
    }

    return (
        <>
            <Head title={`Wawancara - ${project.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={baseUrl}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">Wawancara AI</h1>
                            <p className="text-sm text-muted-foreground">{project.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={interview.status === 'completed' ? 'outline' : 'default'}>
                            {interview.status}
                        </Badge>
                        {interview.status === 'active' && (
                            <Button onClick={handleComplete} variant="outline" size="sm">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Selesaikan Wawancara
                            </Button>
                        )}
                    </div>
                </div>

                <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardContent className="flex-1 flex flex-col p-0">
                        <div className="flex-1 overflow-auto p-4">
                            <div className="space-y-4">
                                {messages.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground mb-4">
                                            AI akan mengajukan pertanyaan untuk memahami kebutuhan produk Anda.
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Mulai dengan menjelaskan ide produk Anda atau menjawab pertanyaan pertama.
                                        </p>
                                    </div>
                                )}

                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                                msg.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                            }`}
                                        >
                                            {msg.role === 'assistant' ? (
                                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg px-4 py-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {interview.status === 'active' && (
                            <form onSubmit={handleSubmit} className="border-t p-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ketik jawaban Anda..."
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    <Button type="submit" disabled={!message.trim() || isLoading}>
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {interview.status === 'completed' && (
                            <div className="border-t p-4 text-center">
                                <p className="text-muted-foreground mb-2">Wawancara selesai</p>
                                <Link href={baseUrl}>
                                    <Button>Kembali ke Proyek</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

InterviewsShow.layout = undefined;
