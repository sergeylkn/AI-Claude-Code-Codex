# AI Learning Platform (Claude Code Focus)

Готовый проект для локального запуска: курсы, AI-чат, проверка кода, генератор проектов, прогресс пользователя.

## Что реализовано
- Next.js 15 (App Router) + TypeScript + Tailwind.
- JWT auth (email/password) + роли `ADMIN`/`USER`.
- Prisma + PostgreSQL схема: `User`, `Course`, `Module`, `Lesson`, `Progress`, `ChatHistory`, `GeneratedProject`.
- AI Agent в 3 слоях:
  - `ai/directives/*` — директивы/промпты,
  - `ai/orchestration/agent.ts` — выбор сценария и сбор контекста,
  - `ai/execution/claude-client.ts` — вызов Claude API с retry.
- Monaco Editor + AI code review.
- Project Generator: идея -> JSON с архитектурой, файлами и шагами.
- Базовый rate limit на API.

## Структура
```text
app/            # страницы и API routes
components/     # UI компоненты
lib/            # auth/env/rate-limit/helpers
api/            # handlers/services
db/             # prisma client
ai/             # directives/orchestration/execution
courses/        # каталог курсов
prisma/         # schema + seed
tests/          # vitest тесты
```

## Быстрый локальный запуск

### 1) Установить зависимости
```bash
npm install
```

### 2) Поднять PostgreSQL (Docker)
```bash
docker compose up -d
```

### 3) Настроить ENV
```bash
cp .env.example .env
```

### 4) Сгенерировать Prisma Client, миграции и сиды
```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

### 5) Запустить приложение
```bash
npm run dev
```

Открыть: `http://localhost:3000`

---

## Пример `.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_learning"
JWT_SECRET="replace-with-a-long-random-secret"
ANTHROPIC_API_KEY=""
APP_URL="http://localhost:3000"
```

> Если `ANTHROPIC_API_KEY` пустой, AI-эндпоинты вернут понятный fallback-ответ с инструкцией по настройке ключа.

## Основные API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/courses`
- `POST /api/lessons/:lessonId/complete`
- `POST /api/ai/chat`
- `POST /api/ai/review`
- `POST /api/projects/generate`

## Тесты
```bash
npm run test
```

## Как загрузить проект с компьютера (GitHub)

### 1) Установить Git (если не установлен)
- Windows: установить **Git for Windows**
- macOS: `xcode-select --install`
- Linux: через пакетный менеджер (`apt`, `dnf`, `pacman`)

### 2) Создать репозиторий на GitHub
1. Откройте GitHub -> **New repository**
2. Имя, например: `ai-learning-platform`
3. Нажмите **Create repository**

### 3) Отправить проект с локального компьютера в GitHub
В терминале в папке проекта:
```bash
git init
git add .
git commit -m "Initial commit: AI learning platform"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/ai-learning-platform.git
git push -u origin main
```

> Если репозиторий уже инициализирован, пропустите `git init`.

### 4) Проверить, что всё загрузилось
- Обновите страницу репозитория на GitHub.
- Должны быть видны папки: `app`, `api`, `ai`, `components`, `prisma` и т.д.

## Как загрузить проект на сервер (VPS)

### Вариант A: Docker Compose
На сервере:
```bash
git clone https://github.com/<YOUR_USERNAME>/ai-learning-platform.git
cd ai-learning-platform
cp .env.example .env
# отредактируйте .env

docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run build
npm run start
```

### Вариант B: PM2 (без Docker для Next.js процесса)
```bash
npm install -g pm2
npm install
npm run build
pm2 start npm --name ai-learning -- start
pm2 save
```
