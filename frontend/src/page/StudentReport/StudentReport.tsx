import React from "react";

import TopBar from "../../components/TopBar/TopBar";
import StudentReportForm from "../../components/StudentReportForm/StudentReportForm";

const StudentReportPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <TopBar
        isRADashboard={false}
        dormitory="Riverview D"
        floor="Student Report"
        raName="Khoi Thai"
      />
      <main className="container mx-auto px-4 py-8">
        <StudentReportForm studentId="khoithai" />
      </main>
    </div>
  );
};

export default StudentReportPage;
