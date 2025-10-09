import { useState } from 'react'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [currentPage, setCurrentPage] = useState('users')

  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <Users />
      case 'login':
        return <Login />
      case 'register':
        return <Register />
      default:
        return <Users />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('users')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'users'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setCurrentPage('login')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'login'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'register'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {renderPage()}
    </div>
  )
}

export default App
