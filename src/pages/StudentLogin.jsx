import React from 'react'
import logo from "../assets/favicon/smit-logo.png";

const StudentLogin = () => {
  return (
    <>
   
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <img
          src={logo}
          alt="SMIT Logo"
          className="h-16 mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3">
          Login
        </button>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg">
          Signup
        </button>
      </div>
    </div>
  



    </>
  )
}

export default StudentLogin
