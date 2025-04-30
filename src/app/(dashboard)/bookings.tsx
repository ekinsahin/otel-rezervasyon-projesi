import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const hotels = [
  { id: '1', name: 'Pembe Bahçe Oteli', location: 'Sapanca', price: 1450, image: 'https://picsum.photos/id/1018/400/300', dates: '20/06/2025 - 22/06/2025' },
  { id: '2', name: 'Vintage Suit', location: 'Alaçatı', price: 2100, image: 'https://picsum.photos/id/1025/400/300', dates: '10/07/2025 - 13/07/2025' },
  { id: '3', name: 'Göl Manzaralı Ev', location: 'Abant', price: 1750, image: 'https://picsum.photos/id/1043/400/300', dates: '01/08/2025 - 03/08/2025' },
];

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(query.toLowerCase()) &&
    hotel.location.toLowerCase().includes(location.toLowerCase()) &&
    hotel.dates.includes(dates)
  );

  return (
    <SafeAreaView className="flex-1 mb-5 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-5 pt-6 pb-3 border-b border-gray-200 bg-white">
          <Text className="text-3xl font-bold text-pink-600">Otel Ara</Text>
        </View>

        {/* Filters */}
        <View className="px-5 mt-3 space-y-3">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <Ionicons name="search-outline" size={20} color="#A1A1AA" />
            <TextInput
              placeholder="Otel adı"
              value={query}
              onChangeText={setQuery}
              className="ml-2 flex-1 text-gray-800"
              placeholderTextColor="#A1A1AA"
            />
          </View>
          <TextInput
            placeholder="Konum"
            value={location}
            onChangeText={setLocation}
            className="bg-gray-100 rounded-full px-4 py-2"
            placeholderTextColor="#A1A1AA"
          />
          <TextInput
            placeholder="Tarih (GG/AA/YYYY - GG/AA/YYYY)"
            value={dates}
            onChangeText={setDates}
            className="bg-gray-100 rounded-full px-4 py-2"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        {/* Results */}
        <View className="flex-1 mt-5 px-5">
          {filteredHotels.length > 0 ? (
            <FlatList
              data={filteredHotels}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/hotel/${item.id}`)}
                  className="mb-5"
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-48 rounded-2xl mb-3"
                    resizeMode="cover"
                  />
                  <Text className="text-lg font-semibold text-gray-700">{item.name}</Text>
                  <Text className="text-sm text-gray-500">{item.location}</Text>
                  <Text className="text-sm text-gray-400">{item.dates}</Text>
                  <Text className="text-base font-bold text-pink-600 mt-1">{item.price}₺ / gece</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text className="text-center text-gray-400 mt-10">Eşleşen otel bulunamadı.</Text>
          )}
        </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
