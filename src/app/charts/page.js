"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartsDashboard() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const monthlyCount = {};

      snapshot.forEach(doc => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate?.() || new Date(); // fallback for demo
        const month = createdAt.toLocaleString("default", { month: "short", year: "numeric" });

        monthlyCount[month] = (monthlyCount[month] || 0) + 1;
      });

      const formattedData = Object.keys(monthlyCount).map(month => ({
        month,
        count: monthlyCount[month],
      }));

      setChartData(formattedData);
    };

    fetchChartData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Project Activity Overview</h1>

      <div className="w-full h-[400px] bg-gray-900 rounded-lg p-4 shadow-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis allowDecimals={false} stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#555" }} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#facc15"
              strokeWidth={2}
              dot={{ stroke: "#facc15", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
