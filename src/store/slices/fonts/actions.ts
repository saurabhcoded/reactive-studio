import { IFontFamily } from "~/interfaces/editor"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"

export const setFonts = createAction<IFontFamily[]>("fonts/setFonts")

export const getFonts = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "fonts/getFonts",
  async (fontFamilies: IFontFamily[], { rejectWithValue, dispatch }) => {
    try {
      console.log("getFonts", fontFamilies)
      // dispatch(setFonts(fonts)) // First Load Correctly the fonts
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
