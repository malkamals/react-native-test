import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const dominantColor = '#800080';
const NewsScreen = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <View style={{padding:16}}>
      <Text style={styles.title}>Food Waste: Mengapa dan Bagaimana Mengatasinya</Text>

      <Text style={styles.subtitle}>Definisi dan Rantai Pasok Makanan</Text>
      <Text style={styles.paragraph}>
        Food waste merujuk pada makanan yang dibuang atau terbuang tanpa dimanfaatkan sepenuhnya. Permasalahan ini merambah berbagai tahap dalam rantai pasok makanan, dimulai dari produksi, distribusi, hingga konsumsi akhir oleh individu atau restoran.
      </Text>

      <Text style={styles.subtitle}>Tahap-tahap Food Waste</Text>
      <Text style={styles.subtitle}>1. Produksi:</Text>
      <Text style={styles.paragraph}>
        - Overproduction: Produksi makanan yang berlebihan seringkali menyebabkan penumpukan stok yang tak terpakai.
        - Pertanian: Buah dan sayuran yang tidak memenuhi standar estetika sering dibuang di tingkat pertanian.
        </Text>

        <Text style={styles.subtitle}>2. Distribusi dan Penyimpanan:</Text>
        <Text style={styles.paragraph}>
        - Kerusakan dalam Transportasi: Makanan rusak akibat pengiriman dapat menyebabkan pemborosan.
        - Kedaluwarsa: Makanan yang mencapai tanggal kedaluwarsa di toko-toko sering dibuang.
</Text>
<Text style={styles.subtitle}>3. Konsumsi Rumah Tangga:</Text>
<Text style={styles.paragraph}>
        - Pembelian Berlebihan: Pembelian makanan yang tidak sesuai kebutuhan dapat menyebabkan penumpukan di rumah tangga.
        - Pembuangan Makanan yang Tidak Terpakai: Sisa makanan yang bisa dimanfaatkan kembali sering dibuang.
        </Text>
        </View>
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
  container: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: dominantColor
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: dominantColor
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
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
});

export default NewsScreen;
