import { useState } from "react";
import StatusBadge from "./StatusBadge";
import TypeIndicator from "./TypeIndicator";
import CommonTable from "./CommonTable";
import { cn } from "../lib/utils";

const RiskTable = ({ data = [] }) => {
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

  const sortedData = [...data].sort((a, b) => {
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

  const columns = [
    {
      field: "recordNo",
      header: "Record No",
      headerClassName: "min-w-[100px]",
      cellClassName: "px-3 py-3 text-sm font-medium",
      render: (item) => item.recordNo,
    },
    {
      field: "description",
      header: "Risk Activity Description",
      headerClassName: "min-w-[280px]",
      cellClassName: "px-3 py-3 text-sm text-muted-foreground",
      render: (item) => item.description,
    },
    {
      field: "status",
      header: "Status",
      headerClassName: "min-w-[140px]",
      cellClassName: "px-3 py-3",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      field: "type",
      header: "Type",
      headerClassName: "min-w-[100px]",
      cellClassName: "px-3 py-3 text-sm",
      render: (item) => <TypeIndicator type={item.type} />,
    },
    {
      field: "phase",
      header: "Phase",
      headerClassName: "min-w-[100px]",
      cellClassName: "px-3 py-3 text-sm",
      render: (item) => item.phase,
    },
    {
      field: "department",
      header: "Department",
      headerClassName: "min-w-[140px]",
      cellClassName: "px-3 py-3 text-sm",
      render: (item) => item.department,
    },
    {
      field: "inherentImpact",
      header: (
        <>
          Inherent Impact
          <br />
          (1Low - 5High)
        </>
      ),
      headerClassName: "min-w-[100px]",
      cellClassName: "px-3 py-3 text-sm text-center",
      render: (item) => item.inherentImpact,
    },
    {
      field: "inherentLikelihood",
      header: (
        <>
          Inherent Likelihood
          <br />
          (1Rare - 5Absolute)
        </>
      ),
      headerClassName: "min-w-[100px]",
      cellClassName: "px-3 py-3 text-sm text-center",
      render: (item) => item.inherentLikelihood,
    },
  ];

  return (
    <CommonTable
      columns={columns}
      data={sortedData}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={handleSort}
      rowKey={(item) => item.id}
      rowClassName={(item, index) =>
        cn(
          "hover:bg-muted/50 transition-colors",
          index % 2 === 0 ? "bg-card" : "bg-card",
        )
      }
    />
  );
};

export default RiskTable;
