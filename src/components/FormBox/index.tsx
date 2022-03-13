import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';
import { Alert } from 'react-native';

export function FormBox() {
  const [description, setDescription] = useState<string>('')
  const [quantity, setQuantity] = useState<Number>(0)

  async function handleProductAdd() {
    try {
      await firestore()
        .collection('products')
        .add({
          description,
          quantity,
          done: false,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      Alert.alert('Produto adicionado com sucesso !')
      setDescription('');
      setQuantity(0);

    } catch (error) {
      console.log(error);
      Alert.alert('Tente novamente :(')
    }
  }


  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
        value={description}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={value => setQuantity(Number(value))}
        value={String(quantity)}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}
