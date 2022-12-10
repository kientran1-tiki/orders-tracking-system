import React, { useCallback, useEffect, useState } from "react";
import { OrderColumnTypes } from "../../interfaces/common";
import Table from "../../components/CustomTable";
import { AlignType } from "rc-table/lib/interface";
import Status from "../../components/Status";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import moment from "moment";
import { useAppSelector } from "../../hooks";
import { getOrderState } from "../../redux/orderSlice";
import Filter from "./components/Filter";
import { Link } from "react-router-dom";

export default function Orders() {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const orderState = useAppSelector(getOrderState);
  const [filterOptions, setFilterOptions] = useState<any>({
    status: [],
    name_order: null,
    name_rider: null,
    merchant_name: null,
  });

  const [data, setData] = useState(orderState);
  useEffect(() => {
    setData(orderState);
  }, [orderState]);

  const filterByName = useCallback(
    (item: any, key: any) => {
      if (!filterOptions?.[key]) {
        return true;
      } else {
        if (item?.[key].match(filterOptions?.[key])) {
          return true;
        }
        return false;
      }
    },
    [filterOptions]
  );

  useEffect(() => {
    const newData = orderState
      ?.filter((item: any) => {
        if (filterOptions.status?.length === 0) {
          return true;
        }
        if (
          filterOptions.status?.some(
            (status: any) => item.status_customer == status
          )
        ) {
          return true;
        }
        return false;
      })
      .filter((item: any) => filterByName(item, "name_order"))
      .filter((item: any) => filterByName(item, "name_rider"))
      .filter((item: any) => filterByName(item, "merchant_name"));
    setData(newData);
  }, [filterOptions]);

  const columns: OrderColumnTypes[] = [
    {
      align: "left",
      title: "Name order",
      isResize: true,
      dataIndex: "name_order",
      width: 100,
      isOnClickRow: true,
      sorter: (a: any, b: any) => {
        return a?.name_order?.localeCompare(b?.name_order);
      },
      sortDirections: ["descend", "ascend"],
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
      // type: 'input',
      isOnClickRow: true,
      sorter: (a: any, b: any) => {
        return a?.name_rider?.localeCompare(b?.name_rider);
      },
      sortDirections: ["descend", "ascend"],
      render: (text) => <strong style={{ color: "#000" }}>{text}</strong>,
    },
    // {
    //   align: "center" as AlignType,
    //   title: "Address",
    //   width: 150,
    //   dataIndex: "address",
    //   type: "selection",
    //   isOnClickRow: false,
    //   isResize: false,
    //   sorter: (a: any, b: any) => {
    //     return a?.address?.localeCompare(b?.address);
    //   },
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      align: "center",
      title: "Merchant",
      width: 200,
      dataIndex: "merchant_name",
      type: "selection",
      renderInSearch: true,
      span: 7,
      sorter: (a: any, b: any) => {
        return a?.merchant_name?.localeCompare(b?.merchant_name);
      },
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <div className="flex flex-col">
          <strong style={{ color: "#000" }}>{text}</strong>
          <span style={{ color: "#d0d3e2" }}>{record?.merchant_address}</span>
        </div>
      ),
    },

    // {
    //   align: "center",
    //   title: "Dishes",
    //   width: 100,
    //   dataIndex: "dishes",
    //   type: "selection",
    //   renderInSearch: true,
    // },
    {
      align: "center",
      title: "Total price",
      width: 100,
      dataIndex: "total_price",
      renderInSearch: true,
      sorter: (a: any, b: any) => {
        return a?.total_price?.localeCompare(b?.total_price);
      },
      sortDirections: ["descend", "ascend"],
      render: (text) => (
        <span>
          <strong>$</strong> {Number(text.toFixed(1)).toLocaleString()}
        </span>
      ),
    },
    {
      align: "center",
      title: "Update time",
      dataIndex: "update_time",
      width: 100,
      type: "switch",
      renderInSearch: true,
      sorter: (a: any, b: any) => {
        return moment(a.update_time).unix() - moment(b.update_time).unix();
      },
      sortDirections: ["descend", "ascend"],
      render: (text) => <span>{moment(text).format("DD/MM/yyyy")}</span>,
    },
    {
      align: "center",
      title: "Status",
      isResize: true,
      dataIndex: "status_customer",
      width: 100,
      isOnClickRow: true,

      render: (text) => <Status status={text} />,
      sorter: (a: any, b: any) => {
        return a?.status_customer - b?.status_customer;
      },
      sortDirections: ["descend", "ascend"],
    },
  ];
  const COL_SPAN_DEFAULT = 18;
  return (
    <div className="ml-12 mr-6 my-12">
      <Row>
        <Col span={isShowFilter ? COL_SPAN_DEFAULT : 24}>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Orders</span>
            <div className="flex">
              <Input
                className="mr-4 rounded"
                placeholder="Search order"
                prefix={<SearchOutlined />}
                onChange={(event: any) => {
                  setFilterOptions({
                    ...filterOptions,
                    name_order: event.target.value,
                  });
                }}
              />
              <div
                onClick={() => setIsShowFilter(!isShowFilter)}
                className="rounded px-3 py-2 card-box-shadow cursor-pointer w-40 text-center font-semibold"
                style={{ background: "#cdd8e8", color: "#63718d" }}
              >
                <FilterOutlined className="mr-2" /> Filter
              </div>
            </div>
          </div>

          <Table data={data ?? []} columns={columns} />
        </Col>
        <Col span={isShowFilter ? 24 - COL_SPAN_DEFAULT : 0}>
          <Filter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </Col>
      </Row>
    </div>
  );
}
