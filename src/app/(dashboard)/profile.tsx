import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const reservations = [
  {
    id: 'r1',
    hotel: 'Pembe Bahçe Oteli',
    location: 'Sapanca',
    date: '15-18 Mayıs 2025',
    image: 'https://picsum.photos/id/1018/400/300',
  },
  {
    id: 'r2',
    hotel: 'Göl Manzaralı Ev',
    location: 'Abant',
    date: '25-28 Haziran 2025',
    image: 'https://picsum.photos/id/1043/400/300',
  },
];

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push(`/hotel/${item.id}`)}
      className="mb-4"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-40 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-sm font-semibold text-gray-700">{item.hotel}</Text>
      <Text className="text-sm text-gray-500">{item.location}</Text>
      <Text className="text-sm text-pink-600">{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Kullanıcı Bilgileri */}
      <View className="items-center px-4 py-5 border-b border-gray-200">
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=24' }}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-xl font-bold text-gray-800">Ekin</Text>
        <Text className="text-sm text-gray-500">Otel Tutkunu • {reservations.length} rezervasyon</Text>
      </View>

      {/* Rezervasyonlar */}
      <View className="flex-1 px-5 mt-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Rezervasyonlarım</Text>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#e11d48" />
          </View>
        ) : (
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-200 py-3">
        <TouchableOpacity onPress={() => router.replace('/(dashboard)')}>
          <Ionicons name="home-outline" size={26} color="#a78a92" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(dashboard)/search')}>
          <Ionicons name="search-outline" size={26} color="#a78a92" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(dashboard)/bookings')}>
          <Ionicons name="calendar-outline" size={26} color="#a78a92" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(dashboard)/favorites')}>
          <Ionicons name="heart-outline" size={26} color="#a78a92" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(dashboard)/profile')}>
          <Ionicons name="person-outline" size={26} color="#e11d48" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
