import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  screenTitle: {
    fontWeight: 500,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  productContainer: {
    // backgroundColor: "white",
    borderRadius: 10,
    // elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  productDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 120,
  },

  imageContainer: {
    height: "70%",
    width: "30%",
    marginRight: 10,
    // backgroundColor: "yellow",
  },
  productImageSecondCont: {},
  productImage: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
  },
  productInfoContainer: {
    flex: 1, // Product info takes 50% of the container width
  },
  priceRowContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productNamePrescCont: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: 2,
  },
  productName: {
    fontWeight: 400,
    fontSize: 16,
  },
  quantityCont: {
    marginLeft: 4,
  },
  productReq: {
    fontWeight: "normal",
    fontSize: 8,
    color: "#0CB669",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 600,
  },
  productAmount: {
    fontSize: 14,
    fontWeight: 300,
  },
  xButtonWrapper: {
    position: "absolute",
    top: 5, // Adjust the top position as needed
    right: 5, // Adjust the right position as needed
    marginRight: 3,
    marginTop: 3,
  },
  checkBoxCont: {
    alignContent: "center",
    justifyContent: "center",
  },
  checkBoxIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  cocont: {
    flexDirection: "row",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "#DFFF00",
    zIndex: 2, // Ensure the footer is on top
  },
  proceedButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 2,
  },
  proceedText: {
    color: "white",
    fontWeight: 500,
    fontSize: 15,
  },
  proceedButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 9,
    borderRadius: 10,
    backgroundColor: "#EC6F56",
    padding: 9,
  },
  completedOrderContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    width: "90%",
    height: 175,
    marginTop: 5,
    paddingHorizontal: 16, // Added to provide some spacing
    alignSelf: "center",
  },
  completedProductContainer: {
    flexDirection: "row",
    alignItems: "center", // Added to vertically align the image and info
  },
  viewRateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 2,
  },

  rateText: {
    fontWeight: 600,
    fontSize: 12,
    color: "black",
    margin: 10,
  },
  viewText: {
    fontWeight: 600,
    fontSize: 12,
    color: "white",
    margin: 10,
  },
  viewButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
    borderRadius: 10,
    backgroundColor: "#EC6F56",
  },
  rateButton: {
    backgroundColor: "#DCDCDC",
    // elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 9,
  },
  //image style for completed screen
  imageContainerCompletedScreen: {
    width: "40%",
    marginRight: 15,
  },
  productImageCompletedScreen: {
    height: 120, // Adjust the height as needed
    width: "100%", // Make the image take the entire container width
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 20,
    zIndex: 2, // Ensure the footer is on top
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  homeButtonCont: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 50,
    alignContent: "center",
    elevation: 9,
    borderWidth: 1,
    borderColor: "#EC6F56",
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertical
  },
  homeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    alignContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent background
    height: "100%",
  },
  noOrdersCont: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  noOrders: {
    fontSize: 20,
    alignSelf: "center",
  },
  noOrdersIcon: {
    alignSelf: "center",
  },
  orderGroupContainer: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 10,
  },
  viewOrderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  viewMoreTextCont: {
    color: "#EC6F56",
    marginTop: 12,
  },
  viewMoreText: {
    textAlign: "right",
    color: "#EC6F56",
    fontWeight: 700,
    fontSize: 15,
    textDecorationLine: "underline",
  },
  separator: {
    marginTop: 10,
    height: 1,
    width: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    alignSelf: "center",
  },
  separator2: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.5) ",
    alignSelf: "center",
  },
  verticalSeparator: {
    width: 3,
    height: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.9) ",
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 5,
  },
  sellerCont: {
    flexDirection: "row",
  },
  groupTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 7,
  },
  groupTitleRight: {
    justifyContent: "flex-end",
    fontSize: 14,
    color: "#778899",
  },
  orderTotalText: {
    fontWeight: 400,
    fontSize: 12,
  },
  orderTotalCont: {
    flexDirection: "row",
  },
  viewButtonCont: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default styles;
