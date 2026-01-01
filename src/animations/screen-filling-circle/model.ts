import { Nullable } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  options: Nullable<{
    x: number;
    y: number;
    color?: string; 
    completeCbId?: string
  }>,
  isActive: boolean
}

const initialState: InitialState = {
  options: null,
  isActive: false
}

export const screenFillingCircleStore = createSlice({
  name: "ANIM_screenFillingCircle",
  initialState,
  reducers: {
    start: (state, {payload}: PayloadAction<InitialState['options']>) => {
      state.options = payload
      state.isActive = true
    },
    finish: (state) => {
      state.isActive = false
      state.options = null
    }
  }
})

export const screenFillingCircleActions = screenFillingCircleStore.actions;