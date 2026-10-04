# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Selected invitees opening a shared access link to reach a private playlist.

## Product Purpose

AUDITORY INTERFERENCE creates an exclusive reveal for a private Spotify playlist. Success means an invited person can enter the shared four-digit PIN and reach the playlist through a deliberate access moment.

## Positioning

The product makes playlist access feel invitation-only by turning a simple redirect into a PIN-gated reveal.

## Operating Context

An invitee opens the web link, enters a four-digit access PIN, and is redirected to Spotify after successful entry. Returning visitors who already received access are redirected without repeating the entry flow.

## Capabilities and Constraints

- Keep access based on a four-digit numeric PIN.
- Keep Spotify as the destination.
- Do not fabricate testimonials, metrics, public claims, or other proof.
- The current client-side PIN is an experiential gate, not secure authentication.

## Brand Commitments

- Preserve the name `AUDITORY INTERFERENCE`.

## Evidence on Hand

- A working PIN-entry and redirect flow exists in `src/`.
- The configured Spotify playlist URL exists in `src/config.ts`.
- No testimonials, metrics, case studies, press, or public claims are available.

## Product Principles

- Make access feel intentionally limited to invited people.
- Keep the path from PIN entry to playlist short and clear.
- Preserve the reveal as part of the product experience.
- Never imply security stronger than the client-side gate provides.
