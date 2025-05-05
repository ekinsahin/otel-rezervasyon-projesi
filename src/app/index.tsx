import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FAF3F0] px-6 justify-between"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="flex-1 justify-center items-center">
        <Image
          source={require('../assets/icon.png')}
          className="w-48 h-48 mb-6 rounded-2xl shadow-md"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-[#5D4A42] text-center">
          Konforlu Bir Kaçamak
        </Text>
        <Text className="text-lg font-semibold text-[#CB6E6E] mt-2">
          Senin İçin Seçildi
        </Text>
        <Text className="text-base text-[#7C6A63] text-center mt-4 px-4">
          Sıcacık atmosferi, eşsiz konaklama deneyimi ve pastel renklerle tasarlanmış arayüz seni bekliyor.
        </Text>
      </View>

      <View className="mb-10">
        <TouchableOpacity
          className="bg-[#E8B4B8] py-4 rounded-xl mb-4 shadow-sm"
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text className="text-white text-center font-medium text-base">
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-[#E8B4B8] py-4 rounded-xl"
          onPress={() => router.replace('/(auth)/register')}
        >
          <Text className="text-[#E8B4B8] text-center font-medium text-base">
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
