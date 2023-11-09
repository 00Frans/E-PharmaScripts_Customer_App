import { StyleSheet, Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 2, // Ensure the title is on top
  },
  screenTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 500,
    paddingLeft: 20,
  },
  bodyWrapper: {
    flex: 1,
  },
  itemsContainer: {
    width: "100%",
    alignSelf: "center",
  },
  cartContainer: {
    width: "90%",
    alignSelf: "center",
    bottom: 69, //brute force padding from the checkout container
  },

  selectedProductContainer: {
    height: "100%",
    paddingTop: "21%",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    height: 120,
    width: "100%",
    alignSelf: "center",
    marginTop: 15,
    backgroundColor: "#FFFF",
  },
  imageContainer: {
    marginLeft: 20,
    height: "80%",
    width: "30%",
  },
  noOrdersCont: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 50,
  },
  noOrders: {
    fontSize: 20,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  noOrdersIcon: {
    alignSelf: "center",
    marginBottom: 5,
    color: "#36454F",
  },
  productImage: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
    marginLeft: -15,
  },
  productInfoContainer: {
    flex: 1,
  },
  priceRowContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontWeight: 600,
    fontSize: 14,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 500,
  },
  productReq: {
    fontWeight: "normal",
    fontSize: 7,
    color: "#0CB669",
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 14,
    fontWeight: 300,
  },
  xButtonWrapper: {
    position: "absolute",
    top: 5,
    right: 5,
    marginRight: 3,
    marginTop: 3,
  },
  checkBoxIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  quantityButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 300,
  },
  separator: {
    marginTop: 20,
    height: 1,
    width: "85%",
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
  },
  footer: {
    position: "absolute",
    bottom: 73,
    left: 0,
    right: 0,
    // backgroundColor: "#DFFF00",
    // borderTopWidth: 1,
    // borderTopColor: "#E0E0E0",
    zIndex: 2, // Ensure the footer is on top
  },
  //here
  checkoutContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    left: "5%",
    right: "5%",
    borderRadius: 20,
    width: "90%",
    paddingVertical: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    padding: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "60%",
    justifyContent: "space-between",
  },

  checkoutText: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  checkoutWrapper: {
    backgroundColor: "#DC3642",
    width: "85%",
    alignSelf: "center",
    borderRadius: 30,
    padding: 20,
  },
  priceText: {
    fontWeight: 400,
    fontSize: 15,
  },
  totalText: {
    fontWeight: 600,
    fontSize: 15,
    color: "#EC6F56",
  },
  totalAmountText: {
    fontWeight: 600,
    fontSize: 15,
    color: "#EC6F56",
  },
  button: {
    paddingHorizontal: 5,
  },
  quantityText: {
    marginHorizontal: 7,
    fontSize: 14,
    fontWeight: 500,
  },
  totalContainer: {
    width: "80%",
    alignSelf: "center",
    // marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  totalPmentText: {
    fontSize: 12,
    fontWeight: 600,
    marginRight: 20,
  },
  totalAmountText: {
    fontWeight: 700,
    color: "#EC6F56",
    fontSize: 12,
    marginRight: 11,
  },
  pdTotalAmountText: {
    fontWeight: 600,
    fontSize: 15,
  },
  tpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  ordernowText: {
    fontWeight: 600,
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
  ordernowButton: {
    backgroundColor: "#DC3642",
    padding: 15,
    borderRadius: 30,
    width: "50%",
  },
  sellerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 15,
    borderRadius: 20,
  },
  sellerName: {
    fontWeight: 500,
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent background
  },
  noOrdersText: {
    fontWeight: 300,
  },
});

export default styles;
