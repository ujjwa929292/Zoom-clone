import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

function ChatHeader({ setModalVisible }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Close</Text>
      </Pressable>
      <Text style={styles.heading}>Chat</Text>
      <Entypo name="bell" size={25} color="#efefef" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#1c1c1c", // Adjust background color to match your theme
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#efefef]", // Adjust text color
    fontSize: 16, // Adjust font size
  },
});

export default ChatHeader;
