# PRD Generator

AI-powered Product Requirement Document generator. Ubah ide produk menjadi PRD siap produksi melalui wawancara berbasis AI.

## Fitur

- **AI Interview** — Wawancara interaktif untuk mengumpulkan kebutuhan produk
- **PR Generation** — Buat dokumen PRD lengkap dari hasil wawancara
- **Supplementary Docs** — Generate user stories, acceptance criteria, DB schema, API spec, sprint plan
- **Versioning** — Setiap generate membuat versi baru (v1, v2, ...)
- **Export** — Download sebagai Markdown atau PDF
- **Multi-Provider AI** — 14 provider tersedia (Gemini, OpenAI, Anthropic, dll)
- **Auth** — Login dengan passkey, 2FA, email verification

## Tech Stack

| Layer | Stack |
|---|---|
| Backend | PHP 8.4, Laravel 13, Laravel AI |
| Frontend | React 19, Inertia v3, Tailwind v4, shadcn/ui |
| Editor | Tiptap (tables, code blocks, syntax highlight) |
| Auth | Laravel Fortify (passkeys + 2FA) |
| PDF | DomPDF + CommonMark |
| Testing | Pest v4 |
| Default DB | SQLite |

## AI Agents

| Agent | Fungsi |
|---|---|
| ProductManager | Wawancara conversational |
| IdeaAnalyzer | Analisis kualitas ide |
| PrdGenerator | Generate PRD lengkap |
| UserStoryGenerator | Generate user stories |
| AcceptanceCriteriaGenerator | Generate acceptance criteria |
| DatabaseGenerator | Generate skema database + ERD |
| ApiGenerator | Generate spesifikasi REST API |
| SprintGenerator | Generate rencana sprint |

## Instalasi

```bash
# Clone & install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Konfigurasi database (SQLite default)
touch database/database.sqlite

# Jalankan migrasi & seed
php artisan migrate --seed

# Generate Wayfinder routes
php artisan wayfinder:generate

# Build frontend
npm run build

# Jalankan server
composer run dev
```

## Konfigurasi AI

Tambahkan API key di `.env`:

```env
AI_DEFAULT_PROVIDER=gemini
GEMINI_API_KEY=your-key-here
```

Provider lain: `openai`, `anthropic`, `azure`, `bedrock`, `cohere`, `deepseek`, `groq`, `mistral`, `ollama`, `openrouter`, `voyageai`, `elevenlabs`, `jina`, `xai`.

Lihat `config/ai.php` untuk konfigurasi lengkap.

## Struktur Project

```
app/
├── Ai/
│   └── Agents/          # 8 AI agents
├── Actions/
│   └── Fortify/         # Auth actions
├── Enums/               # Status, type enums
├── Http/
│   └── Controllers/     # Route controllers
├── Models/              # 9 Eloquent models
└── Services/            # Business logic

resources/js/
├── pages/               # 23 Inertia React pages
├── components/          # UI components (shadcn/ui)
└── lib/                 # Utilities & helpers
```

## Testing

```bash
# Jalankan semua test
php artisan test --compact

# Filter test tertentu
php artisan test --compact --filter=testName

# Code style
vendor/bin/pint --dirty --format agent
```

## Lisensi

Private project.
