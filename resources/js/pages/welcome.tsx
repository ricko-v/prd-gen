import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
    Star,
    Users,
    Clock,
    TrendingUp,
    Quote,
    Menu,
    X,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: MessageSquare,
            title: 'Wawancara Berbasis AI',
            description: 'AI Product Manager kami mengajukan pertanyaan yang tepat untuk memahami visi dan kebutuhan produk Anda.',
            color: 'bg-amber-100 dark:bg-amber-900/30',
            iconColor: 'text-amber-600 dark:text-amber-400',
        },
        {
            icon: Brain,
            title: 'Analisis Cerdas',
            description: 'AI menganalisis jawaban Anda untuk mengidentifikasi celah, memberikan saran, dan memastikan cakupan yang komprehensif.',
            color: 'bg-orange-100 dark:bg-orange-900/30',
            iconColor: 'text-orange-600 dark:text-orange-400',
        },
        {
            icon: FileText,
            title: 'PRD Profesional',
            description: 'Hasilkan PRD siap produksi dengan semua bagian penting: persyaratan, user stories, kriteria penerimaan.',
            color: 'bg-rose-100 dark:bg-rose-900/30',
            iconColor: 'text-rose-600 dark:text-rose-400',
        },
        {
            icon: Zap,
            title: 'Kontrol Versi',
            description: 'Lacak perubahan, bandingkan versi, dan pertahankan riwayat lengkap evolusi PRD Anda.',
            color: 'bg-yellow-100 dark:bg-yellow-900/30',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
        },
        {
            icon: Shield,
            title: 'Self-Hosted',
            description: 'Kontrol penuh atas data Anda. Deploy di infrastruktur sendiri untuk privasi dan keamanan maksimal.',
            color: 'bg-emerald-100 dark:bg-emerald-900/30',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
        },
        {
            icon: Globe,
            title: 'Multi Provider AI',
            description: 'Bekerja dengan OpenAI, Gemini, Claude, dan lainnya. Pilih provider AI yang sesuai kebutuhan Anda.',
            color: 'bg-sky-100 dark:bg-sky-900/30',
            iconColor: 'text-sky-600 dark:text-sky-400',
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

    const stats = [
        { icon: Users, value: '500+', label: 'Tim Produk' },
        { icon: FileText, value: '10rb+', label: 'PRD Dibuat' },
        { icon: Clock, value: '70%', label: 'Lebih Cepat' },
        { icon: TrendingUp, value: '4.9', label: 'Rating' },
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Product Manager di TechCorp',
            content: 'PRD Generator memotong waktu pengumpulan kebutuhan hingga 70%. Wawancara AI-nya sangat mendalam.',
            avatar: 'SC',
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Pendiri Startup',
            content: 'Sebagai founder non-teknis, alat ini membantu saya mengartikan visi menjadi kebutuhan yang dapat ditindaklanjuti.',
            avatar: 'MR',
        },
        {
            name: 'Aisha Patel',
            role: 'Engineering Lead',
            content: 'PRD yang dihasilkan sangat detail sehingga developer kami bisa langsung mulai membangun.',
            avatar: 'AP',
        },
    ];

    return (
        <>
            <Head title="PRD Generator - Dokumen Kebutuhan Produk Berbasis AI" />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
                                <Sparkles className="h-4.5 w-4.5 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">PRD Generator</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-1">
                            {['Fitur', 'Cara Kerja', 'Testimoni'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-full transition-all hover:text-foreground hover:bg-muted"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <div className="hidden md:flex items-center gap-2">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button className="rounded-full">
                                            Dashboard
                                            <ArrowRight className="ml-1.5 h-4 w-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="ghost" className="rounded-full">Masuk</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button className="rounded-full">
                                                Mulai Gratis
                                                <ArrowRight className="ml-1.5 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden rounded-full"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
                            <div className="container mx-auto px-4 py-4 space-y-1">
                                {['Fitur', 'Cara Kerja', 'Testimoni'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl transition-all hover:text-foreground hover:bg-muted"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <div className="pt-3 border-t border-border/60 space-y-2">
                                    {auth.user ? (
                                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full rounded-full">
                                                Dashboard
                                                <ArrowRight className="ml-1.5 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                                <Button variant="outline" className="w-full rounded-full">Masuk</Button>
                                            </Link>
                                            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                                <Button className="w-full rounded-full">
                                                    Mulai Gratis
                                                    <ArrowRight className="ml-1.5 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
                    {/* Warm gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-background to-background dark:from-amber-950/10" />
                    
                    {/* Floating blobs */}
                    <div className="absolute top-16 left-[15%] h-80 w-80 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl animate-float" />
                    <div className="absolute top-32 right-[10%] h-64 w-64 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl animate-float-slow animation-delay-400" />
                    <div className="absolute bottom-16 left-[30%] h-72 w-72 rounded-full bg-rose-300/15 dark:bg-rose-500/8 blur-3xl animate-pulse-warm animation-delay-800" />

                    <div className="container relative mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="animate-fade-in-up">
                                <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                                    Generasi PRD Berbasis AI
                                </Badge>
                            </div>

                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up animation-delay-200">
                                Ubah Ide Menjadi
                                <br />
                                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                                    Kebutuhan Produk
                                </span>
                            </h1>

                            <p className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed animate-fade-in-up animation-delay-400">
                                Berhenti menghabiskan berminggu-minggu untuk pengumpulan kebutuhan. AI Product Manager kami 
                                melakukan wawancara cerdas untuk menghasilkan PRD komprehensif dalam hitungan menit.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row animate-fade-in-up animation-delay-600">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button size="lg" className="text-base rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                                            Buka Dashboard
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/register">
                                            <Button size="lg" className="text-base rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                                                Mulai Gratis
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                        <Link href="/login">
                                            <Button size="lg" variant="outline" className="text-base rounded-full px-8">
                                                Masuk
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-in-up animation-delay-800">
                                {[
                                    'Tanpa kartu kredit',
                                    'Opsi self-hosted',
                                    'Multi provider AI',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats bar */}
                        <div className="mx-auto mt-20 max-w-3xl animate-fade-in-up animation-delay-1000">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center gap-2 rounded-2xl bg-card/80 border border-border/60 p-5 shadow-sm backdrop-blur-sm"
                                    >
                                        <stat.icon className="h-5 w-5 text-primary" />
                                        <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="fitur" className="py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-14 text-center">
                            <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                                Fitur
                            </Badge>
                            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl tracking-tight">
                                Semua yang Anda Butuhkan
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                                Fitur-fitur canggih yang dirancang untuk menyederhanakan proses kebutuhan produk 
                                dan membuat dokumentasi yang benar-benar digunakan tim Anda.
                            </p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-3xl border border-border/60 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 animate-fade-in-up"
                                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                                >
                                    <div className={`mb-5 h-13 w-13 rounded-2xl ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                        <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                                    </div>
                                    <h3 className="mb-2.5 text-lg font-bold">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="cara-kerja" className="border-t bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/5 py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-14 text-center">
                            <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                                Cara Kerja
                            </Badge>
                            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl tracking-tight">
                                Tiga Langkah Sederhana
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                                Dari ide ke PRD komprehensif dalam hitungan menit, bukan minggu.
                            </p>
                        </div>
                        <div className="relative mx-auto max-w-4xl">
                            {/* Connector line (desktop) */}
                            <div className="absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 dark:from-amber-700 dark:via-orange-700 dark:to-rose-700 hidden md:block" />
                            
                            <div className="grid gap-8 md:grid-cols-3">
                                {steps.map((step, index) => (
                                    <div key={index} className="relative flex flex-col items-center text-center">
                                        <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-extrabold text-white shadow-lg shadow-amber-500/25">
                                            {step.step}
                                        </div>
                                        <h3 className="mb-2.5 text-xl font-bold">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimoni" className="py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-14 text-center">
                            <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                                Testimoni
                            </Badge>
                            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl tracking-tight">
                                Disukai Tim Produk
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                                Lihat apa kata product manager dan founder tentang PRD Generator.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-3xl border border-border/60 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                                >
                                    <Quote className="mb-4 h-8 w-8 text-amber-200 dark:text-amber-800" />
                                    <div className="mb-4 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="mb-6 text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{testimonial.name}</p>
                                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="border-t bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/5 py-20 md:py-28">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-10 md:p-20 text-center">
                            {/* Decorative circles */}
                            <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
                            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                            
                            <h2 className="relative mb-4 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                                Siap Membuat PRD Pertama Anda?
                            </h2>
                            <p className="relative mb-10 max-w-2xl text-white/85 leading-relaxed">
                                Bergabung dengan ribuan tim produk yang sudah menggunakan PRD Generator 
                                untuk membuat dokumentasi produk yang lebih baik, lebih cepat.
                            </p>
                            <div className="relative">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button size="lg" variant="secondary" className="text-base rounded-full px-8 shadow-xl shadow-black/15">
                                            Buka Dashboard
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/register">
                                        <Button size="lg" variant="secondary" className="text-base rounded-full px-8 shadow-xl shadow-black/15">
                                            Mulai Gratis
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t py-10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex items-center gap-2.5">
                                <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                                    <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                                </div>
                                <span className="font-bold tracking-tight">PRD Generator</span>
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
