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
      <Text style={styles.title}>Bienvenue {user?.email || 'utilisateur'} 🎉</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/app/ticket/createTicket')}
      >
        <Text style={styles.cardTitle}>📝 Créer un ticket</Text>
        <Text style={styles.cardText}>Signaler un nouveau problème technique</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>🎫 Vos tickets</Text>
      <FlatList
        data={userTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ticketCard}
            onPress={() => router.push(`/app/ticket/${item.id}`)}
          >
            <Text style={styles.ticketTitle}>{item.title}</Text>
            <Text style={styles.ticketStatus}>{item.status} • {item.priority}</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: '#f5f8fc',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003366',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0066cc',
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  ticketCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ticketStatus: {
    fontSize: 14,
    color: '#555',
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
