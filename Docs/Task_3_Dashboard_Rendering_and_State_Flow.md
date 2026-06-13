# Task 3: Dashboard Rendering and State Flow

## Goal
Map validated DeepSeek V4 response data into a usable dashboard so users can view meal plans, groceries, swaps, and total cost immediately after generation.

## Product Constraints for This Task
- Keep everything inside the same single Vite app.
- Continue without authentication.
- Build simple and fast with practical UI structure.
- Tailwind-based styling should stay minimal and readable.

## Scope
- Build dashboard sections and connect them to live app state:
  - Meal itinerary (Breakfast, Lunch, Dinner)
  - Grocery manifest grouped by category
  - Smart swaps panel
  - Total cost summary
- Ensure empty, loading, and error states are visually clear.
- Keep display logic deterministic and easy to maintain.

## Functional Requirements
- After successful generation, all major response sections are visible.
- Meal items show dish names and estimated INR costs.
- Grocery categories are grouped and readable.
- Swap recommendations show original ingredient, replacement, rationale, and savings.
- Total cost reflects the response payload.

## UX Requirements
- Strong visual hierarchy between inputs and output dashboard.
- Clear section headers and predictable spacing.
- Readable mobile-first layout with desktop enhancement.
- Keep interactions basic; no advanced polish yet.

## State and Data Flow Requirements
- Move parsed API result into parent/global dashboard state.
- Pass data into presentational sections cleanly.
- Avoid duplicate or conflicting sources of truth.
- Ensure refresh/regenerate updates dashboard safely.

## Error and Edge Handling
- If any optional section is missing, remaining sections should still render.
- If costs are partially missing, show graceful placeholders.
- Handle empty arrays without broken layouts.

## Deliverables
- Fully wired dashboard screen driven by live API response data.
- Structured section components for meals, groceries, swaps, and total.
- Stable state flow from input submission to rendered output.

## Acceptance Criteria
- A valid API response is rendered end-to-end in dashboard UI.
- Section-level rendering is stable with partial data.
- App remains fast and understandable without visual clutter.
- Structure is ready for interactivity and polish in Task 4.

## Out of Scope
- Applying swaps to mutate grocery and total cost values.
- Local storage persistence.
- High-fidelity visual design pass.
