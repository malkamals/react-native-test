import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Linking, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import menuItems from '../src/menuItems';
import { addOrderToHistory } from '../src/orderHistoryManager';
import NasiGoreng from '../assets/nasi goreng.png';
import Capcay from '../assets/capcay.png';
import JusMangga from '../assets/jus mangga.png';
import EsTeh from '../assets/es teh.png';

const dominantColor = '#800080';
const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [locationIcon, setLocationIcon] = useState('map-marker');
  const [filterType, setFilterType] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const isFilterActive = filterType !== 'all';
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  const addToCart = (food) => {
    // Check if the item is already in the cart
    const existingItem = selectedItems.find(item => item.title === food.title);

    if (existingItem) {
      // Check if the quantity in the cart doesn't exceed the available quantity
      if (existingItem.quantity + 1 <= existingItem.left) {
        // Update the quantity of the existing item
        const updatedItems = selectedItems.map(item =>
          item.title === existingItem.title ? { ...item, quantity: item.quantity + 1 } : item
        );
        setSelectedItems([...updatedItems, { ...food, quantity: 1 }]);

      } else {
        // Show an alert or handle the case where the quantity exceeds the available quantity
        alert(`Sorry, you can't order more than ${existingItem.left} ${existingItem.title}(s).`);
      }
    } else {
      // Add the item to the cart with quantity 1
      setSelectedItems([...selectedItems, { ...food, quantity: 1 }]);
    }
  };
  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };
  
  const removeFromCart = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };
  
  const generateWhatsAppMessage = (selectedItems) => {
    const uniqueItems = Array.from(new Set(selectedItems.map((item) => item.title)));
  
    const itemMessages = uniqueItems.map((title) => `${title} x ${countItems()[title]}`);
    
    return `Hello, I would like to place an order:\n${itemMessages.join('\n')}`;
  };
  const countItems = () => {
    const itemCounts = {};

    selectedItems.forEach((item) => {
      if (item.title in itemCounts) {
        itemCounts[item.title] += 1;
      } else {
        itemCounts[item.title] = 1;
      }
    });

    return itemCounts;
  };



const handleFilterPress = () => {
  if (filterType === 'all') {
    setFilterType('food');
  } else if (filterType === 'food') {
    setFilterType('beverage');
  } else {
    setFilterType('all');
  }
};

const getFilterButtonText = () => {
  if (filterType === 'all') {
    return 'All';
  } else if (filterType === 'food') {
    return 'Food';
  } else {
    return 'Beverage';
  }
};

const filteredFoodItems = menuItems.filter((food) => {
  if (filterType === 'all') {
    return true;
  } else {
    return food.type === filterType;
  }
});

const clearCart = () => {
  setSelectedItems([]);
};
const handleWhatsAppCheckout = () => {
  const whatsappMessage = generateWhatsAppMessage(selectedItems);
  Linking.openURL(`whatsapp://send?phone=+62831-2791-7173&text=${whatsappMessage}`);

  // Calculate total price
  const totalPrice = calculateTotalPrice().toFixed(2);

  // Get item counts
  const itemCounts = countItems();

  // Get item names
  const itemNames = Object.keys(itemCounts);

  // Create a timestamp
  const timestamp = new Date().toISOString();

  // Add the current order to the order history
  const newOrder = {
    orderItems: selectedItems,
    totalPrice,
    itemCounts,
    itemNames,
    timestamp,
  };

  // Navigate to History screen, passing the new order
  addOrderToHistory(newOrder);
  navigation.navigate('History', { newOrder });
  clearCart();
};

  return (
    <View style={{flex:1}}>
      <ScrollView style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <View style={styles.logoAndTextContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.featuredImageLogo}
        />
        <Text style={styles.haiAdminText}>Hi, Admin</Text>
      {/* Search Input */}
      </View>
        <View style={styles.logoAndTextContainer2} >
      <TextInput
        style={styles.searchInput}
        placeholder="Mau selamatkan Makanan apa hari ini?"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      </View>

     

      {/* Checkout Card */}
      <View style={styles.checkoutCard}>
        <View style={styles.checkoutHeader}>
          <Text style={styles.checkoutTitle}>Checkout</Text>
          <TouchableOpacity onPress={clearCart}>
            <Icon name='trash' size={20} color= '#fff' style={{padding: 5, borderRadius: 5, backgroundColor: dominantColor}} />
          </TouchableOpacity>
        </View>
        {Object.keys(countItems()).map((title, index) => (
          <View key={index} style={styles.checkoutItem}>
            <Text>{`${title}: ${countItems()[title]}`}</Text>
            <TouchableOpacity onPress={() => removeFromCart(title)}>
              <Icon name="trash" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice().toFixed(2)}</Text>
        {selectedItems.length > 0 && (
     <TouchableOpacity
     style={[styles.checkoutButton, { backgroundColor: dominantColor }]}
     onPress={handleWhatsAppCheckout}
   >
     <Text style={styles.checkoutButtonText}>Checkout on WhatsApp</Text>
   </TouchableOpacity>
        )}
      </View>
        <View style={styles.locationContainer}>
  <Text style={styles.nearbyText}>Makanan disekitarmu </Text>
  <Icon name={locationIcon} size={20} color="#333" style={styles.locationIcon} />
 
</View>
<View style={styles.filterContainer}>
<TouchableOpacity onPress={() => handleFilterPress()}>
  <Text style={styles.filterButton}>{getFilterButtonText()}</Text>
</TouchableOpacity>   
</View>
        <View style={styles.swiperContainer}>
        <FlatList
      data={filteredFoodItems}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.cardContainer}
      renderItem={({ item }) => {
        const imagePath = `../assets/${item.title}.png`;
        console.log('Image Path:', imagePath);
        const images = {
          capcay: Capcay,
          'nasi goreng': NasiGoreng,
          'jus mangga': JusMangga,
          'es teh': EsTeh
          // Add other images as needed
        };
        return(
          <View style={styles.card}>
           <Image
        source={images[item.title.toLowerCase()]}
        style={styles.featuredImage}
      />
            <Text style={styles.featuredText}>{item.title}</Text>
            <Text style={styles.featuredText}>{item.description}</Text>
            <Text style={styles.featuredText}>Left: {item.left}</Text>
            <TouchableOpacity style={styles.featuredButton} onPress={() => addToCart(item)}>
              <Text style={styles.featuredButtonText}>Order Now</Text>
            </TouchableOpacity>
          
          </View>
        );
      }}
      />
      </View>
      </View>
      </ScrollView>
       {/* Footer Menu */}
       <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigateTo('Home')}>
          <Icon name="home" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigateTo('History')}>
          <Icon name="history" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigateTo('News')}>
          <Icon name="newspaper-o" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigateTo('Account')}>
          <Icon name="user" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Push content to the top and footer to the bottom
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '150%',
  },
  wrapper: {
    height: 300,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  featuredText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  featuredButton: {
    backgroundColor: dominantColor,
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  featuredButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1,  // Optional: Add a border at the top of the footer
    borderTopColor: '#ccc',  // Optional: Border color
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkoutCard: {
    position: 'relative',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    alignSelf: 'center',
    zIndex: 1, // Tambahkan ini
  },

  checkoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:dominantColor
  },
  checkoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: dominantColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  featuredImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 50,
  },
  featuredImageLogo: {
    width: 60,
    height: 55,
    borderRadius: 10,
  },
  logoAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoAndTextContainer2: {
    marginTop:10,
    alignItems: 'center',
  },
  haiAdminText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center', // Align the text vertically in the center
    color: dominantColor
  },

  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  swiperContainer: {
    left: 0,
    right: 0,
    marginTop: 20,
    marginBottom: 20,
    height: 400, // Adjust this value as needed
  },
  nearbyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    textAlign: 'left',
    alignSelf: 'flex-start', // Align the text to the start (left)
    color: dominantColor
  },
  locationContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  filterContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  locationIcon: {
    color: dominantColor
  },
  checkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 'auto',
    textAlign: 'center',
    alignSelf: 'center', // Align the text to the center vertically
    color: '#fff',
    backgroundColor: dominantColor,
    padding: 6,
    borderRadius: 6
  },
});

export default HomeScreen;
