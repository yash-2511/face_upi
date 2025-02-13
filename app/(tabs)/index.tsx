import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const quickActions = [
  { icon: 'phone-portrait', label: 'Mobile', color: '#818cf8' },
  { icon: 'flash', label: 'Electricity', color: '#fbbf24' },
  { icon: 'tv', label: 'DTH', color: '#34d399' },
  { icon: 'water', label: 'Water', color: '#60a5fa' },
];

const recentContacts = [
  { id: '1', name: 'Sarah Wilson', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', upiId: '@sarahw' },
  { id: '2', name: 'Michael Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', upiId: '@michaelc' },
  { id: '3', name: 'Emma Davis', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', upiId: '@emmad' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₹24,500.00</Text>
        <TouchableOpacity style={styles.addMoneyButton}>
          <Text style={styles.addMoneyText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionItem}>
              <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={24} color="white" />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.recentContactsContainer}>
        <Text style={styles.sectionTitle}>Recent Contacts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentContacts.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.contactCard}>
              <Image source={{ uri: contact.image }} style={styles.contactImage} />
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.upiId}>{contact.upiId}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  balanceCard: {
    backgroundColor: '#6366f1',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    color: '#e0e7ff',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '600',
    marginTop: 8,
  },
  addMoneyButton: {
    backgroundColor: '#818cf8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addMoneyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  quickActionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    width: '23%',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
  },
  recentContactsContainer: {
    padding: 16,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 12,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  upiId: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});