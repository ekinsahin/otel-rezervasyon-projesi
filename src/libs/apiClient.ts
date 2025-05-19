import { API } from "@/constants/api";
import { Storage } from "@/helpers";

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.timeout = 10000; // 10 seconds timeout
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const token = await Storage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Hatası: ${response.status} - ${errorText}`);
      }
      return response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('İstek zaman aşımına uğradı');
      }
      if (error.message.includes('Network request failed')) {
        throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      }
      throw error;
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request(endpoint);
  }

  async post<T = any>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await this.request<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export default new ApiClient(API.BASE_URL);
