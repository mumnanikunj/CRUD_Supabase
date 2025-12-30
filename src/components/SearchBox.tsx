import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { hp } from '../utils/useDynamicSize';

interface Props {
    search: string;
    onSearch: (text: string) => void;
    placeholder: string;
    theme: any
}

const SearchBox = React.memo(({search,onSearch,placeholder , theme}: Props) => {
  return (
    <View style={styles.container}>
     <TextInput
        value={search}
        onChangeText={onSearch}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
        style={[styles.searchInput,{borderColor: theme.inactiveColor, color: theme.text}]}
      />
    </View>
  );
});

export default SearchBox;

const styles = StyleSheet.create({
  container:{
    marginVertical:hp(1)
  },
     searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});