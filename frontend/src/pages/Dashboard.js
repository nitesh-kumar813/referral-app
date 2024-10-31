import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const copyReferralCode = () => {
    if (dashboardData?.referralCode) {
      navigator.clipboard.writeText(dashboardData.referralCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
     
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <h1 className="flex items-center justify-center mb-12 text-2xl font-bold">
        Your Dashboard
      </h1>

      <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Referral Code Box */}
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex-1">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Your Referral Code
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 bg-gray-800 border border-gray-600 rounded-lg flex items-center space-x-2">
              <p className="text-xl text-red-600">
                {dashboardData ? dashboardData.referralCode : "Loading..."}
              </p>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <FiCopy
                onClick={copyReferralCode}
                className="cursor-pointer text-gray-400 hover:text-white"
                size={18}
              />

              {isHovered && !isCopied && (
                <span className="absolute left-full ml-2 text-sm text-blue-400">
                  Copy
                </span>
              )}
              {isCopied && (
                <span className="absolute left-full ml-2 text-sm text-green-400">
                  Copied
                </span>
              )}
            </div>
          </div>
        </div>

        
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex-1">
          <h3 className="mb-4 text-2xl font-bold text-center">Your Referrals</h3>
          {dashboardData &&
          dashboardData.referrals &&
          dashboardData.referrals.length > 0 ? (
            <ul className="list-none space-y-4">
              {dashboardData.referrals.map((referral) => (
                <li
                  key={referral._id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div>
                    <span className="font-semibold text-green-400">Email:</span>{" "}
                    <span className="text-yellow-400">{referral.email}</span>,{" "}
                    <span className="font-semibold text-green-400">Referral Code:</span>{" "}
                    <span className="text-blue-400">{referral.referralCode}</span>
                  </div>

                  <div className="px-2 py-1 ml-4 text-sm text-green-800 bg-green-200 rounded">
                    Successful
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">No referrals yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
