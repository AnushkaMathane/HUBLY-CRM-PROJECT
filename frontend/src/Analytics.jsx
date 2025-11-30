import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Analytics.css";

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    data: [],
    pieData: 0,
    averageReplyTime: "0",
    totalChats: "0",
  });

  useEffect(() => {
    setAnalyticsData({
      data: [
        { week: "Week 1", chats: 14 },
        { week: "Week 2", chats: 8 },
        { week: "Week 3", chats: 14 },
        { week: "Week 4", chats: 8 },
        { week: "Week 5", chats: 6 },
        { week: "Week 6", chats: 13 },
        { week: "Week 7", chats: 3 },
        { week: "Week 8", chats: 9 },
        { week: "Week 9", chats: 16 },
        { week: "Week 10", chats: 18 },
      ],
      pieData: 80,
      averageReplyTime: "0",
      totalChats: "122",
    });
  }, []);

  return (
    <div className="analytics-container">
      <div className="missed-chats">
        <h2>Analytics</h2>
        <h3>Missed Chats</h3>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart
            data={analyticsData.data}
            margin={{ top: 40, right: 40, left: 10, bottom: 20 }}
          >
            <CartesianGrid stroke="#f3f3f3" strokeDasharray="3 3" />

            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 25]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                borderRadius: "8px",
                border: "none",
                padding: "8px 12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />

            <Line
              type="monotone"
              dataKey="chats"
              stroke="#00D907"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#fff",
                stroke: "#000",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#00D907",
                stroke: "#000",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="average-reply">
        <h3>Average Reply Time</h3>
        <div className="reply-info">
          <p>
            For highest customer satisfaction rates you should aim to reply to
            an incoming customer's message in 15 seconds or less. Quick
            responses will get you more conversations, help you earn customers
            trust and make more sales.
          </p>
          <span className="time">{analyticsData.averageReplyTime} secs</span>
        </div>
      </div>

      <div className="resolved-tickets">
        <h3>Resolved Tickets</h3>
        <div className="ticket-info">
          <p>
            A callback system on a website, as well as proactive invitations,
            help to attract even more customers. A separate round button for
            ordering a call with a small animation helps to motivate more
            customers to make calls.
          </p>

          <div className="progress-ring">
            <svg className="progress-circle" width="100" height="100">
              <circle className="background" cx="50" cy="50" r="40" />
              <circle
                className="progress"
                cx="50"
                cy="50"
                r="40"
                style={{
                  strokeDashoffset: `calc(251 - (251 * ${analyticsData.pieData}) / 100)`,
                }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {analyticsData.pieData}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="total-chats">
        <h3>Total Chats</h3>
        <div className="chat-info">
          <p>
            This metric Shows the total number of chats for all Channels for the
            selected period.
          </p>
          <span className="total-number">{analyticsData.totalChats} Chats</span>
        </div>
      </div>
    </div>
  );
}
