import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, Animated } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function RegistroPedidosScreen() {
  const [pecas, setPecas] = useState([
     { id: 1, nome: "Peça A", descricao: "Descrição da Peça A", preco: 150.0, estoque: 10 },
    { id: 2, nome: "Peça B", descricao: "Descrição da Peça B", preco: 200.5, estoque: 15 },
    { id: 3, nome: "Peça C", descricao: "Descrição da Peça C", preco: 300.75, estoque: 5 },
    { id: 4, nome: "Peça D", descricao: "Descrição da Peça D", preco: 50.25, estoque: 20 },
    { id: 5, nome: "Peça E", descricao: "Descrição da Peça E", preco: 120.99, estoque: 8 },
    { id: 6, nome: "Peça F", descricao: "Descrição da Peça F", preco: 75.50, estoque: 12 },
    { id: 7, nome: "Peça G", descricao: "Descrição da Peça G", preco: 185.20, estoque: 18 },
    { id: 8, nome: "Peça H", descricao: "Descrição da Peça H", preco: 225.99, estoque: 6 },
    { id: 9, nome: "Peça I", descricao: "Descrição da Peça I", preco: 320.80, estoque: 4 },
    { id: 10, nome: "Peça J", descricao: "Descrição da Peça J", preco: 150.75, estoque: 10 },
    { id: 11, nome: "Peça K", descricao: "Descrição da Peça K", preco: 180.30, estoque: 25 },
    { id: 12, nome: "Peça L", descricao: "Descrição da Peça L", preco: 220.40, estoque: 14 },
    { id: 13, nome: "Peça M", descricao: "Descrição da Peça M", preco: 99.99, estoque: 30 },
    { id: 14, nome: "Peça N", descricao: "Descrição da Peça N", preco: 500.00, estoque: 2 },
    { id: 15, nome: "Peça O", descricao: "Descrição da Peça O", preco: 750.90, estoque: 7 },
    { id: 16, nome: "Peça P", descricao: "Descrição da Peça P", preco: 400.50, estoque: 9 },
    { id: 17, nome: "Peça Q", descricao: "Descrição da Peça Q", preco: 550.30, estoque: 3 },
    { id: 18, nome: "Peça R", descricao: "Descrição da Peça R", preco: 80.00, estoque: 20 },
    { id: 19, nome: "Peça S", descricao: "Descrição da Peça S", preco: 95.45, estoque: 11 },
    { id: 20, nome: "Peça T", descricao: "Descrição da Peça T", preco: 120.75, estoque: 18 },
  ]);

  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState({});
  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [popupVisivel, setPopupVisivel] = useState(false); // Controle do modal do carrinho
  const [animacaoBotao] = useState(new Animated.Value(1)); // Controle de animação do botão

  useEffect(() => {
    const calcularTotal = () => {
      const novoTotal = carrinho.reduce(
        (acc, item) => acc + item.preco * (quantidade[item.id] || 1),
        0
      );
      setTotal(novoTotal);
    };

    calcularTotal();
  }, [carrinho, quantidade]);

  const adicionarAoCarrinho = (peca) => {
    if (!carrinho.find((item) => item.id === peca.id)) {
      setCarrinho([...carrinho, peca]);
      setQuantidadeCarrinho(quantidadeCarrinho + 1); // Atualiza a quantidade no carrinho

      // Animação do botão
      Animated.sequence([
        Animated.timing(animacaoBotao, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animacaoBotao, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Alert.alert("Atenção", "Essa peça já está no carrinho.");
    }
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
    setQuantidadeCarrinho(quantidadeCarrinho - 1); // Atualiza a quantidade no carrinho
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      Alert.alert("Erro", "O carrinho está vazio.");
      return;
    }
    setPopupVisivel(false); // Fecha o popup
    // Aqui pode-se navegar para a próxima tela ou exibir QR Code, por exemplo
  };

  const renderPeca = ({ item }) => {
    if (item.nome.toLowerCase().includes(filtro.toLowerCase())) {
      return (
        <View style={styles.pecaContainer}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text>{item.descricao}</Text>
          <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
          <Text>Estoque: {item.estoque}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => adicionarAoCarrinho(item)}
          >
            <Animated.Text
              style={[
                styles.addButtonText,
                {
                  transform: [{ scale: animacaoBotao }],
                  color: "#fff",
                }
              ]}
            >
              Adicionar ao Carrinho
            </Animated.Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderCarrinho = ({ item }) => (
    <View style={styles.carrinhoContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removerDoCarrinho(item.id)}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pecasDisponiveisSection}>
        <Text style={styles.title}>Peças Disponíveis</Text>
        <View style={styles.filtroContainer}>
          <TextInput
            style={styles.filtroInput}
            placeholder="Filtrar peças"
            value={filtro}
            onChangeText={(text) => setFiltro(text)}
          />
          <TouchableOpacity
            style={styles.carrinhoButton}
            onPress={() => setPopupVisivel(true)}
          >
            <Text style={styles.carrinhoButtonText}>Carrinho ({quantidadeCarrinho})</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pecas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPeca}
        />
      </View>

      {/* Modal (Popup) do Carrinho */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={popupVisivel}
        onRequestClose={() => setPopupVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Carrinho</Text>
            <FlatList
              data={carrinho}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCarrinho}
              ListEmptyComponent={<Text style={styles.emptyText}>Carrinho vazio.</Text>}
            />
            <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.finalizarButton} onPress={finalizarPedido}>
              <Text style={styles.finalizarButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setPopupVisivel(false)}>
              <Text style={styles.cancelButtonText}>Fechar Carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filtroInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  carrinhoButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinhoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pecaContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nome: { fontSize: 16, fontWeight: "bold" },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  carrinhoSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  carrinhoContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  finalizarButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  finalizarButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: { color: "#fff", fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 10, fontSize: 16, color: "gray" },
});
