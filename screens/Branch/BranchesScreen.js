import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Iconify } from "react-native-iconify";
import styles from "./bs";
import buildQueryUrl from "../../src/api/components/conditionalQuery";
import { getAuthToken } from "../../src/authToken";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { GOOGLE_MAPS_API_KEY } from "../../src/api/googleApiKey";
const { width, height } = Dimensions.get("window");

// Calculate the image dimensions based on screen size
const imageWidth = width; //Adjust as needed
const imageHeight = height * 0.18; // Adjust as needed
const cardWidth = (width - 30) / 2;
const BranchesScreen = ({ navigation, route }) => {
  const [branches, setBranches] = useState([]);
  const branchCompany = route.params?.name;
  const [showModal, setShowModal] = useState(false);
  const [isLocationButtonClicked, setLocationButtonClicked] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [sortedBranches, setSortedBranches] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = GOOGLE_MAPS_API_KEY;
  //
  const handleFilterClick = () => {
    setShowModal(true);
  };
  handleCloseDrawer = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchCustomerAddress = async () => {
      try {
        const authToken = await getAuthToken();
        const customerId = authToken.userId;
        const customerDocRef = doc(db, "customers", customerId);
        const customerDocSnapshot = await getDoc(customerDocRef);

        if (customerDocSnapshot.exists()) {
          const customerData = customerDocSnapshot.data();
          const address = customerData.address;
          setCustomerAddress(address);
        }
      } catch (error) {
        console.log("Error fetching customer address:", error);
      }
    };
    fetchCustomerAddress();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      setIsLoading(true);
      const Branches6KM = [];
      const dbSeller = collection(db, "sellers");
      const ratingsRef = collection(db, "rateAndReview");

      const activeSellersSnapshot = await getDocs(
        query(
          dbSeller,
          where("companyName", "==", branchCompany),
          where("status", "==", "Active")
        )
      );

      let shouldLog = false;

      for (const branchDoc of activeSellersSnapshot.docs) {
        const branch = branchDoc.data();
        const branchAddress = branch.formattedAddress;
        const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
          customerAddress
        )}&destinations=${encodeURIComponent(branchAddress)}&key=${apiKey}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (
            data.rows &&
            data.rows.length > 0 &&
            data.rows[0].elements &&
            data.rows[0].elements.length > 0
          ) {
            const distance = data.rows[0].elements[0].distance
              ? data.rows[0].elements[0].distance.value
              : undefined;

            if (distance !== undefined && distance < 6000) {
              // Fetch ratings for the current sellerId
              const sellerId = branch.sellerId;
              const querySnapshot = await getDocs(
                query(ratingsRef, where("sellerId", "==", sellerId))
              );

              const sellerRatings = [];
              querySnapshot.forEach((doc) => {
                const ratingData = doc.data();
                sellerRatings.push(ratingData);
              });

              // Calculate average rating based on pharmacyRating field
              let totalRating = 0;
              const DEFAULT_RATING = 0.0;
              if (sellerRatings.length > 0) {
                sellerRatings.forEach((rating) => {
                  totalRating += rating.pharmacyRating;
                });
                const averageRating = totalRating / sellerRatings.length;

                const sellerRef = doc(db, "sellers", branch.sellerId);

                try {
                  await updateDoc(sellerRef, {
                    averageRating: averageRating.toFixed(1),
                  });
                } catch (error) {
                  console.error("Error updating seller document:", error);
                }
                Branches6KM.push({
                  branchesId: branch.sellerId,
                  distance: distance,
                  branch: branch.branch,
                  companyName: branch.companyName,
                  img: branch.img,
                  averageRating: averageRating.toFixed(1),
                });
                shouldLog = true;
              } else {
                // If no ratings found
                Branches6KM.push({
                  branchesId: branch.sellerId,
                  distance: distance,
                  branch: branch.branch,
                  companyName: branch.companyName,
                  img: branch.img,
                  averageRating: DEFAULT_RATING,
                });
                shouldLog = true;
              }
            }
          } else {
            console.error("Invalid distance data received:", data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching distance:", error);
          setIsLoading(false);
        }
      }

      if (shouldLog) {
        Branches6KM.sort((a, b) => b.averageRating - a.averageRating);
        setBranches(Branches6KM);
        setIsLoading(false);
      }
    };
    fetchBranches();
  }, [branchCompany, customerAddress]);

  //search
  useEffect(() => {
    if (searchKeyword !== "") {
      setLocationButtonClicked(false);
    }
    const trimmedSearchKeyword = searchKeyword.trim().toLowerCase();
    if (trimmedSearchKeyword === "") {
      setSortedBranches(branches);
    } else {
      // Filter branches based on the search keyword
      const filteredBranches = branches.filter((branch) => {
        const branchName = extractBranchName(branch.branch).toLowerCase();
        return branchName.includes(trimmedSearchKeyword);
      });
      setSortedBranches(filteredBranches);
    }
  }, [searchKeyword, branches]);

  const sortBranches = () => {
    const branchesCopy = [...branches];

    if (isLocationButtonClicked) {
      const branchesWithDistances = branchesCopy.filter(
        (branch) => branch.distance !== undefined
      );
      branchesWithDistances.sort((a, b) => a.distance - b.distance);
      const sortedBranchesWithDistances = branchesWithDistances.concat(
        branchesCopy.filter((branch) => branch.distance === undefined)
      );
      setSortedBranches(sortedBranchesWithDistances);
    }
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const cancelSorting = async () => {
    setSearchKeyword("");
    setLocationButtonClicked(false);
    setSortedBranches(branches);
    setShowModal(false);
  };

  const extractBranchName = (branch) => {
    const match = branch.match(/\(([^)]+)\)/);
    return match ? branch.replace(match[0], "").trim() : branch;
  };
  //{averageRating.toFixed(1)}
  const renderBranchItem = ({ item }) => (
    <View style={[styles.pharmacyContainer, { width: cardWidth }]}>
      <View style={styles.pharmacyCard}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.ratingsRowDiv}>
            <Icon name="star" size={13} color="#FAC63E" />
            <Text style={styles.ratingText}>{item.averageRating}</Text>
          </View>

          <View>
            {isLocationButtonClicked && (
              <Text style={styles.distanceText}>
                {item.distance
                  ? `${(item.distance / 1000).toFixed(1)} km`
                  : "NA"}
              </Text>
            )}
          </View>
        </View>
        {item.img ? (
          <Image source={{ uri: item.img }} style={styles.image} />
        ) : (
          <Image
            source={require("../../assets/img/def-image.jpg")}
            style={styles.image}
          />
        )}
        <Text style={styles.pharmacyName}>{item.companyName}</Text>
        <Text style={styles.branchName}>{`(${extractBranchName(
          item.branch
        )})`}</Text>

        <View style={styles.viewButtonContainer}>
          <TouchableOpacity
            style={styles.pharmacyDetailsView}
            onPress={() =>
              navigation.navigate("BranchDetailsScreen", {
                sellerId: item.branchesId,
              })
            }
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate("ProductScreen", {
                name: item.companyName,
                branch: extractBranchName(item.branch),
                sellerId: item.branchesId,
              })
            }
          >
            <Text style={styles.viewButtonText}>Products</Text>
            <Iconify
              icon="ic:round-greater-than"
              size={18}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  //
  const renderSearchIcon = () => {
    return (
      <TouchableOpacity style={styles.searchButtonIcon}>
        <Iconify icon="iconoir:search" size={22} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{route.params?.name}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.searchFilterCont}>
            <View style={styles.searchCont}>
              <View style={styles.searchTexInputView}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="Search branch"
                  value={searchKeyword}
                  onChangeText={(text) => setSearchKeyword(text)}
                />
              </View>
              {renderSearchIcon()}
            </View>
            <TouchableOpacity
              style={styles.iconFilterCont}
              onPress={handleFilterClick}
            >
              <Iconify icon="mi:filter" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.branchSelectionText}>Branch Selection</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#EC6F56" />
          </View>
        ) : (
          <View>
            {sortedBranches.length > 0 || branches.length > 0 ? (
              <FlatList
                data={sortedBranches.length > 0 ? sortedBranches : branches}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={renderBranchItem}
                contentContainerStyle={styles.branchesContainer}
              />
            ) : (
              <View style={styles.noOrdersCont}>
                <View style={styles.noOrders}>
                  <Iconify
                    icon="ph:git-branch-light"
                    size={45}
                    color="black"
                    style={styles.noOrdersIcon}
                  />
                  <Text style={styles.noOrdersText}>No branches yet</Text>
                </View>
              </View>
            )}
          </View>
        )}
        <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.drawerContainer}>
                <Text style={styles.drawerTitle}>Search Filter</Text>

                <View style={styles.locationView}>
                  <Text style={styles.locationText}>By Location</Text>

                  <TouchableOpacity
                    style={{
                      ...styles.locationTO,
                      borderColor: isLocationButtonClicked
                        ? "#EC6F56"
                        : "#D9D9D9",
                    }}
                    onPress={() =>
                      setLocationButtonClicked(!isLocationButtonClicked)
                    }
                  >
                    <Text style={styles.searchlocationText}>
                      Search by location
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.resetApplyView}>
                  <TouchableOpacity
                    style={styles.resetTO}
                    activeOpacity={0.7}
                    onPress={cancelSorting}
                  >
                    <Text style={styles.resetText}>RESET</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.closeTO} onPress={closeModal}>
                    <Text style={styles.closeText}>CLOSE</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.applyTO}
                    activeOpacity={0.7}
                    onPress={sortBranches}
                  >
                    <Text style={styles.applyText}>APPLY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BranchesScreen;
