import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import 'react-native-gesture-handler';

import LoginScreen from "./src/components/Screens/LoginScreen";
import CatalogoScreen from "./src/components/Screens/CatalogoScreen";
import HistoricoPedidosScreen from "./src/components/Screens/HistoricoPedidosScreen";
import NotificacoesScreen from "./src/components/Screens/NotificacoesScreen";
import RegistroPedidosScreen from "./src/components/Screens/RegistroPedidosScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Catálogo: "view-list",
            Histórico: "history",
            Notificações: "notifications",
            Registro: "shopping-cart",
          };
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Catálogo" component={CatalogoScreen} />
      <Tab.Screen name="Histórico" component={HistoricoPedidosScreen} />
      <Tab.Screen name="Notificações" component={NotificacoesScreen} />
      <Tab.Screen name="Registro" component={RegistroPedidosScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Main"
            component={AppTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
