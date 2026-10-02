# SEO Notes for samirrain.com.np

_Last updated: 2026-10-02_

## Problems found

| # | Problem | Why it hurt |
|---|---------|-------------|
| 1 | `app/opengraph-image.jpg` / `twitter-image.jpg` was a **2252×4000 portrait photo (~300 KB)** but metadata claimed 1200×630 | Social/Google previews cropped it badly (or skipped it). Next.js file-based images also override the `images` in metadata config, so the `profile.jpeg` URLs in the code did nothing. |
| 2 | **No `image` in the Person JSON-LD** and no `ProfilePage` schema | Google had no machine-readable "this is Samir's photo" signal, so it picked thumbnails from other sources (e.g. the red "S" logo). |
| 3 | Favicon (`app/icon.png`, `app/favicon.ico`) was a generic server illustration | That is the small round icon next to `samirrain.com.np` in results. It isn't your brand. |
| 4 | Metadata duplicated in `layout.tsx` and `page.tsx`; projects page title rendered as `Samir Rain \| Projects \| Samir Rain Portfolio` | Duplicated/long titles get rewritten by Google. |
| 5 | **No canonical URLs** | Your content also exists on `samirrain.github.io` and `codewithsamir.github.io`, so duplicate-content signals were split. |
| 6 | Meta description came from the long DB `summary` | It got truncated in results. |
| 7 | `manifest.json` used the 4000px JPEG as a "192×192" icon | Wrong size declaration. PWA/Lighthouse warnings. |
| 8 | `<link rel="alternate">` to the GitHub Pages sites and `og:see_also` tags | These aren't valid signals (alternate without `hreflang`/type means nothing to Google). Replaced by `sameAs` in schema. |

## What I changed

### New images (generated from `public/profile.jpeg`)
- `app/opengraph-image.jpg` + `app/twitter-image.jpg`: **1200×630, 54 KB** card with your photo, name, role, stack, location and domain.
- `app/opengraph-image.alt.txt` + `app/twitter-image.alt.txt`: alt text for the share image.
- `public/samir-rain.jpg`: **800×800 square headshot**, used in schema, the sitemap and as the About photo fallback. The keyword-rich filename helps image search.
- `app/icon.png` (512), `app/favicon.ico` (96), `app/apple-icon.png` (180), `public/icon-192.png`, `public/icon-512.png`: all now show **your face** instead of the illustration.

### Code
- **`lib/site.ts`** (new): `SITE_URL`, `PROFILE_IMAGE`, `PROFILE_LINKS` in one place.
- **`app/layout.tsx`**: clean site-wide defaults. Title template is now `%s | Samir Rain`. Added `robots` with `max-image-preview: large` (allows big image previews in Search/Discover). Removed the bogus alternate/see_also tags and moved the JSON-LD to the home page.
- **`app/page.tsx`**:
  - Title: `Samir Rain | Full Stack Developer in Nepal` (43 chars).
  - Description: hand-written, about 155 chars, with name, location, experience and stack.
  - `canonical: /`, `og:type = profile`.
  - **JSON-LD `@graph`** with `WebSite`, `ProfilePage` and `Person`. `Person` includes `image` (your headshot), `jobTitle`, `address` (Janakpur, Madhesh, NP), `alumniOf` (Rajarshi Janak University), `knowsAbout`, `email` and `sameAs` (GitHub, LinkedIn, YouTube, socials from the DB, GitHub Pages sites). This is what Google uses to build the profile/knowledge panel.
- **`app/projects/page.tsx`, `app/blog/page.tsx`**: fixed duplicated titles, better descriptions, canonicals, and removed the broken `profile.jpeg` OG override.
- **`app/blog/[slug]/page.tsx`**: canonical, author, `publishedTime` / `modifiedTime`.
- **`app/privacy/page.tsx`**: canonical.
- **`app/sitemap.ts`**: image sitemap entry for your headshot on the home URL.
- **`app/_components/sections/About.tsx`**: descriptive alt text (`Samir Rain, Full Stack Developer from Janakpur, Nepal`) and fallback to the new square headshot.
- **`public/manifest.json`**: correct PNG icons and a description.

## What YOU need to do (in order)

### 1. Deploy, then validate (same day)
- [ ] Deploy to production.
- [ ] **Rich Results Test**: https://search.google.com/test/rich-results?url=https://samirrain.com.np. You should see **Profile page** detected with no errors.
- [ ] **Schema validator**: https://validator.schema.org/
- [ ] Check share previews: https://www.opengraph.xyz/ and the LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/), which also refreshes LinkedIn's cache.

### 2. Google Search Console (same day)
- [ ] URL Inspection → `https://samirrain.com.np/` → **Request indexing**.
- [ ] Do the same for `/projects` and `/blog`.
- [ ] Sitemaps → resubmit `https://samirrain.com.np/sitemap.xml`.
- Expect Google to update the snippet in **a few days to 3–4 weeks**. Favicons and thumbnails often take the longest.

### 3. Fix the red "S" thumbnail at the source
The card titled "Samir Rain" with the red **S** image comes from **another page about you**, not from this site (probably a YouTube channel, social profile or older site using an "S" logo). To get your face there:
- [ ] Set the **same headshot** (`public/samir-rain.jpg`) as the profile photo on **GitHub, LinkedIn, YouTube, X/Twitter and the GitHub Pages sites**. Consistency across profiles is the strongest signal for Google's entity/knowledge panel.
- [ ] If that red S is a site you control, add an `og:image` with your photo there too.

### 4. Old GitHub Pages portfolios (high impact)
`samirrain.github.io` ranks #2 with an **outdated description** ("web developer, graphic designer, mobile app developer… currently pursuing a Bachelor's degree"). Pick one:
- **Best:** replace those sites with a redirect to `https://samirrain.com.np` (on GitHub Pages: `<meta http-equiv="refresh" content="0; url=https://samirrain.com.np">` plus `<link rel="canonical" href="https://samirrain.com.np">`).
- **Or:** keep them but add `<link rel="canonical" href="https://samirrain.com.np/">` and update the text to match your current role.

### 5. Admin panel data
- [ ] In `/admin/personal`, if `profileImage` is a Cloudinary URL, make sure it's the **same photo**. The schema always points to `/samir-rain.jpg`.
- [ ] Make sure `socials.twitter` etc. are real URLs (they go into `sameAs`). Remove placeholders.
- [ ] Confirm `@samir_rain` is really your X handle. If not, change `creator` in `app/layout.tsx` and `app/page.tsx`.

### 6. Ongoing (this is what moves rankings)
- **Backlinks:** link to `samirrain.com.np` from your GitHub profile README, LinkedIn "Website" field, YouTube channel "Links" and every video description, plus dev.to, Medium and Hashnode bios.
- **Blog:** publish 2–4 posts a month targeting searches like "Next.js tutorial in Nepali", "Django vs Node.js", "how to become a web developer in Nepal". Each post is a new entry point and builds topical authority.
- **Google Business Profile:** if you take freelance clients, create one for "Samir Rain – Web Developer, Janakpur". It helps with local "web developer Janakpur" searches.
- **Core Web Vitals:** check PageSpeed Insights monthly. The hero uses heavy blur/animation, so watch LCP and INP on mobile.
- **Wikidata (optional, advanced):** a Wikidata entry for yourself, linked from `sameAs`, strongly helps knowledge-panel generation once you have some notability (e.g. press coverage or your 50k+ learner community).

## Notes
- `public/profile.jpeg` is still there (the About section and older links use it). You can delete it later if nothing references it.
- To regenerate images after changing your photo, crop a square headshot and replace `public/samir-rain.jpg`, the icons and the OG image with the same sizes as above.
