// src/components/custom/SelectLang.js
import React, { useState } from "react";
import { Text, TouchableOpacity, Modal, View, FlatList } from "react-native";
import { useLang } from "../../context/langContext";

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
];

const SelectLang = () => {
  const { changeLanguage, t } = useLang();
  const [visible, setVisible] = useState(true);
  // c
  const [selectedLang, setSelectedLang] = useState('Select Language');

  const selectLanguage = async (lang) => {
    setSelectedLang(lang.label);
    await changeLanguage(lang.code); // ← setAppLanguage ki jagah yeh
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          width: '80%',
          alignItems: 'center',
          backgroundColor: '#fff',
          marginBottom: 30,
          borderRadius: 30,
          paddingVertical: 10
        }}>
        <Text style={{ color: "#691a1a", fontSize: 16 }}>
          {selectedLang}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" }}>
          <View style={{ backgroundColor: "#fff", margin: 20, borderRadius: 20, padding: 20, maxHeight: "70%" }}>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectLanguage(item)}
                  style={{ paddingVertical: 12, borderBottomWidth: 0.5 }}>
                  <Text style={{ fontSize: 16 }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SelectLang;