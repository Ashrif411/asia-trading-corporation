# Asia Trading Corporation Website

A static, responsive, premium company portfolio website for an international RMG sourcing and merchandising company.

## Files

- `index.html` - website structure and content
- `style.css` - full visual design and responsiveness
- `script.js` - menu, animations, counters, FAQ, dark mode, and form feedback
- `assets/favicon.svg` - favicon placeholder
- `assets/logo-placeholder.svg` - editable logo placeholder
- `.nojekyll` - helps GitHub Pages serve static files directly

## Replace before publishing

1. Replace `assets/logo-placeholder.svg` with your real company logo.
2. Replace phone numbers: `+880 1XXX-XXXXXX` and WhatsApp link `https://wa.me/8801XXXXXXXXX`.
3. Replace email: `info@asiatradingcorporation.com`.
4. Replace office address in Contact, Footer, and JSON-LD script.
5. Replace stock image URLs with your real product, factory, team, and shipment photos.
6. Replace testimonial names and team member details.
7. Replace `YOUR_FORM_ID` in the contact form action with a real Formspree endpoint, or connect EmailJS/another static form service.
8. Update the GitHub Pages URL in the JSON-LD block.

## Change branding colors

Open `style.css` and edit these variables inside `:root`:

```css
--primary: #0b1f3a;
--primary-dark: #06111f;
--secondary: #111827;
--accent: #d6b25e;
--bg: #ffffff;
--bg-alt: #f5f7fb;
```

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to repository `Settings` > `Pages`.
4. Under Build and deployment, choose `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Save and wait for GitHub Pages to publish.
