import { useEffect, useState } from 'react';
import AppSidebar from './Appslider';
import CommonHeader from './CommonHeader';
import CommonNoData from './CommonNoData';
import CommonToolbar from './CommonToolbar';
import CreateEnterpriseModal from './CreateEnterpriseModal';
import RiskTable from './RiskTable';
import TablePagination from './TablePagination';
import { Plus, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const RiskDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [risks, setRisks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleCreateRisk = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newRisk = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      ...values,
    };

    setRisks((prev) => [newRisk, ...prev]);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRisks = risks.filter((risk) => {
    if (!normalizedQuery) return true;

    return [
      risk.recordNo,
      risk.description,
      risk.status,
      risk.type,
      risk.phase,
      risk.department,
      String(risk.inherentImpact),
      String(risk.inherentLikelihood),
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery));
  });

  const totalItems = filteredRisks.length;
  const safeItemsPerPage = Math.max(1, itemsPerPage || 1);
  const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedRisks = filteredRisks.slice(
    startIndex,
    startIndex + safeItemsPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (itemsPerPage < 1) {
      setItemsPerPage(1);
    }
  }, [itemsPerPage]);

  const tabs = [
    { id: 'all', label: 'All', count: risks.length },
    {
      id: 'new',
      label: 'New',
      count: risks.filter((risk) => risk.status === 'new').length,
    },
    {
      id: 'under-mitigation',
      label: 'Under Mitigation',
      count: risks.filter((risk) => risk.status === 'under-mitigation').length,
    },
    {
      id: 'closed',
      label: 'Closed',
      count: risks.filter((risk) => risk.status === 'closed').length,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 flex flex-col overflow-hidden ml-[52px] pt-12">
        {/* Top Header */}
        <CommonHeader />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-6 w-full max-w-[1240px] mx-auto">
            {/* Page Header */}
            <div className="flex items-center h-12 gap-6">
              <h1 className="text-[20px] leading-[1.3] font-semibold text-[#231F20]">
                Enterprise Risk Management
              </h1>

              <div className="flex items-center gap-8 h-12 px-5 py-2 rounded-[24.5px] border border-[#E7E7E7] bg-[#F8F8F8]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm">
                    <span className="font-semibold">213</span>
                    <span className="text-muted-foreground ml-1">
                      Open Risks
                    </span>
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
            <div className="flex items-center gap-4 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer',
                    activeTab === tab.id
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground',
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'px-1.5 py-0.5 rounded text-xs',
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <CommonToolbar
              searchValue={searchQuery}
              onSearchChange={(event) => setSearchQuery(event.target.value)}
              onFilterClick={() => {}}
              onDownloadClick={() => {}}
              primaryLabel="Create"
              primaryIcon={<Plus className="w-4 h-4" />}
              onPrimaryClick={handleOpenCreate}
            />

            {/* Table Card */}
            <div className="bg-card rounded-lg border border-border shadow-sm">
              {filteredRisks.length ? (
                <>
                  <RiskTable data={pagedRisks} />
                  <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={safeItemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(value) => {
                      if (!Number.isFinite(value)) return;
                      setItemsPerPage(Math.max(1, Math.floor(value)));
                      setCurrentPage(1);
                    }}
                  />
                </>
              ) : (
                <CommonNoData
                  title="No enterprise items found"
                  description="Create a new enterprise item or adjust your search to see results."
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <CreateEnterpriseModal
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
        onCreate={handleCreateRisk}
      />
    </div>
  );
};

export default RiskDashboard;
