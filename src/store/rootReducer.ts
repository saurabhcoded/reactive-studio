import { combineReducers } from "@reduxjs/toolkit"
import { designEditorReducer } from "./slices/design-editor/reducer"
import { fontsReducer } from "./slices/fonts/reducer"
import { uploadsReducer } from "./slices/uploads/reducer"

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  uploads: uploadsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer