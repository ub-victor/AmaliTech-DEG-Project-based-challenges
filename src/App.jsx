// src/App.jsx
import { useFlow } from './FlowContext';
import Canvas from './components/Canvas';
import InspectorPanel from './components/InspectorPanel';

export default function App() {
  const { viewMode } = useFlow();

  if (viewMode !== 'editor') {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Preview mode (coming soon)
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1 relative">
        <Canvas />
      </div>
      <InspectorPanel />
    </div>
  );
}