# Getting Started with EzApt

## Your MVP is Ready! 🎉

The complete Phase 0 Manual MVP has been built. Here's what you need to do next:

## Step 1: Test Locally (Optional but Recommended)

```bash
# Start the development server
npm run dev
```

Visit http://localhost:3000 and test:
- Landing page loads
- Search functionality
- Email signup
- Admin panel (password: `admin123`)
- About page

## Step 2: Deploy to Vercel (Day 1 Priority!)

### A. Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: EzApt MVP"

# Create GitHub repo at github.com/new
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/ezapt.git
git branch -M main
git push -u origin main
```

### B. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `ezapt` repository
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
5. **Environment Variables** - Click "Add" and enter:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** `your_secure_password_here` (change from default!)
6. Click **Deploy**
7. Wait 2-3 minutes for deployment
8. Visit your live site!

## Step 3: Add Your First Deals

### Finding Deals on Apartments.com

1. Go to [apartments.com](https://www.apartments.com)
2. Search for a major city (e.g., "San Francisco, CA")
3. Click **"More Filters"** → Check **"Specials"**
4. Browse listings with badges like:
   - "8 Weeks Free"
   - "2 Months Free"
   - "Move-In Special"

### Adding Deals via Admin Panel

1. Go to `yourdomain.vercel.app/admin`
2. Enter your admin password
3. Fill out the deal form:
   - **Property Name:** Copy from listing title
   - **Address:** Full street address
   - **City, State, Zip:** Separate fields
   - **Deal Description:** e.g., "8 weeks free on 12-month lease"
   - **Regular Rent:** Monthly rent without the deal
   - **Bedrooms:** Number (0 for studio)
   - **Listing URL:** Full apartments.com URL
   - **Image URL:** Right-click on property image → "Copy Image Address"
   - **Deal Expires:** (optional) If mentioned in listing
4. Click "Add Deal"
5. Effective rent is calculated automatically!
6. Deal appears immediately on your deals page

### Quick Tips for Data Entry

- **Target Cities:** Start with 2-3 major metros (SF, NYC, LA, Austin, Seattle)
- **Goal:** 15-20 deals total to start
- **Quality over Quantity:** Focus on real, high-value deals
- **Verify:** Double-check deal details match the listing

## Step 4: Share and Validate

1. **Share with friends/family** in your target cities
2. **Post on social media** (Reddit r/apartments, Twitter, etc.)
3. **Track metrics:**
   - Email signups (target: 100+)
   - Deal clicks
   - Time on site
4. Check Vercel Analytics dashboard after 24 hours

## Success Metrics (Week 1-2)

- ✅ **100+ email signups** = Strong validation → Build automation
- ⚠️ **50-99 signups** = Moderate → Iterate on marketing/cities
- ❌ **<50 signups** = Reconsider or pivot

## What's Included

### Pages
- ✅ Landing page with hero, search, stats, email capture
- ✅ Dynamic deals pages by city (/deals/[city])
- ✅ Admin panel with deal management
- ✅ About page with FAQs

### Features
- ✅ Auto-calculated effective rent
- ✅ Filter by bedrooms, price range
- ✅ Sort by savings, rent, ending soon, newest
- ✅ Email signup with validation
- ✅ Mobile-responsive design
- ✅ Vercel Analytics integration

### Tech Stack
- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ JSON file storage (Phase 0)
- ✅ Vercel deployment ready

## Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Type checking
npx tsc --noEmit
```

## Important Files

- **`projectplan.md`** - Detailed implementation guide and roadmap
- **`README.md`** - Project overview and documentation
- **`.env.local`** - Local environment variables (not committed)
- **`lib/data/deals.json`** - Your deal storage (starts empty)

## Troubleshooting

### Issue: Admin password not working on Vercel
**Solution:** Check environment variables in Vercel dashboard → Settings → Environment Variables

### Issue: No deals showing up
**Solution:** Make sure you've added at least one deal via `/admin`

### Issue: Build errors
**Solution:** Run `npm run build` locally first to catch errors

### Issue: Images not loading
**Solution:** Verify image URLs are from apartments.com and accessible

## Next Steps After Validation

Once you hit **100+ email signups**, proceed to Phase 1:

1. Migrate to PostgreSQL (Supabase)
2. Build automated scraper
3. Set up email system (Resend)
4. Scale to more cities

Full details in `projectplan.md`

## Need Help?

- Check `projectplan.md` for detailed docs
- Review code comments
- Check Vercel deployment logs
- Test locally: `npm run dev`

## You're Ready! 🚀

Your MVP is production-ready. Deploy to Vercel today and start adding deals!

**Remember:** Deploy fast, validate demand, iterate based on feedback.

Good luck! 🏠
