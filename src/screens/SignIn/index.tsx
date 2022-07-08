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

  async function handleSignInWithEmailAndPassword() {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
    } catch ({ code }) {
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        return Alert.alert('Usuário não encotrado. E-mail ou senha inválida')
      }
    }
  }

  async function handleForgotPassword(){
    try {
      await auth().sendPasswordResetEmail(email)
      Alert.alert('Enviamos um link, no seu e-mail, para redefirnir sua senha')
    } catch (error) {
     console.log(error) 
    }
  }

  async function handleCreateUserAccount() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Usuário criado com sucesso !')
    } catch ({ code }) {
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

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}