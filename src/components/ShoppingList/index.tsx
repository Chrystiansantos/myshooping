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
        const { docs } = await firestore()
          .collection('products')
          .get();
        const products = docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductProps[];
        setProducts(products)
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
