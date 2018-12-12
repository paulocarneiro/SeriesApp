  import { StackNavigator } from 'react-navigation';

  import LoginScreen from './src/screens/LoginScreen';
  import SeriesScreen from './src/screens/SeriesScreen';

  export default StackNavigator ({
      'Login' : {
        screen: LoginScreen
      }, // isso aqui chama a classe loginscreen ? boa legal, ok entendi
      'SeriesScreen' : {
        screen: SeriesScreen
      }
    }, {
      navigationOptions: { //RESPONSAVEL POR ESTILIZAR  E GERIR O HEADER (O CARA RECOMENDOU ESSE HEADER AO INVES DO NATIVO)
        title: "Grid",
        headerStyle: {
          backgroundColor: '#6ca2f7',
          borderBottomWidth: 1,
          borderBottomColor: '#C5C5C5',
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 30,
        }
      }
  });
  