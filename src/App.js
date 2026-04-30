import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/rootNavigation";
import { LangProvider } from "./context/langContext";


const App = () => {
    return (
        <LangProvider>

            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        </LangProvider>
    )
};

export default App;