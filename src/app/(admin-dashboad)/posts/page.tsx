import AdminPostsPage from "@/app/components/Dashboard/Posts/page";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React from "react";

const AdminPostDashboard = () => {
  return (
    <ProtectedRoute>
      <AdminPostsPage />
    </ProtectedRoute>
  );
};

export default AdminPostDashboard;
