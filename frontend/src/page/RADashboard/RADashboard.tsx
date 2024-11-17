import React, { useEffect, useState } from "react";
import ReportSidebar from "../../components/ReportSidebar/ReportSidebar";
import InfoSidebar from "../../components/InfoSidebar/InfoSidebar";
import { Device, StudentReport } from "../../utils/types";
import TopBar from "../../components/TopBar/TopBar";
import FloorMap from "../../components/FloorMap/FloorMap";
import { io } from "socket.io-client";

const devices: Device[] = [
  {
    id: 1,
    name: "Device 1",
    location: "1F Hallway",
    noise_level: 1,
    readings: [],
    isOnline: true,
  },
  {
    id: 2,
    name: "Device 2",
    location: "2F Hallway",
    noise_level: 1,
    readings: [],
    isOnline: true,
  },
  {
    id: 3,
    name: "Device 3",
    location: "3F Hallway",
    noise_level: 1,
    readings: [],
    isOnline: true,
  },
];

const RADashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<
    StudentReport | Device | null
  >(null);
  const [studentReports, setStudentReports] = useState<StudentReport[]>([]);
  const [reportedRooms, setReportedRooms] = useState<Set<string>>(new Set());
  const [device1, setDevice1] = useState<Device>(devices[0]);
  const [device2, setDevice2] = useState<Device>(devices[1]);
  const [device3, setDevice3] = useState<Device>(devices[2]);

  const getNoiseLevel = (decibel: number) => {
    console.log(decibel);
    if (decibel < 0.2) return 1;
    if (decibel < 0.4) return 2;
    if (decibel < 0.6) return 3;
    if (decibel < 0.8) return 4;
    return 5;
  };

  useEffect(() => {
    fetch("http://52.54.165.137:5000/api/student_report")
      .then((response) => response.json())
      .then((response_json) => {
        setStudentReports(response_json);

        setReportedRooms((prevRooms) => {
          for (const report of response_json) {
            if (report.location) {
              prevRooms.add(report.location);
            }
          }
          return prevRooms;
        });
      })
      .catch((errors) => {
        alert("Unable to retrieve student reports");
        console.error(errors);
      });
  }, []);

  useEffect(() => {
    const socket = io("http://52.54.165.137:5000");

    socket.on("update_student_reports", (event) => {
      console.log("received something from update_student!");
      const data = event;
      console.log(data);
      setStudentReports(event);
    });

    for (let i = 1; i <= 3; i++) {
      socket.on(`update_device_noise_${i}`, (event) => {
        console.log(`Received data from device_noise_${i}`);
        const newNoiseLevel = getNoiseLevel(
          parseFloat(event[event.length - 1].decibel)
        );
        console.log(newNoiseLevel);
        const convertedToTime = event.map(
          (item: { timestamp: number; decibel: string }) => {
            const date = new Date(item.timestamp); // Convert to milliseconds
            const hours = date.getHours().toString().padStart(2, "0"); // Ensure 2-digit hours
            const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure 2-digit minutes
            return {
              ...item,
              decibel: parseFloat(item.decibel) * 100,
              time: `${hours}:${minutes}`, // Add formatted time
            };
          }
        );
        console.log(event);
        switch (i) {
          case 1:
            setDevice1({
              ...device1,
              readings: convertedToTime,
              noise_level: newNoiseLevel,
            });
            break;
          case 2:
            setDevice2({
              ...device2,
              readings: convertedToTime,
              noise_level: newNoiseLevel,
            });
            break;
          case 3:
            setDevice3({
              ...device3,
              readings: convertedToTime,
              noise_level: newNoiseLevel,
            });
        }
      });
    }

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-screen flex flex-col h-screen bg-gray-100">
      {" "}
      <TopBar
        isRADashboard={true}
        dormitory="Riverview D"
        floor="3"
        raName="Khoi Thai"
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Section */}
        <div className="w-1/4 bg-white p-4 shadow-md">
          <ReportSidebar
            onItemSelect={setSelectedItem}
            studentReports={studentReports}
            device1={device1}
            device2={device2}
            device3={device3}
          />
        </div>
        {/* Middle Section (Largest) */}
        <div className="flex-1 bg-white m-4 p-4 shadow-md">
          <h2 className="text-xl font-bold text-[#003B71] mb-4">Floor Map</h2>
          <FloorMap
            reportedRooms={reportedRooms}
            device1={device1}
            device2={device2}
            device3={device3}
          />
        </div>
        {/* Right Section */}
        <div className="w-1/4 bg-white p-4 shadow-md">
          <InfoSidebar selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default RADashboard;
