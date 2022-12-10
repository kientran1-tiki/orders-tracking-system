import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Cancel from "../../../../assets/cancel.svg";
import { DatePicker } from "antd";
import moment from "moment";
import { useAppSelector } from "../../../../hooks";
import { getOrderState } from "../../../../redux/orderSlice";
const monthFormat = "YYYY/MM";

export default function TotalOrder() {
  const orderState = useAppSelector(getOrderState);

  const OPTIONS_DEFAULT = {
    chart: {
      id: "basic-bar",
    },
    fill: {
      colors: ["#000"],
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#000"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 0],
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    yaxis: {
      show: false,
    },
  };
  const [data, setData] = useState<any>(null);
  const [series, setSeries] = useState([
    {
      name: "cancel-orders",
      data: data,
    },
  ]);
  const [options, setOptions] = useState(OPTIONS_DEFAULT);

  const [month, setMonth] = useState(moment(new Date(), monthFormat));

  const getAllDateOfMonth = (month: any) => {
    const date = new Date(2022, month, 1);

    const dates = [];

    while (date.getMonth() == month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    const newData = orderState?.filter((item: any) => {
      if (moment(item.update_time).isSame(month, "month")) {
        return true;
      }
    });

    const arrayDateInMonth = getAllDateOfMonth(month.get("month"));
    const dataChart = arrayDateInMonth?.map((dayInMonth: any) => {
      const newCount = newData?.filter((pieceData: any) => {
        if (
          moment(pieceData.update_time).isSame(moment(dayInMonth), "date") &&
          // filter all order have status is cancel
          pieceData.status_customer == 6
        ) {
          return true;
        } else {
          return false;
        }
      }).length;
      return newCount;
    });

    setData(dataChart);
    setSeries([
      {
        name: "cancel-orders",
        data: dataChart,
      },
    ]);
    setOptions({
      ...OPTIONS_DEFAULT,
      xaxis: {
        labels: {
          show: false,
        },
        categories: arrayDateInMonth?.map((_, index) => index + 1),
      },
    });
  }, [month, orderState]);

  return (
    <div className="p-4">
      <div className=" flex items-center justify-between">
        <div className="flex">
          <img src={Cancel} alt="React Logo" />

          <span style={{ color: "#68778d" }} className="font-bold ml-2">
            All orders cancel
          </span>
        </div>
        <span style={{ color: "#68778d" }} className="text-xs mt-1">
          <DatePicker
            defaultValue={moment(new Date(), monthFormat)}
            format={monthFormat}
            allowClear={false}
            picker={"month"}
            value={month}
            onChange={(value: any) => {
              setMonth(value);
            }}
          />
        </span>
      </div>
      <div className="flex items-center mt-2">
        <div className="mt-4 flex flex-col" style={{ width: 100 }}>
          <span style={{ color: "#223253" }} className="font-bold text-xl">
            2.200
          </span>
          <span style={{ color: "#a1b1d5" }} className="font-bold text-xs">
            2.200
          </span>
        </div>
        <div className="custom-chart" style={{ width: "calc(100% - 100px)" }}>
          {data && (
            <Chart
              options={options}
              series={series}
              type="line"
              height={120}
              width={"100%"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
