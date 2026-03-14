import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const BorrowerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockData = {
    collaterals: [
      {
        id: 1,
        type: 'Недвижимость',
        address: 'Москва, ул. Ленина, д. 10',
        amount: 5000000,
        status: 'pending',
      },
      {
        id: 2,
        type: 'Автомобиль',
        model: 'Toyota Camry 2020',
        amount: 1500000,
        status: 'approved',
      },
    ],
    applications: [
      {
        id: 1,
        amount: 5000000,
        status: 'pending',
        date: '2024-01-15',
      },
      {
        id: 2,
        amount: 1500000,
        status: 'approved',
        date: '2024-01-10',
      },
    ],
  };

  const renderCollateral = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.type}</Text>
      <Text style={styles.cardText}>{item.address || item.model}</Text>
      <Text style={styles.cardAmount}>
        {item.amount.toLocaleString('ru-RU')} ₽
      </Text>
      <View
        style={[
          styles.statusBadge,
          item.status === 'approved' && styles.statusApproved,
          item.status === 'pending' && styles.statusPending,
        ]}
      >
        <Text style={styles.statusText}>
          {item.status === 'approved' ? 'Одобрено' : 'На рассмотрении'}
        </Text>
      </View>
    </View>
  );

  const renderApplication = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Заявка #{item.id}</Text>
      <Text style={styles.cardAmount}>
        {item.amount.toLocaleString('ru-RU')} ₽
      </Text>
      <Text style={styles.cardText}>Дата: {item.date}</Text>
      <View
        style={[
          styles.statusBadge,
          item.status === 'approved' && styles.statusApproved,
          item.status === 'pending' && styles.statusPending,
        ]}
      >
        <Text style={styles.statusText}>
          {item.status === 'approved' ? 'Одобрено' : 'На рассмотрении'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Личный кабинет</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.tabActive]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'dashboard' && styles.tabTextActive,
            ]}
          >
            Главная
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'collaterals' && styles.tabActive]}
          onPress={() => setActiveTab('collaterals')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'collaterals' && styles.tabTextActive,
            ]}
          >
            Залоги
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'applications' && styles.tabActive]}
          onPress={() => setActiveTab('applications')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'applications' && styles.tabTextActive,
            ]}
          >
            Заявки
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'dashboard' && (
          <View style={styles.dashboard}>
            <View style={styles.statsCard}>
              <Text style={styles.statsLabel}>Активные залоги</Text>
              <Text style={styles.statsValue}>
                {mockData.collaterals.length}
              </Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsLabel}>Заявки на рассмотрении</Text>
              <Text style={styles.statsValue}>
                {mockData.applications.filter((a) => a.status === 'pending').length}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'collaterals' && (
          <FlatList
            data={mockData.collaterals}
            renderItem={renderCollateral}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        )}

        {activeTab === 'applications' && (
          <FlatList
            data={mockData.applications}
            renderItem={renderApplication}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  statsLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardText: {
    color: '#666',
    marginBottom: 10,
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusApproved: {
    backgroundColor: '#d1fae5',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065f46',
  },
});

export default BorrowerDashboard;

