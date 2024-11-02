import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import LoginScreen from "./pages/LoginScreen";
import AnimeScreen from "./pages/AnimeScreen";

const BottomTabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightgray",
          marginHorizontal: 16,
          borderRadius: 24,
          height: 64,
          marginBottom: 16,
          shadowOpacity: 0,
          elevation: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
            color = focused ? "black" : "lightgray";
          } else if (route.name === "Profile") {
            iconName = "person";
            color = focused ? "black" : "lightgray";
          } else if (route.name === "Anime") {
            iconName = "book";
            color = focused ? "black" : "lightgray";
          }

          return <Octicons name={iconName} size={24} color={color} />;
        },
        headerShown: false,
      })}
    >
      <BottomTabNavigator.Screen name="Home" component={HomeScreen} />
      <BottomTabNavigator.Screen name="Profile" component={ProfileScreen} />
      <BottomTabNavigator.Screen name= "Anime" component={AnimeScreen}/>
    </BottomTabNavigator.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
