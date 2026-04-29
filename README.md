# SupportFlow – Visual Decision Tree Editor

## Project Overview
This project is a web-based tool that lets users create, edit, and test chatbot conversation flows visually. In simple words, it's like a drawing board where you can design how a chatbot talks to people. I draw boxes (called nodes) for questions and answers, connect them with lines, and then test the conversation like a real chat.

The problem it solves: Building chatbot flows usually requires coding or complex tools. This makes it easy with drag-and-drop, so anyone can design conversations without programming skills.

## What Makes It Unique
- **No coding needed**: Drag nodes, type text, connect them, that's it.
- **Real-time preview**: See exactly how the chat will look to users.
- **Auto-layout**: One click to organize the messy diagram into a neat tree.
- **Custom connections**: Curved lines with arrows, drawn without extra libraries.
- **Grid snapping**: Nodes snap to a grid for neat alignment, but you can hold ALT for free movement.
- **Built with modern web tech**: Uses React for fast updates, Vite for quick development, and Tailwind CSS for styling.

## Technologies Used
- **React**: For building the user interface components.
- **Vite**: For fast development and building the app.
- **Tailwind CSS**: For styling the UI with utility classes.
- **ESLint**: For checking code quality.
- **Custom SVG**: For drawing connection lines without external libraries.

## Project Structure and File Explanations

### Root Files
- **`package.json`**: Lists the project name, scripts (like `npm run dev` to start), and dependencies (React, Vite, etc.).
- **`vite.config.js`**: Configures Vite to use React and Tailwind plugins.
- **`eslint.config.js`**: Sets up ESLint rules for code quality.
- **`index.html`**: The main HTML file that loads the React app.
- **`flow_data.json`**: The data file with all nodes (questions/answers) and their connections. Each node has an ID, type (start/question/end), text, position, and options (choices that link to next nodes).
- **`LICENSE`**: The license for the project.

### Source Code (`src/` folder)
- **`main.jsx`**: The entry point. It wraps the app with `FlowProvider` (for shared data) and renders `App` into the HTML.
- **`App.jsx`**: The main app component. It shows the toolbar, canvas (for editing), inspector panel, or preview mode based on what you're doing.
- **`FlowContext.jsx`**: Manages all the shared data (nodes, selected node, view mode). It provides functions like `updateNode` and `autoLayout`. The `autoLayout` uses a breadth-first search (BFS) algorithm to position nodes neatly in columns.
- **`index.css`**: Just imports Tailwind CSS for styling.

### Components (`src/components/` folder)
These are reusable pieces of the UI.

- **`Toolbar.jsx`**: The top bar with buttons to switch between "Editor" (for designing) and "Preview" (for testing). Also has "Auto-Layout" button in editor mode.
- **`Canvas.jsx`**: The main drawing area. It shows the connection lines and all node cards. Clicking the background deselects nodes.
- **`NodeCard.jsx`**: Each question/answer box. You can drag it (snaps to grid unless ALT pressed), click to select and edit.
- **`ConnectionsLayer.jsx`**: Draws the curved SVG lines between nodes with arrowheads.
- **`InspectorPanel.jsx`**: The right panel that appears when you select a node. Lets you edit the text and see options.
- **`PreviewMode.jsx`**: Simulates the chatbot chat. Shows messages like a real conversation, with user choices as buttons.

### Hooks (`src/hooks/` folder)
- **`useConnectionLines.js`**: A custom hook that calculates the positions of connection lines using DOM measurements. It waits for the page to render, then finds ports on nodes and draws curves.

### Assets (`src/assets/` folder)
- Empty, but could hold images or icons.

## How Files Are Interconnected
- **Data Flow**: `flow_data.json` loads into `FlowContext.jsx`, which shares data with all components via React Context.
- **Rendering**: `App.jsx` decides what to show based on `viewMode` from context. In editor mode: `Canvas` (with `NodeCard`s and `ConnectionsLayer`) + `InspectorPanel`. In preview: `PreviewMode`.
- **Interactions**: Clicking a `NodeCard` updates `selectedNodeId` in context, which shows the `InspectorPanel`. Dragging updates positions via `updateNode`.
- **Connections**: `ConnectionsLayer` uses `useConnectionLines` to get paths from node positions and options.
- **Preview**: `PreviewMode` uses `nodeMap` from context to navigate the flow based on user clicks.

## How to Run the Project
0. Clone the project
1. Install Node.js if you don't have it.
2. Open terminal in the project folder.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open the URL shown (usually http://localhost:5173) in your browser.

## Live Demo
https://amali-tech-supportflow-builder-project-challe-ub-victor.vercel.app/

## Design System
See the attached PDF `SupportFlow_Design_Spec.pdf` for the design details.

## Credits
- Challenge by AmaliTech.
- Built by Ushindi Bihame.

This project shows skills in React, state management, algorithms (BFS for layout), DOM manipulation, and UI/UX design.
- GitHub: [ub-victor](https://github.com/ub-victor)

## License

This project is open-source and available under the MIT License.