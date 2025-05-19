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
  Modal,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const hotelData = {
  "1": {
    name: "Pembe Bahce Oteli",
    location: "Sapanca",
    price: 1450,
    description: "Dogayla ic ice, huzur dolu bir kacamak. Sapanca Golu manzarali ve romantik bahcesiyle unlu.",
    image: "https://picsum.photos/id/1018/400/300"
  },
  "2": {
    name: "Vintage Suit",
    location: "Alacati",
    price: 2100,
    description: "Tarihi tas evlerde konaklama keyfi. Egenin kalbinde nostaljik ve konforlu bir deneyim.",
    image: "https://picsum.photos/id/1025/400/300"
  },
  "3": {
    name: "Gol Manzarali Ev",
    location: "Abant",
    price: 1750,
    description: "Abant Golu kenarinda huzur veren bir dag evi. Sessizlik ve doga yuruyusleri icin ideal.",
    image: "https://picsum.photos/id/1043/400/300"
  }
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
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  const handleBooking = () => {
    Alert.alert('Rezervasyon Başarılı', `${hotel.name} için rezervasyon yapıldı!`);
    router.replace('/(dashboard)/bookings');
  };

  const handleAskOwner = () => {
    setShowMessageModal(true);
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      Alert.alert(
        'Mesaj Gönderildi',
        'Otel sahibine mesajınız iletildi. En kısa sürede size dönüş yapılacaktır.',
        [{ text: 'Tamam', onPress: () => setShowMessageModal(false) }]
      );
      setMessageText('');
    }
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

        <View className="p-4">
          <Text className="text-2xl font-bold text-pink-600">{hotel.name}</Text>
          <Text className="text-gray-500 text-sm mb-2">{hotel.location}</Text>
          <Text className="text-xl font-semibold text-gray-800 mb-3">{hotel.price}₺ / gece</Text>
          <Text className="text-gray-700 text-base mb-5">{hotel.description}</Text>

          {/* Aksiyonlar */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity 
              onPress={handleAskOwner} 
              className="flex-row items-center space-x-2 bg-[#fbeaec] px-4 py-2 rounded-full"
            >
              <Ionicons name="chatbubble-outline" size={20} color="#d28f9b" />
              <Text className="text-[#d28f9b] font-medium">Otel Sahibine Sor</Text>
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

      {/* Mesaj Modalı */}
      <Modal
        visible={showMessageModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMessageModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800">Otel Sahibine Mesaj</Text>
              <TouchableOpacity onPress={() => setShowMessageModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Mesajınızı yazın..."
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
              textAlignVertical="top"
            />

            <TouchableOpacity
              onPress={sendMessage}
              className="bg-[#d28f9b] py-4 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">Mesaj Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rezervasyon Butonu */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          onPress={handleBooking}
          className="bg-[#d28f9b] py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-base">Rezervasyon Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
