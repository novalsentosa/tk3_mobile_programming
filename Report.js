// ReportPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = SQLite.openDatabase({ name: 'MyDatabase.db', location: 'default' });

    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS inputs (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)');
      tx.executeSql('SELECT * FROM inputs', [], (_, result) => {
        setData(result.rows.raw());
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.value}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
  },
  text: {
    color: 'black',
  },
});

export default Report;
