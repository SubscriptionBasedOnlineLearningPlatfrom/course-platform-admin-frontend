import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const InstructorPerformance = ({ data }) => {
  // Sort by courses popularity descending and take top 10
  const topInstructors = [...data]
    .sort((a, b) => b.courses - a.courses)
    .slice(0, 10);

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Instructor Performance (Top 10)</h2>
      <div style={{ minWidth: `${Math.max(topInstructors.length * 80, 600)}px` }}>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            layout="vertical"
            data={topInstructors}
            margin={{ top: 5, right: 20, left: 100, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="instructor"
              tick={{ fontSize: 12 }}
              width={150}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="courses" fill="#82ca9d" name="Courses Popularity" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InstructorPerformance;
