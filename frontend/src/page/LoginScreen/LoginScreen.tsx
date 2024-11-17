import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/rocquieter_icon.png";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleStudentLogin = (id: string, password: string) => {
    // Implement student login logic here
    console.log("Student login:", id, password);
    if (id === "student" && password === "12345") {
      navigate("/student-dashboard");
    } else {
      alert("Incorrect username or password!");
    }
  };

  const handleRALogin = (id: string, password: string) => {
    // Implement RA login logic here
    console.log("RA login:", id, password);
    if (id === "student-ra" && password === "12345") {
      navigate("/ra-dashboard");
    } else {
      alert("Incorrect username or password!");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="University of Rochester logo"
            className="mx-auto mb-4 w-60"
          />
          <h1 className="text-4xl font-bold text-[#003B71] mb-2">RocQuieter</h1>
          <p className="text-xl text-[#003B71]">
            Dormitory noise control system
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#FFD100]">
            <h2 className="text-2xl font-bold mb-4 text-[#003B71]">
              Student Login
            </h2>
            <LoginForm type="student" onSubmit={handleStudentLogin} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#FFD100]">
            <h2 className="text-2xl font-bold mb-4 text-[#003B71]">RA Login</h2>
            <LoginForm type="ra" onSubmit={handleRALogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
