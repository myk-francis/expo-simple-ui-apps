import "react-native-reanimated";
import "react-native-gesture-handler";
import AppStack from "./navigation/AppStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
