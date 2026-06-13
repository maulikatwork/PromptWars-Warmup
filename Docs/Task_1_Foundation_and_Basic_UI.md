# Task 1: Foundation Setup and Basic UI

## Goal
Set up a single-page application foundation using Vite and Tailwind CSS, then deliver a clean, basic first version of the input experience without advanced polish.

## Product Constraints for This Task
- Single app only (no multi-app or micro-frontend structure).
- No authentication flow.
- API-driven architecture (backend intelligence comes from DeepSeek V4 calls).
- Keep implementation simple and quick.
- UI should be functional first; visual refinement comes later.

## Scope
- Initialize the Vite project structure for a fast front-end workflow.
- Configure Tailwind CSS for utility-first styling.
- Define the top-level app layout for a single-page flow:
  - Input section
  - Placeholder results section
- Build static, basic UI for all core input controls:
  - Dietary baseline selector
  - Dynamic protein options area (initial visual placeholder and behavior plan)
  - Budget tier selector
  - Free-text contextual override input
- Set up initial component and folder organization for future tasks.

## Functional Requirements
- User can view and interact with all input controls in one screen.
- Input controls are clearly labeled and understandable.
- Page is usable on desktop and mobile widths.
- Submit action is visible and clearly connected to plan generation.

## UX Requirements (Basic Only)
- Prioritize clarity and readability.
- Use simple spacing, typography, and section grouping.
- Avoid heavy animations and advanced design patterns for now.
- Ensure form controls are touch-friendly and legible.

## Data and State Planning
- Define form data shape for:
  - Diet type
  - Selected proteins
  - Budget tier
  - Custom request text
- Keep state local and simple at this stage.
- Prepare state handoff path to API integration in Task 2.

## Deliverables
- Working Vite + Tailwind app shell.
- Basic input module UI fully visible and interactive.
- Clear section placeholders for future dashboard outputs.
- Documented component responsibilities for next tasks.

## Acceptance Criteria
- App runs as a single-page Vite application.
- Tailwind styles are applied consistently across the basic UI.
- All intended input fields are present and usable.
- Structure is ready for API call wiring in the next task.

## Out of Scope
- DeepSeek API calls.
- JSON response parsing.
- Grocery/meal dashboard rendering from live data.
- Local storage persistence.
- Final visual polish.
