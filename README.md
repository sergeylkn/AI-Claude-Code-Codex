# Local-First AI Learning Platform (Phase 1)

Ниже — **подробная инструкция**, как запустить проект на обычном компьютере (Windows/macOS/Linux).

---

## 1) Что нужно установить заранее

### Обязательно
1. **Node.js 20+** (рекомендуется LTS)
2. **npm** (идёт вместе с Node.js)
3. **Git**

Проверка в терминале:
```bash
node -v
npm -v
git --version
```

### Опционально (для запуска через контейнеры)
4. **Docker Desktop** (Windows/macOS) или Docker Engine + Compose (Linux)

Проверка:
```bash
docker --version
docker compose version
```

---

## 2) Скачать проект на компьютер

### Вариант A: через Git clone
```bash
git clone https://github.com/<YOUR_USERNAME>/ai-learning-platform.git
cd ai-learning-platform
```

### Вариант B: ZIP архив
1. Скачать ZIP с GitHub.
2. Распаковать.
3. Открыть терминал в папке проекта.

---

## 3) Самый простой запуск (рекомендую)

> Поднимет и БД, и web-приложение. После этого просто открываете браузер.

```bash
docker compose up --build
```

Открыть в браузере:
- **http://localhost:3000**

Остановить:
```bash
Ctrl + C
```

Запустить в фоне:
```bash
docker compose up --build -d
```
Остановить фоновые контейнеры:
```bash
docker compose down
```

---

## 4) Ручной запуск (без web-контейнера)

### Шаг 1. Установить зависимости
```bash
npm install
```

### Шаг 2. Поднять PostgreSQL
```bash
docker compose up -d postgres
```

### Шаг 3. Создать `.env`
```bash
cp .env.example .env
```

Для Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

### Шаг 4. Применить Prisma миграции и сиды
```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

### Шаг 5. Запустить Next.js
```bash
npm run dev
```

Открыть:
- **http://localhost:3000**

---

## 5) Настройки `.env`

Минимально достаточно:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_learning"
JWT_SECRET="replace-with-a-long-random-secret"
ANTHROPIC_API_KEY=""
APP_URL="http://localhost:3000"
```

> В текущей версии можно работать без регистрации и без внешних AI API.

---

## 6) Частые проблемы и решения

### Проблема: порт 3000 занят
Запустить на другом порту:
```bash
npm run dev -- --port 3001
```
И открыть `http://localhost:3001`

### Проблема: порт 5432 занят
Изменить порт PostgreSQL в `docker-compose.yml`, например `5433:5432`, и обновить `DATABASE_URL`.

### Проблема: Prisma не может подключиться к БД
1. Проверить, что контейнер postgres запущен:
```bash
docker ps
```
2. Перезапустить:
```bash
docker compose down
docker compose up -d postgres
```
3. Повторить миграции.

### Проблема: npm install падает
- Проверьте интернет/прокси.
- Очистите кэш и повторите:
```bash
npm cache clean --force
npm install
```

---

## 7) Что готово в Phase 1
- Next.js App Router + TypeScript базовый проект.
- Tailwind CSS подключён.
- Layout: Sidebar + Main view.
- Базовая browser-first навигация.

## 8) Что дальше
- Phase 2: локальная система курсов из `/data/courses.json`.
- Phase 3+: локальный AI через Ollama, memory, RAG, self-check.
