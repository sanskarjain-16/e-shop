import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
          E-Commerce Project
        </h1>
        <p className="text-gray-600 mb-6">
          Vite + React + Tailwind CSS is officially up and running!
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;