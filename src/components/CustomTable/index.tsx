import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { cloneDeep, debounce } from "lodash";
import "./styles.scss";

export default function CustomTable({
  columns,
  numberOfHeight = 123,
  data = [],
  isRenderCheckbox = true,
}: {
  isRenderCheckbox?: any;
  columns: any;
  numberOfHeight?: any;
  data: any;
}) {
  const [height, setHeight] = useState(0);

  const filterGroupRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filterGroupRef?.current?.offsetHeight) {
      const newHeight = filterGroupRef?.current?.offsetHeight || 0;
      const subHeight = numberOfHeight || 100;

      setHeight(newHeight - subHeight);
    }
  }, [numberOfHeight]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      const newHeight = filterGroupRef?.current?.offsetHeight || 0;
      const subHeight = numberOfHeight || 100;

      setHeight(newHeight - subHeight);
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [numberOfHeight]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {},
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div ref={filterGroupRef} className="mt-4 custom-table">
      <Table
        scroll={{
          // x: "fix-content",
          // y: data?.length === 0 ? undefined : height,
          y: 380,
        }}
        rowKey={"id"}
        key="id"
        dataSource={data}
        columns={columns}
        rowSelection={
          isRenderCheckbox
            ? {
                type: "checkbox",
                ...rowSelection,
              }
            : undefined
        }
      />
    </div>
  );
}
