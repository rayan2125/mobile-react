import React, { useState } from "react";
import { Text, TouchableOpacity, FlatList, View, Image } from "react-native";
import { useLang } from "../../context/langContext";
import CustomBottomSheet from "../layout/bottomSheetLayout";

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'bn', label: 'বাংলা' },

];

const SelectLang = () => {
  const { changeLanguage } = useLang();
  const [visible, setVisible] = useState(true);

  const [selectedLang, setSelectedLang] = useState('Select Language');

  const selectLanguage = async (lang) => {
    setSelectedLang(lang.label);
    await changeLanguage(lang.code);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)} // yeh open karega
        style={{
          width: '80%',
          alignItems: 'center',
          backgroundColor: '#fff',
          marginBottom: 30,
          borderRadius: 30,
          paddingVertical: 10,
          paddingHorizontal: 10,
          elevation: 10
        }}>
        <Text style={{ color: "#691a1a", fontSize: 16 }}>
          {selectedLang}
        </Text>

      </TouchableOpacity>

      <CustomBottomSheet
        value={60}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <FlatList
          data={LANGUAGES}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
<View style={{marginHorizontal:15}}>
            <TouchableOpacity
              onPress={() => selectLanguage(item)}
              style={{ paddingVertical: 12, borderBottomWidth: 0.5, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 16, color: 'red' }}>{item.label}</Text>
            </TouchableOpacity>

</View>
          )}
        />
      </CustomBottomSheet>
    </>
  );
};

export default SelectLang;