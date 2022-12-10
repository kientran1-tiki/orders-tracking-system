import { Checkbox, Input } from "antd";
import React, { useState } from "react";
import Status from "../../../../components/Status";
import { arrayStatusConfig } from "../../../../ultil/status";

export default function Filter({
  filterOptions,
  setFilterOptions,
}: {
  filterOptions: any;
  setFilterOptions: any;
}) {
  return (
    <div className="pl-4">
      <div
        style={{ color: "#fff", background: "#cdd8e7" }}
        className=" text-md font-semibold rounded-t-lg py-2 px-4 "
      >
        Filter
      </div>
      <div
        className="rounded-lg card-box-shadow  p-4"
        style={{
          background: "#fff",
          width: "100%",
          height: "auto",
        }}
      >
        <span className="font-bold">Status</span>
        <div className="mt-4 flex flex-wrap mb-4">
          {Object.keys(arrayStatusConfig)?.map((key: any, index: any) => {
            const item = arrayStatusConfig[key];
            return (
              <div className="mb-2 mr-4">
                <Checkbox
                  value={key}
                  key={item.label}
                  onChange={(event) => {
                    const value = event.target.value;
                    let arrayStatus = filterOptions.status;
                    if (arrayStatus.some((item: any) => item === value)) {
                      arrayStatus = arrayStatus.filter(
                        (item: any) => item !== value
                      );
                    } else {
                      arrayStatus.push(value);
                    }
                    setFilterOptions({
                      ...filterOptions,
                      status: arrayStatus,
                    });
                  }}
                >
                  <Status status={key} />
                </Checkbox>
              </div>
            );
          })}
        </div>
        <span className="font-bold ">Rider name : </span>
        <div className="mt-2 flex flex-col mb-4">
          <Input
            className="mr-4 rounded"
            placeholder="input rider name..."
            onChange={(event: any) => {
              setFilterOptions({
                ...filterOptions,
                name_rider: event.target.value,
              });
            }}
          />
        </div>
        <span className="font-bold ">Merchant name : </span>
        <div className="mt-2 flex flex-col mb-4">
          <Input
            onChange={(event: any) => {
              setFilterOptions({
                ...filterOptions,
                merchant_name: event.target.value,
              });
            }}
            className="mr-4 rounded"
            placeholder="input merchant name..."
          />
        </div>
        <span className="font-bold ">Update time : </span>
        <div className="mt-4 flex flex-col mb-4">
          <div className="mb-2">
            <Checkbox key={"last 5"}>Last 5</Checkbox>
          </div>
          <div className="mb-2">
            <Checkbox key={"last 10"}>Last 10</Checkbox>
          </div>

          <div className="mb-2">
            <Checkbox key={"last 15"}>Last 15</Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
}
