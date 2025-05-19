import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dummyHotels = [
  {
    id: '1',
    name: 'Pembe Bahçe Oteli',
    location: 'Sapanca',
    price: 1450,
    image: 'https://picsum.photos/400/300?1',
  },
  {
    id: '2',
    name: 'Vintage Suit',
    location: 'Alaçatı',
    price: 2100,
    image: 'https://picsum.photos/400/300?2',
  },
  {
    id: '3',
    name: 'Göl Manzaralı Ev',
    location: 'Abant',
    price: 1750,
    image: 'https://picsum.photos/400/300?3',
  },
];

export default function Search() {
  const [search, setSearch] = useState('');
  const [hotels, setHotels] = useState(dummyHotels);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const router = useRouter();

  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  const renderHotel = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-2xl overflow-hidden mb-4 mx-4 shadow"
      onPress={() => router.push(`/hotel/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 180 }} />
      <View className="p-4">
        <Text className="text-lg font-semibold text-pink-700">{item.name}</Text>
        <Text className="text-gray-500">{item.location}</Text>
        <Text className="text-pink-500 font-bold mt-1">{item.price}₺ / gece</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 mb-5 bg-white">
      <View className="mx-4 mt-4 mb-2 flex-row items-center space-x-2">
        <TextInput
          placeholder="Otel veya konum ara..."
          placeholderTextColor="#b9939d"
          value={search}
          onChangeText={setSearch}
          className="flex-1 bg-[#fbeaec] px-4 py-3 rounded-full text-sm text-gray-800 border border-[#eed5d9]"
        />
        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          className="bg-gradient-to-r from-[#d28f9b] to-[#e4a5b0] p-3 rounded-full shadow-sm"
        >
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredHotels}
        renderItem={renderHotel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800">Filtreler</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View className="space-y-6">
              <View>
                <Text className="text-lg font-semibold text-gray-700 mb-3">Konum</Text>
                <View className="flex-row flex-wrap gap-2">
                  {['Sapanca', 'Alaçatı', 'Abant', 'Bodrum', 'Antalya'].map((location) => (
                    <TouchableOpacity
                      key={location}
                      onPress={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedLocation === location
                          ? 'bg-[#d28f9b] border-[#d28f9b]'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Text
                        className={`${
                          selectedLocation === location ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {location}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text className="text-lg font-semibold text-gray-700 mb-3">Fiyat Aralığı</Text>
                <View className="flex-row items-center space-x-4">
                  <Text className="text-gray-600">{priceRange[0]}₺</Text>
                  <View className="flex-1 h-1 bg-gray-200 rounded-full">
                    <View
                      className="h-1 bg-[#d28f9b] rounded-full"
                      style={{ width: '50%' }}
                    />
                  </View>
                  <Text className="text-gray-600">{priceRange[1]}₺</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setShowFilters(false)}
                className="bg-[#d28f9b] py-4 rounded-xl items-center"
              >
                <Text className="text-white font-semibold text-base">Filtreleri Uygula</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alt Menü */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-200 py-3">
        <TouchableOpacity onPress={() => router.replace('/(dashboard)')}>
          <Ionicons name="home-outline" size={26} color="#d28f9b" />
          <Text className="text-xs text-center text-[#d28f9b]">Keşfet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/search')}>
          <Ionicons name="search-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Ara</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/bookings')}>
          <Ionicons name="calendar-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Rezervasyonlar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/favorites')}>
          <Ionicons name="heart-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Favoriler</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/profile')}>
          <Ionicons name="person-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
