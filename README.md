# Full Stack Next.js Project

A full-stack web application built with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- React Hook Form
- Zod
- Prisma
- PostgreSQL
- Docker
- Swagger / OpenAPI

---

# 🇬🇧 English Setup Guide

This guide assumes that the computer is completely clean and none of the required development tools are installed.

The instructions work for both:

- Windows
- macOS

---

# 1. Requirements

Before starting the project, you need to install:

1. Git
2. Node.js
3. npm
4. Docker Desktop

The project uses Docker to run PostgreSQL.

You do NOT need to install PostgreSQL directly on Windows or macOS.

---

# 2. Install Git

## Windows

Download and install Git from:

https://git-scm.com/download/win

After installation, open PowerShell and run:

```bash
git --version
```

## macOS

Open Terminal and check:

```bash
git --version
```

If Git is not installed, macOS may ask you to install Apple's Command Line Tools.

---

# 3. Install Node.js

Download Node.js LTS from:

https://nodejs.org/

After installation:

```bash
node -v
npm -v
```

---

# 4. Install Docker Desktop

Download Docker Desktop:

https://www.docker.com/products/docker-desktop/

Start Docker Desktop after installation.

Verify:

```bash
docker --version
docker compose version
```

---

# 5. Clone the Project

Open Terminal or PowerShell.

```bash
git clone <YOUR_REPOSITORY_URL>
```

Enter the project:

```bash
cd full-stack-nextjs16
```

---

# 6. Install Project Dependencies

```bash
npm install
```

This installs all dependencies from `package.json`.

---

# 7. Environment Variables

Create a file named:

```text
.env
```

in the project root.

Add:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myPersonalProject?schema=public"
```

IMPORTANT:

Never commit `.env` to Git.

---

# 8. Environment Example

Create or keep:

```text
.env.example
```

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myPersonalProject?schema=public"
```

`.env.example` can be committed to Git.

---

# 9. Start PostgreSQL with Docker

Make sure Docker Desktop is running.

From the project root:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

---

# 10. Docker Logs

View PostgreSQL logs:

```bash
docker compose logs postgres
```

Follow logs:

```bash
docker compose logs -f postgres
```

Stop following logs with:

```text
Ctrl + C
```

---

# 11. Stop Docker

Stop containers:

```bash
docker compose down
```

Stop containers and remove volumes:

```bash
docker compose down -v
```

WARNING:

`docker compose down -v` can delete PostgreSQL data stored in Docker volumes.

---

# 12. Prisma

Prisma is the ORM used by this project.

Prisma connects Next.js to PostgreSQL.

Schema:

```text
prisma/schema.prisma
```

Migrations:

```text
prisma/migrations/
```

---

# 13. Generate Prisma Client

```bash
npx prisma generate
```

---

# 14. Run Prisma Migrations

After PostgreSQL is running:

```bash
npx prisma migrate dev
```

This applies existing migrations to the database.

---

# 15. Create a New Migration

After modifying:

```text
prisma/schema.prisma
```

create a migration:

```bash
npx prisma migrate dev --name describe_your_change
```

Example:

```bash
npx prisma migrate dev --name add_user
```

---

# 16. Check Migration Status

```bash
npx prisma migrate status
```

---

# 17. Prisma Studio

Open Prisma Studio:

```bash
npx prisma studio
```

---

# 18. Reset Development Database

WARNING:

This deletes development database data.

```bash
npx prisma migrate reset
```

Only use this during development.

Never use this command on a production database.

---

# 19. Start Next.js Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 20. Complete First-Time Setup

For a completely new computer:

## Step 1 - Install Git

```bash
git --version
```

## Step 2 - Install Node.js

```bash
node -v
npm -v
```

## Step 3 - Install Docker Desktop

```bash
docker --version
docker compose version
```

## Step 4 - Clone the project

```bash
git clone <YOUR_REPOSITORY_URL>
```

## Step 5 - Enter the project

```bash
cd full-stack-nextjs16
```

## Step 6 - Install dependencies

```bash
npm install
```

## Step 7 - Create `.env`

Create:

```text
.env
```

Add:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myPersonalProject?schema=public"
```

## Step 8 - Start PostgreSQL

```bash
docker compose up -d
```

## Step 9 - Generate Prisma Client

```bash
npx prisma generate
```

## Step 10 - Run migrations

```bash
npx prisma migrate dev
```

## Step 11 - Start Next.js

```bash
npm run dev
```

## Step 12 - Open the application

```text
http://localhost:3000
```

---

# 21. Swagger

Swagger is available only during development.

Open:

```text
http://localhost:3000/swagger
```

Swagger is disabled in production.

In production:

```text
/swagger
```

returns a 404 page.

---

# 22. Production Build

Create a production build:

```bash
npm run build
```

Start production:

```bash
npm start
```

---

# 23. Daily Development

After the project has already been configured:

```bash
docker compose up -d
```

Then:

```bash
npm run dev
```

If Prisma schema changes:

```bash
npx prisma migrate dev --name your_migration_name
```

---

# 24. Troubleshooting

## Database connection error

If you see:

```text
P1001: Can't reach database server
```

Check Docker:

```bash
docker ps
```

If PostgreSQL is not running:

```bash
docker compose up -d
```

Check PostgreSQL logs:

```bash
docker compose logs postgres
```

---

## DATABASE_URL error

If you see:

```text
Environment variable not found: DATABASE_URL
```

Make sure `.env` exists in the project root:

```text
full-stack-nextjs16/
├── .env
├── package.json
├── prisma/
├── src/
└── app/
```

And contains:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myPersonalProject?schema=public"
```

---

## Prisma Client error

If you see an error such as:

```text
Property 'session' does not exist on type 'PrismaClient'
```

Run:

```bash
npx prisma generate
```

If the schema changed:

```bash
npx prisma migrate dev
```

Then restart Next.js:

```bash
npm run dev
```

---

# 25. Database Architecture

The project uses:

```text
Next.js
    |
    v
Prisma
    |
    v
PostgreSQL
    |
    v
Docker
```

PostgreSQL runs inside Docker.

Prisma communicates with PostgreSQL.

Next.js communicates with Prisma.

---

# 26. Git Rules

The following should NOT be committed:

```text
node_modules/
.next/
.env
.env.local
```

The following SHOULD be committed:

```text
prisma/schema.prisma
prisma/migrations/
package.json
package-lock.json
.env.example
docker-compose.yml
README.md
```

IMPORTANT:

Never add this to `.gitignore`:

```text
prisma/migrations/
```

Prisma migration files must be committed to Git.

---

# 27. New Computer Checklist

- [ ] Install Git
- [ ] Install Node.js LTS
- [ ] Install Docker Desktop
- [ ] Start Docker Desktop
- [ ] Clone repository
- [ ] Enter project directory
- [ ] Run `npm install`
- [ ] Create `.env`
- [ ] Add `DATABASE_URL`
- [ ] Run `docker compose up -d`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev`
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000`
- [ ] Check Swagger at `http://localhost:3000/swagger`

---

# 🇮🇷 راهنمای فارسی نصب و اجرای پروژه

این قسمت فرض می‌کند سیستم کاملاً خام است و هیچ‌کدام از ابزارهای موردنیاز نصب نیستند.

---

# 1. پیش‌نیازها

ابتدا باید این موارد نصب شوند:

1. Git
2. Node.js
3. npm
4. Docker Desktop

PostgreSQL را مستقیماً روی سیستم نصب نمی‌کنیم.

PostgreSQL داخل Docker اجرا می‌شود.

---

# 2. نصب Git

## Windows

Git را از سایت زیر دانلود و نصب کنید:

https://git-scm.com/download/win

بعد از نصب PowerShell را باز کنید:

```powershell
git --version
```

---

## macOS

Terminal را باز کنید:

```bash
git --version
```

اگر Git نصب نباشد، macOS پیشنهاد نصب Command Line Tools را می‌دهد.

---

# 3. نصب Node.js

از سایت زیر Node.js LTS را دانلود و نصب کنید:

https://nodejs.org/

بعد بررسی کنید:

```bash
node -v
npm -v
```

---

# 4. نصب Docker Desktop

Docker Desktop را از سایت زیر دانلود کنید:

https://www.docker.com/products/docker-desktop/

بعد از نصب Docker Desktop را اجرا کنید.

بررسی:

```bash
docker --version
docker compose version
```

---

# 5. دریافت پروژه

مثلاً وارد Desktop شوید:

```bash
cd Desktop
```

سپس:

```bash
git clone <YOUR_REPOSITORY_URL>
```

وارد پروژه شوید:

```bash
cd full-stack-nextjs16
```

---

# 6. نصب پکیج‌ها

```bash
npm install
```

---

# 7. ساخت `.env`

در root پروژه فایل زیر را بسازید:

```text
.env
```

داخل آن:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myPersonalProject?schema=public"
```

این فایل نباید وارد Git شود.

---

# 8. اجرای PostgreSQL

Docker Desktop باید روشن باشد.

در root پروژه:

```bash
docker compose up -d
```

بررسی:

```bash
docker ps
```

---

# 9. راه‌اندازی Prisma

ابتدا:

```bash
npx prisma generate
```

سپس:

```bash
npx prisma migrate dev
```

---

# 10. بررسی Migration

```bash
npx prisma migrate status
```

---

# 11. Prisma Studio

```bash
npx prisma studio
```

---

# 12. اجرای پروژه

```bash
npm run dev
```

سپس:

```text
http://localhost:3000
```

---

# 13. Swagger

Swagger فقط در Development فعال است:

```text
http://localhost:3000/swagger
```

در Production مسیر `/swagger` به 404 می‌رود.

---

# 14. تغییر Schema

اگر فایل زیر را تغییر دادید:

```text
prisma/schema.prisma
```

migration بسازید:

```bash
npx prisma migrate dev --name describe_your_change
```

مثلاً:

```bash
npx prisma migrate dev --name add_session
```

---

# 15. اگر Prisma خطا داد

ابتدا:

```bash
npx prisma generate
```

سپس:

```bash
npx prisma migrate status
```

و در صورت نیاز:

```bash
npx prisma migrate dev
```

بعد Next.js را restart کنید:

```bash
npm run dev
```

---

# 16. اگر Database پیدا نشد

اگر خطای زیر را دیدید:

```text
P1001: Can't reach database server
```

Docker را بررسی کنید:

```bash
docker ps
```

اگر PostgreSQL اجرا نیست:

```bash
docker compose up -d
```

سپس:

```bash
docker compose logs postgres
```

---

# 17. اگر DATABASE_URL پیدا نشد

مطمئن شوید `.env` در root پروژه قرار دارد:

```text
full-stack-nextjs16/
├── .env
├── package.json
├── prisma/
├── src/
└── app/
```

و شامل این مقدار است:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myPersonalProject?schema=public"
```

---

# 18. ریست دیتابیس Development

WARNING:

این دستور اطلاعات دیتابیس Development را حذف می‌کند:

```bash
npx prisma migrate reset
```

فقط در Development استفاده شود.

---

# 19. اجرای Production

ساخت Build:

```bash
npm run build
```

اجرای Production:

```bash
npm start
```

---

# 20. اجرای روزانه

بعد از نصب کامل پروژه:

```bash
docker compose up -d
```

سپس:

```bash
npm run dev
```

اگر Schema تغییر کرد:

```bash
npx prisma migrate dev --name migration_name
```

---

# 21. معماری Database

```text
Next.js
    |
    v
Prisma
    |
    v
PostgreSQL
    |
    v
Docker
```

PostgreSQL داخل Docker اجرا می‌شود.

Prisma با PostgreSQL ارتباط برقرار می‌کند.

Next.js از Prisma برای ارتباط با دیتابیس استفاده می‌کند.

---

# 22. قوانین Git

این موارد نباید Commit شوند:

```text
node_modules/
.next/
.env
.env.local
```

این موارد باید Commit شوند:

```text
prisma/schema.prisma
prisma/migrations/
package.json
package-lock.json
.env.example
docker-compose.yml
README.md
```

IMPORTANT:

این را هرگز داخل `.gitignore` قرار ندهید:

```text
prisma/migrations/
```

Migrationهای Prisma باید داخل Git باشند.

---

# 23. چک‌لیست سیستم جدید

- [ ] نصب Git
- [ ] نصب Node.js LTS
- [ ] نصب Docker Desktop
- [ ] اجرای Docker Desktop
- [ ] Clone پروژه
- [ ] ورود به پوشه پروژه
- [ ] اجرای `npm install`
- [ ] ساخت `.env`
- [ ] قرار دادن `DATABASE_URL`
- [ ] اجرای `docker compose up -d`
- [ ] اجرای `npx prisma generate`
- [ ] اجرای `npx prisma migrate dev`
- [ ] اجرای `npm run dev`
- [ ] باز کردن `http://localhost:3000`
- [ ] بررسی Swagger در `http://localhost:3000/swagger`
