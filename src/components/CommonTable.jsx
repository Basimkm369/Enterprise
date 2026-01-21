import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

const ColumnHeader = ({
  children,
  field,
  sortField,
  sortDirection,
  onSort,
  className,
}) => {
  const isActive = sortField === field;
  const isSortable = Boolean(onSort) && field;

  return (
    <th
      className={cn(
        "px-3 py-3 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors",
        className,
      )}
      onClick={isSortable ? () => onSort(field) : undefined}
    >
      <div className="flex items-center gap-1">
        <span>{children}</span>
        {isSortable ? (
          isActive ? (
            sortDirection === "asc" ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )
          ) : (
            <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
          )
        ) : null}
      </div>
    </th>
  );
};

const CommonTable = ({
  columns,
  data,
  sortField,
  sortDirection,
  onSort,
  rowKey = "id",
  rowClassName,
}) => {
  const getRowKey =
    typeof rowKey === "function"
      ? rowKey
      : (row, index) => row[rowKey] ?? index;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-border">
          <tr>
            {columns.map((column, index) => (
              <ColumnHeader
                key={column.field ?? column.key ?? index}
                field={column.field}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
                className={column.headerClassName}
              >
                {column.header}
              </ColumnHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className={rowClassName ? rowClassName(row, index) : undefined}
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={`${column.field ?? column.key ?? columnIndex}-${getRowKey(
                    row,
                    index,
                  )}`}
                  className={column.cellClassName}
                >
                  {column.render ? column.render(row) : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
