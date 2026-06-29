import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import Dashboard from "./pages/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";
import Login from "./pages/Login";

function LoginRoute() {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : <Login />;
}

function ProtectedRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginRoute />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <EmployeeProvider>
              <Dashboard />
            </EmployeeProvider>
          }
        />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
