import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const subscribe =  firestore()
          .collection('products')
          .orderBy('quantity','asc')
          .startAt(3)
          .startAfter(2)
          .endAt(10)
          .endBefore(10)
          .onSnapshot(querySnapshot => {
            const products = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as ProductProps[]
            setProducts(products)
          })
          
        // Sempre atentar a esse retorno pra destruir o subscribe, quando o componente for destruido
        return () => subscribe();
      } catch (error) { console.log(error) }
    }
    getProducts()
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
