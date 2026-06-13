# PROJECT BLUEPRINT
## AI-Powered Indian Meal Planner & Grocery Tracker

This document serves as the structural and conceptual foundation for the AI Meal Planner micro-app. It is designed to be injected directly into LLM prompts as context for generating functional UI components, handling state logic, and structuring API payloads without hardcoding specific technical implementations.

### Project Objective
Build a lightweight, zero-auth, highly contextual web application that generates personalized daily Indian meal plans, dynamic grocery checklists, and intelligent budget-saving ingredient swaps. The focus is on frictionless UX and culturally relevant outputs.

### 1. User Experience (UX) Flow & Architecture
The application follows a single-page, progressive disclosure model, moving the user from simple inputs to a comprehensive, interactive dashboard.

**Module A: The Input Engine**
* **Dietary Baseline:** A primary selection determining the base restriction (Vegetarian, Eggitarian, Non-Vegetarian).
* **Dynamic Protein Matrix:** A context-aware checklist that populates based on the dietary baseline. For example, selecting 'Vegetarian' reveals Paneer, Tofu, Soya, and Lentils; selecting 'Non-Vegetarian' expands to include Chicken, Mutton, Fish, etc.
* **Contextual Override:** A free-text input field allowing users to provide highly specific requests (e.g., "I have a cold, keep it light," "craving Maharashtrian food," "avoid spicy").
* **Budget Tier:** A discrete selection (Low, Medium, High) that acts as the primary constraint for the AI's generation logic.

**Module B: The Interactive Dashboard**
* **Meal Itinerary:** A timeline-style presentation of Breakfast, Lunch, and Dinner. Crucially, each item must display an estimated local cost in INR to reinforce the budget constraint.
* **Categorized Grocery Manifest:** A functional checklist separated logically by supermarket aisles (Produce, Dairy/Meat, Dry Pantry). Interactions here (checking off items) are ephemeral UI states.
* **Smart Swap Mechanics:** A dedicated UI panel proposing at least one contextual ingredient substitution. It must display the original item, the replacement, the culinary rationale, and the net savings in INR.

### 2. System Integration & Data Contract
The core intelligence of the app relies on enforcing a strict data contract with the underlying LLM (DeepSeek V4 Pro / Claude Haiku). The application acts purely as a UI layer mapping over a guaranteed JSON payload.

**The Prompting Strategy**
The system prompt must position the LLM as an expert Indian culinary and budgeting assistant. It must be instructed to utilize the provided user inputs (Diet, Proteins, Budget, Custom Text) to formulate a realistic, culturally accurate menu. The LLM must be explicitly forbidden from outputting conversational filler and restricted to a strict JSON structure.

**Required JSON Output Schema Structure**
The AI response must perfectly mirror this conceptual structure to ensure seamless UI mapping:
* `meals` (Array of Objects): `[type (String), dish (String), cost (Number)]`
* `groceries` (Object categorized by Aisles):
  * `Produce`: `[item (String), cost (Number)]`
  * `Dairy/Meat`: `[item (String), cost (Number)]`
  * `Pantry`: `[item (String), cost (Number)]`
* `swaps` (Array of Objects): `[originalIngredient (String), swapIngredient (String), reason (String), savings (Number)]`
* `totalCost` (Number)

### 3. Application State & Lifecycle

| State Type | Management Strategy | Description |
| :--- | :--- | :--- |
| **Form State** | Local Component State | Manages the active selections before the user submits the request to the AI. |
| **Dashboard Data** | Global / Parent State | Holds the parsed JSON response from the LLM, passing it down to the UI components. |
| **Swap Execution** | Client-Side Mutator | Applying a swap does not trigger a new API call. It executes a local array find-and-replace, updating the grocery list and subtracting from the total cost instantly. |
| **Persistence** | Browser LocalStorage | The current Dashboard Data can be stringified and saved to local memory, allowing users to reload previous meal plans upon returning to the site. |

### 4. Phased Development Roadmap
For a rapid build execution, the project is divided into four distinct phases:
* **Phase 1: Component Scaffolding.** Building the static UI for the Input Engine and defining the state variables for the form.
* **Phase 2: The LLM Bridge.** Setting up the API fetch function, defining the system prompt template, and ensuring the response is strictly formatted to the required schema.
* **Phase 3: Data Mapping.** Connecting the parsed JSON output to the Dashboard components (Meal Cards, Category Lists).
* **Phase 4: Interactivity & Polish.** Wiring up the client-side array mutation for the "Apply Swap" button and implementing the LocalStorage save/load functionality.
