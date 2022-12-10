import React, { useCallback, useEffect, useState } from "react";
import { OrderColumnTypes } from "../../interfaces/common";
import Table from "../../components/CustomTable";
import { AlignType } from "rc-table/lib/interface";
import Status from "../../components/Status";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import moment from "moment";
import { useAppSelector } from "../../hooks";
import {
  getOrderTracingStatusState,
  getOrderState,
} from "../../redux/orderSlice";
import Filter from "./components/Filter";
import { Link } from "react-router-dom";

export default function Orders() {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const orderState = useAppSelector(getOrderState);
  const orderTracingStatusState = useAppSelector(getOrderTracingStatusState);

  const [filterOptions, setFilterOptions] = useState<any>({
    status: [],
    name_order: null,
    name_rider: null,
    merchant_name: null,
    update_time: null,
    order_by_timing: null,
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
    let listWarningOrder: any = [];
    let listLateOrder: any = [];
    if (filterOptions.order_by_timing) {
      const results = orderTracingStatusState.reduce(function (
        results: any,
        org: any
      ) {
        (results[org.order_id] = results[org.order_id] || []).push(org);
        return results;
      },
      {});
      let listWarning: any = [];
      let listLate: any = [];
      Object.keys(results).map((key: any) => {
        const result = results[key];

        result?.map((itemInResult: any, index: any) => {
          const element = itemInResult;
          const nextElement = result[index + 1];
          if (nextElement) {
            const duration = moment.duration(
              moment(nextElement.update_time).diff(moment(element.update_time))
            );
            const minutes = duration.asMinutes() % 60;

            if (minutes >= 30 && minutes < 40) {
              listWarning.push({ ...element, time: minutes });
            } else {
              if (minutes >= 40) {
                listLate.push({ ...element, time: minutes });
              }
            }
          }
        });
      });
      if (filterOptions.order_by_timing == 30 && listWarning.length) {
        listWarningOrder = orderState
          ?.map((order: any) => {
            const existOrderInList = listWarning?.find(
              (listItem: any) => order?.id == listItem?.order_id
            );
            if (existOrderInList) {
              return { ...order, time: existOrderInList?.time };
            } else {
              return undefined;
            }
          })
          .filter(Boolean);
      } else {
        if (filterOptions.order_by_timing == 40 && listLate.length) {
          listLateOrder = orderState
            ?.map((order: any) => {
              const existOrderInList = listLate?.find(
                (listItem: any) => order?.id == listItem?.order_id
              );
              if (existOrderInList) {
                return { ...order, time: existOrderInList?.time };
              } else {
                return undefined;
              }
            })
            .filter(Boolean);
        }
      }
    }

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
      .filter((item: any) => filterByName(item, "merchant_name"))
      .filter((item: any) => {
        if (filterOptions?.update_time) {
          const minutes = moment().diff(moment(item.update_time), "minutes");
          if (minutes >= 0 && minutes <= filterOptions.update_time) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      })
      .filter((item: any) => {
        if (filterOptions?.order_by_timing) {
          if (filterOptions?.order_by_timing == 40) {
            if (
              listLateOrder?.find((lateItem: any) => lateItem.id === item.id)
            ) {
              return true;
            }
            return false;
          } else {
            if (
              listWarningOrder?.find(
                (warningOrder: any) => warningOrder.id === item.id
              )
            ) {
              return true;
            }
            return false;
          }
        }
        return true;
      });
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
      render: (text) => (
        <span>{moment(text).format("DD/MM/yyyy HH:MM:ss")}</span>
      ),
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
          <div
            style={{
              background: "#fff",
            }}
          >
            <Table data={data ?? []} columns={columns} />
          </div>
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
