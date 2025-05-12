import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: 8,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 120,
  },
  heading_text: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "SpaceMono",
    color: "black",
  },
  sub_heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  sub_heading_text: {
    fontSize: 25,
    fontFamily: "SpaceMono",
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    margin: 10,
  },
  account_section: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
