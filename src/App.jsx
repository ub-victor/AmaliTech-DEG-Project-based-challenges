// src/App.jsx
import { useFlow } from './FlowContext';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import InspectorPanel from './components/InspectorPanel';
import PreviewMode from './components/PreviewMode';

export default function App() {
  const { viewMode } = useFlow();

  return (
    <div className="h-screen w-screen flex flex-col">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'editor' ? (
          <>
            <div className="flex-1 relative">
              <Canvas />
            </div>
            <InspectorPanel />
          </>
        ) : (
          <div className="flex-1">
            <PreviewMode />
          </div>
        )}
      </div>
    </div>
  );
}