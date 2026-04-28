# SupportFlow-Visual-Builder

This challenge is designed to test your ability to bridge Computer Science fundamentals with Modern Frontend Engineering.

## 1. Business Scenario & Context

**Client:** SupportFlow AI
**Industry:** Customer Support Automation (Chatbots)

**The Problem:** SupportFlow helps companies build automated "Help Bots" (e.g., "Press 1 for Billing, 2 for Tech Support"). Currently, their configuration is done via a messy Excel spreadsheet. It is error-prone, hard to visualize, and frustrating for non-technical managers.

**Your Role:** You are the new Frontend Engineer. The Product Manager wants a **Visual Decision Tree Editor** where users can see their conversation flow as a flowchart, edit the questions in real-time, and "test drive" the bot instantly.

---

## 2. The Assignment Stages

This is a **hybrid design/engineering challenge**. You are expected to demonstrate competence in both visual design logic and complex DOM manipulation.

### Phase 1: The Design System

**Before writing code, you must design the visual language of the tool.**

- **Deliverable:** A link to your design file (Figma, Penpot, or Sketch) or a PDF export of your design frames.
- **Requirement:** Your design file must include a dedicated **"Design System" page** that defines:
  - **Canvas**
  - **Node Cards**
  - **Connectors**
  - **Color Semantics**

### Phase 2: The Implementation

**Build the "Flow Builder" using your design system.**

- **Constraint 1 (Critical):** You **cannot** use Flowchart/Graph libraries like `react-flow`, `jsPlumb`, or `mermaid.js`. You must build the node rendering and line connection logic yourself to prove you understand DOM coordinates and SVG/Canvas drawing.
- **Constraint 2:** Do not use component libraries like Material UI or Bootstrap. (Tailwind is allowed only if you use it to build custom components).

---

## 3. User Stories & Acceptance Criteria

### Core Features (Required)

#### Story 1: The Visual Graph

> "As a user, I want to see my conversation logic as a connected flowchart, not a list."

- **AC 1:** The app renders "Nodes" (questions) based on the provided JSON data.
- **AC 2:** The Nodes are positioned absolutely on the canvas (using the x/y coordinates provided in the JSON).
- **AC 3:** Visual lines (SVG or HTML Canvas) connect a Parent Node to its Child Nodes based on the flow logic.

#### Story 2: The Editor

> "As a user, I need to update the text when our support policies change."

- **AC 1:** Clicking a Node opens an "Edit Panel" or turns the card into an editable form.
- **AC 2:** Users can edit the "Question Text" and the changes reflect immediately on the canvas.
- **AC 3:** (Constraint) You do not need to save changes to a permanent database. Managing local state (in-memory) is sufficient.

#### Story 3: The "Preview" Mode (The Runner)

> "As a manager, I want to test the bot experience as if I were a real customer."

- **AC 1:** A "Play" button toggles the UI from "Editor View" (Flowchart) to "Preview Mode" (Chat Interface).
- **AC 2:** In Preview Mode, the app displays the Start Node's question.
- **AC 3:** When the user selects an answer, the app traverses the graph to show the next node.
- **AC 4:** Show a "Restart" button when a leaf node (end of conversation) is reached.

### The "Wildcard" Feature (Required)

#### Story 4: The Innovation Clause

> "As a developer, I want to add one feature that makes this tool indispensable."

- **Task:** Identify a missing feature that improves the _Editor_ experience.
- **AC 1:** Implement **one** additional feature of your choice.
- **AC 2:** In your README, explain _why_ you chose this feature and how it adds value to the business.

---

## 4. Technical Requirements

- **Data:** Use the `flow_data.json` file provided in this repo.
- **Tech Stack:** React, Vue, Svelte, or Vanilla JS.

---

## 5. Submission Instructions

1.  **Fork** this repository.
2.  Complete the code in your fork.
3.  **Update the README:**
    - **Delete** all the instructions in this file (the text you are reading now).
    - **Replace** them with your own documentation.
    - _Note: Do not append your docs to the end. The final README should look like a professional project documentation, not a homework assignment._
4.  Submit your repo link via the [online](https://forms.cloud.microsoft/e/PrfSgKKQ0k) form.

### ⚠️ CRITICAL: Pre-Submission Checklist

**STOP and review your work.** To be eligible for the Solution Defense interview, your submission **MUST** pass the following "Gatekeeper" checks.

If any of the following are incorrect, your submission will be flagged as incomplete and you will **NOT** be invited for an interview.

1.  **Public Repository:** Is your GitHub repository set to **Public**? (Private links will be auto-rejected).
2.  **Audit-Ready History:** Does your Git commit history show your progress over time? (Repositories with a single "Initial Commit" or "Upload files" containing the entire project will be **rejected as unverifiable**).
3.  **Working Deployment:** Have you tested your live link in an **Incognito/Private** window to ensure it loads without errors?
4.  **No Restricted Libraries:** Did you build your own components? (Submissions using **Bootstrap, Material UI, or Chakra UI** will be disqualified).
5.  **Design File Access:** Is your Figma/Penpot link included and set to **"Anyone with the link can view"**?
6.  **Documentation:** Have you deleted the original assignment text from the `README.md` and replaced it with your own project documentation?

> **By submitting your work, you acknowledge that failure to meet these criteria effectively ends your application process.**
