// InputPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter a number"
        placeholderTextColor="black"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button title="Save" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
});

export default Home;
