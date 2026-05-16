# OUT OF OFFICE Asset Folder

Put generated game art files here.

Recommended structure:

```text
assets/
  logo/
    out-of-office-logo.webp
  personas/
    intern-prodigy-lv1.webp
    spreadsheet-adept-lv2.webp
    meeting-mage-lv3.webp
    director-of-chaos-lv4.webp
    out-of-office-ascended-lv5.webp
  bosses/
    hr-gatekeeper.webp
    cfo-of-doom.webp
    ceo-final-form.webp
  cards/
    reply-all-disaster.webp
    budget-cuts.webp
    mandatory-overtime.webp
    mental-health-day.webp
    vacation-approved.webp
    work-from-home.webp
    promotion-opportunity.webp
    executive-visibility.webp
    linkedin-thought-leader.webp
    quiet-quit-ritual.webp
  ui/
    confidential-pack.webp
    draw-pile-back.webp
    discard-pile-back.webp
    combo-banner.webp
```

Use lowercase file names with hyphens. Prefer `.webp` for the web app because it loads fast.

After images are uploaded, update `src/app.js` card/persona/boss records with an `img` path such as:

```js
img: './assets/cards/reply-all-disaster.webp'
```

Then update the rendering so the art panel uses:

```html
<img src="./assets/cards/reply-all-disaster.webp" alt="Reply All Disaster">
```

Target sizes:
- Card art: 800x600 or 1024x768
- Persona art: 1200x900
- Boss art: 1400x700
- UI pack/card backs: 800x600
