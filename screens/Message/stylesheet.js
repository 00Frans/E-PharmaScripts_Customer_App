import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginTop: 8,
  },

  //search styles
  searchFilterCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchCont: {
    padding: 10,
    borderRadius: 15,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1.5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchTexInputView: {
    width: "90%",
  },
  searchBranchInput: {
    paddingLeft: 10,
  },
  iconSearch: {
    marginRight: 10,
    color: "black",
  },
  inputSearch: {
    flex: 1,
  },

  //messages
  chatItem: {
    paddingVertical: 12,
    paddingHorizontal: 16, // Add padding here
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  chatContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  chatImage: {
    width: 48, // Set image width
    height: 48, // Set image height
    borderRadius: 24, // Make it a circle
    marginRight: 10, // Add spacing between image and text
  },
  chatText: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
  },
  lastMessage: {
    color: "#555",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  noMatchText: {
    textAlign: "center",
    marginVertical: "30%",
    fontSize: 15,
  },
});

export default styles;
