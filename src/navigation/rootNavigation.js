import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../screen/onBoardingScreen";
import SignupScreen from "../screen/auth/signupScreen";

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen  options={{headerShown:false}} name="OnBoardingScreen" component={OnBoardingScreen} />
            <Stack.Screen  options={{headerShown:false}} name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    )
};

export default RootNavigation;