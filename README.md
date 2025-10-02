# EzApt - Apartment Deals Aggregator

Find apartment move-in deals worth $1,000s that most renters miss.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file (already created):
```
ADMIN_PASSWORD=admin123
```

Change the password to something secure before deploying!

## Deployment to Vercel

### First Time Setup

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: EzApt MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ezapt.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: (leave default)
   - Add Environment Variables:
     - `ADMIN_PASSWORD`: your_secure_password
   - Click "Deploy"

3. **Verify deployment:**
   - Test all pages work
   - Test admin panel login
   - Test email signup
   - Check analytics in Vercel dashboard

### Updating After Changes

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically redeploy!

## Using the Application

### For Renters

1. Visit the homepage
2. Search for your city
3. Browse deals, filter and sort
4. Click "View Deal" to go to apartments.com
5. Sign up for email alerts

### Admin Panel

1. Navigate to `/admin`
2. Enter admin password (from ADMIN_PASSWORD env var)
3. Add deals using the form:
   - Fill in all required fields
   - Effective rent is auto-calculated
   - Deal appears immediately on site

### Adding Your First Deals

**Manual Entry Steps:**
1. Go to apartments.com
2. Search for a city (e.g., "San Francisco")
3. Filter for "Specials"
4. Find listings with "X weeks free" or "X months free"
5. Copy listing details to admin form:
   - Property name
   - Address, city, state, zip
   - Deal description (e.g., "8 weeks free")
   - Regular monthly rent
   - Number of bedrooms
   - Listing URL
   - Image URL (right-click property image, copy URL)
   - Expiration date (if listed)
6. Submit form
7. Deal appears on deals page immediately

**Goal:** Add 15-20 deals across 3-5 major cities to start

## Project Structure

```
ezapt/
├── app/
│   ├── layout.tsx          # Root layout with Analytics
│   ├── page.tsx            # Landing page
│   ├── deals/[city]/       # City deals page
│   ├── admin/              # Admin panel
│   ├── about/              # About page
│   └── api/                # API routes
├── components/             # React components
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── deals.ts           # Business logic
│   └── data/
│       └── deals.json     # Data storage
├── public/                # Static assets
└── projectplan.md         # Detailed implementation guide
```

## Key Features

- ✅ Search deals by city
- ✅ Filter by bedrooms and price range
- ✅ Sort by savings, rent, ending soon, newest
- ✅ Auto-calculate effective rent
- ✅ Email signup for alerts
- ✅ Admin panel for deal management
- ✅ Mobile responsive
- ✅ Vercel Analytics integration

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** JSON file (Phase 0) → PostgreSQL (Phase 1)
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics

## Next Steps After Validation

**100+ Email Signups = Build Automation:**
1. Migrate to PostgreSQL (Supabase)
2. Build scraper for apartments.com
3. Set up automated emails (Resend)
4. Schedule daily scraping via cron jobs

See `projectplan.md` for full roadmap.

## Troubleshooting

**Problem:** Admin panel won't accept password
- **Solution:** Check ADMIN_PASSWORD in Vercel environment variables

**Problem:** Images not loading
- **Solution:** Check next.config.js allows apartments.com domain

**Problem:** Analytics not showing
- **Solution:** Wait 24 hours for data to populate

**Problem:** Build fails on Vercel
- **Solution:** Check build logs, ensure all dependencies are listed in package.json

## Support

For detailed implementation guide, see [projectplan.md](./projectplan.md)

## License

MIT
