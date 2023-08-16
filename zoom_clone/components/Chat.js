import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ChatHeader from "./ChatHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Chat({ setModalVisible }) {
  console.log("Rendering Chat component");
  const [messageText, setMessageText] = useState();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <ChatHeader setModalVisible={setModalVisible} />
              {/* Chat Message */}
              <View style={styles.chatMessages}></View>
              {/* Type MEssage */}
              <View style={styles.chatFormContainer}>
                <Text style={{ color: "white" }}>Send to: Everyone</Text>
                <View style={styles.chatForm}>
                  <TextInput
                    value={messageText}
                    onChangeText={(text) => setMessageText(text)}
                    style={styles.textInput}
                    placeholderTextColor="#595859"
                    placeholder="Tap here to chat"
                  />
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: messageText ? "#0B71EB" : "#373838",
                    }}
                  >
                    <FontAwesome name={"send"} size={18} color="#efefef" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  chatFormContainer: {
    borderColor: "#2f2f2f",
    borderTopWidth: 1,
    padding: 12,
  },
  textInput: {
    height: 40,
    color: "#efefef",
    borderColor: "#595859",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    flex: 1,
  },
  button: {
    height: 40,
    width: 40,
    marginTop: 12,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  chatForm: {
    flexDirection: "row",
  },
  chatMessages: {
    flex: 1,
  },
});
