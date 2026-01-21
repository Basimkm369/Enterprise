import { cn } from "../lib/utils";
import {
  LayoutGrid,
  Home,
  FileText,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  FileBarChart,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutGrid },
  { icon: Home },
  { icon: FileText, active: true, highlight: true },
  { icon: ClipboardList },
  { icon: FolderOpen },
  { icon: MessageSquare },
  { icon: FileBarChart },
];

const AppSidebar = () => {
  return (
    <aside className="fixed left-0 top-12 h-[calc(100vh-48px)] w-[52px] bg-[#FCFCFC] border-r border-[#D1D1D1] flex flex-col items-center py-4 px-2 shrink-0">
      <div className="flex flex-col items-center gap-2 h-[272px]">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer",
                item.highlight
                  ? "bg-primary text-primary-foreground"
                  : item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
      <div className="mt-auto pb-4">
        <button className="w-9 h-9 rounded-md flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
