/* import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' */
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ViewPayment from './pages/ViewPayment'
import CourseManagement from './pages/CourseManagement.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view-payment" element={<ViewPayment />} />
          <Route path="/" element={<Dashboard />} />       
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
       
      </Routes>
      </div>
  )
}

export default App
