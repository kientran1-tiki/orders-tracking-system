import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeOrderStatus = createAsyncThunk(
  "order/changeOrderStatus",
  async (obj: any) => {
    return obj;
  }
);
