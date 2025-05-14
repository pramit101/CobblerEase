import { StyleSheet } from "react-native";

export const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
  },

  button: { backgroundColor: "brown", padding: 12, borderRadius: 5 },

  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },

  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },

  item: { fontSize: 18, fontWeight: "600", marginBottom: 5, color: "#333" },

  info: { fontSize: 14, color: "#555", marginVertical: 1, marginBottom: 10 },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  step: { alignItems: "center", flex: 1 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#ccc" },
  activeCircle: { backgroundColor: "#4caf50" },
  label: { marginTop: 5, fontSize: 12, color: "#999", textAlign: "center" },
  activeLabel: { color: "#4caf50", fontWeight: "600" },
  error: { color: "red", marginTop: 10 },
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
});
