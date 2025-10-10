import { useState } from 'react'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ViewPayment from './pages/ViewPayment'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view-payment" element={<ViewPayment />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
      </div>
  )
}

export default App
