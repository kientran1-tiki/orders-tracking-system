import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import Table from "../../../../components/CustomTable";
import Status from "../../../../components/Status";
import { OrderColumnTypes } from "../../../../interfaces/common";
import { AlignType } from "rc-table/lib/interface";
import { useAppSelector } from "../../../../hooks";
import { getOrderState } from "../../../../redux/orderSlice";
import { cloneDeep } from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

export default function OrderTable() {
  const orderState = useAppSelector(getOrderState);

  const DEFAULT_COL: OrderColumnTypes[] = [
    {
      align: "left",
      title: "Name order",
      isResize: true,
      dataIndex: "name_order",
      width: 100,
      render: (text, reacord) => (
        <Link to={`/orders/${reacord.id}`}>
          <strong style={{ color: "#000" }}>{text}</strong>
        </Link>
      ),
    },
    {
      isResize: true,
      align: "center" as AlignType,
      title: "Name rider",
      dataIndex: "name_rider",
      width: 100,
      isOnClickRow: true,
      render: (text) => <strong style={{ color: "#000" }}>{text}</strong>,
    },
    {
      align: "center",
      title: "Merchant name",
      width: 100,
      dataIndex: "merchant_name",
      type: "selection",
      renderInSearch: true,
      span: 7,
      render: (text) => <strong style={{ color: "#000" }}>{text}</strong>,
    },

    // {
    //   align: "center",
    //   title: tabActive === 0 ? "Total price" : "Update Time",
    //   width: 100,
    //   dataIndex: tabActive === 0 ? "total_price" : "update_time",
    //   renderInSearch: true,
    // },
  ];
  const [data, setData] = useState([]);
  const [tabActive, setTabActive] = useState(0);

  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    setColumns([
      ...DEFAULT_COL,
      {
        align: "center",
        title: tabActive === 0 ? "Total price" : "Update Time",
        width: 100,
        dataIndex: tabActive === 0 ? "total_price" : "update_time",
        renderInSearch: true,
      },
    ]);
    const orderStateCloneDeep = cloneDeep(orderState);
    orderStateCloneDeep?.sort((a: any, b: any) => {
      return tabActive === 0
        ? b?.total_price - a?.total_price
        : parseInt(moment(b.update_time).format("x")) -
            parseInt(moment(a.update_time).format("x"));
    });

    const newOrderStateCloneDeep = orderStateCloneDeep.slice(0, 10);

    setData(newOrderStateCloneDeep);
  }, [tabActive, orderState]);

  // const columns: OrderColumnTypes[] = DEFAULT_COL;

  const tabTable = [
    {
      title: "The most recent orders",
    },
    {
      title: "Last client",
    },
  ];
  return (
    <>
      <div className="p-4">
        <div
          style={{ background: "rgb(237 248 252)" }}
          className="flex items-center p-4 rounded-t-lg"
        >
          <Row style={{ width: "90%" }}>
            {tabTable?.map((item: any, index: any) => {
              const isActiveTab = index === tabActive;
              return (
                <Col span={8} key={item.title}>
                  <div
                    onClick={() => setTabActive(index)}
                    className="px-4 py-2 rounded cursor-pointer font-semibold"
                    style={{
                      height: "auto",
                      width: 200,
                      backgroundColor: isActiveTab ? "#2452db" : "#fff",
                      color: isActiveTab ? "#fff" : "#000",
                      textAlign: "center",
                      border: isActiveTab
                        ? "none"
                        : "1px solid rgb(232 232 232)",
                    }}
                  >
                    {item.title}
                  </div>
                </Col>
              );
            })}
          </Row>
          <div
            className="show-all-custom rounded text-center cursor-pointer flex justify-center items-center"
            style={{ color: "#C4CBD8" }}
          >
            <svg
              className="mr-2"
              width="18"
              height="18"
              viewBox="0 0 32 32"
              fill="none"
              stroke="#2252da"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.54 11.5H23.2M13.54 16.36H23.2M13.54 21.22H23.2M9.69995 11.5V11.5096M9.69995 16.36V16.3696M9.69995 21.22V21.2296"
                stroke="#C4CBD8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="1"
                y="1"
                width="30"
                height="30"
                rx="9"
                stroke="#C4CBD8"
                strokeWidth="2"
              />
            </svg>

            <span className="font-semibold text-sm"> All list</span>
          </div>
        </div>
      </div>
      <div style={{ background: "rgb(237 248 252)" }}>
        <Table isRenderCheckbox={false} data={data} columns={columns} />
      </div>
    </>
  );
}
