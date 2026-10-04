---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/DiscField.tsx","src/styles.css"]
---

# Access surface

Scope: the single PIN-gated access screen (entry, decrypting, admitted). Mode: Experience, mobile portrait first.

Audience and job: an invitee opens the shared link on a phone, enters the four-digit PIN, and is redirected to Spotify. Content: product name, prompt, four-slot PIN, denial feedback, decrypting status, admission line. Constraints: DESIGN.md palette and type fixed; SignalField removed; no busy HUD decoration, no literal CD/vinyl skeuomorph, no generic login form, no light ground before admission.

Source material: the project's own CD packaging in `context_files/cd-design` (disc face grooves, front-cover ring, glancing left-edge sheen).

## Direction contract

THESIS: The screen is the disc face. Concentric hairline grooves hold the PIN in the centre hole and every entered digit lights a groove band; it refuses the centred login stack with decorative background noise.

OWN-WORLD: Dead Air ground; ten Signal Ash hairline grooves with the packaging's left-edge sheen fading to the right; a heavier hole ring; tracked uppercase Hanken Grotesk knocked out of the grooves; Admission White only for YOU'RE IN.

STORY: The visitor recognises the disc, types the PIN into the hole, watches the disc light from the rim inward, spin up and read, collapse to black, and is admitted.

FIRST VIEWPORT: Disc of diameter min(165vw, 96svh) centred, bleeding past phone sides. Title on a knocked-out band above the hole; four slots centred in the hole; prompt on a knocked-out band below. Nothing else.

FORM: Disc Read, position 2 on the ordered list, seed key 32589e2d. Signature: digit-lit groove bands, then spin-up sheen and inward read sweep.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
