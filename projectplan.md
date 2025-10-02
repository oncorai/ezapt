# EzApt - Apartment Deals Aggregator
## Project Plan & Implementation Guide

## Executive Summary

EzApt is a web application that aggregates apartment move-in deals (e.g., "8 weeks free," "2 months free rent") from apartments.com to help renters discover special offers they might otherwise miss.

**Critical Approach:**
- Deploy to Vercel on Day 1 (avoid environment issues)
- Start with manual data entry (15-20 deals) to validate demand
- Build scraping automation only after validation succeeds

**Success Criteria (Week 1-2):**
- 100+ email signups = Strong validation → Build automation
- 50-99 signups = Moderate → Iterate
- <50 signups = Pivot or stop

---

## Tech Stack

- **Frontend:** Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Data Storage:** JSON file (initial) → PostgreSQL/Supabase (post-validation)
- **Hosting:** Vercel (with cron jobs)
- **Analytics:** Vercel Analytics
- **Email:** Resend (Phase 1, post-validation)

---

## Phase 0: Manual MVP (Current Phase)

### Day 1 Setup ✓

**Project Structure:**
```
ezapt/
├── app/
│   ├── layout.tsx          # Root layout with Analytics
│   ├── globals.css         # Tailwind styles
│   ├── page.tsx            # Landing page
│   ├── deals/
│   │   └── [city]/
│   │       └── page.tsx    # City deals page
│   ├── admin/
│   │   └── page.tsx        # Admin panel
│   ├── about/
│   │   └── page.tsx        # About page
│   └── api/
│       ├── deals/
│       │   └── route.ts    # Deal CRUD operations
│       └── emails/
│           └── route.ts    # Email signup handling
├── components/
│   ├── DealCard.tsx        # Deal display component
│   ├── SearchBar.tsx       # City search
│   ├── EmailCapture.tsx    # Email signup form
│   ├── FilterSort.tsx      # Filter/sort controls
│   └── AdminDealForm.tsx   # Deal management form
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── deals.ts            # Deal helper functions
│   └── data/
│       └── deals.json      # Data storage
├── public/                 # Static assets
├── .env.local              # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

**Environment Variables (.env.local):**
```
ADMIN_PASSWORD=your_secure_password_here
```

**Vercel Environment Variables:**
```
ADMIN_PASSWORD=your_secure_password_here
```

---

### Data Structure

**TypeScript Interfaces (`lib/types.ts`):**
```typescript
export interface Deal {
  id: string;
  property_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  deal_description: string;
  regular_rent: number;
  effective_rent: number;
  bedrooms: number;
  listing_url: string;
  image_url: string;
  found_at: string;
  deal_expires_at?: string;
  is_active: boolean;
}

export interface EmailSignup {
  email: string;
  city: string;
  subscribed_at: string;
}

export interface DataStore {
  deals: Deal[];
  emails: EmailSignup[];
}
```

**JSON Data File (`lib/data/deals.json`):**
```json
{
  "deals": [],
  "emails": []
}
```

---

### Core Features

#### 1. Landing Page (`/`)

**Sections:**
- Hero with compelling headline
- Search bar (city input)
- Stats (X deals found, average savings)
- Email capture form (top and bottom)
- "How It Works" (3 steps)
- Trust indicators
- Clean, modern design with Tailwind

**Key Elements:**
- Mobile-responsive
- Clear call-to-action
- Simple, uncluttered layout

#### 2. Deals Page (`/deals/[city]`)

**Features:**
- Dynamic city-based routing
- Sort options: Biggest Savings, Lowest Rent, Ending Soon, Newest
- Filters: Bedrooms, Price Range
- Deal cards in grid layout

**Deal Card Display:**
```
[Property Image]
🏷️ "8 WEEKS FREE" (bright badge)
Property Name
Address
Regular: $2,000/month (strikethrough)
Your Price: $1,667/month
💰 Save $4,000 total
🛏️ 2 Bedrooms | ⏰ Deal ends: Dec 31
[View Deal Button] → apartments.com
```

**Calculations:**
- Effective rent automatically calculated
- Total savings displayed
- Click tracking for analytics

#### 3. Admin Panel (`/admin`)

**Authentication:**
- Simple password protection (env var check)
- No user accounts needed for MVP

**Features:**
- Form to add new deals
- List view of all deals
- Edit/delete functionality
- Auto-calculation of effective rent
- CSV import option
- Basic stats dashboard

**Form Fields:**
- Property name, address, city, state, zip
- Deal description
- Regular monthly rent
- Bedrooms
- Listing URL
- Image URL
- Deal expiration date (optional)

#### 4. About Page (`/about`)

**Content:**
- What are move-in specials?
- Why developers offer them
- How to use the site
- Disclaimer: "Verify deals with property directly"
- FAQ section

---

### Helper Functions

**Effective Rent Calculation (`lib/deals.ts`):**
```typescript
export function calculateEffectiveRent(
  regularRent: number,
  dealDescription: string,
  leaseTerm: number = 12
): number {
  // Parse "X weeks free" or "X months free"
  const weeksMatch = dealDescription.match(/(\d+)\s+weeks?\s+free/i);
  const monthsMatch = dealDescription.match(/(\d+)\s+months?\s+free/i);

  let freeMonths = 0;
  if (weeksMatch) freeMonths = parseInt(weeksMatch[1]) / 4;
  else if (monthsMatch) freeMonths = parseInt(monthsMatch[1]);

  const totalPaid = regularRent * (leaseTerm - freeMonths);
  return Math.round(totalPaid / leaseTerm);
}

export function calculateSavings(
  regularRent: number,
  effectiveRent: number,
  leaseTerm: number = 12
) {
  return {
    monthlySavings: regularRent - effectiveRent,
    totalSavings: (regularRent - effectiveRent) * leaseTerm,
    percentageSavings: Math.round(((regularRent - effectiveRent) / regularRent) * 100)
  };
}
```

**CRUD Operations:**
- `getDeals()` - Retrieve all deals or filter by city
- `addDeal()` - Add new deal to JSON
- `updateDeal()` - Update existing deal
- `deleteDeal()` - Remove deal
- `addEmail()` - Store email signup

---

### Analytics & Tracking

**Metrics to Track:**
- Email signups (conversion rate target: >3%)
- Deal clicks (CTR target: >5%)
- Filter/sort usage
- Popular cities
- Time on site

**Implementation:**
- Vercel Analytics (already integrated in layout)
- Custom event tracking for key actions

---

## Deployment Guide

### Initial Deployment to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit: EzApt MVP"
git remote add origin https://github.com/yourusername/ezapt.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: (leave default)
   - Add Environment Variables:
     - `ADMIN_PASSWORD`: your_secure_password
   - Click "Deploy"

3. **Verify Deployment:**
   - Test all pages work correctly
   - Verify admin panel password protection
   - Test email signup functionality
   - Check analytics are tracking

### Development Workflow

**Local Development:**
```bash
npm run dev
```
- Opens at http://localhost:3000
- Hot reload enabled
- Test all features locally first

**Feature Branch Workflow:**
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```
- Push to GitHub → triggers Vercel preview deployment
- Test on preview URL
- Merge to main when ready

**Production Updates:**
```bash
git checkout main
git merge feature/new-feature
git push origin main
```
- Auto-deploys to production

---

## Manual Data Entry Guide

### Adding Deals via Admin Panel

1. Navigate to `/admin`
2. Enter admin password (from ADMIN_PASSWORD env var)
3. Fill out the deal form:
   - **Property Name:** Copy from apartments.com listing
   - **Address:** Full street address
   - **City, State, Zip:** Separate fields
   - **Deal Description:** e.g., "8 weeks free on 12-month lease"
   - **Regular Rent:** Monthly rent without deal
   - **Bedrooms:** Number of bedrooms
   - **Listing URL:** Full apartments.com URL
   - **Image URL:** Right-click image on apartments.com, copy image URL
   - **Deal Expires:** (optional) If specified in listing
4. Click "Add Deal"
5. Effective rent is auto-calculated
6. Deal appears immediately on deals page

### Finding Deals to Add

**Search Strategy:**
1. Go to apartments.com
2. Search for your target city
3. Use filters:
   - Price range
   - Bedrooms
   - Check "Specials" checkbox
4. Look for listings with badges like:
   - "X Weeks Free"
   - "X Months Free"
   - "Move-in Special"
5. Open listing, verify deal details
6. Copy information to admin panel

**Target Cities for MVP:**
- Major metros: NYC, SF, LA, Chicago, Austin, Seattle, Boston
- Start with 2-3 deals per city
- Total: 15-20 deals minimum

---

## Testing Checklist

### Before Deploying

- [ ] All pages render without errors
- [ ] Landing page search redirects to `/deals/[city]`
- [ ] Email signup stores data correctly
- [ ] Admin panel password protection works
- [ ] Admin panel can add/edit/delete deals
- [ ] Deal cards display all information correctly
- [ ] Effective rent calculation is accurate
- [ ] Filters and sorting work properly
- [ ] Mobile responsive on all pages
- [ ] Links to apartments.com work
- [ ] Analytics tracking (check Vercel dashboard after deployment)

### Post-Deployment

- [ ] Visit production URL
- [ ] Test all critical paths on mobile device
- [ ] Submit test email signup
- [ ] Add test deal via admin panel
- [ ] Verify deal appears on deals page
- [ ] Check Vercel Analytics dashboard
- [ ] Test from different browsers (Chrome, Safari, Firefox)

---

## Phase 1: Automation (Post-Validation)

**Trigger: 100+ Email Signups**

### Database Migration

1. **Set up Supabase:**
   - Create project
   - Install Prisma
   - Define schema
   - Migrate data from JSON

2. **Prisma Schema:**
```prisma
model Deal {
  id                String    @id @default(uuid())
  property_name     String
  address           String
  city              String
  state             String
  zip               String
  deal_description  String
  regular_rent      Int
  effective_rent    Int
  bedrooms          Int
  listing_url       String
  image_url         String
  found_at          DateTime  @default(now())
  deal_expires_at   DateTime?
  is_active         Boolean   @default(true)
  created_at        DateTime  @default(now())
  updated_at        DateTime  @updatedAt
}

model EmailSignup {
  id              String   @id @default(uuid())
  email           String   @unique
  city            String?
  subscribed_at   DateTime @default(now())
}

model DealClick {
  id         String   @id @default(uuid())
  deal_id    String
  clicked_at DateTime @default(now())
  deal       Deal     @relation(fields: [deal_id], references: [id])
}
```

### Scraper Implementation

**Technology:**
- Puppeteer for web scraping
- Respect robots.txt
- Add delays between requests
- Run daily via Vercel cron jobs

**Scraper Flow:**
1. Navigate to apartments.com
2. Search target cities
3. Filter for specials
4. Extract deal information
5. Parse deal text
6. Calculate effective rent
7. Store in database
8. Quality control checks

**Cron Job Setup (vercel.json):**
```json
{
  "crons": [{
    "path": "/api/scrape",
    "schedule": "0 3 * * *"
  }]
}
```

### Email System

**Provider:** Resend

**Email Types:**
1. **Daily Digest:** New deals in subscribed cities
2. **Weekly Roundup:** Best deals of the week
3. **Expiring Soon:** Deals ending within 7 days

**Implementation:**
- Install Resend SDK
- Create email templates
- Set up automated sending
- Unsubscribe functionality

---

## Legal & Ethical Considerations

### Framing
- Position as "search engine" for deals
- Drive traffic back to apartments.com
- Provide value by aggregating scattered information

### Attribution
- Always link back to original apartments.com listings
- Don't copy descriptions or images
- Just link to external sources

### Scraping
- Gray area legally
- Be prepared to pivot if needed
- Have "submit a deal" feature as backup
- Respect robots.txt
- Add delays between requests

### Disclaimers
- "Verify all deals directly with property"
- "Deals subject to change"
- "We are not affiliated with apartments.com"

---

## Success Metrics & KPIs

### Week 1-2 (Validation Phase)

**Primary Metric:** Email Signups
- 100+ = Strong validation
- 50-99 = Moderate validation
- <50 = Pivot or stop

**Secondary Metrics:**
- Email signup conversion rate (target: >3%)
- Deal click-through rate (target: >5%)
- Time on site (target: >2 minutes)
- Bounce rate (target: <60%)

### Post-Validation

**Growth Metrics:**
- Daily active users
- Email list growth rate
- Deals added per week
- Cities covered
- Apartment clicks (referral value)

**Engagement Metrics:**
- Email open rates (target: >20%)
- Email click rates (target: >3%)
- Return visitor rate
- Shares/referrals

---

## Troubleshooting

### Common Issues

**Issue:** Admin panel won't accept password
- **Solution:** Check ADMIN_PASSWORD in Vercel environment variables
- Redeploy after changing env vars

**Issue:** Images not loading
- **Solution:** Verify Next.js config allows apartments.com domain
- Check image URLs are valid

**Issue:** Deal calculations incorrect
- **Solution:** Verify deal description format matches regex
- Check calculateEffectiveRent() logic

**Issue:** JSON file not updating
- **Solution:** Check file write permissions
- Ensure API routes are working
- Check Vercel logs for errors

**Issue:** Analytics not tracking
- **Solution:** Verify @vercel/analytics is installed
- Check Analytics component in layout.tsx
- Wait 24 hours for data to appear

---

## Next Steps After Validation

1. **Immediate (100+ signups):**
   - Migrate to PostgreSQL/Supabase
   - Build scraper for automation
   - Set up email system with Resend

2. **Short-term (1-2 months):**
   - Expand to top 20 metro areas
   - Add more deal sources (Zillow, Rent.com)
   - Implement user accounts (save searches, alerts)
   - Mobile app (React Native/Flutter)

3. **Long-term (3-6 months):**
   - Affiliate partnerships with apartments.com
   - Premium features (early access, advanced alerts)
   - API for third-party integrations
   - Expand to other deal types (senior housing, student housing)

---

## Resources & Links

- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Documentation:** https://vercel.com/docs
- **Apartments.com:** https://www.apartments.com
- **Vercel Analytics:** https://vercel.com/docs/analytics

---

## Support & Questions

For issues or questions:
1. Check Vercel deployment logs
2. Review Next.js error messages
3. Test locally first: `npm run dev`
4. Check environment variables are set correctly
5. Verify all dependencies are installed: `npm install`

---

**Last Updated:** 2025-10-01
**Version:** 1.0 (Phase 0 - Manual MVP)
