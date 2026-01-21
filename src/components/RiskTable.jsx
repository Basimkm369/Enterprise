import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { TypeIndicator } from "./TypeIndicator";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

const mockData = [
  {
    id: "1",
    recordNo: "ERM-0310",
    description: "Integration of AI for predictive maintena...",
    status: "under-mitigation",
    type: "threat",
    phase: "Warranty",
    department: "Products: Projects",
    inherentImpact: 1,
    inherentLikelihood: 4,
  },
  {
    id: "2",
    recordNo: "ERM-0309",
    description: "Risk of loss from inadequate or failed str...",
    status: "new",
    type: "opportunity",
    phase: "Transit",
    department: "Commercial",
    inherentImpact: 3,
    inherentLikelihood: 1,
  },
  {
    id: "3",
    recordNo: "ERM-0308",
    description: "Development of offshore wind farms to...",
    status: "under-mitigation",
    type: "threat",
    phase: "Testing",
    department: "Mfg: Assembly",
    inherentImpact: 4,
    inherentLikelihood: 3,
  },
  {
    id: "4",
    recordNo: "ERM-0307",
    description: "Investment in research for advanced tur...",
    status: "pending-mitigation",
    type: "threat",
    phase: "Retention",
    department: "CS&QA: QA",
    inherentImpact: 5,
    inherentLikelihood: 3,
  },
  {
    id: "5",
    recordNo: "ERM-0306",
    description: "Adoption of hybrid energy systems com...",
    status: "under-mitigation",
    type: "opportunity",
    phase: "Staffing",
    department: "CS&QA: QA-DBO",
    inherentImpact: 3,
    inherentLikelihood: 3,
  },
  {
    id: "6",
    recordNo: "ERM-0305",
    description: "Regulatory changes promoting renewabl...",
    status: "sent-for-closure",
    type: "threat",
    phase: "Procurement",
    department: "Finance",
    inherentImpact: 3,
    inherentLikelihood: 2,
  },
  {
    id: "7",
    recordNo: "ERM-0304",
    description: "Expansion of energy storage solutions f...",
    status: "escalated",
    type: "threat",
    phase: "Transit",
    department: "Products: Sales",
    inherentImpact: 2,
    inherentLikelihood: 3,
  },
  {
    id: "8",
    recordNo: "ERM-0303",
    description: "Increased demand for sustainable energ...",
    status: "under-mitigation",
    type: "opportunity",
    phase: "Warranty",
    department: "SCM: UBO",
    inherentImpact: 1,
    inherentLikelihood: 1,
  },
  {
    id: "9",
    recordNo: "ERM-0302",
    description: "Collaboration between governments an...",
    status: "pending-mitigation",
    type: "threat",
    phase: "Warranty",
    department: "Finance",
    inherentImpact: 5,
    inherentLikelihood: 5,
  },
  {
    id: "10",
    recordNo: "ERM-0301",
    description: "Growth in turbine efficiency through inn...",
    status: "escalated",
    type: "opportunity",
    phase: "Transit",
    department: "HR",
    inherentImpact: 2,
    inherentLikelihood: 2,
  },
  {
    id: "11",
    recordNo: "ERM-0300",
    description: "Emergence of smart grid technologies t...",
    status: "new",
    type: "opportunity",
    phase: "Staffing",
    department: "Mfg: Subcontracting",
    inherentImpact: 2,
    inherentLikelihood: 2,
  },
  {
    id: "12",
    recordNo: "ERM-0299",
    description: "Focus on community-based renewable...",
    status: "closed",
    type: "threat",
    phase: "Warranty",
    department: "Finance",
    inherentImpact: 1,
    inherentLikelihood: 1,
  },
  {
    id: "13",
    recordNo: "ERM-0298",
    description: "Integration of artificial intelligence in en...",
    status: "draft",
    type: "threat",
    phase: "Warranty",
    department: "HR",
    inherentImpact: 4,
    inherentLikelihood: 1,
  },
  {
    id: "14",
    recordNo: "ERM-0297",
    description: "Research into offshore floating wind tur...",
    status: "new",
    type: "opportunity",
    phase: "Warranty",
    department: "Finance",
    inherentImpact: 4,
    inherentLikelihood: 4,
  },
  {
    id: "15",
    recordNo: "ERM-0296",
    description: "Partnerships with local communities for...",
    status: "under-mitigation",
    type: "opportunity",
    phase: "Warranty",
    department: "HR",
    inherentImpact: 1,
    inherentLikelihood: 4,
  },
];

function ColumnHeader({
  children,
  field,
  sortField,
  sortDirection,
  onSort,
  className,
}) {
  const isActive = sortField === field;

  return (
    <th
      className={cn(
        "px-3 py-3 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors",
        className,
      )}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        <span>{children}</span>
        {isActive ? (
          sortDirection === "asc" ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )
        ) : (
          <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
        )}
      </div>
    </th>
  );
}

export function RiskTable() {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...mockData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-border">
          <tr>
            <ColumnHeader
              field="recordNo"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[100px]"
            >
              Record No
            </ColumnHeader>
            <ColumnHeader
              field="description"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[280px]"
            >
              Risk Activity Description
            </ColumnHeader>
            <ColumnHeader
              field="status"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[140px]"
            >
              Status
            </ColumnHeader>
            <ColumnHeader
              field="type"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[100px]"
            >
              Type
            </ColumnHeader>
            <ColumnHeader
              field="phase"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[100px]"
            >
              Phase
            </ColumnHeader>
            <ColumnHeader
              field="department"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[140px]"
            >
              Department
            </ColumnHeader>
            <ColumnHeader
              field="inherentImpact"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[100px]"
            >
              Inherent Impact
              <br />
              (1Low - 5High)
            </ColumnHeader>
            <ColumnHeader
              field="inherentLikelihood"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="min-w-[100px]"
            >
              Inherent Likelihood
              <br />
              (1Rare - 5Absolute)
            </ColumnHeader>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={item.id}
              className={cn(
                "border-b border-border hover:bg-muted/50 transition-colors",
                index % 2 === 0 ? "bg-card" : "bg-card",
              )}
            >
              <td className="px-3 py-3 text-sm font-medium">{item.recordNo}</td>
              <td className="px-3 py-3 text-sm text-muted-foreground">
                {item.description}
              </td>
              <td className="px-3 py-3">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-3 py-3 text-sm">
                <TypeIndicator type={item.type} />
              </td>
              <td className="px-3 py-3 text-sm">{item.phase}</td>
              <td className="px-3 py-3 text-sm">{item.department}</td>
              <td className="px-3 py-3 text-sm text-center">
                {item.inherentImpact}
              </td>
              <td className="px-3 py-3 text-sm text-center">
                {item.inherentLikelihood}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
