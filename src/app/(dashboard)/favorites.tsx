import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const favoriteHotels = [
  {
    id: '2',
    name: 'Vintage Suit',
    location: 'Alaçatı',
    price: 2100,
    image: 'https://picsum.photos/id/1025/400/300',
  },
  {
    id: '3',
    name: 'Göl Manzaralı Ev',
    location: 'Abant',
    price: 1750,
    image: 'https://picsum.photos/id/1043/400/300',
  },
];

export default function Favorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState(favoriteHotels);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 pt-6 pb-3 border-b border-gray-200 bg-white">
        <Text className="text-3xl font-bold text-pink-600">Favoriler ❤️</Text>
      </View>

      <View className="flex-1 px-5 mt-5">
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
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
                <Text className="text-base font-bold text-pink-600 mt-1">{item.price}₺ / gece</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text className="text-center text-gray-400 mt-10">Henüz favoriniz yok.</Text>
        )}
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-200 py-3">
        <TouchableOpacity onPress={() => router.replace('/(dashboard)')}>
          <Ionicons name="home-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Keşfet</Text>
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
          <Ionicons name="heart-outline" size={26} color="#d28f9b" />
          <Text className="text-xs text-center text-[#d28f9b]">Favoriler</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/profile')}>
          <Ionicons name="person-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
