// src/screens/OnBoardingScreen.js
import { Image, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLang } from "../context/langContext";
import SelectLang from "../components/custom/selectLang"

const OnBoardingScreen = () => {
    const { t } = useLang();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={['#1abdb0', '#208481', '#0b9a5c']}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <View style={{}}>
                    <Image
                        source={require("../assets/dr.png")} style={{ height: 550, width: 300, resizeMode: "contain" }} />
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
                        {t("welcome")} {/* ← i18n.t() ki jagah t() */}
                    </Text>
                </View>
                <SelectLang />
            </LinearGradient>
        </SafeAreaView>
    );
};

export default OnBoardingScreen;