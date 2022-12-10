import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Col, Row, Timeline } from "antd";
import { useAppSelector } from "../../hooks";
import {
  getOrderState,
  getOrderTracingStatusState,
} from "../../redux/orderSlice";
import Global from "../../assets/global.svg";
import Truck from "../../assets/truck.svg";
import Status from "../../components/Status";
import { arrayStatusConfig } from "../../ultil/status";

export default function OrderDetail() {
  const { id } = useParams();
  const orderState = useAppSelector(getOrderState);
  const orderTracingStatusState = useAppSelector(getOrderTracingStatusState);
  const [detailOrder, setDetailOrder] = useState<any>(null);
  console.log("detailOrder", detailOrder);

  const [timeLineOrder, setTimeLineOrder] = useState<any>(null);

  useEffect(() => {
    const detailOrderInState = orderState?.find((order: any) => order.id == id);

    setDetailOrder(detailOrderInState);
    const orderTracingStatusInState = orderTracingStatusState
      ?.filter((tracing: any) => tracing.order_id == id)
      .sort((a: any, b: any) => {
        return (
          parseInt(moment(b.update_time).format("x")) -
          parseInt(moment(a.update_time).format("x"))
        );
      });
    setTimeLineOrder(orderTracingStatusInState);
  }, [orderState, orderTracingStatusState]);

  return (
    <div className="ml-12 mr-6 my-12 flex justify-center items-center">
      <div style={{ width: "70%" }}>
        <div className="flex justify-between">
          <div className="text-xl font-semibold">{detailOrder?.name_order}</div>
          <Status
            order={detailOrder}
            isShowChange={true}
            status={detailOrder?.status_customer}
          />
        </div>
        <div
          className="rounded-lg mt-10 p-10   h-100"
          style={{ background: "#fff" }}
        >
          <img alt="global" src={Global}></img>
          <span style={{ color: "596584" }} className="font-bold text-sm ml-4">
            Detail Order
          </span>
          <Row className="my-10">
            <Col span={12}>
              <div className="mb-4">
                <strong>Rider: </strong>
                <span>{detailOrder?.name_rider}</span>
              </div>
              <div className="mb-4">
                <strong>Address: </strong>
                <span className="mb-4">{detailOrder?.address}</span>
              </div>
              <div className="mb-4">
                <strong>Merchant: </strong>
                <span className="mb-4">{detailOrder?.merchant_name}</span>
              </div>
              <div className="mb-4">
                <strong>Merchant address: </strong>
                <span className="mb-4">{detailOrder?.merchant_address}</span>
              </div>
              <div className="mb-4">
                <strong>Total price: </strong>
                <span className="mb-4">${detailOrder?.total_price}</span>
              </div>
              <div className="mb-4">
                <strong>Update time: </strong>
                <span className="mb-4">
                  {moment(detailOrder?.update_time).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <strong>Dishes: </strong>
              <div className="mt-4 ml-4">
                {detailOrder?.dishes?.map((item: any) => (
                  <div className="mt-2 flex justify-between">
                    <span>{item.title} </span>
                    <span>{item.price} </span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <img alt="global" src={Truck}></img>
          <span style={{ color: "596584" }} className="font-bold text-sm ml-4">
            Time Line
          </span>
          <div className="my-10">
            <Timeline>
              {timeLineOrder?.map((time: any) => {
                const currentStatus = arrayStatusConfig[time.from_status];
                return (
                  <Timeline.Item
                    key={time.id}
                    color={currentStatus?.backgroundColor}
                  >
                    {moment(time?.update_time).format("DD/MM/YYYY HH:mm:ss")}
                    <div className="flex items-center mt-4">
                      <span className="mr-4">Change from</span>
                      <Status status={time.from_status}></Status>
                      <span className="mx-4">to</span>
                      <Status status={time.to_status}></Status>
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
}
