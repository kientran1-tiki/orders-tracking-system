import React, { Suspense } from "react";
import { Spin } from "antd";

import { Routes, Route } from "react-router";

const Orders = React.lazy(async () => import("../pages/Orders"));
const OrderDetail = React.lazy(async () => import("../pages/OrderDetail"));
const Dashboard = React.lazy(async () => import("../pages/Dashboard"));

export default function MainRouters() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
      </Routes>
    </Suspense>
  );
}
