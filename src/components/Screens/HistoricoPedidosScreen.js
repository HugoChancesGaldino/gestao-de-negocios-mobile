import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

export default function HistoricoPedidosScreen() {
  // Dados fixos de demonstração com 20 pedidos, incluindo código da peça
  const [pedidos, setPedidos] = useState([
    { id: 1, codigo_peca: "A001", data_pedido: "2024-11-01T10:00:00Z", status: "Em andamento", total: 150.0 },
    { id: 2, codigo_peca: "A002", data_pedido: "2024-11-02T14:30:00Z", status: "Entregue", total: 250.5 },
    { id: 3, codigo_peca: "A003", data_pedido: "2024-11-03T09:15:00Z", status: "Cancelado", total: 75.75 },
    { id: 4, codigo_peca: "A004", data_pedido: "2024-11-04T16:45:00Z", status: "Em andamento", total: 120.99 },
    { id: 5, codigo_peca: "A005", data_pedido: "2024-11-05T11:00:00Z", status: "Entregue", total: 180.30 },
    { id: 6, codigo_peca: "A006", data_pedido: "2024-11-06T13:20:00Z", status: "Em andamento", total: 300.40 },
    { id: 7, codigo_peca: "A007", data_pedido: "2024-11-07T10:10:00Z", status: "Cancelado", total: 400.10 },
    { id: 8, codigo_peca: "A008", data_pedido: "2024-11-08T15:55:00Z", status: "Em andamento", total: 220.99 },
    { id: 9, codigo_peca: "A009", data_pedido: "2024-11-09T12:00:00Z", status: "Entregue", total: 450.50 },
    { id: 10, codigo_peca: "A010", data_pedido: "2024-11-10T08:30:00Z", status: "Em andamento", total: 190.30 },
    { id: 11, codigo_peca: "A011", data_pedido: "2024-11-11T14:00:00Z", status: "Cancelado", total: 50.25 },
    { id: 12, codigo_peca: "A012", data_pedido: "2024-11-12T09:45:00Z", status: "Em andamento", total: 350.75 },
    { id: 13, codigo_peca: "A013", data_pedido: "2024-11-13T17:00:00Z", status: "Entregue", total: 275.80 },
    { id: 14, codigo_peca: "A014", data_pedido: "2024-11-14T13:30:00Z", status: "Em andamento", total: 120.00 },
    { id: 15, codigo_peca: "A015", data_pedido: "2024-11-15T16:10:00Z", status: "Cancelado", total: 200.90 },
    { id: 16, codigo_peca: "A016", data_pedido: "2024-11-16T11:25:00Z", status: "Entregue", total: 90.15 },
    { id: 17, codigo_peca: "A017", data_pedido: "2024-11-17T12:55:00Z", status: "Em andamento", total: 450.75 },
    { id: 18, codigo_peca: "A018", data_pedido: "2024-11-18T10:10:00Z", status: "Cancelado", total: 300.99 },
    { id: 19, codigo_peca: "A019", data_pedido: "2024-11-19T14:40:00Z", status: "Em andamento", total: 500.10 },
    { id: 20, codigo_peca: "A020", data_pedido: "2024-11-20T13:15:00Z", status: "Entregue", total: 600.20 },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simula um delay para o carregamento, mas já usamos dados fixos
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const renderPedido = ({ item }) => (
    <View style={styles.pedidoContainer}>
      <Text style={styles.pedidoId}>Pedido #{item.id}</Text>
      <Text>Código da Peça: {item.codigo_peca}</Text>
      <Text>Data: {new Date(item.data_pedido).toLocaleString()}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Total: R$ {item.total.toFixed(2)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  pedidoContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pedidoId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
