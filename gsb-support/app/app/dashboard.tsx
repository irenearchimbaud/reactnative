import { View, Text, Button } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>Bienvenue sur GSB Support 🎉</Text>
      <Button title="Déconnexion" onPress={logout} />
    </View>
  );
}