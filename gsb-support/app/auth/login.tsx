import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/app/dashboard");
    } catch {
      alert("Erreur de connexion");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Connexion" onPress={handleLogin} />
      <Link href={"/auth/register"}>Pas encore inscrit ?</Link>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})