# Project memory

## Product intent & audience

- Website for **Saena**, an educational/training organization.
- Public-facing marketing site showcasing learning pathways, facilities, projects, approach, and accreditations/qualifications.
- Audience likely includes prospective learners, trainees, and partners seeking information about programs and facilities.

## Brand personality & voice

- Professional, aspirational, and polished tone suitable for a production-ready education/training site.
- Emphasis on trust signals: accreditation wording, "Why Choose Saena" points, and featured project outcomes.

## Visual design & UX direction

- Multi-section homepage: five learning pathways (card grid), swipeable facilities carousel, "Our Approach" stages, three featured project cards, "Why Choose Saena" section.
- Project cards use real photos where available; neutral placeholders used elsewhere.
- Facilities carousel uses placeholder images pending final assets.
- Responsive layouts: isolate homepage-specific grid rules (e.g. `.five-card` or scoped class) from shared qualification grids so Training page layout is unaffected.
- Shared elements across pages: navigation, footer, and common styling components.
- Tech: Vite + React (JSX), Tailwind CSS, Lucide React icons, `@/` path alias for `src/`.

## Decisions, constraints & rationale

- Only one real project image (planting) currently available in the project folder; remaining project and facility images are placeholders.
- Homepage layout scoped via dedicated classes to avoid collateral changes to the Training page's shared qualification grid.
- Type checking and build verification run after changes; missing icon imports caught and fixed.
- Other pages (e.g. Training), navigation, footer, and shared styles intentionally left unchanged in this round.

## Open questions & assumptions

- Final facility and remaining project images still needed to replace placeholders.
- Exact pathway titles, project details, and accreditation copy should be confirmed for accuracy.
- It is assumed the five-pathway homepage layout and Training page qualification grid use shared base classes and must remain independently styled.
- Content for "Our Approach" stages and "Why Choose Saena" points may need review for final wording.