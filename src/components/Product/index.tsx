import React from 'react';
import firestore from '@react-native-firebase/firestore';

import { ButtonIcon } from '../ButtonIcon';
import { Container, Info, Title, Quantity, Options } from './styles';
import { Alert } from 'react-native';

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

type Props = {
  data: ProductProps;
}

export function Product({ data }: Props) {

  async function handleDoneToggle() {
    try {
      await firestore()
        .collection('products')
        .doc(data.id)
        .update({
          done: !data.done,
        })
      Alert.alert('Documento atualizado com sucesso')
    } catch (error) {
      Alert.alert('Não foi possível atualizar este documento tente novamente')
    }
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>
          {data.description}
        </Title>

        <Quantity>
          Quantidade: {data.quantity}
        </Quantity>
      </Info>

      <Options>
        <ButtonIcon onPress={handleDoneToggle}
          icon={data.done ? "undo" : "check"}
        />

        <ButtonIcon
          icon="delete"
          color="alert"
        />
      </Options>
    </Container>
  );
}
