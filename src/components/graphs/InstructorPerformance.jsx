import React, { useEffect, useState } from "react"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getInstructorPerformance } from "../../utils/api";

const InstructorPerformance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const res = await getInstructorPerformance(); 
        setData(res || []);
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading Highest Rated Courses...</p>;
  }

  // Filter out courses with 0 rating and take top 10
  const topCourses = data
    .filter(course => course.rating > 0)
    .slice(0, 10);

  if (topCourses.length === 0) {
    return <p className="text-center text-gray-600">No courses with ratings yet.</p>;
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Highest Rated Courses (Top 10)</h2>
      <div style={{ minWidth: `${Math.max(topCourses.length * 80, 600)}px` }}>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            layout="vertical"
            data={topCourses}
            margin={{ top: 5, right: 20, left: 150, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="course_title"
              tick={{ fontSize: 12 }}
              width={200}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#82ca9d" name="Rating" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InstructorPerformance;
