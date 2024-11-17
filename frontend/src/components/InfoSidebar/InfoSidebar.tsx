import React from "react";
import { Device, StudentReport } from "../../utils/types";
import StudentReportInfo from "./StudentReportInfo/StudentReportInfo";
import DeviceInfo from "./DeviceInfo/DeviceInfo";

interface RightSectionProps {
  selectedItem: StudentReport | Device | null;
}

const InfoSidebar: React.FC<RightSectionProps> = ({ selectedItem }) => {
  if (!selectedItem) {
    return (
      <div className="w-full h-full bg-white p-4 shadow-md flex items-center justify-center">
        <p className="text-lg text-gray-500">Select an item to view details</p>
      </div>
    );
  }

  const isStudentReport = "student_id" in selectedItem;

  return (
    <div className="w-full h-full">
      {isStudentReport ? (
        <StudentReportInfo report={selectedItem as StudentReport} />
      ) : (
        <DeviceInfo device={selectedItem as Device} />
      )}
    </div>
  );
};

export default InfoSidebar;
