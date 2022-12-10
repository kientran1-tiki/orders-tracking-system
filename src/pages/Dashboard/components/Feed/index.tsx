import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import moment from "moment";
import { cloneDeep } from "lodash";

import {
  getOrderState,
  getOrderTracingStatusState,
} from "../../../../redux/orderSlice";
import { useAppSelector } from "../../../../hooks";
import { arrayStatusConfig } from "../../../../ultil/status";
import Status from "../../../../components/Status";

export default function Feed() {
  const orderTracingStatusState = useAppSelector(getOrderTracingStatusState);
  const orderState = useAppSelector(getOrderState);
  const [timeLineOrder, setTimeLineOrder] = useState<any>(null);

  useEffect(() => {
    const orderTracingStatusCloneDeep = cloneDeep(orderTracingStatusState);

    const orderTracingStatusInState = orderTracingStatusCloneDeep
      ?.sort((a: any, b: any) => {
        return (
          parseInt(moment(b.update_time).format("x")) -
          parseInt(moment(a.update_time).format("x"))
        );
      })
      ?.slice(0, 10);
    setTimeLineOrder(orderTracingStatusInState);
  }, [orderTracingStatusState]);

  return (
    <>
      <div
        style={{ color: "#fff", background: "#2252da" }}
        className=" text-md font-semibold rounded-lg py-2 px-4 "
      >
        <BellOutlined /> Feeds
      </div>
      <div className="p-4">
        <Timeline>
          {timeLineOrder?.map((time: any) => {
            const currentStatus = arrayStatusConfig[time.from_status];
            return (
              <Timeline.Item
                key={time.id}
                color={currentStatus?.backgroundColor}
              >
                {moment(time?.update_time).format("DD/MM/YYYY HH:mm:ss")}
                <div className="mt-2">
                  <strong>
                    {
                      orderState?.find((item: any) => item.id === time.order_id)
                        ?.name_order
                    }
                  </strong>
                </div>
                <div className="flex flex-wrap items-center mt-4">
                  <Status status={time.from_status}></Status>
                  <span className="mx-4"> {"->"}</span>
                  <Status status={time.to_status}></Status>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </>
  );
}
