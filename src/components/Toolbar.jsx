import { useFlow } from '../FlowContext';

export default function Toolbar() {
  const {
    viewMode,
    setViewMode,
    autoLayout,
    addNode,
    isInspectorOpen,
    toggleInspector,
    canvasZoom,
    zoomIn,
    zoomOut,
    resetCanvasView,
  } = useFlow();

  return (
    <div className="bg-white border-b border-gray-200 flex flex-wrap items-center gap-2 px-4 py-3">
      <div className="flex flex-wrap gap-2">
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
      </div>

      {viewMode === 'editor' && (
        <>
          <button
            onClick={addNode}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            + Node
          </button>
          <button
            onClick={toggleInspector}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {isInspectorOpen ? 'Hide Inspector' : 'Show Inspector'}
          </button>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1">
            <button
              onClick={zoomOut}
              className="text-xs sm:text-sm font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              title="Zoom out"
            >
              -
            </button>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">{Math.round(canvasZoom * 100)}%</span>
            <button
              onClick={zoomIn}
              className="text-xs sm:text-sm font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              title="Zoom in"
            >
              +
            </button>
          </div>
          <button
            onClick={resetCanvasView}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Fit
          </button>
          <button
            onClick={autoLayout}
            className="ml-auto text-xs sm:text-sm font-semibold px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700 transition-colors min-w-[84px]"
            title="Auto‑Layout: tidy nodes into columns"
          >
            Auto‑Layout
          </button>
        </>
      )}
    </div>
  );
}
