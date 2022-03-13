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