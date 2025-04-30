import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const hotelData = {
  '1': {
    name: 'Pembe Bahçe Oteli',
    location: 'Sapanca',
    price: 1450,
    description: 'Doğayla iç içe, huzur dolu bir kaçamak. Sapanca Gölü manzaralı ve romantik bahçesiyle ünlü.',
    image: 'https://picsum.photos/id/1018/400/300',
  },
  '2': {
    name: 'Vintage Suit',
    location: 'Alaçatı',
    price: 2100,
    description: 'Tarihi taş evlerde konaklama keyfi. Ege’nin kalbinde nostaljik ve konforlu bir deneyim.',
    image: 'https://picsum.photos/id/1025/400/300',
  },
  '3': {
    name: 'Göl Manzaralı Ev',
    location: 'Abant',
    price: 1750,
    description: 'Abant Gölü kenarında huzur veren bir dağ evi. Sessizlik ve doğa yürüyüşleri için ideal.',
    image: 'https://picsum.photos/id/1043/400/300',
  },
};

export default function HotelDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const hotel = hotelData[id as string];

  if (!hotel) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-500">Otel bulunamadı.</Text>
      </View>
    );
  }

  const handleBooking = () => {
    Alert.alert('Rezervasyon Başarılı', `${hotel.name} için rezervasyon yaptınız!`);
    router.replace('/(dashboard)/bookings');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Image source={{ uri: hotel.image }} className="w-full h-64" resizeMode="cover" />
        <View className="p-5">
          <Text className="text-2xl font-bold text-pink-600">{hotel.name}</Text>
          <Text className="text-gray-500 text-sm mb-2">{hotel.location}</Text>
          <Text className="text-xl font-semibold text-gray-800 mb-3">{hotel.price}₺ / gece</Text>
          <Text className="text-gray-700 text-base">{hotel.description}</Text>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200 bg-white">
        <TouchableOpacity
          onPress={handleBooking}
          className="bg-pink-600 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-base">Rezervasyon Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Geri tuşu */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4 bg-white p-2 rounded-full shadow"
      >
        <Ionicons name="arrow-back" size={22} color="#333" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
