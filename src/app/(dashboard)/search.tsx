import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const hotels = [
  { id: '1', name: 'Pembe Bahçe Oteli', location: 'Sapanca', price: 1450, image: 'https://picsum.photos/id/1018/400/300' },
  { id: '2', name: 'Vintage Suit', location: 'Alaçatı', price: 2100, image: 'https://picsum.photos/id/1025/400/300' },
  { id: '3', name: 'Göl Manzaralı Ev', location: 'Abant', price: 1750, image: 'https://picsum.photos/id/1043/400/300' },
];

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  
  const filteredHotels = hotels.filter((hotel) =>
    (hotel.name.toLowerCase().includes(query.toLowerCase()) || hotel.location.toLowerCase().includes(location.toLowerCase()))
  );

  return (
    <SafeAreaView className="flex-1 mb-5 bg-white">
      {/* Header */}
      <View className="px-4 pt-5 pb-2 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-pink-600">Otel Arama 🔍</Text>
        <View className="mt-3 flex-row items-center bg-gray-100 px-4 py-2 rounded-full">
          <Ionicons name="search-outline" size={20} color="#A1A1AA" />
          <TextInput
            placeholder="Otel adı veya konum"
            value={query}
            onChangeText={setQuery}
            className="ml-2 flex-1 text-sm text-gray-800"
            placeholderTextColor="#A1A1AA"
          />
        </View>
      </View>

      {/* Location and Dates */}
      <View className="mt-4 px-4">
        <TextInput
          placeholder="Konum"
          value={location}
          onChangeText={setLocation}
          className="bg-gray-100 rounded-full px-4 py-2 mb-3"
          placeholderTextColor="#A1A1AA"
        />
        <TextInput
          placeholder="Tarih (DD/MM/YYYY - DD/MM/YYYY)"
          value={dates}
          onChangeText={setDates}
          className="bg-gray-100 rounded-full px-4 py-2"
          placeholderTextColor="#A1A1AA"
        />
      </View>

      {/* Search Results */}
      <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-base font-semibold text-gray-800 mb-2">Oteller</Text>
        {filteredHotels.length > 0 ? (
          <FlatList
            data={filteredHotels}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/hotel/${item.id}`)}
                className="mb-4"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-40 rounded-xl mb-2"
                  resizeMode="cover"
                />
                <Text className="text-sm font-medium text-gray-700">{item.name}</Text>
                <Text className="text-sm text-gray-500">{item.location}</Text>
                <Text className="text-sm font-bold text-pink-600">{item.price}₺ / gece</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text className="text-sm text-gray-400 mb-6">Eşleşen otel bulunamadı.</Text>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-200 py-3">
        <TouchableOpacity onPress={() => router.replace('/(dashboard)')}>
          <Ionicons name="home-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Keşfet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/search')}>
          <Ionicons name="search-outline" size={26} color="#d28f9b" />
          <Text className="text-xs text-center text-[#d28f9b]">Ara</Text>
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
