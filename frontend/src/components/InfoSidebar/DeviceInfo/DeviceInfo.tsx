import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Device } from "../../../utils/types";

// Mock data for the chart
// const noiseData = [
//   { time: "00:00", noise_level: 2 },
//   { time: "04:00", noise_level: 1 },
//   { time: "08:00", noise_level: 3 },
//   { time: "12:00", noise_level: 4 },
//   { time: "16:00", noise_level: 5 },
//   { time: "20:00", noise_level: 3 },
// ];

interface DeviceInfoProps {
  device: Device;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ device }) => {
  return (
    <div className="w-full h-full bg-white p-4 shadow-md overflow-y-auto">
      <h2 className="text-xl font-bold text-[#003B71] mb-4">Device Details</h2>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={device.readings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="decibel"
              stroke="#003B71"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 text-black">
        <p className="text-sm">
          <strong>Device Name:</strong> {device.name}
        </p>
        <p className="text-sm">
          <strong>Location:</strong> {device.location}
        </p>
        <p className="text-sm">
          <strong>Current Noise Level:</strong> {device.noise_level}
        </p>
        <p className="text-sm">
          <strong>Decibel Level:</strong> {device.noise_level * 10} dB
          (estimated)
        </p>
        <p className="text-sm">
          <strong>Status:</strong> {device.isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default DeviceInfo;
