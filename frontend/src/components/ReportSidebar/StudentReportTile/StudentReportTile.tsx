import { StudentReport } from "../../../utils/types";
import NoiseIcon from "../../icons/NoiseIcon/NoiseIcon";
interface StudentReportTileProps {
  report: StudentReport;
  onSelect: (report: StudentReport) => void;
}
const StudentReportTile: React.FC<StudentReportTileProps> = ({
  report,
  onSelect,
}) => (
  <div
    className="flex items-center p-3 bg-white rounded-lg shadow mb-2 cursor-pointer hover:bg-gray-50 text-black"
    onClick={() => onSelect(report)}
  >
    <NoiseIcon size={6} level={report.noise_level} />
    <div className="ml-3 flex-grow">
      <p className="font-semibold text-sm">{report.location}</p>
      <p className="text-xs text-gray-500">
        {new Date(report.timestamp).toLocaleString()}
      </p>
    </div>
  </div>
);

export default StudentReportTile;
