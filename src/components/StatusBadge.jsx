import { cn } from "../lib/utils";

const statusConfig = {
  "under-mitigation": {
    label: "Under Mitigation",
    className: "bg-status-mitigation text-white",
  },
  "pending-mitigation": {
    label: "Pending Mitigation",
    className: "bg-status-pending text-white",
  },
  new: {
    label: "New",
    className: "bg-status-new text-white",
  },
  closed: {
    label: "Closed",
    className: "bg-status-closed text-white",
  },
  "sent-for-closure": {
    label: "Sent for Closure",
    className: "bg-status-sent text-white",
  },
  escalated: {
    label: "Escalated",
    className: "bg-status-escalated text-white",
  },
  draft: {
    label: "Draft",
    className: "bg-status-draft text-white",
  },
};

export function StatusBadge({ status, className }) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
