# Moataz Saleh: Portfolio + Admin CMS

React + Vite site. Supabase provides login, database and image storage. GitHub Pages hosts only the frontend.

**Important:** GitHub Pages cannot run a backend, so Supabase (free tier) is required. The admin lives at `/#/admin` (the `#` is what makes it work on GitHub Pages).

## 1. Install and run
1. Install Node.js 20 (nodejs.org).
2. In this folder: `npm install` then `npm run dev`. Open the address it prints.

## 2. Supabase setup
1. Create a free project at supabase.com.
2. SQL Editor > New query > paste all of `supabase/schema.sql` > Run. This creates the tables, security rules, the `images` bucket and placeholder data.
3. Authentication > Providers > Email: **turn OFF "Allow new users to sign up"** (after step 5). Any signed-in user is an admin, so nobody else may register.
4. Project Settings > API: copy the Project URL and the `anon public` key.
5. Authentication > Users > Add user > enter your email and password, tick auto-confirm. This is your admin account.

## 3. Environment variables
Copy `.env.example` to `.env` and paste the URL and anon key. Never use the `service_role` key here.

## 4. Log in
Open `http://localhost:5173/#/admin`, sign in with the account from step 2.5.

## 5. Everyday tasks (all in /admin)
- **Add a project:** Projects > Add new > fill the form, choose an image > Save. Tick Featured to pin it first.
- **Change profile picture:** Profile > Profile picture > choose file > Save.
- **Add a certificate / YouTube video:** Certificates or YouTube > Add new > Save. Use the video's thumbnail image.
- **Change social links:** Social Links. Use the platform names YouTube, GitHub, LinkedIn, Instagram, Facebook to get their icons.
- **Edit or delete:** use the buttons on each row. Delete asks for confirmation.
- Replace every item marked `[PLACEHOLDER]` or `[EXAMPLE]`.

## 6. Deploy to GitHub Pages
1. Create a GitHub repo and push this folder (`.env` is git-ignored).
2. Repo > Settings > Secrets and variables > Actions > add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Settings > Pages > Source: **GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.
5. Site: `https://USERNAME.github.io/REPO/`, admin: `.../#/admin`.

## 7. Update later
Content: use /admin, no deploy needed. Code changes: edit, then `git push`.

## Structure
`src/pages` public site, `src/admin` dashboard (edit `config.js` to change form fields), `src/services` database/auth/upload, `src/lib` Supabase client, `src/components` shared UI.
