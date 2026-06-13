# Task 2: DeepSeek V4 API Integration and Data Contract

## Goal
Connect the basic UI to DeepSeek latest V4 models and establish a strict request/response contract so the app can reliably receive structured meal-planning data.

## Product Constraints for This Task
- Continue as a single Vite app.
- No auth, no user accounts, no token refresh flows.
- Keep integration lightweight and quick.
- Focus on reliable structured output, not UI polish.

## Scope
- Define API service responsibility in the app architecture.
- Build request payload mapping from form state to model input.
- Implement prompt strategy that enforces structured JSON-only response.
- Integrate DeepSeek V4 model invocation.
- Add client-side handling for:
  - Loading state
  - API failure state
  - Invalid schema response fallback

## Required Response Structure
The response contract must align with the blueprint expectations:
- Meals list with meal type, dish name, and INR cost.
- Grocery list grouped by aisle categories.
- Smart swaps list with reason and INR savings.
- Final total cost in INR.

## Prompting and Guardrails
- Position model as Indian meal planning and budget assistant.
- Inject user selections (diet, proteins, budget, custom note) clearly.
- Instruct model to return strict JSON only.
- Explicitly reject conversational filler in output.
- Add response validation strategy before data reaches UI mapping.

## Functional Requirements
- User submits form and gets an API-generated structured response.
- App clearly indicates generation in progress.
- Errors are understandable and non-technical for end users.
- Failed or malformed responses do not crash the app.

## Data Handling Requirements
- Parse AI response safely.
- Validate key fields before setting app-level dashboard data.
- Preserve raw response diagnostics for debugging (internal use only).

## Deliverables
- DeepSeek V4 API call flow connected to form submission.
- Stable JSON parsing and schema validation layer.
- Standardized error and loading states.
- Dashboard data object ready for UI mapping in Task 3.

## Acceptance Criteria
- Submitting valid input returns parsed structured data in app state.
- Invalid model responses are handled gracefully.
- No authentication dependencies introduced.
- Data contract is stable enough for dashboard rendering work.

## Out of Scope
- Full dashboard UI mapping and rendering.
- Swap application logic.
- Local storage save/load.
- Final visual improvements.
