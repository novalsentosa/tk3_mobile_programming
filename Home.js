import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Home = () => {
  const [inputValue, setInputValue] = useState('');

  const saveData = () => {
    if (inputValue) {
      const db = SQLite.openDatabase({ name: 'MyDatabase.db', location: 'default' });

      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS inputs (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)');
        tx.executeSql('INSERT INTO inputs (value) VALUES (?)', [inputValue]);
      });

      setInputValue('');
    }
  };

  const handleNumberPress = (number) => {
    setInputValue((prevValue) => prevValue + number.toString());
  };

  const handleDeletePress = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1)); // Menghapus karakter terakhir dari nilai input
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>{inputValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.numberButtonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress(0)}>
          <Text style={styles.numberButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  numberButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  numberButtonText: {
    fontSize: 24,
    color: 'black',
  },
  saveButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'green',
  },
  saveButtonText: {
    fontSize: 24,
    color: 'white',
  },
  deleteButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'red',
  },
  deleteButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Home;
