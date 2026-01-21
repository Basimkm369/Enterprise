import { useState } from "react";
import { AppSidebar } from "./Appslider";
import { RiskTable } from "./RiskTable";
import { TablePagination } from "./TablePagination";
import {
  Search,
  SlidersHorizontal,
  Download,
  ChevronDown,
  Plus,
  FileText,
  AlertTriangle,
  Bell,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { cn } from "../lib/utils";

const tabs = [
  { id: "all", label: "All", count: 133 },
  { id: "new", label: "New", count: 24 },
  { id: "under-mitigation", label: "Under Mitigation", count: 33 },
  { id: "closed", label: "Closed", count: 7 },
];

export function RiskDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-end px-4 gap-3 shrink-0">
          <button className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:bg-muted transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
            U
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-foreground">
              Enterprise Risk Management
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm">
                  <span className="font-semibold">213</span>
                  <span className="text-muted-foreground ml-1">Open Risks</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-status-escalated" />
                <span className="text-sm">
                  <span className="font-semibold">23</span>
                  <span className="text-muted-foreground ml-1">
                    High Priority High Priority
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-status-pending" />
                <span className="text-sm">
                  <span className="font-semibold">121</span>
                  <span className="text-muted-foreground ml-1">Threats</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground",
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-xs",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Find..."
                  className="h-9 pl-9 pr-4 w-48 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                />
              </div>

              <button className="h-9 px-4 flex items-center gap-2 border border-border rounded-md bg-card text-sm text-muted-foreground hover:bg-muted transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <button className="h-9 px-3 flex items-center gap-2 border border-border rounded-md bg-card text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Download className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <button className="h-9 px-4 flex items-center gap-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-card rounded-lg border border-border shadow-sm">
            <RiskTable />
            <TablePagination
              currentPage={currentPage}
              totalPages={10}
              totalItems={188}
              itemsPerPage={15}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
