import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/rootNavigation";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LanguageProvider } from "./context/langContext";


const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
                <LanguageProvider>

                <BottomSheetModalProvider>
                    <NavigationContainer>
                        <RootNavigation />
                    </NavigationContainer>

                </BottomSheetModalProvider>
                </LanguageProvider>
           
        </GestureHandlerRootView>
    )
};

export default App;