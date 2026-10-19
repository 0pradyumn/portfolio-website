# Personal Portfolio Website — Pradyumn Singh

Full-stack portfolio: **HTML/CSS/JS** frontend, **Node.js + Express** backend, **MongoDB** database.
Content (profile, skills, projects) is served from the database via REST APIs; the contact form is
validated on the server, stored in MongoDB and emailed via Nodemailer.

## Architecture (MVC)

```
portfolio-website/
├── server.js              # App entry point
├── config/db.js           # MongoDB connection
├── models/                # Mongoose models (Profile, Project, Skill, Contact)
├── controllers/           # Request handlers
├── routes/                # REST API routes
├── middleware/            # Error handling
├── utils/sendEmail.js     # Nodemailer integration
├── seed/seed.js           # Seeds DB with resume data
└── public/                # Mobile-first static frontend (HTML/CSS/JS)
```

## APIs

| Method | Endpoint          | Description                                   |
|--------|-------------------|-----------------------------------------------|
| GET    | /api/portfolio    | Full page payload (profile + projects + skills)|
| GET    | /api/profile      | Profile only                                  |
| GET    | /api/projects     | Projects list                                 |
| GET    | /api/skills       | Skills list                                   |
| POST   | /api/contact      | Contact form (validated, stored, emailed)     |
| GET    | /api/health       | Health check                                  |

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env       # then edit values (Mongo URI + SMTP credentials)

# 3. Start MongoDB locally, or use a free MongoDB Atlas cluster

# 4. Seed the database with resume data
npm run seed

# 5. Start the server
npm run dev                # http://localhost:5000
```

### Email setup (Gmail)
1. Enable 2-Step Verification on your Google account.
2. Create an **App Password** (Google Account → Security → App passwords).
3. Put it in `.env` as `SMTP_PASS` (not your normal Gmail password).

## Deploy to production

1. Push the repo to GitHub (see "GitHub" section below).
2. Create a free **MongoDB Atlas** cluster → Database → Connect → Drivers → Node.js → copy the URI.
3. Deploy the app on **Render** (New → Web Service → connect your GitHub repo):
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables from `.env` (use the Atlas URI for `MONGO_URI`).
4. After first deploy, run the seed once: Render → Shell → `node seed/seed.js`
   (or temporarily set `npm run seed` as the start command, run once, then revert).
5. Your portfolio is live at `https://your-app.onrender.com`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: full-stack portfolio"
git branch -M main
git remote add origin https://github.com/0pradyumn/portfolio-website.git
git push -u origin main
```

> Never commit `.env` — it is already in `.gitignore`.
