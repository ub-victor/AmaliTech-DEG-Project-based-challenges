// src/App.jsx
import { useFlow } from './FlowContext';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import InspectorPanel from './components/InspectorPanel';
import PreviewMode from './components/PreviewMode';

export default function App() {
  const { viewMode } = useFlow();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-slate-50">
      <Toolbar />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {viewMode === 'editor' ? (
          <>
            <div className="flex-1 relative overflow-hidden">
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