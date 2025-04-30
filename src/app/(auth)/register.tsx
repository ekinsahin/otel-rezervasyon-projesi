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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      setLoading(true);
      router.replace('/(dashboard)');

      const res = await register({ name, email, password });

      if (res.status && res.data?.token) {
        await AsyncStorage.setItem('accessToken', res.data.token);
        await AsyncStorage.setItem('accessUser', JSON.stringify(res.data.user));
        router.replace('/(dashboard)');
      } else {
        Alert.alert('Kayıt Başarısız', res.message || 'Bilgileri kontrol et');
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
            <View className="items-center mb-10">
              <Image
                source={require('../../assets/icon.png')}
                className="w-28 h-28"
                resizeMode="contain"
              />
              <Text className="text-xl font-bold text-[#d28f9b] mt-2">Rezervasyon Sistemi</Text>
            </View>

            <Text className="text-3xl font-semibold text-gray-900 text-center mb-2">
              Hesap Oluştur ✨
            </Text>
            <Text className="text-base text-gray-500 text-center mb-8">
              Oteliniz sizi bekliyor. Hemen katılın.
            </Text>

            <TextInput
              className="border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3 mb-4 text-gray-800"
              placeholder="Ad Soyad"
              placeholderTextColor="#a88b92"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              className="border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3 mb-4 text-gray-800"
              placeholder="E-posta"
              placeholderTextColor="#a88b92"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              className="border border-[#e4cfd1] bg-[#faf6f7] rounded-xl px-4 py-3 mb-6 text-gray-800"
              placeholder="Şifre"
              placeholderTextColor="#a88b92"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              className="bg-[#d28f9b] rounded-xl py-4 items-center justify-center"
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-medium text-base">Kayıt Ol</Text>
              )}
            </TouchableOpacity>

            <Text className="text-center text-gray-500 mt-6 mb-8">
              Zaten bir hesabınız var mı?{' '}
              <Text
                className="text-[#d28f9b] font-semibold"
                onPress={() => router.push('/(auth)/login')}
              >
                Giriş Yap
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
