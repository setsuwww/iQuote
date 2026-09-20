const TrafficLights: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        className="
          h-3 w-3
          !rounded-full
          bg-[#ff5f57]
          transition-transform
          duration-150
          hover:scale-110
          active:scale-90
        "
      />

      {/* Minimize */}
      <button
        type="button"
        aria-label="Minimize"
        className="
          h-3 w-3
          !rounded-full
          bg-[#febc2e]
          transition-transform
          duration-150
          hover:scale-110
          active:scale-90
        "
      />

      {/* Maximize */}
      <button
        type="button"
        aria-label="Maximize"
        className="
          h-3 w-3
          !rounded-full
          bg-[#28c840]
          transition-transform
          duration-150
          hover:scale-110
          active:scale-90
        "
      />
    </div>
  );
};

export default TrafficLights;
