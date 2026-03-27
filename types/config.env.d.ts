declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL: string;
    NODE_ENV: 'dev' | 'prod';
  }
  export const Config: NativeConfig;
  export default Config;
}
