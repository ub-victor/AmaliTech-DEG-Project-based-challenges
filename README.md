# SupportFlow – Visual Decision Tree Editor

A browser‑based tool for building and testing chatbot conversation flows.  
Built with React, Vite, Tailwind CSS, and custom SVG rendering.

## Live Demo
https://amali-tech-supportflow-builder-project-challe-ub-victor.vercel.app/

## Features
- **Interactive Canvas** – Drag, reposition, and connect nodes using absolute positioning.
- **Real‑time Editing** – Click any node to edit its question text in the inspector.
- **Auto‑Layout** – One‑click tidying of the flowchart into logical columns.
- **Preview Mode** – Simulate the chatbot conversation exactly as a user would see it.
- **Custom SVG Connections** – Curved, directed lines with arrowheads, drawn without external libraries.

## How to Run Locally
1. Clone the repository
2. `npm install`
3. `npm run dev`

## Design System
For the Link the Figma I have attached a pdf at the root having everything the file called `SupportFlow_Design_Spec.pdf`

## Project Structure
- **`src/FlowContext.jsx`** – Global state management
- **`src/components/Canvas.jsx`** – Main drawing area
- **`src/components/NodeCard.jsx`** – Draggable node card
- **`src/components/ConnectionsLayer.jsx`** – SVG connection lines
- **`src/components/InspectorPanel.jsx`** – Node property editor
- **`src/components/PreviewMode.jsx`** – Chat simulation
- **`src/components/Toolbar.jsx`** – Mode toggle & Auto‑Layout

## Data Model

The flow is driven by a single `flow_data.json` file.  
Each node has an `id`, `type` (`start` / `question` / `end`), `text`, and `options`.  
Options link to other nodes via `nextId` (or `null` to end the conversation).

## Key Custom Hooks

- **`useConnectionLines.js`** – Computes SVG paths from option ports to target node input ports using DOM measurement.

## Wildcard Feature: Auto‑Layout
Implemented a breadth‑first algorithm that assigns each node a depth and order, then positions them with consistent horizontal and vertical gaps. This transforms a messy diagram into a readable tree in one click.

## Credits

- Challenge Task by [AmaliTech](https://amalitech.com/)
- Developed by [Ushindi Bihame](https://www.linkedin.com/in/victoire-ushindi-46a06a285/)
- GitHub: [ub-victor](https://github.com/ub-victor)

## License

This project is open-source and available under the MIT License.