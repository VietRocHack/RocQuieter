import React, { useState } from "react";

type LoginFormProps = {
  type: "student" | "ra";
  onSubmit: (id: string, password: string) => void;
};

export default function LoginForm({ type, onSubmit }: LoginFormProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    onSubmit(id, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div className="space-y-2">
        <label
          htmlFor={`${type}-id`}
          className="block text-sm font-medium text-gray-700"
        >
          Student ID
        </label>
        <input
          id={`${type}-id`}
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003B71] focus:ring focus:ring-[#003B71] focus:ring-opacity-50"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor={`${type}-password`}
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id={`${type}-password`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003B71] focus:ring focus:ring-[#003B71] focus:ring-opacity-50"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#003B71] hover:bg-[#002b54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003B71]"
      >
        Login as {type === "student" ? "Student" : "RA"}
      </button>
    </form>
  );
}
