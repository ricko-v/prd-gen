import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
    chart: string;
    id?: string;
}

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
});

export function MermaidChart({ chart, id }: MermaidProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
return;
}

        const renderChart = async () => {
            try {
                const uniqueId = id ?? `mermaid-${Math.random().toString(36).slice(2, 9)}`;
                const { svg } = await mermaid.render(uniqueId, chart.trim());

                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                    setError(null);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Gagal merender diagram');

                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }
            }
        };

        renderChart();
    }, [chart, id]);

    if (error) {
        return (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                <p className="font-medium">Gagal merender diagram</p>
                <p className="mt-1 text-xs opacity-80">{error}</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="my-4 flex justify-center overflow-x-auto [&>svg]:max-w-full"
        />
    );
}
