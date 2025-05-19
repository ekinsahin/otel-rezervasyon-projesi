import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHotelOwner, setIsHotelOwner] = useState(false);
  const [hotelName, setHotelName] = useState('');
  const [hotelNo, setHotelNo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Hata', 'Lütfen gerekli alanları doldurun');
      return;
    }

    if (isHotelOwner && (!hotelName || !hotelNo)) {
      Alert.alert('Hata', 'Lütfen otel bilgilerini doldurun');
      return;
    }

    try {
      setLoading(true);
      const userData = {
        name,
        email,
        password,
        ...(isHotelOwner && { hotelName, hotelNo })
      };

      const res = await register(userData);

      if (res.status && res.data?.token) {
        await AsyncStorage.setItem('accessToken', res.data.token);
        await AsyncStorage.setItem('accessUser', JSON.stringify(res.data.user));
        router.replace('/(dashboard)');
      } else {
        Alert.alert('Kayıt Başarısız', res.message || 'Bilgileri kontrol edin');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6">
            {/* Header */}
            <View className="items-center mb-8">
              <Image
                source={require('../../assets/icon.png')}
                className="w-32 h-32 rounded-2xl shadow-lg"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-[#d28f9b] mt-4">Rezervasyon Sistemi</Text>
            </View>

            {/* Welcome Text */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Hesap Oluştur ✨
              </Text>
              <Text className="text-base text-gray-500">
                {isHotelOwner ? 'Otel yönetim panelinize kayıt olun' : 'Hemen ücretsiz hesap oluşturun'}
              </Text>
            </View>

            {/* User Type Selection */}
            <TouchableOpacity
              className="flex-row items-center justify-center mb-6 p-4 border border-[#e4cfd1] rounded-xl"
              onPress={() => setIsHotelOwner(!isHotelOwner)}
            >
              <Ionicons
                name={isHotelOwner ? "business" : "business-outline"}
                size={24}
                color="#d28f9b"
              />
              <Text className="ml-2 text-[#d28f9b] font-medium">
                {isHotelOwner ? 'Otel Sahibi Kaydı' : 'Otel Sahibi misiniz?'}
              </Text>
            </TouchableOpacity>

            {/* Form Fields */}
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Ad Soyad</Text>
                <View className="flex-row items-center border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3">
                  <Ionicons name="person-outline" size={20} color="#a88b92" />
                  <TextInput
                    className="flex-1 ml-2 text-gray-800"
                    placeholder="Adınızı ve soyadınızı girin"
                    placeholderTextColor="#a88b92"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {isHotelOwner && (
                <>
                  <View>
                    <Text className="text-sm font-medium text-gray-700 mb-2">Otel Adı</Text>
                    <View className="flex-row items-center border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3">
                      <Ionicons name="business-outline" size={20} color="#a88b92" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800"
                        placeholder="Otel adını girin"
                        placeholderTextColor="#a88b92"
                        value={hotelName}
                        onChangeText={setHotelName}
                      />
                    </View>
                  </View>

                  <View>
                    <Text className="text-sm font-medium text-gray-700 mb-2">Otel Sicil No</Text>
                    <View className="flex-row items-center border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3">
                      <Ionicons name="card-outline" size={20} color="#a88b92" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800"
                        placeholder="Otel sicil numarasını girin"
                        placeholderTextColor="#a88b92"
                        value={hotelNo}
                        onChangeText={setHotelNo}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </>
              )}

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">E-posta</Text>
                <View className="flex-row items-center border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3">
                  <Ionicons name="mail-outline" size={20} color="#a88b92" />
                  <TextInput
                    className="flex-1 ml-2 text-gray-800"
                    placeholder="E-posta adresinizi girin"
                    placeholderTextColor="#a88b92"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Şifre</Text>
                <View className="flex-row items-center border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3">
                  <Ionicons name="lock-closed-outline" size={20} color="#a88b92" />
                  <TextInput
                    className="flex-1 ml-2 text-gray-800"
                    placeholder="Şifrenizi girin"
                    placeholderTextColor="#a88b92"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className="bg-[#d28f9b] rounded-xl py-4 items-center justify-center mt-6 shadow-sm"
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">Kayıt Ol</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View className="mt-8 border-t border-gray-200 pt-6">
              <Text className="text-center text-gray-500">
                Zaten hesabınız var mı?{' '}
                <Text
                  className="text-[#d28f9b] font-semibold"
                  onPress={() => router.push('/(auth)/login')}
                >
                  Giriş Yapın
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
