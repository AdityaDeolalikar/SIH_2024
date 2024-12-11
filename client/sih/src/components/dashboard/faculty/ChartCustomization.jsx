import React, { useState } from "react";

const ChartCustomization = () => {
  const [chartType, setChartType] = useState("bar");
  const [metrics, setMetrics] = useState([
    { id: "patents", enabled: true, color: "#3B82F6" },
    { id: "research", enabled: true, color: "#10B981" },
    { id: "startups", enabled: true, color: "#F59E0B" },
    { id: "projects", enabled: true, color: "#8B5CF6" },
  ]);

  const toggleMetric = (id) => {
    setMetrics(
      metrics.map((metric) =>
        metric.id === id ? { ...metric, enabled: !metric.enabled } : metric
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Chart Customization</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Chart Type</h3>
          <div className="flex gap-4">
            {["bar", "line", "pie", "radar"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-2 rounded-lg ${
                  chartType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Metrics</h3>
          <div className="space-y-3">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="flex items-center justify-between"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={metric.enabled}
                    onChange={() => toggleMetric(metric.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 capitalize">{metric.id}</span>
                </label>
                <input
                  type="color"
                  value={metric.color}
                  onChange={(e) =>
                    setMetrics(
                      metrics.map((m) =>
                        m.id === metric.id ? { ...m, color: e.target.value } : m
                      )
                    )
                  }
                  className="w-8 h-8 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Chart preview will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCustomization;
