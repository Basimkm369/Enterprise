import {
  ChevronDown,
  Bell,
  RefreshCw,
  HelpCircle,
  Grip,
} from "lucide-react";

const CommonHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 border-b border-border bg-[#231F1F] flex items-center justify-between px-6 gap-2 shrink-0 z-30">
      <div className="h-12 w-[52px] -ml-6 flex items-center justify-center">
        <button className="h-12 w-[52px] px-4 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
          <Grip className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center rounded text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
          <RefreshCw className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
          U
        </div>
      </div>
    </header>
  );
};

export default CommonHeader;
