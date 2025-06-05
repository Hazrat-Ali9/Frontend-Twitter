"use client";
import { persistor, store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// Auth Provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {children}
      </PersistGate>{" "}
    </Provider>
  );
};

export default AuthProvider;
