import React from 'react';  //import do react
import{ View,
		TextInput,
		Text,
		StyleSheet,
		Button,
		ActivityIndicator,
		Alert
	} from 'react-native'; //imports de todos os metodos usados ao longo do programa

import firebase from '@firebase/app'
import '@firebase/auth'

import FormRow from '../components/FormRow'


export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);    // o state é a structe que detem os dados, no caso senha e email
		this.state = {
			email: '', 
			password:'',
			isLoading: false,
			message:''
		}
	}

	componentDidMount(){//metodo responsavel por configurar o firebase
		const config = {
			apiKey: "AIzaSyA9wTwf0c4zkmZ-UxABMtsmafkzfif0rHQ",
			authDomain: "gridbuttons.firebaseapp.com",
			databaseURL: "https://gridbuttons.firebaseio.com",
			projectId: "gridbuttons",
			storageBucket: "gridbuttons.appspot.com",
			messagingSenderId: "950482483319"
		  };
		  firebase.initializeApp(config);
	}

	onChangeHandler(field, value){//metodo responsavel por atribuir valor aos campos
		this.setState({
				[field]:value
		})	;
	}


	tryLogin(){//metodo responsavel por fazer o login do usuario
		//console.log('ENTROU CONSOLE LOG, INFOS');
		this.setState({ isLoading : true, message: ''});
		const {mail: email, password} = this.state;

		const loginUserSucess = user => {
			this.setState({ message: "Sucesso!" });
		}

		const loginUserFailed = error =>{
			this.setState({ 
				message: this.getMessageByErrorCode(error.code)

			});
		}

		firebase  
			.auth()
			.signInWithEmailAndPassword(email , password)
			.then(loginUserSucess)
			.catch(error => {
				if(error.code === 'auth/user-not-found') {
					Alert.alert(
						'Usuario não encontrado',
						'Deseja criar um cadastro com as informações',
						[{
								text:'nao',
								onPress: () =>console.log('Usuario não quer criar'),
								style:'cancel', //IOS
							
							},{
								text:'sim',
								onPress:() => {
									firebase
										.auth()
										.createUserWithEmailAndPassword(email,password)
										.then(loginUserSucess)
										.catch(loginUserFailed)
										
									}
								}],
								{ cancelable: false }
					)
					return;
				}
				loginUserFailed(error);
				
			})
			.then(() => this.setState({ isLoading: false }));
	}
	getMessageByErrorCode(errorCode){
		switch(errorCode){
			case 'auth/wrong-password': 
				return 'Senha incorreta!';
			case 'auth/user-not-found':
				return 'Usuario não encontrado';
			default:
				return 'Erro desconhecido';

		}
	}
	/**
	 *
	 *
	 * @returns
	 * @memberof LoginScreen
	 */
	renderMessage() {
			const { message } = this.state;
			if (!message)
				return null;

			return (
				<View>
					<Text>{message}</Text>
				</View>
			);
		}
	/**
	 *
	 *
	 * @returns
	 * @memberof LoginScreen
	 */
	renderButton(){
			if (this.state.isLoading)
				return <ActivityIndicator />;
			return(
				<Button	
					title="Entrar"
					onPress={() => this.tryLogin()}/>
			);
		}


	render(){ //esse é o metodo que faz tudo "rolar"kkk
	
		return(
			//
			<View>
				<FormRow first>
					<TextInput
						style={styles.input}
						placeholder = "pizza@mail.com"
						value={this.state.mail}  //o mail faz parte do state
						onChangeText={value => this.onChangeHandler('mail', value)}//o metodo que ele criou ta sendo usado aqui pra mudar o email usando o motedodo nativo onChangeText, o change email só da acesso á variavel que vai entrart no box de texto
					/> 
				</FormRow>
				
				<FormRow last>
					<TextInput
						style={styles.input}
						placeholder= "************"
						value={this.state.password}
						secureTextEntry
						onChangeText = {value => this.onChangeHandler('password', value)}
					/>
				</FormRow>
				
				{this.renderButton() }
				{ this.renderMessage() }
			</View>
		)
	}
}

const styles =  StyleSheet.create({//RESPONSAVEL POR ESTILIZAR
	container:{
		paddingLeft: 10,
		paddingRight: 10,
	},
	input:{
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5,
	}


}); 
