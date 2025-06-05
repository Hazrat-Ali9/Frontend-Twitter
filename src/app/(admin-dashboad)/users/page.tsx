import AdminUserPage from "@/app/components/Dashboard/Users/page";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const AdminUserDashboard = () => {
  return (
    <ProtectedRoute>
      <AdminUserPage />
    </ProtectedRoute>
  );
};

export default AdminUserDashboard;
