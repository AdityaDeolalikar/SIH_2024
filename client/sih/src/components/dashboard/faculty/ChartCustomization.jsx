import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartCustomization = () => {
  const [chartType, setChartType] = useState("bar");
  const [metrics, setMetrics] = useState([
    { id: "patents", enabled: true, color: "#3B82F6", value: 90 },
    { id: "research", enabled: true, color: "#10B981", value: 82 },
    { id: "startups", enabled: true, color: "#F59E0B", value: 88 },
    { id: "projects", enabled: true, color: "#8B5CF6", value: 80 },
  ]);

  const toggleMetric = (id) => {
    setMetrics(
      metrics.map((metric) =>
        metric.id === id ? { ...metric, enabled: !metric.enabled } : metric
      )
    );
  };

  // Modify the chart data structure to work better with line and radar charts
  const chartData = metrics.map(metric => ({
    name: metric.id.charAt(0).toUpperCase() + metric.id.slice(1),
    value: metric.enabled ? metric.value : 0,
    color: metric.color
  }));

  // Render different chart types
  const renderChart = () => {
    const enabledMetrics = metrics.filter((m) => m.enabled);

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="value" 
                fill={(entry) => entry.color}
                name="Value"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                name="Value"
                dot={{ fill: (entry) => entry.color, stroke: (entry) => entry.color }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={enabledMetrics}
                dataKey="value"
                nameKey="id"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {enabledMetrics.map((metric, index) => (
                  <Cell key={`cell-${index}`} fill={metric.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Radar
                name="Metrics"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Chart Customization</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold">Chart Type</h3>
          <div className="flex gap-4">
            {["bar", "line",  "radar"].map((type) => (
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

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold">Metrics</h3>
          <div className="space-y-3">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={metric.enabled}
                    onChange={() => toggleMetric(metric.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 capitalize">{metric.id}</span>
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    value={metric.value}
                    onChange={(e) =>
                      setMetrics(
                        metrics.map((m) =>
                          m.id === metric.id
                            ? { ...m, value: parseInt(e.target.value) || 0 }
                            : m
                        )
                      )
                    }
                    className="px-2 py-1 w-16 text-sm rounded border"
                    min="0"
                    max="100"
                  />
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
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">Preview</h3>
          <div className="h-64">{renderChart()}</div>
        </div>
      </div>
    </div>
  );
};

export default ChartCustomization;
