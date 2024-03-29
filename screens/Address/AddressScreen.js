import {
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Iconify } from "react-native-iconify";
import styles from "./addressStyle";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
  where,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuthToken } from "../../src/authToken";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation, useRoute } from "@react-navigation/native";
const AddressScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentCustomerId, setCustomerId] = useState(null);
  const [currentCustomerAddress, setCustomerAddress] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const authToken = await getAuthToken();
        const customerId = authToken.userId;
        setCustomerId(customerId);

        const customerDocRef = doc(db, "customers", customerId);
        const unsubscribe = onSnapshot(customerDocRef, (doc) => {
          if (doc.exists()) {
            const customerData = doc.data();
            const address = customerData.address;
            setCustomerAddress(address);
          }
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
      } catch (error) {
        console.log("Error fetching customer id:", error);
      }
    };
    //console.log("Id", currentCustomerId);
    fetchCustomerId();
  }, []);

  const saveAddress = async () => {
    if (currentCustomerId && selectedAddress) {
      if (currentCustomerAddress) {
        // Alert the user before changing the address
        Alert.alert(
          "Warning",
          "Modifying your address will result in removing all of your items from your cart.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Continue",
              onPress: async () => {
                try {
                  const customerRef = doc(db, "customers", currentCustomerId);
                  await setDoc(
                    customerRef,
                    { address: selectedAddress.description },
                    { merge: true }
                  );

                  // Logic to delete docs in the cart collection
                  const cartRef = collection(db, "cart");
                  const querySnapshot = await getDocs(
                    query(cartRef, where("customerId", "==", currentCustomerId))
                  );

                  const deletePromises = querySnapshot.docs.map((doc) =>
                    deleteDoc(doc.ref)
                  );

                  await Promise.all(deletePromises);

                  setSelectedAddress(null);
                  navigation.goBack();
                  ToastAndroid.show(
                    "Address saved successfully",
                    ToastAndroid.SHORT
                  );
                } catch (error) {
                  console.error("Error saving address:", error);
                  ToastAndroid.show(
                    "Failed to save address",
                    ToastAndroid.LONG
                  );
                }
              },
            },
          ]
        );
      } else {
        // If no existing address, proceed with saving the new address
        try {
          const customerRef = doc(db, "customers", currentCustomerId);
          await setDoc(
            customerRef,
            { address: selectedAddress.description },
            { merge: true }
          );

          setSelectedAddress(null);

          ToastAndroid.show("Address saved successfully", ToastAndroid.SHORT);
        } catch (error) {
          console.error("Error saving address:", error);
          ToastAndroid.show("Failed to save address", ToastAndroid.LONG);
        }
      }
    } else {
      ToastAndroid.show("Please select an address first", ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>My Address</Text>
      <View style={styles.line} />
      <View style={styles.currentTitleView}>
        <Iconify
          size={20}
          icon="entypo:location"
          color="#4E4E4E"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.currentText}>Current address</Text>
      </View>
      <View style={styles.addressView}>
        {currentCustomerAddress ? (
          <Text style={styles.displayAddressView}>
            {currentCustomerAddress}
          </Text>
        ) : (
          <Text style={styles.displayAddressView}>No address set</Text>
        )}
      </View>
      <View style={styles.currentTitleView}>
        <Iconify
          size={20}
          icon="mdi:address-marker"
          color="#4E4E4E"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.currentText}>Modify address</Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Type here..."
        onPress={(data, details = null) => {
          setSelectedAddress(data);
        }}
        query={{
          key: "AIzaSyAErVuJDetH9oqE36Gx_sBDBv2JIUbXcJ4",
          language: "en",
          components: "country:ph",
        }}
        styles={{
          textInputContainer: {
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
          },
          textInput: {
            height: 50,
            color: "#3C3C3C",
            fontSize: 14,
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
          },
          listView: {
            alignSelf: "center",
            width: "90%",
            fontSize: 13,
          },
        }}
      />
      <TouchableOpacity
        style={styles.addressView}
        activeOpacity={0.7}
        onPress={saveAddress}
      >
        <View style={styles.addressButton}>
          <Iconify
            size={20}
            icon="zondicons:add-outline"
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.addText}>Save Address</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;
