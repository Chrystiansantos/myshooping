## Criando um projeto firebase:

Primeiramente irei acessar o seguinte site, fazer login com minha conta google:

<a href="https://firebase.google.com/?hl=pt">Firebase</a>

Após estar logado, irei clicar em **Ir para o console**.

Irei clicar em **Adicionar projeto**, em seguida irei preencher as seguintes informacões:
 - Nome do projeto => Nome que irei dar ao meu projeto
A seguir clico em continuar,
 - Ativar o Google Analytics, consegue capturar algumas informacoes da aplicacao quando o usuario estiver utilizando.
 - Irei selecionar um conta da google, posso selecionar a padrão.
 - Clico em **Criar projeto**

### Instalando REACT NATIVE FIREBASE

Primeiro passo irei instalar a seguinte lib:

```bash
❯ yarn add @react-native-firebase/app
```
### Configurando firebase (ANDROID)

Irei abrir meu projeto firebase, e na tela inicial irei clicar no **icone do android.**.
  Precisarei preencher alguns dados por exemplo:
   - **Nome do pacote do android** - irei pressionar cmd + p, e irei pesquisar pela seguinte file **MainActivity.java**, o nome do meu pacote sera a primeira linha, geralmente o nome do meu projeto, entao vou copiar da seguinte forma **com.myshopping**, e colar no firebase.
   - **Apelido do app** - nome que facilite a identificacao do meu projeto no console do firebase.
   - **Certificado de assinatura de depuração SHA-1** - Para eu conseguir este certificado irei executar o seguinte comando na raiz do meu projeto:
      ```bash
      ❯ cd android && ./gradlew signingReport
      ```
    No inicio das chaves irei procurar pela seguinte, **debugAndroidTest**, irei copiar os dados de **SHA1** irei colar a chave, e em seguida clico em **Registrar app**

  Irei baixar o arquivo **google-services.json** onde ficará todas as configuracões de conexão com o firebase. Irei salvar este arquivo dentro do seguinte diretorio => **/project_name/android/app/google-services.json**

  Agora clicarei em **Próximo**

  Irei abrir o seguinte arquivo **/project_name/android/build.gradle**.
    Irei procurar por **buildscript**, irei verificar se está executando google(), conforme mostrado no firebase.
    Dentro de dependencies adicionar a seguinte linha **classpath 'com.google.gms:google-services:4.3.10'**
    Verificar também se dentro de allProjects, está executando o google(), conforme mostrado no firebase.

  Agora irei abrir o seguinte arquivo, **/project_name/android/app/build.gradle**
    Irei adicionar a seguine linha (apply plugin: 'com.google.gms.google-services') apos esta linha **apply plugin: 'com.android.application'**
    Dentro de dependencies irei adicionar as seguintes linhas:

```gradlew
    implementation platform('com.google.firebase:firebase-bom:29.2.0')
    implementation 'com.google.firebase:firebase-analytics'
```

  Irei acessar a raiz do  projeto e executar o seguinte comando pra fazer o linking com as dependencias externas
  ```
  ❯ npx react-native run-android
  ```

  Agora clicarei em **Próximo** e em seguida clicar em **Continuar no console**, PRONTO AS CONFIGS FORAM REALIZADAS COM SUCESSO

### Configurando firebase (IOS)

Irei abrir meu projeto firebase, e na tela inicial irei clicar no **icone do ios.**.
Precisarei preencher alguns dados por exemplo:
   - **Nome do pacote do android** - irei abrir o XCode. A seguir irei abrir o arquivo project_name.xcodeproj, irei clicar no nome do projeto e a seguir irei copiar a seguinte informacao apresentada a direita **Bundle Identifier**
   - **Apelido do app** - nome que facilite a identificacao do meu projeto no console do firebase.
   - **Codigo da App Store** - Não preciso informa-lo.
   - A seguir irei baixar o google-service-info.plist, e irei adiciona-lo dentro do seguinte diretorio **/ios**. Em seguida irei abrir o xcode, clicar com o direito no nome do meu projeto, e clicar em **Add Files to project_name**, ira aparecer uma janela, onde irei buscar pelo google-service-info.plist, e a seguir irei marcar os seguintes check-box:
 - **Copy items if needed**
 - **Create groups**
Clico em **Add**

Irei abrir o seguinte file **/ios/{projectName}/AppDelegate.m**, e irei adicionar a seguinte importacão **#import <Firebase.h>** após a primeira importacão.

Irei pesquisar por essa funcão **didFinishLaunchingWithOptions:(NSDictionary *)**, e irei adicionar o seguinte trecho de codigo, logo apos as chaves.
```
  [FIRApp configure];
```

Agora irei fazer o linking acessando a pasta ios e executando o seguintes comandos:

```
❯ pod install --repo-update
❯ yarn run ios
```

### Criando um banco de dados no Firebase.

Primeiramente irei clicar em **Firestore Database**, em seguida em criar banco de dados.
A seguire irei clciar em modo de **Teste**, **Avancar**, e por fim clicar em **Ativar**.

### Instalando o Firestore em nosso App

Primeiramente precisarei instalar a seguinte lib:

```bash
❯ yarn add @react-native-firebase/firestore
# Caso esteja no ios preciso rodar o seguinte comando:
❯ cd ios/ && pod install
```

### Adicionando um documento ao Firestore por meio do meu App.

Primeiramente preciso importar o firestore da seguinte forma:

```tsx
import firestore from '@react-native-firebase/firestore';
```

Em seguida irei criar uma funcão que será responsavel por enviar os dados para o firebase.

```tsx
async function handleProductAdd() {
    try {
      await firestore()
        .collection('COLLECTION_NAME')
        .add({
          description,
          quantity,
          done: false,
        }).then(() => {
          Alert.alert('Produto adicionado com sucesso !')
        })
    } catch (error) {
      console.log(error);
      Alert.alert('Tente novamente :(')
    }
  }
```

### Adicionando um documento ao Firestore por meio do meu App com id personalizado.

Para adicionar um id personalizado ao inves de utilizar add irei usar o metodo set, e irei usar doc para adicionar um meu id personalizado, da seguitne forma:

```tsx
async function handleProductAdd() {
    try {
      await firestore()
        .collection('products')
        // id que gerei
        .doc('my-custom-id')
        // dados a serem adicionados na collection
        .set({
          description,
          quantity,
          done: false,
        }).then(() => {
          Alert.alert('Produto adicionado com sucesso !')
        })
    } catch (error) {
      console.log(error);
      Alert.alert('Tente novamente :(')
    }
  }
```

### FieldValues

Posso utilizar o FieldValues pra trabalhar com data por exemplo aqui onde ele utiliza pra adicionar o timestamp informando o momento em que o anuncio foi criado.

```tsx
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
```

### Leitura unica de documentos

Dessa maneira eu faco a leitura dos documentos desta collection uma unica vez.

```tsx
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
  ```

  #### **Leitura de um unico documento uma unica vez**

  ```tsx
    async function getUniqueProduct() {
      const response = await firestore()
        .collection('products')
        // Ao utilizar o doc eu passo o id e dessa forma consigo trazer um unico documento.
        .doc('MrpIBsbJdnhDCNjWDN7X')
        .get();
      console.log(response.data());
      console.log(response.id);
    }
  ```

  ### Leitura de documentos em realtime, caso haja alguma atualizacão ele atualiza as informacões

  Pra acompanhar os dados em tempo real irei utilizar o metodo onSnapshot, e utilizar a funcao da seguinte maneira, pra buscar os dados em realtime, **Sempre devo me atentar de destruir o subiscribe ao desmontar o componente**

  ```tsx
  useEffect(() => {
    async function getProducts() {
      try {
        const subscribe =  firestore()
          .collection('products')
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
  ```

### Filtrando consultaso no Firestore

Para conseguir filtrar irei utilizar uma funcao where, da seguinte forma, where('COLLECTION_NAME','OPERADOR',CONDICAO)

```tsx
useEffect(() => {
    async function getProducts() {
      try {
        const subscribe =  firestore()
          .collection('products')
          .where('quantity','', 10)
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
```


### Limitando a quantidade de dados de uma consulta

Para que consiga limitar a quantidade de documentos precisarei utilizar a funcao limit(x), passando como argumento a quantidade de documentos que deseja vir no retorno.

```tsx
useEffect(() => {
    async function getProducts() {
      try {
        const subscribe =  firestore()
          .collection('products')
          .limit(3)
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
```

### Ordenando documentos

Para ordernar documentos irei utilizar a funcao orderBy, da seguinte forma orderBy('CAMPO_ORDENADO','TIPO_DE_ORDENACAO')

```tsx
useEffect(() => {
    async function getProducts() {
      try {
        const subscribe =  firestore()
          .collection('products')
          .orderBy('quantity','asc')
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
```

### Intervalo de consultas.

Aplicando um filtro nas consultas baseado em um intervalo. Pra conseguir utilizar esse intervalo precisamos do **orderBy**, então irei utilizar a funcao startAt(2) e endAt(10), e por exemplo irei trazer tudo oque esteja nesse intervalo, caso deseje por exemplo remover algum produto que esteja com a quantidade 3 irei utilizar a seguinte funcao .startAfter(2)

```tsx
useEffect(() => {
    async function getProducts() {
      try {
        const subscribe =  firestore()
          .collection('products')
          .orderBy('quantity','asc')
          // buscar onde a quantidade seja maior que 1
          .startAt(1)
          // buscar onde a quantidade seja maior que 2.
          .startAfter(2)
          // buscar onde a quantidade seja menor que 10.
          .endAt(10)
          // buscar onde a quantidade seja menor que 11.
          .endBefore(11)
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
```

### Atualizando documento

Pra atualizar o documento irei utilizar o metodo update, mas antes irei utilizar o doc, passando a hash do documento a ser utilizado da seguinte forma:

```tsx
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
```

### Removendo documento

Pra remover o documento irei utilizar o metodo delete, mas antes irei usar a funcao doc para selecionar o documento:

```tsx
try {
      await firestore()
      .collection('products')
      .doc(data.id)
      .delete();
    } catch (error) {
      Alert.alert('Não foi possível remover este documento tente novamente')
    }
```

### Offline com firestore

Ele funciona de forma que as alteracoes que o usuario facam offline sejam automaticamente sincronizada assim que ele adiquire conexão.


### Emulador do FireStore.

O emulador serve para conseguirmos testar nosso App sem a necessidade de fazermos teste no ambiente de producao, ou ate mesmo a necessidade de se ter um projeto pra testes.

Primeiro passo precisamos instalar a cli do emulador como seguinte comando:

```bash
#Instalando
❯ curl -sL firebase.tools | bash
#Executando
❯ firebase emulators:start --oly firestore
```

A seguir apos o emulador esta sendo executado irei adicionar o seguinte arquivo dentro de index.js, e irei adicionar o seguinte trecho:

```tsx
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

if (__DEV__) {
  firestore().useEmulator('localhost', 8080);
}

const db = firestore()
```

## Cloud Storage

### Ativando o Cloud Storage

Irei clicar no storage, em seguida ele ira me redirecionar para o console onde consigo ver os arquivos irei alterar a regra pra leitura e escrita simplementes alterando a linha pra seguinte maneira:

```
allow read, write: if false; => allow read, write;
```

Em seguida clico em **Publicar**

### Instalando o Cloud Storage.

Primeiro passo irei instalar a seguinte lib:

```bash
❯ yarn add @react-native-firebase/storage

# Caso esteja no ios executar o seguinte comando
❯ cd ios/ && pod install
```

### Upload de arquivos

Primeiro passo irei importar a seguinte lib:

```tsx
import storage from '@react-native-firebase/storage'

function handleUpload() {
    // Nome file
    const fileName = new Date().getTime();
    // Onde quero salvar o arquivo, irei criar uma referencia p ele
    const reference = storage().ref(`/images/${fileName}.png`);
    reference.putFile(image)
    .then(() => Alert.alert('Upload concluido'))
    .catch(err => console.log(err));
  }
```

### Progesso de upload

A seguite funcão faz o upload das files, onde eu crio um nome, em seguida crio uma referencia dentro do meu storage, lembrando que **images** seria o nome da pasta dentro do firebase, em seguida passo o nome eo formato da file. Feito isso atribuo em uma variavel onde irei conseguir ouvir o evento com o metodo **on**, podendo entao acompanhar o status do upload.

```tsx
function handleUpload() {
    // Nome file
    const fileName = new Date().getTime();
    // Onde quero salvar o arquivo, irei criar uma referencia p ele
    const reference = storage().ref(`/images/${fileName}.png`);
    // Ele inicia o upload porém retorna uma task onde consigo acompanhar o envio atraves do on
    const uploadTask = reference.putFile(image);
    
    uploadTask.on('state_changed', taskSnapshot => {
      const percentage = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0)
      setProgress(percentage);
      setBytesTransfeerred(`${taskSnapshot.bytesTransferred} transferidode ${taskSnapshot.totalBytes}`)
    })

    uploadTask.then(() => {
      Alert.alert('Upload concluído com sucesso')
    })

  }
```

### Listando arquivos do firebase

Para conseguir listar as imagens do meu App, irei utilizar a seguinte funcão.

```tsx
useEffect(() => {
    storage()
      .ref('/images')
      .list()
      .then(result => {
        const files = result.items.map(file => ({
          name: file.name,
          path: file.fullPath
        }));
        setPhotos(files)
      })
  }, [])
```

### Gerando link pra acessar as files

Para conseguir apresentar uma file preciso gerar um link e para gerar esse link utilizo a seguinte funcao. Onde o path seria o retornado pelo firebase na funcao acima

```tsx
async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage)
  }
```

### Obtendo informacões dos arquivos

Usando a seguinte funcao **getMetadata** eu consigo pegar varias informacoes do arquivo com nome, criancao entre varias outras informacoes relevantes

```tsx

  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage)

    const info = await storage().ref(path).getMetadata();
    setPhotoInfo(`Upload realizado em ${info.timeCreated}`)
  }
```

