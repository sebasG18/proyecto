import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/FirebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface LoginForm {
  email: string;
  password: string;
}

interface MessageSnackBar {
  visible: boolean;
  message: string;
  color: string;
}

const LoginScreen = () => {
  const navigation = useNavigation();

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const handlerSetLoginForm = (key: string, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const handlerLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setMessageSnackBar({
        visible: true,
        message: "Complete todos los campos",
        color: "#962841",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
    } catch (e) {
      console.log(e);
      setMessageSnackBar({
        visible: true,
        message: "Usuario y/o contraseña incorrecta",
        color: "#962841",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia Sesión</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handlerSetLoginForm("email", value)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        right
        onChangeText={(value) => handlerSetLoginForm("password", value)}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => handlerLogin()} style={styles.button}>
        Iniciar
      </Button>
      <Snackbar
        visible={messageSnackBar.visible}
        onDismiss={() => setMessageSnackBar({ ...messageSnackBar, visible: false })}
        style={{ backgroundColor: messageSnackBar.color }}
      >
        {messageSnackBar.message}
      </Snackbar>
      <Text
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}
        style={styles.registerText}
      >
        No tienes una cuenta? Regístrate ahora
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
  registerText: {
    marginTop: 20,
    color: "white",
  },
});

export default LoginScreen;
