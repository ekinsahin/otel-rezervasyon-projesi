import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const reservations = [
  {
    id: 'r1',
    guestName: 'Ahmet Yılmaz',
    checkIn: '15 Mart 2024',
    checkOut: '18 Mart 2024',
    roomType: 'Deluxe Oda',
    status: 'confirmed',
    totalPrice: 4350,
  },
  {
    id: 'r2',
    guestName: 'Ayşe Demir',
    checkIn: '20 Mart 2024',
    checkOut: '22 Mart 2024',
    roomType: 'Suit Oda',
    status: 'pending',
    totalPrice: 4200,
  },
];

const questions = [
  {
    id: 'q1',
    guestName: 'Mehmet Kaya',
    question: 'Kahvaltı saatleri nedir?',
    date: '10 Mart 2024',
    status: 'answered',
    answer: 'Kahvaltı 07:00-10:00 saatleri arasında servis edilmektedir.',
  },
  {
    id: 'q2',
    guestName: 'Zeynep Şahin',
    question: 'Otopark ücretli mi?',
    date: '8 Mart 2024',
    status: 'pending',
    answer: null,
  },
];

export default function HotelOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('reservations');
  const [loading, setLoading] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [answerText, setAnswerText] = useState('');
  const router = useRouter();

  // Dummy kullanıcı ve otel adı
  const userName = 'Ekin';
  const hotelName = 'Test Otel';

  const handleAnswer = () => {
    if (answerText.trim()) {
      // Burada API'ye cevap gönderilecek
      setShowAnswerModal(false);
      setAnswerText('');
      setSelectedQuestion(null);
    }
  };

  const renderReservation = ({ item }: any) => (
    <View className="mb-4 bg-white rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-gray-800">{item.guestName}</Text>
        <View className={`px-2 py-1 rounded-full ${
          item.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <Text className={`text-xs ${
            item.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {item.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
          </Text>
        </View>
      </View>

      <View className="space-y-1">
        <Text className="text-sm text-gray-600">Giriş: {item.checkIn}</Text>
        <Text className="text-sm text-gray-600">Çıkış: {item.checkOut}</Text>
        <Text className="text-sm text-gray-600">Oda: {item.roomType}</Text>
        <Text className="text-sm font-semibold text-[#d28f9b] mt-2">
          Toplam: {item.totalPrice}₺
        </Text>
      </View>

      <View className="flex-row justify-end mt-3 space-x-2">
        <TouchableOpacity className="bg-[#fbeaec] px-3 py-1 rounded-full">
          <Text className="text-[#d28f9b] text-sm">İptal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#d28f9b] px-3 py-1 rounded-full">
          <Text className="text-white text-sm">Onayla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuestion = ({ item }: any) => (
    <View className="mb-4 bg-white rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-gray-800">{item.guestName}</Text>
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
          <Text className="text-xs text-gray-500 mb-1">Cevabınız:</Text>
          <Text className="text-sm text-gray-700">{item.answer}</Text>
        </View>
      )}
      
      <Text className="text-xs text-gray-400 mt-2">{item.date}</Text>

      {!item.answer && (
        <TouchableOpacity
          onPress={() => {
            setSelectedQuestion(item);
            setShowAnswerModal(true);
          }}
          className="bg-[#d28f9b] px-4 py-2 rounded-lg mt-3 self-end"
        >
          <Text className="text-white text-sm">Cevapla</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-5 pb-3 border-b border-gray-200 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-[#d28f9b]">Otel Yönetimi</Text>
          <Text className="text-sm text-gray-500">{hotelName}</Text>
          <Text className="text-xs text-gray-400 mt-1">Hoş geldiniz, {userName}!</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace('/(auth)/hotel-owner-login')} className="bg-[#fbeaec] px-3 py-2 rounded-xl">
          <Ionicons name="log-out-outline" size={22} color="#d28f9b" />
        </TouchableOpacity>
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
            Rezervasyonlar
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
            Sorular
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      <View className="flex-1 px-4 mt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#d28f9b" />
          </View>
        ) : (
          (activeTab === 'reservations' && reservations.length === 0) ? (
            <View className="flex-1 justify-center items-center">
              <Ionicons name="bed-outline" size={48} color="#d28f9b" style={{ marginBottom: 12 }} />
              <Text className="text-lg text-gray-400">Henüz rezervasyon yok</Text>
            </View>
          ) : (activeTab === 'questions' && questions.length === 0) ? (
            <View className="flex-1 justify-center items-center">
              <Ionicons name="chatbubble-ellipses-outline" size={48} color="#d28f9b" style={{ marginBottom: 12 }} />
              <Text className="text-lg text-gray-400">Gelen soru bulunamadı</Text>
            </View>
          ) : (
            <FlatList
              data={activeTab === 'reservations' ? reservations : questions as any}
              keyExtractor={(item) => item.id}
              renderItem={activeTab === 'reservations' ? renderReservation : renderQuestion}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )
        )}
      </View>

      {/* Cevap Modalı */}
      <Modal
        visible={showAnswerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAnswerModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-800">Soruyu Cevapla</Text>
              <TouchableOpacity onPress={() => setShowAnswerModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedQuestion && (
              <View className="mb-4">
                <Text className="text-sm text-gray-500 mb-1">Soru:</Text>
                <Text className="text-base text-gray-800 mb-4">{selectedQuestion.question}</Text>
              </View>
            )}

            <TextInput
              value={answerText}
              onChangeText={setAnswerText}
              placeholder="Cevabınızı yazın..."
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
              textAlignVertical="top"
            />

            <TouchableOpacity
              onPress={handleAnswer}
              className="bg-[#d28f9b] py-4 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">Cevabı Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-200 py-3">
        <TouchableOpacity onPress={() => router.replace('/(dashboard)/hotel-owner')}>
          <Ionicons name="home-outline" size={26} color="#d28f9b" />
          <Text className="text-xs text-center text-[#d28f9b]">Ana Sayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/hotel-owner/settings')}>
          <Ionicons name="settings-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Ayarlar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(dashboard)/hotel-owner/profile')}>
          <Ionicons name="person-outline" size={26} color="#a78a92" />
          <Text className="text-xs text-center text-[#a78a92]">Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 