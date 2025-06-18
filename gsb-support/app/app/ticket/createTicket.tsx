import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';
import { createTicket } from '../../../lib/ticket';
import { Picker } from '@react-native-picker/picker';

export default function CreateTicketScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [category, setCategory] = useState<'hardware' | 'software' | 'network' | 'access' | 'other'>('software');

  const handleCreate = async () => {
    try {
      await createTicket({
        title,
        description,
        status: 'new',
        priority,
        category,
        createdBy: user!.uid,
      });
      router.replace('/app/dashboard');
    } catch (e) {
      alert('Erreur lors de la création du ticket');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Créer un nouveau ticket</Text>

      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre du ticket"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Décrivez le problème rencontré..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Priorité</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}>
          <Picker.Item label="Faible" value="low" />
          <Picker.Item label="Moyenne" value="medium" />
          <Picker.Item label="Élevée" value="high" />
          <Picker.Item label="Critique" value="critical" />
        </Picker>
      </View>

      <Text style={styles.label}>Catégorie</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Matériel" value="hardware" />
          <Picker.Item label="Logiciel" value="software" />
          <Picker.Item label="Réseau" value="network" />
          <Picker.Item label="Accès" value="access" />
          <Picker.Item label="Autre" value="other" />
        </Picker>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Créer le ticket" onPress={handleCreate} color="#0066cc" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f8fc',
    padding: 24,
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonWrapper: {
    marginTop: 24,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});
