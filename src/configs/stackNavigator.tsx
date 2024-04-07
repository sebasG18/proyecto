import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen  from '../screens/LoginScreen';
import  RegisterScreen  from '../screens/RegistroScreen';
import  HomeScreen  from '../screens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/FirebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Routes {
    name: string,
    screen: () => JSX.Element,
    headerShow?:boolean,
    title?: string
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true)
            }
            setIsLoading(false)
        })
    }, [])

    const routesNoAuth: Routes[] = [
        { name: "Login", screen: LoginScreen },
        { name: "Register", screen: RegisterScreen }
    ]
    const routesAuth: Routes[] = [
        { name: "Home", screen: HomeScreen },
    ]

    return (
        <>
            {
                isLoading ? (
                    <View>
                        <ActivityIndicator size={35} />
                    </View>
                ) : (
                    <Stack.Navigator>
                        {
                            !isAuth ?
                                routesNoAuth.map((item, index) => (
                                    <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                                ))
                                :
                                routesAuth.map((item, index) => (
                                    <Stack.Screen key={index} name={item.name} options={{ headerShown: item.headerShow ?? false, title: item.title }} component={item.screen} />
                                ))
                        }
                    </Stack.Navigator>
                )
            }
        </>
    );
}