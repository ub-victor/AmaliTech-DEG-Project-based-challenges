export default function NodeCard({ node, isSelected, onClick }) {
  const isEnd = node.type === 'end';
  const borderColor = isEnd ? '#86EFAC' : isSelected ? '#2D6CDF' : '#CDD3DC';
  const bgColor = isEnd ? '#ECFDF5' : 'white';

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{
        left: node.position.x,
        top: node.position.y,
        width: 200,
      }}
    >
      <div
        className="rounded-lg border-2 transition-colors relative"
        style={{
          borderColor,
          backgroundColor: bgColor,
          padding: 10,
          borderWidth: isSelected ? 1.6 : 1,
        }}
      >
        {/* Input port (top center) – MUST HAVE an id for connection lines */}
        <div
          id={`input-port-${node.id}`}
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400 border border-white z-10"
        />

        {/* Question text */}
        <p className="text-[9.5px] font-normal leading-tight mb-2">{node.text}</p>

        {/* Options (except END nodes) */}
        {!isEnd && node.options.map((opt, idx) => (
          <div
            key={`${node.id}-opt-${idx}`}
            className="flex items-center justify-between text-[9.5px] py-1 border-t border-gray-100 relative"
          >
            <span>{opt.label}</span>

            {/* Output port (right edge, per option) – MUST HAVE an id */}
            <div
              id={`port-${node.id}-${idx}`}
              className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-400 border border-white z-10"
            />
          </div>
        ))}

        {/* End node indicator */}
        {isEnd && (
          <div className="text-[9.5px] text-green-700 font-semibold mt-1">END</div>
        )}
      </div>
    </div>
  );
}