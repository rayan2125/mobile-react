import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../screen/onBoardingScreen";

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen  options={{headerShown:false}} name="OnBoardingScreen" component={OnBoardingScreen} />
        </Stack.Navigator>
    )
};

export default RootNavigation;