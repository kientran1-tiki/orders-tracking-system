import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MOCK_DATA_ORDER } from "../mock/orders";
import { TRACING_STATUS_MOCK } from "../mock/tracingStatus";
import { changeOrderStatus } from "../pages/OrderDetail/thunk";
import { cloneDeep } from "lodash";
import moment from "moment";

const initAuth: any = {
  orderList: MOCK_DATA_ORDER,
  tracingStatus: TRACING_STATUS_MOCK,
  dishes: TRACING_STATUS_MOCK,
};

const authSlice = createSlice({
  name: "orders",
  initialState: initAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
      const newOrderTracing = {
        id: state.tracingStatus?.[state.tracingStatus.length - 1].id + 1,
        order_id: action?.payload?.order_id,
        from_status: action?.payload?.oldStatus,
        to_status: action?.payload?.newStatus,
        update_time: moment(new Date()),
      };
      const newStateTracingStatus = cloneDeep(state.tracingStatus);

      newStateTracingStatus.push(newOrderTracing);
      state.tracingStatus = newStateTracingStatus;

      const newStateOrder = cloneDeep(state.orderList);
      const currentOrder = newStateOrder?.find(
        (order: any) => order.id == action?.payload?.order_id
      );
      currentOrder.status_customer = parseInt(action?.payload?.newStatus);
      currentOrder.update_time = moment
        .utc(new Date())
        .format("dd, DD MMM YYYY HH:MM:SS");
      state.orderList = newStateOrder;
    });
  },
});

export const {} = authSlice.actions;
export const getOrderState = (state: RootState) => state.orders.orderList;
export const getOrderTracingStatusState = (state: RootState) =>
  state.orders.tracingStatus;

export default authSlice.reducer;
