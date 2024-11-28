import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi! Please let us know how we can help you.", sender: "bot" },
  ]);

  const options = [
    "Where are the nearest evacuation centers in Manila?",
    "What is the current typhoon status in Manila?",
    "Can I get emergency contact numbers in Manila?",
    "Which areas are expected to be affected by the typhoon?",
    "How strong is the typhoon?",
    "When is the typhoon expected to leave the area?",
    "What are the safety tips during a typhoon?",
    "Are there any road closures due to the typhoon?",
    "Is there a risk of flooding in my area?",
    "What is the current wind speed of the typhoon?",
    "When is the next weather update?",
  ];

  const getBotResponse = (option) => {
    switch (option) {
      case "Where are the nearest evacuation centers in Manila?":
        return "The nearest evacuation centers in Manila are: \n- SM Mall of Asia\n- Manila City Hall\n- San Andres Gymnasium\n- Rizal Park (designated areas for evacuation)";
      case "What is the current typhoon status in Manila?":
        return "The current typhoon is Typhoon 'Agaton,' and it is expected to make landfall near Manila within 12 hours. Be prepared and stay safe!";
      case "Can I get emergency contact numbers in Manila?":
        return "Here are some emergency contact numbers for Manila: \n- Manila Disaster Risk Reduction and Management Office (MDRRMO): 8527-5946 \n- Manila Police District: 528-4245\n- Manila Fire Department: 711-4762";
      case "Which areas are expected to be affected by the typhoon?":
        return "The typhoon is expected to affect the following areas: \n- Metro Manila\n- Southern Luzon\n- Central Luzon\n- Northern Visayas. Please stay updated for further advisories.";
      case "How strong is the typhoon?":
        return "The current typhoon has sustained winds of 120 km/h with gusts reaching up to 150 km/h.";
      case "When is the typhoon expected to leave the area?":
        return "The typhoon is expected to leave the Philippine Area of Responsibility (PAR) by Wednesday evening, depending on its speed.";
      case "What are the safety tips during a typhoon?":
        return "Here are some safety tips during a typhoon: \n- Stay indoors and away from windows.\n- Keep a flashlight, radio, and emergency supplies ready.\n- Avoid going outside unless absolutely necessary.\n- Stay updated through trusted news sources.";
      case "Are there any road closures due to the typhoon?":
        return "Road closures have been reported in low-lying areas prone to flooding, including:\n- Espana Boulevard\n- Roxas Boulevard\n- EDSA (certain portions).";
      case "Is there a risk of flooding in my area?":
        return "Flooding is expected in low-lying and coastal areas of Manila. Please monitor announcements from the local government.";
      case "What is the current wind speed of the typhoon?":
        return "The current wind speed of the typhoon is 120 km/h near the center, with gusts reaching up to 150 km/h.";
      case "When is the next weather update?":
        return "The next weather update will be issued by PAGASA at 5:00 PM. Stay tuned for the latest information.";
      default:
        return "I'm here to help! Let me know what else you need.";
    }
  };

  const handleOptionPress = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), text: option, sender: "user" },
    ]);

    const botResponse = getBotResponse(option);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), text: botResponse, sender: "bot" },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === "bot" ? styles.botMessage : styles.userMessage
            }
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.optionsContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 15,
  },
  messageList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e7f3ff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    maxWidth: "75%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#b3d9ff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    maxWidth: "75%",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  optionsContainer: {
    height: 200, // Fixed height for options list
    paddingTop: 10,
  },
  scrollView: {
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#b3d9ff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
  },
  optionText: {
    color: "#003366",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ChatbotScreen;
