import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectLang from "../components/custom/selectLang";
import i18n from "../i18n";

const OnBoardingScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
              colors={['#1abdb0', '#208481', '#0b9a5c']}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
                        {i18n.t("welcome")}
                    </Text>
                </View>

                <SelectLang/>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default OnBoardingScreen;