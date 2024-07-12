import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {Link} from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">taylors test app</Text>
      <StatusBar style='auto' />
      <Link href='/profile' style={{ color: 'blue'}}> Go to Profile</Link>
    </View>
  );
}
