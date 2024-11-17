import React, { useState } from "react";
import { Home, AlertTriangle } from "lucide-react";
import d1 from "../../assets/Riverview-D1.png";
import d2 from "../../assets/Riverview-D2.png";
import d3 from "../../assets/Riverview-D3.png";
import { Device } from "../../utils/types";
import NoiseIcon from "../icons/NoiseIcon/NoiseIcon";

const Switch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => (
  <div
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${
      checked ? "bg-[#003B71]" : "bg-gray-300"
    }`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </div>
);

const getFloorPlan = (floor: string) => {
  switch (floor) {
    case "1":
      return d1;
    case "2":
      return d2;
    case "3":
      return d3;
    default:
      return "placeholder";
  }
};

interface FloorMapProps {
  reportedRooms: Set<string>;
  device1: Device;
  device2: Device;
  device3: Device;
}

const FloorMap: React.FC<FloorMapProps> = ({
  reportedRooms,
  device1,
  device2,
  device3,
}) => {
  const [currentFloor, setCurrentFloor] = useState("1");
  const [showActualPlan, setShowActualPlan] = useState(false);

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFloor(event.target.value);
  };

  const getHallwayColor = (noiseLevel: number) => {
    switch (noiseLevel) {
      case 1:
        return "bg-green-200";
      case 2:
        return "bg-yellow-200";
      case 3:
        return "bg-orange-200";
      case 4:
        return "bg-red-200";
      case 5:
        return "bg-red-400";
    }
  };

  const getNoiseLevel = (currentFloor: string) => {
    switch (currentFloor) {
      case "1":
        return device1.noise_level;
      case "2":
        return device2.noise_level;
      case "3":
        return device3.noise_level;
      default:
        return 1;
    }
  };

  const renderRoom = (roomNumber: string) => (
    <div
      key={roomNumber}
      className={`flex items-center justify-center border border-gray-300 relative cursor-pointer h-full ${
        reportedRooms.has(roomNumber) && "bg-red-200"
      }`}
    >
      {reportedRooms.has(roomNumber) ? (
        <AlertTriangle className="w-12 h-12 text-red-500" />
      ) : (
        <Home className="w-8 h-8 text-[#003B71]" />
      )}
      <span className="absolute top-1 left-1 text-xs font-bold text-black">
        {roomNumber}
      </span>
    </div>
  );

  const renderSimplifiedPlan = () => (
    <div className="grid grid-cols-5 gap-2 w-full h-96 mx-auto border-2 border-[#003B71] p-4">
      <div className="col-span-2 grid grid-rows-2 gap-4">
        {renderRoom(`D${currentFloor}00`)}
        {renderRoom(`D${currentFloor}02`)}
      </div>
      <div
        className={`col-span-1 flex items-center justify-center border border-gray-300 relative cursor-pointer ${getHallwayColor(
          getNoiseLevel(currentFloor)
        )}`}
      >
        <NoiseIcon size={12} level={getNoiseLevel(currentFloor)} />
      </div>
      <div className="col-span-2 grid grid-rows-2 gap-4">
        {renderRoom(`D${currentFloor}01`)}
        {renderRoom(`D${currentFloor}03`)}
      </div>
    </div>
  );

  const renderActualPlan = () => (
    <div className="w-full h-full mx-auto border-2 border-[#003B71] p-4">
      <img
        src={getFloorPlan(currentFloor)}
        alt={`Actual Floor ${currentFloor} Plan`}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label
            htmlFor="floor-select"
            className="mr-2 font-bold text-[#003B71]"
          >
            Select Floor:
          </label>
          <select
            id="floor-select"
            value={currentFloor}
            onChange={handleFloorChange}
            className="border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#003B71]"
          >
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
            <option value="3">Floor 3</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch checked={showActualPlan} onChange={setShowActualPlan} />
          <label
            htmlFor="plan-toggle"
            className="text-sm font-medium text-gray-700"
          >
            Show Actual Plan
          </label>
        </div>
      </div>
      {showActualPlan ? renderActualPlan() : renderSimplifiedPlan()}
    </div>
  );
};

export default FloorMap;
