import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  sub_heading: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  sub_heading_text: {
    fontSize: 20,
    fontFamily: "SpaceMono",
    fontWeight: "500",
    color: "Black",
    margin: 10,
  },
  main_box: {
    width: 200,
    height: 200,
    backgroundColor: "blue",
  },
  searchBar: {
    width: "80%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 20,
  },
});
