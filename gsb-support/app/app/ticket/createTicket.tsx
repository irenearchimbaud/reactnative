import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';
import { createTicket } from '../../../lib/ticket';

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
    <View style={{ padding: 20 }}>
      <Text>Titre</Text>
      <TextInput value={title} onChangeText={setTitle} />

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} multiline />

      <Text>Priorité</Text>
      <TextInput value={priority} onChangeText={(val) => setPriority(val as any)} />

      <Text>Catégorie</Text>
      <TextInput value={category} onChangeText={(val) => setCategory(val as any)} />

      <Button title="Créer le ticket" onPress={handleCreate} />
    </View>
  );
}
