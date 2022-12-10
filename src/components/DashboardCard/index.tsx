import React from "react";

import "./styles.scss";

export default function DashboardCard({ children }: { children: any }) {
  return (
    <div
      className="rounded-lg card-box-shadow"
      style={{
        background: "rgb(237 248 252)",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
