import apiClient from '@/libs/apiClient';
import {API} from "@/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';

interface LoginCredentials {
    email: string;
    password: string;
    hotelNo?: string; // Optional for regular users, required for hotel owners
    isHotelOwner?: boolean;
}

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    hotelName?: string;
    hotelNo?: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        isHotelOwner: boolean;
    };
}

export const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);
            const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
            
            // Token'ı kaydet
            await AsyncStorage.setItem('token', response.token);
            setToken(response.token);
            setUser(response.user);

            // Otel sahibi ise otel sahibi dashboard'una, değilse normal dashboard'a yönlendir
            if (response.user.isHotelOwner) {
                router.replace('/(dashboard)/hotel-owner');
            } else {
                router.replace('/(dashboard)');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials): Promise<LoginResponse> => {
        try {
            const response: any = await apiClient.post(API.ENDPOINTS.AUTH.REGISTER, credentials);
            return response;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    return { login, register }
};