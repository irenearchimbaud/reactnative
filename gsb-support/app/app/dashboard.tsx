import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ticket } from '../../types/ticket';
import { getAllTickets } from '../../lib/ticket';

export default function Dashboard() {
  const { logout: logoutBase, user } = useAuth();
  const router = useRouter();
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);

  const logout = async () => {
    await logoutBase();
    router.replace('/auth/login');
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const allTickets = await getAllTickets();
      const filtered = allTickets.filter(t => t.createdBy === user?.uid);
      setUserTickets(filtered);
    };
    if (user?.uid) fetchTickets();
  }, [user]);

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/app/ticket/createTicket')}
      >
        <Text style={styles.cardTitle}>➕ Nouveau ticket</Text>
        <Text style={styles.cardText}>Signalez un problème à l'équipe IT</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Vos tickets</Text>
      <FlatList
        data={userTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ticketCard}
            onPress={() => router.push(`/app/ticket/${item.id}`)}
          >
            <Text style={styles.ticketTitle}>{item.title}</Text>
            <Text style={styles.ticketMeta}>{item.status.toUpperCase()} • {item.priority.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun ticket pour le moment.</Text>}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a3c5a',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  ticketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  ticketMeta: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  empty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 30,
  },
  logoutButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#cc0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});