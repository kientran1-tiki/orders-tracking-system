import React, { useCallback } from "react";
import { Select } from "antd";
import { arrayStatusConfig } from "../../ultil/status";
import "./styles.scss";
import { useAppDispatch } from "../../hooks";
import { changeOrderStatus } from "../../pages/OrderDetail/thunk";
const { Option } = Select;

export default function Status({
  order,
  status,
  isShowChange = false,
}: {
  order?: any;
  status: number;
  isShowChange?: any;
}) {
  const dispatch = useAppDispatch();

  const selectedStatus = arrayStatusConfig?.[status] ?? arrayStatusConfig?.[1];

  const onChange = useCallback(
    (value: any) => {
      dispatch(
        changeOrderStatus({
          oldStatus: order?.status_customer,
          newStatus: value,
          order_id: order.id,
        })
      );
    },
    [dispatch, order]
  );

  return (
    <div
      className={` rounded text-center text-xs px-2 font-semibold  ${
        isShowChange ? "" : "py-2"
      }`}
      style={{
        background: selectedStatus.backgroundColor,
        color: selectedStatus.color,
        width: 120,
        height: 30,
      }}
    >
      {isShowChange ? (
        <Select
          style={{
            width: "100%",
            height: 30,
            color: selectedStatus.color,
            textAlign: "center",
          }}
          value={selectedStatus.label}
          onChange={onChange}
        >
          {Object.keys(arrayStatusConfig)?.map((key: any) => {
            const item = arrayStatusConfig[key];
            return (
              <Option
                value={key}
                key={key}
                style={{
                  background: item.backgroundColor,
                }}
              >
                {arrayStatusConfig[key]?.label}
              </Option>
            );
          })}
        </Select>
      ) : (
        selectedStatus.label
      )}
    </div>
  );
}
