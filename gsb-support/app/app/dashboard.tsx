import { View, Text, Button } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Bienvenue sur GSB Support 🎉</Text>
      <Button title="Créer un ticket" onPress={() => router.push("./ticket/createTicket")} />
      <Button title="Déconnexion" onPress={logout} />
    </View>
  );
}