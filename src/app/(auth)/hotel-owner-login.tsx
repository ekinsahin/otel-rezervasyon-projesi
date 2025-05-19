import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function HotelOwnerLogin() {
  const [hotelNo, setHotelNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    router.replace('/(dashboard)/hotel-owner');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="items-center mt-10 mb-8">
          <Ionicons name="business-outline" size={96} color="#d28f9b" style={{ marginBottom: 16 }} />
          <Text className="text-2xl font-bold text-[#d28f9b]">Otel Sahibi Girişi</Text>
          <Text className="text-gray-500 text-center mt-2">
            Otel yönetim paneline hoş geldiniz
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2">Otel Kayıt Numarası</Text>
            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3">
              <Ionicons name="business-outline" size={20} color="#666" />
              <TextInput
                value={hotelNo}
                onChangeText={setHotelNo}
                placeholder="Otel kayıt numaranızı girin"
                className="flex-1 ml-2 text-gray-800"
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 mb-2">E-posta</Text>
            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3">
              <Ionicons name="mail-outline" size={20} color="#666" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="E-posta adresinizi girin"
                className="flex-1 ml-2 text-gray-800"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Şifre</Text>
            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3">
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Şifrenizi girin"
                className="flex-1 ml-2 text-gray-800"
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/forgot-password')}
            className="self-end"
          >
            <Text className="text-[#d28f9b]">Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className="bg-[#d28f9b] py-4 rounded-xl items-center mt-4"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">Giriş Yap</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Müşteri Girişi Linki */}
        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-gray-500">Müşteri misiniz?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-[#d28f9b] ml-1 font-semibold">Müşteri Girişi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 