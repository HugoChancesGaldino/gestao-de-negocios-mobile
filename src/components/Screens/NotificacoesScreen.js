import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";

export default function NotificacoesScreen() {
  // Dados fixos de notificações
  const [notificacoes, setNotificacoes] = useState([
    { id: 1, mensagem: "Nova peça adicionada ao catálogo", data_notificacao: "2024-11-01T10:00:00Z", lida: false },
    { id: 2, mensagem: "Seu pedido foi enviado", data_notificacao: "2024-11-02T14:30:00Z", lida: false },
    { id: 3, mensagem: "Seu pagamento foi processado", data_notificacao: "2024-11-03T09:15:00Z", lida: true },
    { id: 4, mensagem: "Promoção de 20% em peças selecionadas", data_notificacao: "2024-11-04T16:45:00Z", lida: false },
    { id: 5, mensagem: "A peça que você procurou está em falta", data_notificacao: "2024-11-05T11:00:00Z", lida: false },
    { id: 6, mensagem: "Seu pedido foi entregue", data_notificacao: "2024-11-06T13:20:00Z", lida: true },
    { id: 7, mensagem: "A peça que você comprou está com desconto!", data_notificacao: "2024-11-07T10:10:00Z", lida: false },
    { id: 8, mensagem: "Novo item disponível no estoque", data_notificacao: "2024-11-08T15:55:00Z", lida: true },
    { id: 9, mensagem: "Atenção! Seu pedido está em atraso", data_notificacao: "2024-11-09T12:00:00Z", lida: false },
    { id: 10, mensagem: "Você recebeu um crédito de loja", data_notificacao: "2024-11-10T08:30:00Z", lida: false },
    { id: 11, mensagem: "Nova atualização no aplicativo disponível", data_notificacao: "2024-11-11T14:00:00Z", lida: true },
    { id: 12, mensagem: "Seu pedido foi cancelado", data_notificacao: "2024-11-12T09:45:00Z", lida: false },
    { id: 13, mensagem: "Você tem novos descontos na sua conta", data_notificacao: "2024-11-13T17:00:00Z", lida: false },
    { id: 14, mensagem: "Oferta relâmpago! Aproveite antes que acabe", data_notificacao: "2024-11-14T13:30:00Z", lida: true },
    { id: 15, mensagem: "Seu pedido está pronto para retirada", data_notificacao: "2024-11-15T16:10:00Z", lida: false },
    { id: 16, mensagem: "Nova política de privacidade disponível", data_notificacao: "2024-11-16T11:25:00Z", lida: true },
    { id: 17, mensagem: "Seu saldo foi atualizado", data_notificacao: "2024-11-17T12:55:00Z", lida: false },
    { id: 18, mensagem: "Novo produto em nossa loja!", data_notificacao: "2024-11-18T10:10:00Z", lida: false },
    { id: 19, mensagem: "Você foi recompensado com um cupom", data_notificacao: "2024-11-19T14:40:00Z", lida: true },
    { id: 20, mensagem: "Seu crédito foi utilizado em uma compra", data_notificacao: "2024-11-20T13:15:00Z", lida: false },
  ]);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulando um delay no carregamento, mas já usamos dados fixos
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const marcarComoLida = (id) => {
    setNotificacoes((prev) =>
      prev.map((notificacao) =>
        notificacao.id === id ? { ...notificacao, lida: true } : notificacao
      )
    );
  };

  const renderNotificacao = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificacaoContainer, item.lida && styles.lida]}
      onPress={() => marcarComoLida(item.id)}
    >
      <Text style={styles.mensagem}>{item.mensagem}</Text>
      <Text style={styles.data}>{new Date(item.data_notificacao).toLocaleString()}</Text>
    </TouchableOpacity>
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
        data={notificacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotificacao}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notificação encontrada.</Text>}
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
  notificacaoContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lida: {
    backgroundColor: "#e0e0e0",
  },
  mensagem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  data: {
    marginTop: 5,
    color: "gray",
    fontSize: 14,
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
