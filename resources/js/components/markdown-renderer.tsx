import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidChart } from '@/components/mermaid-chart';

interface MarkdownRendererProps {
    children: string;
}

const components: Components = {
    code({ className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';
        const codeString = String(children).replace(/\n$/, '');

        if (language === 'mermaid') {
            return <MermaidChart chart={codeString} />;
        }

        const isInline = !match;

        if (isInline) {
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }

        return (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
};

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children}
        </ReactMarkdown>
    );
}
