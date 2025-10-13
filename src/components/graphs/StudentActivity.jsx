import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getStudentActivity } from "../../utils/api";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const StudentActivity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const res = await getStudentActivity();
        setData(res || []);
      } catch (err) {
        console.error("Error fetching student activity:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Loading Student Activity...</p>;

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Student Completion Progress
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentActivity;
