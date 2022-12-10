import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./styles.scss";

import MainRouters from "../mainRouters";
import Loading from "../assets/88967-food-delivery-service.gif";
import LoadingDot from "../assets/97930-loading.gif";

import CustomSidebar from "../components/CustomSidebar";
const { Header } = Layout;

export default function LayoutComponent() {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
  }, []);

  return showLoading ? (
    <Layout
      className="h-screen w-screen flex justify-center items-center "
      style={{ background: "#fff" }}
    >
      <img alt="" style={{ width: 400, height: 400 }} src={Loading}></img>
      <img alt="" style={{ width: 100, height: 100 }} src={LoadingDot}></img>
    </Layout>
  ) : (
    <div className=" custom-scroll main-layout-wrapper">
      <Layout style={{ minHeight: "calc(100vh - 50px)" }}>
        <CustomSidebar />
        <Layout>
          <Header
            className="flex justify-between"
            style={{
              background: "#fff",
              padding: "4px 32px",
            }}
          >
            <div>
              👋 <strong>Hi Guest!</strong>
            </div>
            <img
              alt=""
              style={{ margin: 8, height: 32 }}
              className="rounded cursor-pointer"
              src="https://i.pravatar.cc/32"
            ></img>
          </Header>
          <div style={{ background: "#fff" }}>
            <div
              className=" overflow-x-hidden overflow-y-auto fadeInUp "
              style={{
                background: "#f5f8f8",
                border: "1px solid #f0f0f0",
                borderTopLeftRadius: 12,
                height: "calc(100vh - 60px)",
              }}
            >
              <MainRouters></MainRouters>
            </div>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
