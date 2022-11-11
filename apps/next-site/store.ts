// store.ts

import { AnyAction, Store } from "redux"
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper"
import { configureStore } from "@reduxjs/toolkit"

export type AuthStatus = "PENDING" | "ANONYMOUS" | "VERIFIED"

export interface ReduxState {
  tick: string
  authToken?
  authStatus?: AuthStatus
}

// create your reducer
const reducer = (state: ReduxState = { tick: "init",authStatus:'PENDING' }, action: AnyAction) => {
  // debugger
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    case "TICK":
      return { ...state, tick: action.payload }

    case "authUpdate":

      return {...state, ...action.payload}
    default:
      return state
  }
}

// create a makeStore function
const makeStore = (context: Context) => configureStore({ reducer })

// export an assembled wrapper
export const wrapper = createWrapper<Store<ReduxState>>(makeStore, {
  debug: true,
})
