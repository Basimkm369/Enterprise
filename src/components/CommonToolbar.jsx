import { Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react";

const CommonToolbar = ({
  searchValue,
  onSearchChange,
  onFilterClick,
  onDownloadClick,
  primaryLabel,
  onPrimaryClick,
  primaryIcon,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Find..."
            className="h-9 pl-9 pr-4 w-48 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>

        <button
          className="h-9 px-4 flex items-center gap-2 border border-border rounded-md bg-card text-sm text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          onClick={onFilterClick}
          type="button"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <button
          className="h-9 px-3 flex items-center gap-2 border border-border rounded-md bg-card text-sm text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          onClick={onDownloadClick}
          type="button"
        >
          <Download className="w-4 h-4" />
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <button
        className="h-9 px-4 flex items-center gap-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
        onClick={onPrimaryClick}
        type="button"
      >
        {primaryIcon}
        <span>{primaryLabel}</span>
      </button>
    </div>
  );
};

export default CommonToolbar;
