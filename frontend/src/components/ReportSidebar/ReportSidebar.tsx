import StudentReportTile from "./StudentReportTile/StudentReportTile";
import DeviceTile from "./DeviceTile/DeviceTile";
import { Device, StudentReport } from "../../utils/types";

// Mock data for student reports
// const studentReports: StudentReport[] = [
//   { id: 1, location: "Room 201", noise_level: 4, time: "2023-11-14T10:30:00Z" },
//   {
//     id: 2,
//     location: "Common Area",
//     noise_level: 2,
//     time: "2023-11-14T09:45:00Z",
//   },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
//   { id: 3, location: "Room 105", noise_level: 5, time: "2023-11-14T08:15:00Z" },
// ];

// Mock data for devices

interface ReportSidebarProps {
  onItemSelect: (item: StudentReport | Device) => void;
  studentReports: StudentReport[];
  device1: Device;
  device2: Device;
  device3: Device;
}

const ReportSidebar: React.FC<ReportSidebarProps> = ({
  onItemSelect,
  studentReports,
  device1,
  device2,
  device3,
}) => {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      <div className="h-2/3 p-4 shadow-md">
        <h2 className="text-xl font-bold text-[#003B71] mb-3">
          Student Reports
        </h2>
        <div className="h-[90%] overflow-hidden overflow-y-auto">
          {studentReports.map((report) => (
            <StudentReportTile
              key={report.id}
              report={report}
              onSelect={onItemSelect}
            />
          ))}
        </div>
      </div>
      <div className="h-1/3 p-4 border-t-4 border-white shadow-md">
        <h2 className="text-xl font-bold text-[#003B71] mb-3">Devices</h2>
        <div className="h-[90%] overflow-hidden overflow-y-auto">
          <DeviceTile
            key={`device_${device1.id}`}
            device={device1}
            onSelect={onItemSelect}
          />
          <DeviceTile
            key={`device_${device2.id}`}
            device={device2}
            onSelect={onItemSelect}
          />
          <DeviceTile
            key={`device_${device3.id}`}
            device={device3}
            onSelect={onItemSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportSidebar;
