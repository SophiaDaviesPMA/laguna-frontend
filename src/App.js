// App starting point for a ride-booking MVP (Laguna Car Services)
// Tech Stack: React (Web), React Native (Mobile - future), Node.js backend (live on Render)
// Includes booking form, admin tools, and API integration

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const API_URL = "https://laguna-backend.onrender.com/api/bookings";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Laguna Car Services</h1>
      <p className="mb-6">Book a luxury ride with ease.</p>
      <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate("/book")}>Book Now</button>
    </div>
  );
}

function BookRide() {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    vehicle: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Ride booked successfully!");
      } else {
        alert("Failed to book ride.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Book a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="pickup" placeholder="Pickup Location" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="dropoff" placeholder="Dropoff Location" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="date" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="time" name="time" onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="vehicle" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Vehicle Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Luxury Van">Luxury Van</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Confirm Booking</button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setBookings)
      .catch(() => alert("Failed to load bookings"));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <h3 className="text-lg font-medium mb-2">View Bookings</h3>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Pickup</th>
            <th className="border px-4 py-2">Dropoff</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.pickup}</td>
              <td className="border px-4 py-2">{booking.dropoff}</td>
              <td className="border px-4 py-2">{booking.date}</td>
              <td className="border px-4 py-2">{booking.time}</td>
              <td className="border px-4 py-2">{booking.vehicle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookRide />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;