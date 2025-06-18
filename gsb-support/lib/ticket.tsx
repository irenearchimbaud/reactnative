import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Ticket } from '../types/ticket';

const ticketsRef = collection(db, 'tickets');

export async function createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date();
  const docRef = await addDoc(ticketsRef, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

export async function getAllTickets(): Promise<Ticket[]> {
  const snapshot = await getDocs(ticketsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Ticket));
}

export async function getTicketById(id: string): Promise<Ticket | null> {
  const docRef = doc(db, 'tickets', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Ticket;
}

export async function updateTicket(id: string, data: Partial<Ticket>) {
  const docRef = doc(db, 'tickets', id);
  await updateDoc(docRef, { ...data, updatedAt: new Date() });
}