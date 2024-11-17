import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./page/LoginScreen/LoginScreen";
import RADashboard from "./page/RADashboard/RADashboard";
import StudentReportPage from "./page/StudentReport/StudentReport";

const App: React.FC = () => {
  // This should be replaced with actual authentication logic
  // const isAuthenticated = true;
  // const userRole = "ra"; // 'student' or 'ra'

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/student-dashboard"
          element={<StudentReportPage />}
          // element={
          //   isAuthenticated && userRole === "student" ? (
          //     <StudentDashboard />
          //   ) : (
          //     <Navigate to="/login" replace />
          //   )
          // }
        />
        <Route path="/ra-dashboard" element={<RADashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
