/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setUser} from '../Auth/auth';
import axios from '../Auth/axiosInstance';
const LoginPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Email/Phone is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setMsg('');
    try {
      const formData = {username: name, password};
      const response = await axios.post('/users/authenticate', formData);
      const user = response.data;
      setUser(user);
      setName('');
      setPassword('');
      setLoading(false);
      navigation.navigate('mymodules');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setMsg(error.response.data.message || 'An error occurred');
      } else {
        setMsg(error.message || 'An error occurred');
      }
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View style={styles.row}>
      <View style={styles.coll6}>
        <View style={styles.bgcardblre}>
          <View style={styles.flxget}>
            <Text style={styles.getext}>Get Started</Text>
          </View>
          <View style={styles.padname}>
            <View style={styles.dflxname}>
              <Text style={styles.nametext}>Email/Phone</Text>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
            <TextInput
              style={styles.inputstyle}
              placeholder="Enter username"
              value={name}
              onChangeText={setName}
            />
            <View style={styles.dflxname}>
              <Text style={styles.nametext}>Password*</Text>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputstyle}
                placeholder="Enter Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#000"
                  style={styles.iconeye}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flxget}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Loading...' : 'Start Now'}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#FFFFFF"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {msg ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.coll6}>
        <View style={styles.iconbord}>
          <Image
            source={require('../Images/loginicon.png')}
            style={styles.loginicon}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dflxname: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    padding: 30,
    backgroundColor: '#09203F',
    gap: 30,
  },
  coll6: {
    flex: 6,
  },
  loginicon: {
    width: 380,
    borderRadius: 20,
    height: '100%',
  },
  icon: {
    paddingTop: 5,
  },
  iconbord: {
    borderRadius: 20,
  },
  bgcardblre: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    height: '100%',
  },
  flxget: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  getext: {
    backgroundColor: '#537895',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  padname: {
    padding: 20,
  },
  nametext: {
    color: '#fff',
    paddingTop: 10,
  },
  inputstyle: {
    backgroundColor: '#fff',
    height: 40,
    width: '100%',
    borderRadius: 5,
    fontSize: 12,
    paddingLeft: 10,
    color: '#10284B',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  iconeye: {
    position: 'absolute',
    right: 10,
    top: -30,
  },
  passwordContainer: {
    position: 'relative',
  },
  messageContainer: {
    marginTop: 10,
  },
  messageText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    paddingTop: 5,
  },
});
export default LoginPage;
