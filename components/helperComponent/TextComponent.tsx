export const ToolTipTextShow = ({ text, style }) => {
  return (
    <div style={style} className="group relative flex items-center">
      <div className="truncate">{text}</div>
      <div className="absolute bottom-full left-1/2 mb-2 hidden w-max -translate-x-1/2 group-hover:block">
        <div className="relative z-10 w-60 rounded-lg bg-black px-3 py-2 text-sm text-white shadow-lg">
          {text}
          <div className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export const TextC = ({ text, style }) => {
  return (
    <div style={style} className="group relative flex items-center">
      <div className="truncate">{text}</div>
      <div className="absolute bottom-full left-1/2 mb-2 hidden w-max -translate-x-1/2 group-hover:block">
        <div className="relative z-10 w-60 rounded-lg bg-black px-3 py-2 text-sm text-white shadow-lg">
          {text}
          <div className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-black"></div>
        </div>
      </div>
    </div>
  );
};
