# LinkedIn Daily Connection Tracker

This project lets you track and report the daily changes in your (or any selected) LinkedIn connections via CSV uploads, using cloud storage (Supabase) and daily e-mail reports (SendGrid). Production-grade, deployable to Vercel.

## Features

- Upload CSV files containing your connections multiple times a day (public API, no login required).
- CSV columns: `name,email,title,phone` (email used as unique key).
- Daily at 09:00 (Istanbul time), a report is generated: newly added and removed connections.
- The report is e-mailed to you as a CSV attachment (via SendGrid).
- Cloud storage (Supabase) used for file storage.
- All code is modular, scalable, and ready for production.

## Setup

### 1. Clone & Install

```sh
git clone <your-repo-url>
cd linkedin-daily-connection-tracker
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in:

- `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_TO_EMAIL`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET`
- `TZ=Europe/Istanbul`

### 3. Supabase Setup

- Create a [Supabase](https://supabase.com/) project.
- Create a storage bucket (e.g. `connections-bucket`).
- Get your project URL and service role key.

### 4. SendGrid Setup

- Create a [SendGrid](https://sendgrid.com/) account.
- Generate an API key.
- Add sender and recipient e-mails.

### 5. Deploy to Vercel

- Deploy the repo to [Vercel](https://vercel.com/).
- Ensure your environment variables are set on Vercel.

### 6. Usage

- **Upload connections:**  
  Send a POST request to `/api/upload-connections` with your CSV file (field name: `csv`).
  - Example: with curl:
    ```sh
    curl -F 'csv=@/path/to/your.csv' https://your-vercel-app.vercel.app/api/upload-connections
    ```
- **Daily report:**  
  You'll get an e-mail every day at 09:00 (Europe/Istanbul) listing added and removed connections.

---

#### For any issues, contact the developer or create a GitHub issue.

