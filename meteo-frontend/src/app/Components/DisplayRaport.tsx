"use client";

import React, { useEffect, useState } from "react";
import ReportForm from "./ReportForm";
import { WeatherReportsHooks } from "../../hooks/WeatherReportsHooks";
import { convertToKelvin } from "../../Utils/UnitConverter";

interface WeatherReport {
  id: string;
  temperature: number;
  unit: string;
  city: string;
  date: string;
}

const DisplayReport: React.FC = () => {
  const {
    state,
    editingReport,
    isSubmitting,
    fetchReports,
    handleDelete,
    handleEdit,
    handleUpdate,
    handleEditChange,
    setEditingReport,
  } = WeatherReportsHooks();

  const [sortField, setSortField] = useState<"temperature" | "date" | "city">(
    "date"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const sortReports = (data: WeatherReport[]) => {
    return [...data].sort((a, b) => {
      if (sortField === "temperature") {
        return sortDirection === "asc"
          ? a.temperature - b.temperature
          : b.temperature - a.temperature;
      }
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return sortDirection === "asc"
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city);
    });
  };

  const filterReports = (data: WeatherReport[]) => {
    if (!filterCity) return data;
    return data.filter((report) =>
      report.city.toLowerCase().includes(filterCity.toLowerCase())
    );
  };

  if (state.loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error: {state.error}
      </div>
    );
  }

  const processedData = filterReports(sortReports(state.data));

  return (
    <div className="max-w-4xl mx-auto p-6 border-2 border-black-200 bg-blue-50 rounded-lg">
      <h1 className="text-3xl  font-bold mb-6">Weather Reports</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 items-center">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="p-3 border bg-white rounded"
          >
            <option value="date">Sort by Date</option>
            <option value="temperature">Sort by Temperature</option>
            <option value="city">Sort by City</option>
          </select>
          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="p-2 border rounded hover:bg-gray-100 w-10 bg-white"
            aria-label="Toggle sort direction"
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
        <input
          type="text"
          placeholder="Filter by city..."
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="p-2 border rounded flex-grow bg-white"
        />
      </div>

      {editingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Report</h2>
            <ReportForm
              formData={editingReport}
              isSubmitting={isSubmitting}
              onSubmit={handleUpdate}
              onChange={handleEditChange}
              submitText="Update Report"
            />
            <button
              onClick={() => setEditingReport(null)}
              className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {processedData.length === 0 ? (
        <p className="text-gray-500">No reports available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processedData.map((report) => (
            <div
              key={report.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200 rounded-lg"
            >
              <p className="text-lg text-gray-600 mb-2">
                {" "}
                Temp:
                {`${convertToKelvin(report.temperature, report.unit).toFixed(
                  0
                )}°K`}
                <span className="text-sm text-gray-400 ml-2">
                  (Original: {report.temperature}°{report.unit[0].toUpperCase()}
                  )
                </span>
              </p>
              <p className="text-gray-700">{report.city}</p>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(report.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(report)}
                  className="flex-1 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="flex-1 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayReport;
