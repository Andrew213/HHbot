import ErrorBoundary from "@/components/error-boundry/ErrorBoundry";
import AppRouter from "@/routers";
const Wrapper = () => {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
};
export default Wrapper;
