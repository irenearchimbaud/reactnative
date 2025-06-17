import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password, fullName);
      router.replace("/(app)/dashboard");
    } catch {
      alert("Erreur d'inscription");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nom complet" value={fullName} onChangeText={setFullName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Inscription" onPress={handleRegister} />
    </View>
  );
}