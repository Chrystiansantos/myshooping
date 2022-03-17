import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInWithAnonimous() {
    const { user } = await auth().signInAnonymously();
    console.log(user)
  }

  async function handleCreateUserAccount() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Usuário criado com sucesso !')
    } catch ({ code }) {
      console.log(code)
      if (code === 'auth/email-already-in-use') {
        return Alert.alert('Email nao disponível')
      }
      if (code === 'auth/invalid-email') {
        return Alert.alert('E-mail inválido');
      }
      if (code === 'auth/weak-password') {
        return Alert.alert('Senha deve ter no minimo 6 digitos');
      }
    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithAnonimous} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}