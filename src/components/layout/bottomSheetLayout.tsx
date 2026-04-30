import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetBackdrop, BottomSheetModal,} from "@gorhom/bottom-sheet"
// import Icon from "react-native-vector-icons/Ionicons";


interface BottomSheetProps {
    children: ReactNode;
    visible: boolean;
    style?: StyleProp<ViewStyle>;
    onClose?: () => void;
    length?: number;
    cancelBtn?: boolean,
    setCancelBtn?: () => void,
    value: number;
}


const CustomBottomSheet: React.FC<BottomSheetProps> = ({
    children,
    visible,
    style,
    onClose,
    length = 0,
    cancelBtn = true,
    setCancelBtn,
    value
}) => {

    const bottomSheetRef = useRef(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const snapPoints = useMemo(() => {
        if (!value) return ["70%"];
        return [`${value}%`];
    }, [value]);


    useEffect(() => {
        if (visible) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [visible]);

    // ADD THIS


    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            // key={}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enableDynamicSizing={false}
            enablePanDownToClose={true}
            // backdropComponent={renderBackdrop}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            // android_keyboardInputMode="adjustResize"
            onChange={(index) => {
                if (index === -1) onClose?.();
            }}
            backgroundStyle={{
                backgroundColor: "#fff",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
            }}
            handleIndicatorStyle={{
                backgroundColor: "#ccc",
                width: 40,
            }}
            onClose={onClose}
        >
            {/* <BottomSheetView style={{flex:1}}> */}
            <TouchableOpacity
                style={{ alignItems: "flex-end", right: 20 }}
                onPress={() => {
                    bottomSheetRef.current?.close();
                    onClose?.();
                }}
            >
                {/* <Icon name="close-outline" size={25} color="#000000" /> */}
            </TouchableOpacity>
            {/* <BottomSheetScrollView
                keyboardDismissMode="none"
                contentContainerStyle={{ paddingBottom: keyboardHeight }}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            // onScrollBeginDrag={() => Keyboard.dismiss()}
            >
                {children}
            </BottomSheetScrollView> */}
            <ScrollView
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
            {/* </BottomSheetView> */}
        </BottomSheetModal>
    )
};


export default CustomBottomSheet;