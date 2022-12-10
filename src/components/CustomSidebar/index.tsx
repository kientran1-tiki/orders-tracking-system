import { Menu, Layout } from "antd";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  SnippetsOutlined,
  MessageOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import Arrows from "../../assets/arrow-right.svg";
import ImgMenu from "../../assets/90525-order-delivery.gif";
import "./styles.scss";

const { Sider } = Layout;

export default function CustomSidebar() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(["orders-tracking-system"]);

  useEffect(() => {
    const exactPathNameSpliced = location.pathname.split("/");
    const currentPath = exactPathNameSpliced?.[1];
    if (currentPath) {
      setSelectedKeys([currentPath]);
    } else {
      setSelectedKeys(["orders-tracking-system"]);
    }
  }, [location]);

  return (
    <Sider
      width={230}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
      style={{
        borderRight: "none",
        height: 200,
      }}
    >
      <div className="logo">
        <a href="../../index.html" className="df-logo">
          Orders<span>Tracking</span> System
        </a>
      </div>
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className={`custom-scroll  overflow-y-auto overflow-x-hidden`}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          style={{
            height: "calc(100vh - 400px)",
            minHeight: 200,
            paddingBottom: 40,
            paddingTop: 44,
          }}
        >
          <Menu.Item
            icon={<HomeOutlined />}
            className={"custom-icon rounded "}
            style={{
              margin: "0 12px",
            }}
            key={"orders-tracking-system"}
          >
            <Link to={"/orders-tracking-system"}>
              <div className="flex justify-between">
                <strong className="ml-2">Dashboard</strong>
                <img alt="" style={{ width: 16 }} src={Arrows}></img>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item
            icon={<SnippetsOutlined />}
            className={"custom-icon rounded mt-4 ml-4"}
            style={{
              margin: "12px 12px",
            }}
            key={"orders"}
          >
            <Link to={"/orders"}>
              <div className="flex justify-between">
                <strong className="ml-2">Orders</strong>
                <img alt="" style={{ width: 16 }} src={Arrows}></img>
              </div>
            </Link>
          </Menu.Item>
        </Menu>

        <img alt="" src={ImgMenu} style={{ width: "100%", height: 200 }}></img>
        <div className="mt-4" style={{ borderTop: "1px solid #ccc" }}>
          <div
            className="cursor-pointer mt-4 mx-4 rounded p-4 flex items-center justify-between"
            style={{
              background: "#f2f8f8",
            }}
          >
            <div className="flex">
              <div
                className="px-3 py-2 rounded mr-2"
                style={{
                  background: "#a4b4c7",
                }}
              >
                <MessageOutlined />
              </div>
              <div className="flex flex-col">
                <span style={{ color: "#a1b1d5" }} className="text-xs">
                  Support
                </span>
                <span style={{ color: "#a1b1d5" }} className="text-md">
                  Mr.Knif
                </span>
              </div>
            </div>
            <img alt="" style={{ width: 16 }} src={Arrows}></img>
          </div>
        </div>
      </div>
    </Sider>
  );
}
