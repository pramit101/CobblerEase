import React from "react";
import { render } from "@testing-library/react-native";
import CartScreen from "../app/(tabs)/Cart"; // Update path as needed
import * as storage from "../helperFiles/storage";

// Mock the helper file
jest.mock("../helperFiles/storage", () => ({
  retrieveData: jest.fn(),
  retrieve_service_data: jest.fn(),
  clearData: jest.fn(),
  removeItem: jest.fn(),
  removeServiceItem: jest.fn(),
}));

jest.mock("@react-navigation/bottom-tabs", () => {
  const actual = jest.requireActual("@react-navigation/bottom-tabs");
  return {
    ...actual,
    useBottomTabBarHeight: () => 50, // mock to a fixed height
  };
});

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null); // or a fake user object
    return () => {};
  }),
  User: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe("CartScreen - Renders data from AsyncStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mocked return values for products and services
    (storage.retrieveData as jest.Mock).mockResolvedValue([
      { id: "P001", name: "Mock Product", price: "10" },
    ]);

    (storage.retrieve_service_data as jest.Mock).mockResolvedValue([
      { id: "S001", name: "Mock Service", description: "Test Description" },
    ]);
  });

  it("displays product and service data from AsyncStorage", async () => {
    const { findByText } = render(<CartScreen />);

    // Wait for and assert product fields
    expect(await findByText("Mock Product")).toBeTruthy();
    expect(await findByText("$10")).toBeTruthy();

    // Wait for and assert service fields
    expect(await findByText("Mock Service")).toBeTruthy();
    expect(await findByText("Test Description")).toBeTruthy();
  });
});
