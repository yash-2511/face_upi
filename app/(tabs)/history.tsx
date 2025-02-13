import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching transactions (Replace with API call or local storage)
    setTimeout(() => {
      setTransactions([
        { id: '1', type: 'sent', name: 'Sarah Wilson', amount: 2500, date: '2024-02-20T14:30:00Z', status: 'completed' },
        { id: '2', type: 'received', name: 'Michael Chen', amount: 1800, date: '2024-02-19T09:15:00Z', status: 'completed' },
        { id: '3', type: 'sent', name: 'Emma Davis', amount: 3200, date: '2024-02-18T16:45:00Z', status: 'completed' },
      ]);
    }, 1000);
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  };

  const TransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Ionicons
        name={item.type === 'sent' ? 'arrow-up' : 'arrow-down'}
        size={24}
        color={item.type === 'sent' ? '#ef4444' : '#22c55e'}
      />
      <View style={styles.transactionDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
      </View>
      <Text style={styles.amount}>₹{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  transactionDetails: { flex: 1, marginLeft: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 14, color: 'gray' },
  amount: { fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 18, color: 'gray', marginTop: 50 },
});
