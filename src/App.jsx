import { useFlow } from './FlowContext';
import Canvas from './components/Canvas';

export default function App() {
  const { viewMode } = useFlow();

  return (
    <div className="h-screen w-screen">
      {viewMode === 'editor' ? <Canvas /> : <div>Preview mode (coming soon)</div>}
    </div>
  );
}

export default App