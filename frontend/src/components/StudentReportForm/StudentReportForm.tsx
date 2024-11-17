import React, { useState } from "react";
import { Volume, Volume1, Volume2 } from "lucide-react";

const locations = [
  "D100",
  "D101",
  "D102",
  "D103",
  "D200",
  "D201",
  "D202",
  "D203",
  "D300",
  "D301",
  "D302",
  "D303",
  "1F Hallway",
  "2F Hallway",
  "3F Hallway",
];

interface StudentReportFormProps {
  studentId: string;
}

const StudentReportForm: React.FC<StudentReportFormProps> = ({ studentId }) => {
  const [location, setLocation] = useState("");
  const [noise_level, setnoise_level] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMessage("");

    if (!location || noise_level === 0) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    fetch("http://52.54.165.137:5000/api/student_report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        noise_level: noise_level,
        location: location,
        notes: notes,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit report");
        }
        return response.json();
      })
      .then(() => {
        setSubmitStatus("success");
        // Reset form fields
        setLocation("");
        setnoise_level(0);
        setNotes("");
      })
      .catch((error) => {
        setSubmitStatus("error");
        setErrorMessage(
          "An error occurred while submitting the report. Please try again."
        );
        console.error("Error submitting report:", error);
      });
  };

  const getVolumeColor = (level: number) => {
    const colors = [
      "text-green-500",
      "text-yellow-500",
      "text-orange-500",
      "text-red-500",
      "text-purple-500",
    ];
    return colors[level - 1] || "text-gray-400";
  };

  const renderVolumeIcon = (level: number) => {
    const isSelected = noise_level >= level;
    const color = isSelected ? getVolumeColor(level) : "text-gray-400";
    const commonProps = {
      className: `w-8 h-8 cursor-pointer ${color}`,
      onClick: () => setnoise_level(level),
    };

    switch (level) {
      case 1:
      case 2:
        return <Volume {...commonProps} />;
      case 3:
      case 4:
        return <Volume1 {...commonProps} />;
      case 5:
        return <Volume2 {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#003B71] mb-6">
        Submit Noise Report
      </h2>

      <div className="mb-4">
        <label
          htmlFor="studentId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Student ID
        </label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          disabled
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#003B71] focus:border-[#003B71] text-black"
          required
        >
          <option value="">Select a location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Noise Level
        </label>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((level) => renderVolumeIcon(level))}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#003B71] focus:border-[#003B71] text-black"
          rows={4}
          placeholder="Describe the noise issue..."
        ></textarea>
      </div>

      {submitStatus === "error" && (
        <div className="mb-4 text-red-500">{errorMessage}</div>
      )}

      {submitStatus === "success" && (
        <div className="mb-4 text-green-500">
          Report submitted successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className={`w-full bg-[#003B71] text-white py-2 px-4 rounded-md hover:bg-[#002b54] focus:outline-none focus:ring-2 focus:ring-[#003B71] focus:ring-opacity-50 ${
          submitStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {submitStatus === "loading" ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
};

export default StudentReportForm;
