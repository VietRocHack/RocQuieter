import { Wifi, WifiOff } from "lucide-react";
import { Device } from "../../../utils/types";
import NoiseIcon from "../../icons/NoiseIcon/NoiseIcon";
interface DeviceTileProps {
  device: Device;
  onSelect: (device: Device) => void;
}
const DeviceTile: React.FC<DeviceTileProps> = ({ device, onSelect }) => (
  <div
    className="flex items-center p-3 bg-white rounded-lg shadow mb-2 cursor-pointer hover:bg-gray-50 text-black"
    onClick={() => onSelect(device)}
  >
    <NoiseIcon size={6} level={device.noise_level} />
    <div className="ml-3 flex-grow">
      <p className="font-semibold text-sm">{device.name}</p>
      <p className="text-xs text-gray-500">{device.location}</p>
    </div>
    {device.isOnline ? (
      <Wifi className="w-5 h-5 text-green-500" />
    ) : (
      <WifiOff className="w-5 h-5 text-red-500" />
    )}
  </div>
);

export default DeviceTile;
