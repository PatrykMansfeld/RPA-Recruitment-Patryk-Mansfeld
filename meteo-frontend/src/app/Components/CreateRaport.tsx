"use client";

import React, { useState } from "react";
import { TemperatureUnit } from "../../types/index";
import { reportService } from "../../services/Api";
import { useRouter } from 'next/navigation'

const CreateRaport: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    temperature: 0,
    unit: "Celsius" as TemperatureUnit,
    city: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "temperature" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await reportService.createReport(formData);
      setFormData({
        temperature: 0,
        unit: "Celsius",
        city: "",
        date: "",
      });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-blue-50 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Create New Report
      </h2>
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-400 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Temperature:
          </label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
            className="border-2 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Unit:</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="border-2 rounded-lg bg-white p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200"
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="border-2 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border-2 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold 
                    hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed
                    transform transition duration-200 hover:scale-[1] active:scale-[1]
                    shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Report"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateRaport;
