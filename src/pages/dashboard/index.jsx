import { lazy, Suspense } from "react";

const RiskDashboard = lazy(() => import("../../components/RiskDashboard"));

const Index = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="h-8 w-8 rounded-full border-2 border-primary/60 border-t-transparent animate-spin" />
        </div>
      }
    >
      <RiskDashboard />
    </Suspense>
  );
};

export default Index;
