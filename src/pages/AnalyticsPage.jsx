import React from "react";
import OverallAnalytics from "../components/graphs/OverallAnalytics";
import StudentActivity from "../components/graphs/StudentActivity";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Platform Analytics
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <OverallAnalytics />
          <StudentActivity />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
