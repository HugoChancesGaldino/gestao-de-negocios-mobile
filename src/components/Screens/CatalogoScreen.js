import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";

export default function CatalogoScreen() {
  // Dados fixos de demonstração com 20 peças
  const [pecas, setPecas] = useState([
    {
      id: 1,
      nome: "Peça A",
      descricao: "Descrição da Peça A",
      preco: 150.0,
      estoque: 10,
    },
    {
      id: 2,
      nome: "Peça B",
      descricao: "Descrição da Peça B",
      preco: 200.5,
      estoque: 15,
    },
    {
      id: 3,
      nome: "Peça C",
      descricao: "Descrição da Peça C",
      preco: 300.75,
      estoque: 5,
    },
    {
      id: 4,
      nome: "Peça D",
      descricao: "Descrição da Peça D",
      preco: 50.25,
      estoque: 20,
    },
    {
      id: 5,
      nome: "Peça E",
      descricao: "Descrição da Peça E",
      preco: 120.99,
      estoque: 8,
    },
    {
      id: 6,
      nome: "Peça F",
      descricao: "Descrição da Peça F",
      preco: 75.50,
      estoque: 12,
    },
    {
      id: 7,
      nome: "Peça G",
      descricao: "Descrição da Peça G",
      preco: 185.20,
      estoque: 18,
    },
    {
      id: 8,
      nome: "Peça H",
      descricao: "Descrição da Peça H",
      preco: 225.99,
      estoque: 6,
    },
    {
      id: 9,
      nome: "Peça I",
      descricao: "Descrição da Peça I",
      preco: 320.80,
      estoque: 4,
    },
    {
      id: 10,
      nome: "Peça J",
      descricao: "Descrição da Peça J",
      preco: 150.75,
      estoque: 10,
    },
    {
      id: 11,
      nome: "Peça K",
      descricao: "Descrição da Peça K",
      preco: 180.30,
      estoque: 25,
    },
    {
      id: 12,
      nome: "Peça L",
      descricao: "Descrição da Peça L",
      preco: 220.40,
      estoque: 14,
    },
    {
      id: 13,
      nome: "Peça M",
      descricao: "Descrição da Peça M",
      preco: 99.99,
      estoque: 30,
    },
    {
      id: 14,
      nome: "Peça N",
      descricao: "Descrição da Peça N",
      preco: 500.00,
      estoque: 2,
    },
    {
      id: 15,
      nome: "Peça O",
      descricao: "Descrição da Peça O",
      preco: 750.90,
      estoque: 7,
    },
    {
      id: 16,
      nome: "Peça P",
      descricao: "Descrição da Peça P",
      preco: 400.50,
      estoque: 9,
    },
    {
      id: 17,
      nome: "Peça Q",
      descricao: "Descrição da Peça Q",
      preco: 550.30,
      estoque: 3,
    },
    {
      id: 18,
      nome: "Peça R",
      descricao: "Descrição da Peça R",
      preco: 80.00,
      estoque: 20,
    },
    {
      id: 19,
      nome: "Peça S",
      descricao: "Descrição da Peça S",
      preco: 95.45,
      estoque: 11,
    },
    {
      id: 20,
      nome: "Peça T",
      descricao: "Descrição da Peça T",
      preco: 120.75,
      estoque: 18,
    },
  ]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [isAdding, setIsAdding] = useState(false); // Controla se estamos no modo de adicionar
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Controla se o botão Salvar está habilitado

  // Função para verificar se todos os campos estão preenchidos
  const checkIfButtonEnabled = () => {
    if (nome && descricao && preco && estoque) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleAddPeca = () => {
    if (!nome || !descricao || !preco || !estoque) {
      Alert.alert("Erro", "Todos os campos precisam ser preenchidos.");
      return;
    }

    const newPeca = {
      id: pecas.length + 1,
      nome,
      descricao,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
    };

    setPecas([...pecas, newPeca]);
    setNome("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setIsAdding(false); // Fecha o formulário de adição
    setIsButtonEnabled(false); // Desabilita o botão salvar após adicionar
  };

  const handleDeletePeca = (id) => {
    setPecas(pecas.filter((peca) => peca.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pecas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.preco.toFixed(2)}</Text>
            <Text>Estoque: {item.estoque}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePeca(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAdding(!isAdding)} // Alterna entre mostrar e esconder o formulário
      >
        <Text style={styles.addButtonText}>
          {isAdding ? "Cancelar" : "Adicionar Peça"}
        </Text>
      </TouchableOpacity>

      {isAdding && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={(text) => {
              setNome(text);
              checkIfButtonEnabled();
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={(text) => {
              setDescricao(text);
              checkIfButtonEnabled();
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            keyboardType="numeric"
            value={preco}
            onChangeText={(text) => {
              setPreco(text);
              checkIfButtonEnabled();
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Estoque"
            keyboardType="numeric"
            value={estoque}
            onChangeText={(text) => {
              setEstoque(text);
              checkIfButtonEnabled();
            }}
          />
          <TouchableOpacity
            style={[styles.saveButton, !isButtonEnabled && styles.disabledButton]}
            onPress={handleAddPeca}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  title: { fontSize: 18, fontWeight: "bold" },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    borderRadius: 5,
  },
  deleteButtonText: { color: "#fff" },
  form: { padding: 15, marginTop: 20 },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  addButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontSize: 16 },
  saveButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16 },
  disabledButton: {
    backgroundColor: "#A5D6A7",
  },
});
