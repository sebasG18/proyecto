import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/FirebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface RegisterForm {
  
  email: string;
  password: string;
}

interface MessageSnackBar {
  visible: boolean;
  message: string;
  color: string;
}

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
  });
  const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const handlerSetRegisterForm = (key: string, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  const handlerRegister = async () => {
    if (!registerForm.email || !registerForm.password) {
      setMessageSnackBar({
        visible: true,
        message: "Complete todos los campos",
        color: "#962841",
      });
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      console.log(response);
      setMessageSnackBar({
        visible: true,
        message: "Registro exitoso!",
        color: "#246317",
      });
    } catch (e) {
      console.log(e);
      setMessageSnackBar({
        visible: true,
        message: "No se logró completar el registro, intente más tarde",
        color: "#962841",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handlerSetRegisterForm("email", value)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        onChangeText={(value) => handlerSetRegisterForm("password", value)}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => handlerRegister()} style={styles.button}>
        Registrarse
      </Button>
      <Snackbar
        visible={messageSnackBar.visible}
        onDismiss={() => setMessageSnackBar({ ...messageSnackBar, visible: false })}
        style={{ backgroundColor: messageSnackBar.color }}
      >
        {messageSnackBar.message}
      </Snackbar>
      <Text
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Login" }))}
        style={styles.loginText}
      >
        Ya tienes una cuenta? Inicia sesión
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
  loginText: {
    marginTop: 20,
    color: "white",
  },
});

export default RegisterScreen;
