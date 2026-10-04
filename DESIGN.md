---
name: Auditory Interference
description: A clinical black-box transmission interface for invitation-only playlist access.
colors:
  dead-air: "#0b0b0c"
  blackout: "#000000"
  signal-ash: "#a6a6a0"
  focused-signal: "#c2c2bb"
  admission-white: "#ffffff"
typography:
  title:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.34em"
  label:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.32em"
  numeric:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  status:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.42em"
rounded:
  none: "0px"
spacing:
  viewport-inset: "24px"
  disc-band-padding: "6px 6px 6px 10px"
components:
  access-label:
    textColor: "{colors.signal-ash}"
    typography: "{typography.label}"
  pin-field:
    backgroundColor: "{colors.dead-air}"
    textColor: "{colors.signal-ash}"
    typography: "{typography.numeric}"
    rounded: "{rounded.none}"
    size: "168px × 44px"
  pin-field-focus:
    backgroundColor: "{colors.dead-air}"
    textColor: "{colors.focused-signal}"
    typography: "{typography.numeric}"
    rounded: "{rounded.none}"
  admission-status:
    backgroundColor: "{colors.blackout}"
    textColor: "{colors.admission-white}"
    typography: "{typography.status}"
---

# Design System: Auditory Interference

## Overview

**Creative North Star: "The Black-Box Transmission"**

Auditory Interference behaves like a sealed diagnostic instrument receiving an unknown signal. Its world is clinical, technical, and restrained: almost-black space, low-contrast telemetry, exact typography, and interference that escalates only in response to input.

The access surface is the disc face itself—concentric hairline grooves, a centre hole for the sequence, and typography knocked out of the field. The interface avoids decorative software conventions: no bright accents, rounded cards, or glossy UI chrome. Identity comes from the disc read ritual, sparse uppercase type, and a controlled transition from muted Signal Ash through spin and collapse to absolute Blackout and Admission White.

**Key Characteristics:**
- Near-monochrome palette with deliberately narrow contrast.
- Small uppercase Hanken Grotesk with extreme tracking.
- Flat, borderless controls shaped by spacing rather than containers.
- Ten concentric groove rings with a left-to-right Signal Ash sheen; digit entry lights bands from the rim inward.
- Motion tied to access phases: intensity rotation, decrypt spin-up and read sweep, peak jitter, collapse, then admission.

## Colors

Palette resembles an inactive display waking into a clear signal: near-black space, restrained warm gray telemetry, and white reserved for successful admission.

### Primary
- **Signal Ash** (`#a6a6a0`): Default copy, groove strokes (including the disc sheen gradient stops), PIN characters, and decrypting status.
- **Focused Signal** (`#c2c2bb`): Input-focus lift on slots and prompt hover; denial and decrypting status copy.

### Neutral
- **Dead Air** (`#0b0b0c`): Default stage background and knocked-out text band fill.
- **Blackout** (`#000000`): Decoding tail, collapse, and admitted-state field.
- **Admission White** (`#ffffff`): Successful-access message only.

### Named Rules

**The Narrow Spectrum Rule.** Keep the experience achromatic; state is communicated through contrast, opacity, movement, and timing rather than hue.

**The White Means Admitted Rule.** Full white belongs to the final success message. Earlier states remain in Signal Ash or Focused Signal.

**The Disc Sheen Rule.** The only directional luminance gradient is the groove stroke sheen (Signal Ash, full to ~14% opacity left to right). Do not extend that treatment to buttons, cards, or the stage background.

## Typography

**Display Font:** Hanken Grotesk (with sans-serif fallback)  
**Body Font:** Hanken Grotesk (with sans-serif fallback)

**Character:** A single grotesk family makes the interface feel calibrated and impersonal. Hierarchy comes from tracking, weight, and tiny size shifts rather than contrasting typefaces.

### Hierarchy
- **Title** (500, `12px`, `1.4`, `0.34em`): Product name on the upper knocked-out band; uppercase and centered.
- **Label** (400, `11px`, `1.4`, `0.32em`): Access prompt; uppercase and centered.
- **Numeric** (400, `18px`, `1`, tabular numerals): Four-slot access sequence in the centre hole.
- **Status** (500, `13px`, `1.5`, `0.42em`): `DECRYPTING...` and final admission message.

### Named Rules

**The Tracked Transmission Rule.** Interface language is uppercase and widely tracked; never replace it with conventional sentence-case product copy.

**The Weight Ceiling Rule.** Use only weights 400 and 500. Density comes from spacing and contrast, not bold type.

## Layout

The interface occupies one fixed, overflow-hidden stage (`100svh`) centered with a grid. Safe-area insets pad the viewport on all sides.

The disc is absolutely centered and sized with `--disc: max(min(165vw, 96svh), 460px)`, so on phones it bleeds past the sides while staying legible on larger viewports. Foreground copy lives on two horizontal knocked-out bands (`Dead Air` fill, max width `calc(100vw - 48px)`): the title at `20%` from the top of the disc, the prompt and denial at `80%`. The four-slot PIN sits in the geometric centre hole (`168px × 44px`). During decrypting, the hole shows status copy instead of the PIN. After collapse, the disc is hidden and admission copy centers on Blackout.

Responsive behavior is intrinsic: viewport units, safe-area environment values, and `min()`/`max()` on disc diameter preserve one composition from phones to desktops.

### Named Rules

**The Disc Owns the Frame Rule.** The disc face is the primary layout; typography and PIN align to the hole and knocked-out bands, not a separate centered card stack.

## Elevation & Depth

The system is flat. It uses no box shadows, raised surfaces, or layered cards. Depth comes from groove opacity, the stroke sheen gradient, disc rotation, band lighting, and phase-driven motion against the dark field.

### Named Rules

**The Flat Signal Rule.** Never use shadow to create hierarchy. Change opacity, luminance, rotation, or motion intensity instead.

## Shapes

Geometry is circular at the atmospheric layer (concentric grooves, centre hole) and rectilinear in type and controls. Corners remain square (`0px` radius); the PIN has no visible box. Knocked-out rectangular bands interrupt the groove field for readable uppercase lines.

**The No Vessel Rule.** Do not wrap content in cards, pills, panels, or outlined input cells.

## Components

Components feel instrument-precise and restrained. Most are visually absent until content or disc activity gives them form.

### Disc Field
- **Structure:** Full-disc SVG with ten hairline concentric circles; innermost ring is the hole (`groove-hole`, heavier stroke `1.6`, higher resting opacity).
- **Sheen:** Groove strokes use a horizontal linear gradient of Signal Ash (`100%` → `60%` → `14%` opacity left to right).
- **Intensity:** Each entered digit (1–3) rotates the disc (`30°`, `60°`, `90°`) and raises opacity on groove bands mapped rim-inward (`data-band` 1–3).
- **Focus:** When focus is inside the disc, the hole ring reaches full opacity—serving as the focus indicator.
- **Decrypting:** `decoding` phase runs spin-up (`800ms`) and an inward read sweep (per-groove opacity pulse, staggered by index); `peak` adds continuous spin, faster read, and subtle disc skip jitter.
- **Collapse:** `black` phase scales the disc to `0.3` and fades it out over `600ms` while the stage background becomes Blackout.
- **Accessibility:** Decorative SVG is `aria-hidden` and non-interactive.

### Access Label (Prompt)
- **Shape:** No container; lives on the lower knocked-out band.
- **Color:** Signal Ash; hover lifts to Focused Signal.
- **Typography:** Uppercase label role with wide tracking.
- **Behavior:** Labels the PIN input; denial alert sits below on the same band.

### PIN Field
- **Shape:** Borderless, square, transparent (`168px × 44px`) in the centre hole.
- **Layout:** Four equal columns with centered tabular numerals.
- **Default:** Missing digits appear as underscores in Signal Ash.
- **Focus:** All slots lift to Focused Signal; hole ring brightens via disc `:focus-within`.
- **Error:** The disc cluster performs a short horizontal denial shift; hole ring flares then settles; `ACCESS DENIED` appears in Focused Signal.

### Admission Status
- **Style:** Admission White status typography on Blackout, with a one-shot letter-spacing settle animation.
- **Behavior:** Appears after collapse, then yields to the Spotify redirect.

## Do's and Don'ts

### Do:
- **Do** preserve the near-monochrome Dead Air, Signal Ash, and Admission White hierarchy.
- **Do** tie disc motion and groove lighting to digit count and explicit phases (`entry`, `decoding`, `peak`, `black`, `admitted`).
- **Do** use the hole ring and knocked-out bands for focus and legibility on the groove field.
- **Do** provide a reduced-motion path that disables animations and uses shorter phase timings while preserving sequence and feedback.
- **Do** keep decrypting and admission copy in Focused Signal until Admission White on success.

### Don't:
- **Don't** introduce bright hue accents, glossy UI materials, or ornamental glow outside the disc groove language.
- **Don't** add rounded cards, pills, boxed PIN slots, or conventional form chrome.
- **Don't** use full white before successful admission.
- **Don't** add shadows or fake physical elevation.
- **Don't** resurrect full-viewport waveform, scan-line, or bar-decryption decoration—the disc grooves carry atmospheric instrumentation.
- **Don't** turn the signal language into a literal green-screen retro terminal.
