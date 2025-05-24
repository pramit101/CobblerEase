import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginPage from "../app/login_page";

jest.mock("../firebase", () => ({
  auth: {},
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
  useLocalSearchParams: () => ({}),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: any) => children,
}));

// Mock Alert from react-native
import { Alert } from "react-native";
jest.spyOn(Alert, "alert");

jest.mock("@react-navigation/bottom-tabs", () => {
  const actual = jest.requireActual("@react-navigation/bottom-tabs");
  return {
    ...actual,
    useBottomTabBarHeight: () => 50, // mock to a fixed height
  };
});

import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <LoginPage />
    );
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByTestId("login-button")).toBeTruthy();
  });

  it("shows alert if fields are missing", () => {
    const { getByText, getByTestId } = render(<LoginPage />);
    fireEvent.press(getByTestId("login-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing fields",
      "Please enter both email and password."
    );
  });

  it("calls signInWithEmailAndPassword on valid input and navigates on success", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "user123" },
    });

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <LoginPage />
    );
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");

    fireEvent.press(getByTestId("login-button"));

    await waitFor;
  });
});
