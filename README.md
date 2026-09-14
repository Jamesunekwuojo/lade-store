# LADÉ EMPIRE — "I OWN THE CROWN"
### Luxury Haute Modest Couture & African Heritage

> **Fashion in IR** — Promoting Godly heritage, royal dignity, and African cultural pride. Tailored primarily as magnificent haute modest couture for **women**, featuring an exclusive limited-edition capsule of ceremonial attire and accessories for **men**.

---

## 🏛️ Tech Stack & Architecture

- **Framework**: Next.js (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 + Custom HSL Design Tokens & Dark Mode
- **Database & ORM**: PostgreSQL (Vercel Postgres / Neon DB) with Prisma ORM
- **Authentication**: NextAuth.js (Auth.js v5) with Credentials Provider & JWT Sessions
- **Media & Image Storage**: Vercel Blob Storage (`@vercel/blob`) with local base64 fallback
- **Ambient Soundscape**: Web Audio & HTML5 Audio with automatic first-visit smooth fade-in/fade-out

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Jamesunekwuojo/lade-store.git
cd lade-store
npm install
```

### 2. Environment Variables Configuration

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Ensure the following variables are configured in `.env`:

```env
# PostgreSQL Database Connection URL (from Vercel Postgres / Neon)
DATABASE_URL="postgres://username:password@your-postgres-host:5432/postgres?sslmode=require"

# Auth.js Secret (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secure-random-auth-secret"
NEXTAUTH_SECRET="your-secure-random-auth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Initial Admin Credentials (used by npm run admin:create)
ADMIN_SEED_EMAIL="admin@ladeempire.com"
ADMIN_SEED_PASSWORD="YourSecurePassword2026!"
ADMIN_SEED_NAME="LADÉ EMPIRE Admin"

# Vercel Blob Token (optional locally, auto-injected on Vercel deployment)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

---

## 💾 Database Setup & Seeding Commands

### Step 1: Sync Schema to PostgreSQL Database
Creates or updates the `AdminUser` and `Product` tables in your PostgreSQL database:

```bash
npm run db:push
```

### Step 2: Create Initial Admin User
Generates your initial private admin login credentials in the database:

```bash
npm run admin:create
```

* **Default Email**: `admin@ladeempire.com` *(or configured `ADMIN_SEED_EMAIL`)*
* **Default Password**: `LadeEmpire2026!` *(or configured `ADMIN_SEED_PASSWORD`)*

### Step 3: Seed Initial Product Catalog (Optional)
Populates the database with initial modest couture collections (Abayas, Occasion Wear, Boubous, and Men's Limited Edition Capsule):

```bash
npm run db:seed
```

---

## 🛠️ Summary of All Database Commands

| Command | Purpose |
| :--- | :--- |
| `npm run db:push` | Synchronizes Prisma schema directly with the PostgreSQL database (creates all tables). |
| `npm run admin:create` | Creates or updates the administrator user in the `AdminUser` table. |
| `npm run db:seed` | Seeds initial products (Women's Couture & Men's Capsule) into the `Product` table. |
| `npx prisma studio` | Opens Prisma Studio (a visual web UI at `http://localhost:5555`) to view and edit database rows. |
| `npx prisma generate` | Regenerates the Prisma Client TypeScript types. |

---

## 🔐 Admin Portal & Management

1. **Login Route**: [`/admin/login`](http://localhost:3000/admin/login)
2. **Dashboard Overview**: [`/admin`](http://localhost:3000/admin) — Filter by category, toggle Active/Inactive visibility, reorder items, view prices in ₦ NGN, and delete garments.
3. **New Garment Creation**: [`/admin/products/new`](http://localhost:3000/admin/products/new) — Drag-and-drop high-resolution images, set category, fabric note, price, and status.
4. **Edit Existing Products**: [`/admin/products/[id]/edit`](http://localhost:3000/admin/products/1/edit) — Real-time updates with immediate reflection on the public storefront.

---

## ☁️ Setting Up Vercel Blob Storage on Vercel

When deploying to Vercel:
1. Go to your project dashboard on [Vercel](https://vercel.com).
2. Click the **Storage** tab.
3. Click **Create Database / Storage** $\rightarrow$ select **Blob** $\rightarrow$ click **Continue**.
4. Name your store (e.g. `lade-empire-blob`) and click **Create**.
5. Vercel will automatically connect the store and inject `BLOB_READ_WRITE_TOKEN` into your production deployment.

---

## 🎵 Customizing the Ambient Soundscape

The website includes a floating **Atmosphere** sound controller with smooth 2.2s fade-in and 1.2s fade-out:
- To use your own custom music, drop any MP3 file into:
  ```
  public/audio/ambient.mp3
  ```
- The player will automatically load and loop your track with smooth volume transitions.

---

## 🚢 Production Build & Deployment

To verify and build locally:

```bash
npm run build
npm run start
```

Deploying to **Vercel** is seamless — push your code to your GitHub repository and link it to Vercel with your environment variables configured.
