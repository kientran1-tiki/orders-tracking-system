import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import DashboardCard from "../../components/DashboardCard";
import DashboardCardPrimary from "../../components/DashboardCardPrimary";

import OrderTable from "./components/OrderTable";
import TotalOrder from "./components/TotalOrder";
import CancelOrder from "./components/CancelOrder";
import PendingOrder from "./components/PendingOrder";
import NewOrder from "./components/NewOrder";

import Layout from "../../assets/layout.svg";
import OrderByTiming from "./components/OrderByTiming";
import Feed from "./components/Feed";

export default function Dashboard() {
  const [isExpandedLayout, setIsExpandedLayout] = useState(false);
  const COL_SPAN_DEFAULT = 16;
  useEffect(() => {
    setIsExpandedLayout(true);
  }, []);

  return (
    <div className="ml-12 mr-6 my-12">
      <Row>
        <Col span={isExpandedLayout ? COL_SPAN_DEFAULT : 24}>
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Dashboard</span>
            <div
              onClick={() => setIsExpandedLayout(!isExpandedLayout)}
              className="rounded-lg px-3 py-2 card-box-shadow cursor-pointer"
              style={{ background: "#fff" }}
            >
              <img src={Layout} style={{ width: 20 }}></img>
            </div>
          </div>

          <Row className="mt-6">
            <Col span={12} className="pr-3">
              <DashboardCard>
                <TotalOrder />
              </DashboardCard>
            </Col>
            <Col span={12} className="pl-3">
              <DashboardCard>
                <CancelOrder />
              </DashboardCard>
            </Col>
          </Row>
          <Row className="mt-6">
            <Col span={12} className="pr-3">
              <DashboardCard>
                <NewOrder />
              </DashboardCard>
            </Col>
            <Col span={12} className="pl-3">
              <DashboardCard>
                <PendingOrder />
              </DashboardCard>
            </Col>
          </Row>
          <Col span={24} className="mt-6">
            <DashboardCard>
              <OrderTable />
            </DashboardCard>
          </Col>
        </Col>
        <Col
          span={isExpandedLayout ? 24 - COL_SPAN_DEFAULT : 0}
          className="pl-6"
        >
          <DashboardCardPrimary>
            <OrderByTiming />
          </DashboardCardPrimary>
          <DashboardCardPrimary>
            <Feed />
          </DashboardCardPrimary>
        </Col>
      </Row>
    </div>
  );
}
