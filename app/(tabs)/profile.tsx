import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const menuItems = [
  { icon: 'card', label: 'Linked Accounts', route: '/linked-accounts', badge: '2' },
  { icon: 'shield-checkmark', label: 'Security', route: '/security', badge: null },
  { icon: 'notifications', label: 'Notifications', route: '/notifications', badge: '3' },
  { icon: 'help-circle', label: 'Help & Support', route: '/help', badge: null },
  { icon: 'settings', label: 'Settings', route: '/settings', badge: null },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    upiId: '@johndoe',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.upiId}>{profile.upiId}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.push('/edit-profile')}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem} onPress={() => navigation.push(item.route)}>
          <Ionicons name={item.icon} size={24} color="black" />
          <Text style={styles.menuLabel}>{item.label}</Text>
          {item.badge && <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { alignItems: 'center', padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  upiId: { fontSize: 14, color: 'gray' },
  editButton: { backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 },
  editButtonText: { color: 'white', fontSize: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  menuLabel: { flex: 1, fontSize: 16, marginLeft: 10 },
  badge: { backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 8 },
  badgeText: { color: 'white', fontSize: 14 },
});
