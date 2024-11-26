import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi! Please let us know how we can help you.", sender: "bot" },
  ]);

  const options = [
    "Where are the nearest evacuation centers in Manila?",
    "What is the current typhoon status in Manila?",
    "Can I get emergency contact numbers in Manila?",
  ];

  const getBotResponse = (option) => {
    switch (option) {
      case "Where are the nearest evacuation centers in Manila?":
        return "The nearest evacuation centers in Manila are: \n- SM Mall of Asia\n- Manila City Hall\n- San Andres Gymnasium\n- Rizal Park (designated areas for evacuation)";
      case "What is the current typhoon status in Manila?":
        return "The current typhoon is Typhoon 'Agaton,' and it is expected to make landfall near Manila within 12 hours. Be prepared and stay safe!";
      case "Can I get emergency contact numbers in Manila?":
        return "Here are some emergency contact numbers for Manila: \n- Manila Disaster Risk Reduction and Management Office (MDRRMO): 8527-5946 \n- Manila Police District: 528-4245\n- Manila Fire Department: 711-4762";
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
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", 
    justifyContent: "flex-start",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#b3d9ff", 
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    maxWidth: "75%",
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  optionsContainer: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#b3d9ff", 
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    width: "85%", 
    elevation: 3, 
  },
  optionText: {
    color: "#003366", 
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ChatbotScreen;
