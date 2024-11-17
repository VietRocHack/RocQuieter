import React from "react";
import { User } from "lucide-react";
import logo from "../../assets/rocquieter_icon.png";
import { Link } from "react-router-dom";

interface TopBarProps {
  isRADashboard: boolean;
  dormitory: string;
  floor: string;
  raName: string;
}

const TopBar: React.FC<TopBarProps> = ({
  isRADashboard,
  dormitory,
  floor,
  raName,
}) => {
  return (
    <header className="bg-[#003B71] text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/login"
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
        >
          <img
            src={logo}
            alt="University of Rochester logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold text-white">RocQuieter</h1>
          <h1 className="text-2xl text-white">
            |&nbsp;&nbsp;
            {isRADashboard
              ? "Resident Advisor Dashboard"
              : "Student Noise Report"}
          </h1>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="text-sm">
            <span className="font-semibold">{dormitory}</span>
            <span className="mx-2">|</span>
            <span>Floor {floor}</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#002b54] py-1 px-3 rounded-full">
            <User size={18} />
            <span className="text-sm font-medium">{raName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
