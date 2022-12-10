import React from "react";

import "./styles.scss";

export default function DashboardCard({ children }: { children: any }) {
  return (
    <div
      className="rounded-lg card-box-shadow mb-4"
      style={{
        background: "#fff",
        width: "100%",
        height: "auto",
      }}
    >
      {children}
    </div>
  );
}
