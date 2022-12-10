import React, { useState, useEffect } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import ListIcon from "../../../../assets/list.svg";
import { useAppSelector } from "../../../../hooks";
import {
  getOrderState,
  getOrderTracingStatusState,
} from "../../../../redux/orderSlice";
import moment from "moment";

import "./styles.scss";
import { Link } from "react-router-dom";

export default function OrderByTiming() {
  const orderTracingStatusState = useAppSelector(getOrderTracingStatusState);
  const orderState = useAppSelector(getOrderState);

  const [listWarning, setListWarning] = useState([]);
  const [listLate, setListLate] = useState([]);

  useEffect(() => {
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
    if (listWarning.length) {
      const listWarningOrder = orderState?.map((order: any) => {
        const existOrderInList = listWarning?.find(
          (listItem: any) => order?.id == listItem?.order_id
        );
        if (existOrderInList) {
          return { ...order, time: existOrderInList?.time };
        } else {
          return undefined;
        }
      });
      setListWarning(listWarningOrder.filter(Boolean));
    }
    if (listLate.length) {
      const listLateOrder = orderState?.map((order: any) => {
        const existOrderInList = listLate?.find(
          (listItem: any) => order?.id == listItem?.order_id
        );
        if (existOrderInList) {
          return { ...order, time: existOrderInList?.time };
        } else {
          return undefined;
        }
      });
      setListLate(listLateOrder.filter(Boolean));
    }
  }, [orderTracingStatusState]);

  return (
    <>
      <div
        style={{ color: "#fff", background: "#2252da" }}
        className=" text-md font-semibold rounded-lg py-2 px-4 "
      >
        <FieldTimeOutlined /> Order by timing
      </div>
      <div className="p-4">
        <div className="flex justify-between mt-2">
          <span className="font-bold" style={{ color: "red" }}>
            Warning Orders
          </span>
          <span style={{ color: "#a1b1d5" }} className="font-bold text-xs">
            time
          </span>
        </div>

        <div className="my-4">
          {listWarning?.map((item: any) => (
            <>
              <div className="flex justify-between cursor-pointer mt-2">
                <span
                  style={{
                    color: "#223253",
                  }}
                >
                  {item?.name_order}
                </span>
                <span
                  style={{ color: "#a1b1d5" }}
                  className="font-bold text-xs"
                >
                  {Math.round(item?.time)} minute
                </span>
              </div>
            </>
          ))}
        </div>

        <div
          className="show-all-custom rounded text-center mb-4 cursor-pointer flex justify-center items-center"
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
          <Link to={"/orders"}>
            <span className="font-semibold text-sm"> All list</span>
          </Link>
        </div>

        <div className="flex justify-between mt-2">
          <span className="font-bold">Late Orders</span>
          <span style={{ color: "#a1b1d5" }} className="font-bold text-xs">
            time
          </span>
        </div>

        <div className="my-4">
          {listLate?.map((item: any) => (
            <>
              <div className="flex justify-between cursor-pointer mt-2">
                <span
                  style={{
                    color: "#223253",
                  }}
                >
                  {item?.name_order}
                </span>
                <span
                  style={{ color: "#a1b1d5" }}
                  className="font-bold text-xs"
                >
                  {Math.round(item?.time)} minute
                </span>
              </div>
            </>
          ))}
        </div>
        <div
          className="show-all-custom rounded text-center mb-4 cursor-pointer flex justify-center items-center"
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
          <Link to={"/orders"}>
            <span className="font-semibold text-sm"> All list</span>
          </Link>
        </div>
      </div>
    </>
  );
}
