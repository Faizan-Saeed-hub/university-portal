import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${color || "#60a5fa"}`,
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "10px" }}>{icon}</div>
      <h3 style={{ color: "#94a3b8", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "36px", fontWeight: "bold", color: color || "#60a5fa", margin: "8px 0 0" }}>
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
