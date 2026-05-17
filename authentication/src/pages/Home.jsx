import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { token, user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {token && user ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user.name}
            </h1>
            <div className="flex flex-col gap-3">
              <Link
                to="/profile"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                View Profile
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Auth App
            </h1>
            <p className="text-gray-600 mb-6">
              Please login or create an account to continue.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
