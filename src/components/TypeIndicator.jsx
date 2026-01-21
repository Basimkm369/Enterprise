import { cn } from "../lib/utils";

const TypeIndicator = ({ type, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          type === "threat" ? "bg-type-threat" : "bg-type-opportunity",
        )}
      />
      <span className="capitalize">{type}</span>
    </div>
  );
};

export default TypeIndicator;
