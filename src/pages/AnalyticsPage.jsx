import React, { useState, useEffect } from "react";
import OverallAnalytics from "../components/graphs/OverallAnalytics";
import InstructorPerformance from "../components/graphs/InstructorPerformance";
import StudentActivity from "../components/graphs/StudentActivity";
import { getInstructorPerformance, getOverallAnalytics, getStudentActivity } from "../utils/api";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("instructors");
  const [loading, setLoading] = useState(true);

  const [instructorData, setInstructorData] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  //fetch instructor data
  const fetchInstructorData = async () => {
    setLoading(true);
    try {
      const data = await getInstructorPerformance();
      setInstructorData(data);
    } catch (err) {
      console.error("Failed to fetch instructor data:", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch platform data (overall + student activity)
  const fetchPlatformData = async () => {
    setLoading(true);
    try {
      const [overall, student] = await Promise.all([
        getOverallAnalytics(),
        getStudentActivity(),
      ]);
      setOverallData(overall);
      setStudentData(student);
    } catch (err) {
      console.error("Failed to fetch platform data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructorData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "instructors" && instructorData.length === 0) {
      fetchInstructorData();
    } else if (tab === "platform" && (overallData.length === 0 || studentData.length === 0)) {
      fetchPlatformData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Platform Analytics
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => handleTabChange("instructors")}
          className={`px-6 py-2 rounded-full text-lg font-medium transition-all ${
            activeTab === "instructors"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          Instructor Performance
        </button>

        <button
          onClick={() => handleTabChange("platform")}
          className={`px-6 py-2 rounded-full text-lg font-medium transition-all ${
            activeTab === "platform"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          Platform Insights
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        {activeTab === "instructors" && (
          <InstructorPerformance data={instructorData} />
        )}

        {activeTab === "platform" && (
          <div className="grid md:grid-cols-2 gap-8">
            <OverallAnalytics data={overallData} />
            <StudentActivity data={studentData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
