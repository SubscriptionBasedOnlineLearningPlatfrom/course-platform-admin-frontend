import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { getAllCourses, deleteCourse } from "../utils/api"; 

const CourseManagement = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses(); 
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
        try {
            await deleteCourse(id);
            setCourses(courses.filter(course => course.id !== id));
        } catch (err) {
            console.error("Failed to delete course:", err);
        }
    }
  };


  //filter course by name
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading Courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Course Management</h1>

      {/* Search bar */}
      <div className="w-full max-w-8xl mx-auto mb-6 px-6">
        <input
          type="text"
          placeholder="Search by course name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-8xl shadow-lg rounded-2xl bg-white overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Course Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Instructor</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Level</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Enrolled Students</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Date Created</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="bg-white shadow-sm hover:bg-blue-50 transition-all duration-200 rounded-xl"
                >
                  <td className="px-6 py-6 text-gray-800 text-base">{course.name}</td>
                  <td className="px-6 py-6 text-gray-600 text-base">{course.instructor}</td>
                  <td className="px-6 py-6 text-gray-600 text-base">{course.level}</td>
                  <td className="px-6 py-6 text-center text-gray-600">{course.students}</td>
                  <td className="px-6 py-6 text-center text-gray-500">        
                    {new Date(course.dateCreated).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="inline w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCourses.length === 0 && (
            <p className="text-center py-6 text-gray-500 text-lg">No courses available.</p>
          )}
        </div>
      </div>

      {filteredCourses.length > coursesPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
