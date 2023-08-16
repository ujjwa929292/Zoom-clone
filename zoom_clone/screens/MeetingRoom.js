import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import StartMeeting from "../components/StartMeeting";
import { io } from "socket.io-client";
import { Camera, CameraType } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Chat from "../components/Chat";

const menuIcons = [
  {
    id: 1,
    name: "microphone",
    title: "Mute",
    customColor: "#efefef",
  },
  {
    id: 2,
    name: "video-camera",
    title: "Stop Video",
  },
  {
    id: 3,
    name: "upload",
    title: "Share Content",
  },
  {
    id: 4,
    name: "group",
    title: "Participants",
  },
];

let socket;

function MeetingRoom() {
  const [name, setName] = useState();
  const [roomId, setRoomId] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [startCamera, setStartCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Assess denied");
    }
  };

  const joinRoom = () => {
    __startCamera();
    socket.emit("join-room", { roomId: roomId, userName: name });
  };

  useEffect(() => {
    socket = io(
      "https://2584-2401-4900-5c3f-7e45-154f-b9ae-2b2c-2457.ngrok-free.app"
    );
    socket.on("connection", () => console.log("Connected"));
    socket.on("all-users", (users) => {
      setActiveUsers(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      {startCamera ? (
        <SafeAreaView style={{ flex: 1 }}>
          <Modal
            animationType="slide"
            transparent={false}
            presentationType={"fullScreen"}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Chat
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </Modal>
          {/* Active USer Section  */}
          <View style={styles.activeUserContainer}>
            <View style={styles.cameraContainer}>
              <Camera
                type={"front"}
                style={{
                  width: activeUsers.length <= 1 ? "100%" : 200,
                  height: activeUsers.length <= 1 ? "100%" : 200,
                }}
              ></Camera>
              {activeUsers
                .filter((user) => user.userName != name)
                .map((user, index) => (
                  <View key={index} style={styles.activeUsersContainer}>
                    <Text style={{ color: "white" }}>{user.userName}</Text>
                  </View>
                ))}
            </View>
          </View>
          {/* Footer */}
          <View style={styles.menu}>
            {menuIcons.map((icon, index) => (
              <TouchableOpacity key={index} style={styles.tile}>
                <FontAwesome name={icon.name} size={24} color={"#efefef"} />
                <Text style={styles.textTile}>{icon.title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.tile}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name={"comment"} size={24} color={"#efefef"} />
              <Text style={styles.textTile}>Chat</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        // Start Meeting Section
        <StartMeeting
          name={name}
          setName={setName}
          roomId={roomId}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )}
    </View>
  );
}

export default MeetingRoom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  tile: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 15,
  },
  textTile: {
    color: "white",
    marginTop: 10,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cameraContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activeUsersContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  activeUserContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
