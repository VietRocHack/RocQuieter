import React from "react";
import { StudentReport } from "../../../utils/types";
import riverviewImg from "../../../assets/Riverview-cover-img.jpg";

interface StudentReportInfoProps {
  report: StudentReport;
}

const StudentReportInfo: React.FC<StudentReportInfoProps> = ({ report }) => {
  console.log(report);
  return (
    <div className="w-full h-full bg-white p-4 shadow-md overflow-y-auto">
      <h2 className="text-xl font-bold text-[#003B71] mb-4">
        Student Report Details
      </h2>

      <div className="mb-4 bg-gray-200 h-48 flex items-center justify-center">
        <img
          src={riverviewImg}
          alt={`Room view`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2 text-black">
        <p className="text-sm">
          <strong>Location:</strong> {report.location}
        </p>
        <p className="text-sm">
          <strong>Noise Level:</strong> {report.noise_level}
        </p>
        <p className="text-sm">
          <strong>Reported At:</strong>{" "}
          {new Date(report.timestamp).toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Reported By:</strong> {report.student_id}
        </p>
        <p className="text-sm">
          <strong>Additional Comments:</strong> {report.notes}
        </p>
      </div>
    </div>
  );
};

export default StudentReportInfo;
