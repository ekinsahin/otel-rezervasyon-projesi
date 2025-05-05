import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
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

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Harika bir yerdi, tekrar geleceğiz!',
    'Konum çok iyiydi ama kahvaltı biraz zayıftı.',
  ]);
  const [commentText, setCommentText] = useState('');

  const handleBooking = () => {
    Alert.alert('Rezervasyon Başarılı', `${hotel.name} için rezervasyon yapıldı!`);
    router.replace('/(dashboard)/bookings');
  };

  const handleAddToCart = () => {
    Alert.alert('Sepete Eklendi', `${hotel.name} sepete eklendi.`);
  };

  const toggleLike = () => setLiked(!liked);

  const submitComment = () => {
    if (commentText.trim()) {
      setComments([commentText, ...comments]);
      setCommentText('');
    }
  };

  if (!hotel) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-500">Otel bulunamadı.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Image source={{ uri: hotel.image }} className="w-full h-64" resizeMode="cover" />

        {/* Beğeni Butonu */}
        <TouchableOpacity
          onPress={toggleLike}
          className="absolute top-12 right-4 bg-white p-2 rounded-full shadow"
        >
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? '#f43f5e' : '#333'} />
        </TouchableOpacity>

        {/* Geri */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-4 bg-white p-2 rounded-full shadow"
        >
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>

        <View className="p-5">
          <Text className="text-2xl font-bold text-pink-600">{hotel.name}</Text>
          <Text className="text-gray-500 text-sm mb-2">{hotel.location}</Text>
          <Text className="text-xl font-semibold text-gray-800 mb-3">{hotel.price}₺ / gece</Text>
          <Text className="text-gray-700 text-base mb-5">{hotel.description}</Text>

          {/* Aksiyonlar */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity onPress={handleAddToCart} className="flex-row items-center space-x-2">
              <Feather name="shopping-cart" size={20} color="#f43f5e" />
              <Text className="text-pink-600 font-medium">Sepete Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-2">
              <Feather name="share-2" size={20} color="#666" />
              <Text className="text-gray-600">Paylaş</Text>
            </TouchableOpacity>
          </View>

          {/* Yorumlar */}
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Yorumlar</Text>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Yorum yaz..."
              className="border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            <TouchableOpacity
              onPress={submitComment}
              className="bg-pink-600 px-4 py-2 rounded-md mb-4 items-center"
            >
              <Text className="text-white font-medium">Gönder</Text>
            </TouchableOpacity>
            {comments.map((c, i) => (
              <View key={i} className="bg-gray-100 p-3 rounded-md mb-2">
                <Text className="text-gray-700">{c}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Rezervasyon */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <TouchableOpacity
          onPress={handleBooking}
          className="bg-pink-600 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-base">Rezervasyon Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
