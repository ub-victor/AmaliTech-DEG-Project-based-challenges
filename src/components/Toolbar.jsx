// src/components/Toolbar.jsx
import { useFlow } from '../FlowContext';

export default function Toolbar() {
  const { viewMode, setViewMode, autoLayout } = useFlow();

  return (
    <div className="bg-white border-b border-gray-200 flex flex-wrap items-center gap-2 px-4 py-3">
      <button
        onClick={() => setViewMode('editor')}
        className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded transition-colors min-w-[84px] ${
          viewMode === 'editor'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Editor
      </button>
      <button
        onClick={() => setViewMode('preview')}
        className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded transition-colors min-w-[84px] ${
          viewMode === 'preview'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Preview
      </button>
      {viewMode === 'editor' && (
        <button
          onClick={autoLayout}
          className="ml-auto text-xs sm:text-sm font-semibold px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700 transition-colors min-w-[84px]"
          title="Auto‑Layout: tidy nodes into columns"
        >
          Auto‑Layout
        </button>
      )}
    </div>
  );
}