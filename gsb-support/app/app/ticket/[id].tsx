import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getTicketById } from '../../../lib/ticket';
import { Ticket } from '../../../types/ticket';

export default function TicketDetails() {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      if (typeof id !== 'string') return;
      const t = await getTicketById(id);
      setTicket(t);
      setLoading(false);
    };
    fetchTicket();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (!ticket) return <Text style={{ padding: 20 }}>Ticket introuvable.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Description :</Text>
        <Text style={styles.text}>{ticket.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Statut :</Text>
        <Text style={styles.badge}>{ticket.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Priorité :</Text>
        <Text style={styles.text}>{ticket.priority}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Catégorie :</Text>
        <Text style={styles.text}>{ticket.category}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Créé le :</Text>
        <Text style={styles.text}>{new Date(ticket.createdAt.seconds * 1000).toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f8fc',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#222',
  },
  badge: {
    fontSize: 14,
    color: 'white',
    backgroundColor: '#0066cc',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
