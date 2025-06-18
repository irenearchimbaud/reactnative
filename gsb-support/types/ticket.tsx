export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'hardware' | 'software' | 'network' | 'access' | 'other';
  createdBy: string;
  assignedTo?: string;
  createdAt: any;
  updatedAt: any;
  dueDate?: any;
  location?: string;
  deviceInfo?: {
    model?: string;
    os?: string;
    version?: string;
  };
}