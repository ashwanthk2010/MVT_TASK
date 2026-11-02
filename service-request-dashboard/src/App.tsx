import AppRoutes from './routes/AppRoutes';
import GlobalSnackbar from './components/common/GlobalSnackbar';

export default function App() {
  return (
    <>
      <AppRoutes />
      <GlobalSnackbar />
    </>
  );
}
