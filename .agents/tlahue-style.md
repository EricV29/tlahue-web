# TLAHU-GIGA — Design System Reference

> **Vision:** Deep night over the Mezquital Valley — Cosmic calm meets Hidalguense heritage.

**Theme:** Dark (Institutional & Sophisticated)

## Overview

TLAHU-GIGA is a fusion of the high-precision "Giga" aesthetic with the cultural identity of Tlahuelilpan, Hidalgo. It prioritizes vast dark surfaces, elegant typography (Montserrat 300), and focused, luminous highlights in Cantera Gold and Mezquite Green.

## Colors

| Name               | Hex                      | Role                               | Inspiration         |
| ------------------ | ------------------------ | ---------------------------------- | ------------------- |
| **Obsidian Deep**  | `#050a09`                | Primary page background            | Night in the valley |
| **Cantera Gold**   | `#BC955C`                | Primary Action / CTA / Highlights  | Parish stone work   |
| **Mezquite Green** | `#235B4E`                | Secondary Accents / Borders / Tags | Regional flora      |
| **Barro Red**      | `#9F2241`                | Critical Alerts / Urgent Actions   | Traditional dyes    |
| **Ghost White**    | `#F8F9FA`                | Primary Body Text                  | Cleanliness         |
| **Steel Gray**     | `#808080`                | Tertiary text, subtle borders      | Concrete & stone    |
| **Nebula Green**   | `rgba(35, 91, 78, 0.05)` | Card backgrounds / Overlays        | Atmospheric depth   |

## Typography

### Montserrat (Display & Headlines)

- **Use:** Hero titles and section headers.
- **Style:** Understated sophistication.
- **Weights:** 300 (Primary), 500 (Emphasis).
- **Letter Spacing:** -0.0300em (Crucial for the "Giga" look).

### Inter (UI & Body)

- **Use:** Primary UI text, body copy, and secondary headlines.
- **Weights:** 400, 500.
- **Sizes:** 12px (UI), 14px (Body), 16px (Emphasis).

### Geist Mono (Technical)

- **Use:** Metadata, dates, and technical labels.
- **Weights:** 400.
- **Letter Spacing:** 0.0090em.

## Spacing & Layout

- **Density:** Compact / Elegant.
- **Section Gap:** 48px.
- **Element Gap:** 10px.
- **Max Width:** Centered content model (1280px).

## Components (Tailwind Implementation)

### 1. The Giga Navbar

- **Classes:** `sticky top-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/5`
- **Link Style:** `text-white/60 hover:text-tlahue-gold transition-all font-sans text-xs uppercase tracking-widest`

### 2. Primary Pill Button (Cantera)

- **Style:** Filled, bold presence.
- **Classes:** `bg-tlahue-gold text-obsidian px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform`

### 3. Ghost Pill Button (Secondary)

- **Style:** Transparent with subtle border.
- **Classes:** `bg-white/5 text-white border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition-all`

### 4. Standard Tlahue Card

- **Style:** Subtle transparency, no harsh borders.
- **Classes:** `bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm shadow-2xl`

## Imagery & Hero

- **Concept:** Full-bleed, wide-angle photography of Tlahuelilpan landmarks (Parroquia, Reloj, Cerro).
- **Treatment:** Dark moody overlay with a bottom gradient fade to `#050a09`.
- **Text:** Centered headline stack using Montserrat 300.

## Do's and Don'ts

- **Do:** Use negative letter-spacing on large headlines.
- **Do:** Use 1000px border-radius for all buttons (Pill-shape is mandatory).
- **Don't:** Use harsh white borders; prefer `white/10` transparency.
- **Don't:** Use bold weights for large titles; the light weight is the signature.
  Ñ
