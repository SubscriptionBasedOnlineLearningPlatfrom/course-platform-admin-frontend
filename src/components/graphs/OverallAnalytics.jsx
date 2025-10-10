import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const OverallAnalytics = ({ data }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Overall Platform Analytics
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 40, left: 40, bottom: 40 }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="name"
            label={{
              value: "Metrics",
              position: "insideBottomRight",
              offset: -10,
              fontSize: 14,
            }}
          />
          <YAxis
            label={{
              value: "Count",
              angle: -90,
              position: "insideLeft",
              fontSize: 14,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#3b82f6" name="Count" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverallAnalytics;
