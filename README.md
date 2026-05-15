# Future Minds Institute — Website

Official website for Future Minds Institute, powered by Women in Product India.

Visit: [futuremindsinstitute.com](https://futuremindsinstitute.com)

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: React 19 / JSX
- **Styling**: Tailwind CSS v4 + inline styles
- **Animations**: Framer Motion v12
- **Payments**: Razorpay
- **Auth**: JWT + OTP via custom API routes
- **Database**: MongoDB (Mongoose)

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0B0F1A` | Page background (dark navy) |
| Surface | `#111827` | Card and section backgrounds |
| Surface Up | `#1A2035` | Elevated cards |
| Accent Gold | `#D4AF37` | Primary accent, buttons, highlights |
| Warm White | `#F0EDE6` | Primary text |
| Secondary | `#6B7280` | Body text, descriptions |
| Muted | `#374151` | Labels, dividers |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Bricolage Grotesque | 800 |
| Body | Inter | 400 to 700 |

### UI Sections

- **Navbar** — Fixed top, logo left, nav links center, CTA right
- **Hero** — Word-by-word animated headline, floating right panel cards
- **About** — 2-column grid, heading + description, company strip
- **Metrics** — Animated counters with bar indicators
- **Courses** — API-fetched course cards with graceful error state
- **BentoFeatures** — 2-column bento grid with spring animations
- **Stories** — Testimonial marquee carousel
- **Educators** — Faculty grid with stats
- **B2BTraining** — Team workshop specs, facilitator card, CTA
- **Gallery** — 2-row infinite marquee with lightbox
- **Footer** — 3-column grid, social links, legal links

### Button Styles

- **Primary** — `background: #D4AF37`, `color: #0B0F1A`, border-radius 12px
- **Secondary** — Transparent, `border: 1px solid rgba(240,237,230,0.18)`

---

## Project Structure

```
app/
  (public)/           # Public-facing pages
    components/       # Landing page sections
    ai-mastery/       # Masterclass landing page
    course/[id]/      # Course detail page
    dashboard/        # User dashboard
  admin/              # Admin panel
  api/                # API routes (auth, courses, payments)
hooks/                # useUserAuth, useUserModal, usePaymentGateway
lib/                  # constants, db, api helpers
models/               # Mongoose models
public/assets/        # Images, logo
```

---

## Environment Variables

```
MONGODB_URI=
JWT_SECRET=
RAZ_KEY_ID=
RAZ_KEY_SECRET=
NEXT_PUBLIC_API_URL=
```

---

## Running Locally

```bash
npm install
npm run dev
```
