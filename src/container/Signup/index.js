import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Keyboard,  TouchableWithoutFeedback, Picker, ActivityIndicator } from 'react-native'
import { signupAction } from '../../logic/signup'

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      condominium: '',
      userName: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSignUpPress = this.onSignUpPress.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.signup.data !== this.props.signup.data && nextProps.signup.data.length > 0) {
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        condominium: '',
        userName: ''
      }, () => this.props.navigation.goBack())
    }
  }
  isValid() {
    const { userName, password, condominium, email, confirmPassword } = this.state
    const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    const emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
    let valid = false;
    if (userName.length > 0 && password.length > 0 && email.length > 0 && condominium.length > 0 && confirmPassword.length > 0 && confirmPassword === password && emailReg.test(email) && passwordReg.test(password)) {
      valid = true;
    }
    if (email.length === 0) {
      this.setState({ message: 'You must enter an email' })
    } else if (!emailReg.test(email)) {
      this.setState({ message: 'You must enter an valid email' })
    }else if (userName.length === 0) {
      this.setState({ message: 'You must enter a user name' });
    } else if (password.length === 0) {
      this.setState({ message: 'You must enter a password' });
    } else if (!passwordReg.test(password)) {
      this.setState({ message: 'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters' });
    } else if (password !== confirmPassword) {
      this.setState({ message: 'You must match password in confirm password' });
    } else if (condominium.length === 0) {
      this.setState({ message: 'You must select a condominium' });
    }
    return valid;
  }
  onChange(value, key) {
    this.setState({
      [key]: value
    })
  }
  onSignUpPress () {
    if (this.isValid()) {
      const { email, password, userName, condominium } = this.state
      this.props.signupAction({
        email,
        user_name: userName,
        password,
        condominium
      })
    }
  }
  render () {
    const { email, password, userName, confirmPassword } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            style={{
              backgroundColor: '#ccc',
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            resizeMode='cover'
            source={require('../../../assets/background1.jpg')}
          >
            <View style={styles.topContainer} />
            <View style={styles.bottomContainer} >
              <TextInput value={this.state.email} autoCapitalize="none" onChangeText={(text) => this.onChange(text, 'email')} underlineColorAndroid="transparent" style={styles.input} placeholder='User Email' keyboardType='email-address' />
              <TextInput value={this.state.userName} autoCapitalize="none" onChangeText={(text) => this.onChange(text, 'userName')} underlineColorAndroid="transparent" style={styles.input} placeholder='User Name' />
              <TextInput value={this.state.password} autoCapitalize="none" onChangeText={(text) => this.onChange(text, 'password')} underlineColorAndroid="transparent" secureTextEntry style={styles.input} placeholder='Password' />
              <TextInput value={this.state.confirmPassword} autoCapitalize="none" onChangeText={(text) => this.onChange(text, 'confirmPassword')} secureTextEntry underlineColorAndroid="transparent" style={styles.input} placeholder='Confirm Password' />
              <View style={styles.dontContainer} >
                <Text style={styles.dontText} >Select Condominium</Text>
              </View>
              <Picker selectedValue={this.state.condominium} style={styles.input} onValueChange={(itemValue, itemIndex) => this.onChange(itemValue, 'condominium')}>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
              <TouchableOpacity style={styles.loginBtn} onPress={this.onSignUpPress} >
                <Text style={styles.loginTxt} >Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.dontContainer} >
                <Text style={styles.dontText} onPress={() => this.props.navigation.navigate('Login')} >Already have an account, Login?</Text>
              </View>
              {this.props.signup.loading ? (
                <View style={styles.loader} >
                  <ActivityIndicator size='large' color='white' />
                </View>
              ) : null}
              <View style={styles.errorContainer} >
                <Text style={styles.errorText} >{this.state.message}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signup: state.signup
  }
}

export default connect(mapStateToProps, { signupAction })(SignupScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF473A',
    flexDirection: 'column',
  },
  topContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'transparent',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingTop: 5,
    marginBottom: 2,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 300,
    height: 40
  },
  forgotTxt: {
    color: '#FFF',
    paddingTop: 10,
    paddingBottom: 10
  },
  loginBtn: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF473A',
    marginTop: 5,
  },
  loginTxt: {
    color: '#fff',
    fontSize: 16,
  },
  dontContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 300,
    height: 40
  },
  dontText: {
    color: '#FFF',
    paddingTop: 10,
    paddingBottom: 10
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 30
  },
  errorText: {
    color: 'red'
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 60
  }
})
