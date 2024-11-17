export interface StudentReport {
  id: string;
  student_id: string;
  location: string;
  noise_level: 1 | 2 | 3 | 4 | 5;
  timestamp: number;
  notes: string
}

export interface Device {
  id: number;
  name: string;
  location: string;
  noise_level: 1 | 2 | 3 | 4 | 5;
  readings: DeviceReading[];
  isOnline: boolean;
}

export interface DeviceReading {
  timestamp: number;
  readings: number;
}
export interface Room {
  roomNumber: string;
  tenant: string;
  image: string;
}


export interface FloorData {
  rooms: Record<string, RoomStatus>;
  device: Device
}

export interface RoomStatus {
  hasAlert: boolean;
  isSelected: boolean;
}

