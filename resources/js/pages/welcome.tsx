import { Head, Link, usePage } from '@inertiajs/react';
import {
    Sparkles,
    FileText,
    MessageSquare,
    Brain,
    ArrowRight,
    Check,
    Zap,
    Shield,
    Globe,
    ChevronRight,
    Star,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage().props;

    const features = [
        {
            icon: MessageSquare,
            title: 'Wawancara Berbasis AI',
            description: 'AI Product Manager kami mengajukan pertanyaan yang tepat untuk memahami visi dan kebutuhan produk Anda.',
        },
        {
            icon: Brain,
            title: 'Analisis Cerdas',
            description: 'AI menganalisis jawaban Anda untuk mengidentifikasi celah, memberikan saran, dan memastikan cakupan yang komprehensif.',
        },
        {
            icon: FileText,
            title: 'PRD Profesional',
            description: 'Hasilkan PRD siap produksi dengan semua bagian penting: persyaratan, user stories, kriteria penerimaan.',
        },
        {
            icon: Zap,
            title: 'Kontrol Versi',
            description: 'Lacak perubahan, bandingkan versi, dan pertahankan riwayat lengkap evolusi PRD Anda.',
        },
        {
            icon: Shield,
            title: 'Self-Hosted',
            description: 'Kontrol penuh atas data Anda. Deploy di infrastruktur sendiri untuk privasi dan keamanan maksimal.',
        },
        {
            icon: Globe,
            title: 'Multi Provider AI',
            description: 'Bekerja dengan OpenAI, Gemini, Claude, dan lainnya. Pilih provider AI yang sesuai kebutuhan Anda.',
        },
    ];

    const steps = [
        {
            step: '01',
            title: 'Jelaskan Ide Anda',
            description: 'Mulai dengan berbagi konsep produk Anda. AI kami akan membantu menyempurnakan dan mengembangkannya.',
        },
        {
            step: '02',
            title: 'Wawancara AI',
            description: 'Jawab pertanyaan terarah dari AI Product Manager kami untuk mengumpulkan kebutuhan secara detail.',
        },
        {
            step: '03',
            title: 'Hasilkan PRD',
            description: 'Dapatkan PRD komprehensif dan profesional yang siap untuk tim pengembangan Anda.',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Product Manager di TechCorp',
            content: 'PRD Generator memotong waktu pengumpulan kebutuhan hingga 70%. Wawancara AI-nya sangat mendalam.',
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Pendiri Startup',
            content: 'Sebagai founder non-teknis, alat ini membantu saya mengartikan visi menjadi kebutuhan yang dapat ditindaklanjuti.',
        },
        {
            name: 'Aisha Patel',
            role: 'Engineering Lead',
            content: 'PRD yang dihasilkan sangat detail sehingga developer kami bisa langsung mulai membangun.',
        },
    ];

    return (
        <>
            <Head title="PRD Generator - Dokumen Kebutuhan Produk Berbasis AI" />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-xl">PRD Generator</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#fitur" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Fitur
                            </a>
                            <a href="#cara-kerja" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Cara Kerja
                            </a>
                            <a href="#testimoni" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Testimoni
                            </a>
                        </nav>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button>
                                        Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost">Masuk</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>
                                            Mulai Gratis
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                    <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    
                    <div className="container relative mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center text-center">
                            <Badge variant="outline" className="mb-4">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Generasi PRD Berbasis AI
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                Ubah Ide Menjadi
                                <br />
                                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    Kebutuhan Produk
                                </span>
                            </h1>
                            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                                Berhenti menghabiskan berminggu-minggu untuk pengumpulan kebutuhan. AI Product Manager kami 
                                melakukan wawancara cerdas untuk menghasilkan PRD komprehensif dalam hitungan menit.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button size="lg" className="text-base">
                                            Buka Dashboard
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/register">
                                            <Button size="lg" className="text-base">
                                                Mulai Gratis
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                        <Link href="/login">
                                            <Button size="lg" variant="outline" className="text-base">
                                                Masuk
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    Tanpa kartu kredit
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    Opsi self-hosted
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    Multi provider AI
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="fitur" className="py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4">Fitur</Badge>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Semua yang Anda Butuhkan untuk PRD
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Fitur-fitur canggih yang dirancang untuk menyederhanakan proses kebutuhan produk 
                                dan membuat dokumentasi yang benar-benar digunakan tim Anda.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl border p-6 transition-all hover:shadow-lg hover:border-primary/50"
                                >
                                    <div className="mb-4 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="cara-kerja" className="border-t bg-muted/30 py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4">Cara Kerja</Badge>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Tiga Langkah Sederhana
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Dari ide ke PRD komprehensif dalam hitungan menit, bukan minggu.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {steps.map((step, index) => (
                                <div key={index} className="relative flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                                        {step.step}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                    {index < steps.length - 1 && (
                                        <ChevronRight className="absolute -right-4 top-8 hidden h-8 w-8 text-muted-foreground/30 md:block" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimoni" className="py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4">Testimoni</Badge>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Disukai Tim Produk
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Lihat apa kata product manager dan founder tentang PRD Generator.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="rounded-2xl border p-6">
                                    <div className="mb-4 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="border-t bg-muted/30 py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center rounded-3xl bg-primary p-8 md:p-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
                                Siap Membuat PRD Pertama Anda?
                            </h2>
                            <p className="mb-8 max-w-2xl text-primary-foreground/80">
                                Bergabung dengan ribuan tim produk yang sudah menggunakan PRD Generator 
                                untuk membuat dokumentasi produk yang lebih baik, lebih cepat.
                            </p>
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="lg" variant="secondary" className="text-base">
                                        Buka Dashboard
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/register">
                                    <Button size="lg" variant="secondary" className="text-base">
                                        Mulai Gratis
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                                </div>
                                <span className="font-semibold">PRD Generator</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Dibangun dengan Laravel, React, dan AI. Self-hosted dan ramah privasi.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
