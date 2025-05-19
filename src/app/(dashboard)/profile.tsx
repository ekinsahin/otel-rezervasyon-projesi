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

const questions = [
  {
    id: 'q1',
    hotel: 'Pembe Bahçe Oteli',
    question: 'Kahvalti saatleri nedir?',
    answer: 'Kahvalti 07:00-10:00 saatleri arasinda servis edilmektedir.',
    date: '10 Mart 2024',
    status: 'answered',
  },
  {
    id: 'q2',
    hotel: 'Vintage Suit',
    question: 'Otopark ucretli mi?',
    answer: 'Evet, otopark ucretlidir. Gunluk 50 TL olarak ucretlendirilmektedir.',
    date: '8 Mart 2024',
    status: 'answered',
  },
  {
    id: 'q3',
    hotel: 'Göl Manzaralı Ev',
    question: 'Evcil hayvan kabul ediyor musunuz?',
    answer: null,
    date: '5 Mart 2024',
    status: 'pending',
  },
];

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reservations'); // 'reservations' or 'questions'
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const renderReservation = ({ item }: any) => (
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

  const renderQuestion = ({ item }: any) => (
    <View className="mb-4 bg-white rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-gray-800">{item.hotel}</Text>
        <View className={`px-2 py-1 rounded-full ${
          item.status === 'answered' ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <Text className={`text-xs ${
            item.status === 'answered' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {item.status === 'answered' ? 'Cevaplandı' : 'Beklemede'}
          </Text>
        </View>
      </View>
      
      <Text className="text-sm text-gray-600 mb-2">{item.question}</Text>
      
      {item.answer && (
        <View className="bg-gray-50 p-3 rounded-lg mt-2">
          <Text className="text-xs text-gray-500 mb-1">Cevap:</Text>
          <Text className="text-sm text-gray-700">{item.answer}</Text>
        </View>
      )}
      
      <Text className="text-xs text-gray-400 mt-2">{item.date}</Text>
    </View>
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

      {/* Tab Butonları */}
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setActiveTab('reservations')}
          className={`flex-1 py-3 ${
            activeTab === 'reservations' ? 'border-b-2 border-[#d28f9b]' : ''
          }`}
        >
          <Text
            className={`text-center ${
              activeTab === 'reservations' ? 'text-[#d28f9b] font-semibold' : 'text-gray-500'
            }`}
          >
            Rezervasyonlarım
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('questions')}
          className={`flex-1 py-3 ${
            activeTab === 'questions' ? 'border-b-2 border-[#d28f9b]' : ''
          }`}
        >
          <Text
            className={`text-center ${
              activeTab === 'questions' ? 'text-[#d28f9b] font-semibold' : 'text-gray-500'
            }`}
          >
            Sorularım
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      <View className="flex-1 px-5 mt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#d28f9b" />
          </View>
        ) : (
          <FlatList
            data={activeTab === 'reservations' ? reservations : questions}
            keyExtractor={(item) => item.id}
            renderItem={activeTab === 'reservations' ? renderReservation : renderQuestion}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
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
          <Ionicons name="heart-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Favoriler</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/profile')}>
          <Ionicons name="person-outline" size={26} color="#d28f9b" />
          <Text className="text-xs text-center text-[#d28f9b]">Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
