import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
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
      <View className="mx-4 mt-4 mb-2">
        <TextInput
          placeholder="Otel veya konum ara..."
          placeholderTextColor="#b9939d"
          value={search}
          onChangeText={setSearch}
          className="bg-[#fbeaec] px-4 py-3 rounded-full text-sm text-gray-800 border border-[#eed5d9]"
        />
      </View>

      <FlatList
        data={filteredHotels}
        renderItem={renderHotel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

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
