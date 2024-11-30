import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing icons

const InputField = ({ label, value, onChangeText, multiline = false }) => (
  <View style={styles.inputBox}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.inputField, multiline && styles.textArea]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  </View>
);

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('Status');
  const [statusData, setStatusData] = useState([]);
  const [evacuationData, setEvacuationData] = useState([]);
  const [statusForm, setStatusForm] = useState({
    typhoonName: '',
    typhoonStrength: '',
    affectedAreas: '',
    expectedLandfallDate: '',
    rainfallEstimate: '',
    expectedDepartureDate: '',
    duration: '',
    typhoonType: '',
    impact: '',
  });
  const [evacuationForm, setEvacuationForm] = useState({ centerName: '', capacity: '', contact: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const handleChange = (form, setForm) => (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = (form, setForm, data, setData) => () => {
    setData([...data, { ...form, id: Date.now().toString() }]);
    setForm({ ...Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: '' }), {}) });
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsModalVisible(true);
    setDeleteType(null); // Reset delete state when editing
  };

  const handleSave = () => {
    const updateData = (data, setData) => {
      setData(data.map(item => item.id === editingItem.id ? { ...editingItem } : item));
    };
    updateData(activeTab === 'Status' ? statusData : evacuationData, activeTab === 'Status' ? setStatusData : setEvacuationData);
    setEditingItem(null);
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDeleteType(activeTab === 'Status' ? 'Status' : 'Evacuation Center');
    setIsModalVisible(true); // Directly show the confirmation modal for delete
    setEditingItem(null); // Reset editing state when deleting
  };

  const confirmDelete = () => {
    const deleteData = (data, setData) => setData(data.filter(item => item.id !== itemToDelete));
    deleteData(activeTab === 'Status' ? statusData : evacuationData, activeTab === 'Status' ? setStatusData : setEvacuationData);
    setIsModalVisible(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
    setItemToDelete(null);
  };

  const renderTabContent = () => {
    const form = activeTab === 'Status' ? statusForm : evacuationForm;
    const setForm = activeTab === 'Status' ? setStatusForm : setEvacuationForm;
    const data = activeTab === 'Status' ? statusData : evacuationData;
    const handleChangeField = handleChange(form, setForm);
    const handleSubmitForm = handleSubmit(form, setForm, data, activeTab === 'Status' ? setStatusData : setEvacuationData);

    const renderFormFields = () => (
      <View style={styles.formContainer}>
        {Object.keys(form).map((key) => (
          <InputField key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={form[key]} onChangeText={(text) => handleChangeField(key, text)} multiline={key === 'affectedAreas' || key === 'impact'} />
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitForm}>
          <Text style={styles.submitButtonText}>Upload {activeTab}</Text>
        </TouchableOpacity>
      </View>
    );

    const renderListItems = () => (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Name:</Text> {item.typhoonName || item.centerName}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Strength:</Text> {item.typhoonStrength || item.capacity}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Affected Areas:</Text> {item.affectedAreas || item.contact}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Expected Landfall:</Text> {item.expectedLandfallDate}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Rainfall Estimate:</Text> {item.rainfallEstimate}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Expected Departure:</Text> {item.expectedDepartureDate}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Duration:</Text> {item.duration}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Typhoon Type:</Text> {item.typhoonType}
            </Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Impact:</Text> {item.impact}
            </Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item)}>
                <Icon name="edit" size={20} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
                <Icon name="trash" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );

    return (
      <FlatList
        data={[...data]} // FlatList can handle both form and list
        ListHeaderComponent={renderFormFields}
        renderItem={renderListItems}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.tabsContainer}>
        {['Status', 'Evacuation Center'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderTabContent()}

      {/* Edit Modal */}
      {isModalVisible && editingItem && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Edit {activeTab === 'Status' ? 'Status' : 'Evacuation Center'} Information</Text>
            <ScrollView style={styles.scrollContainer}>
              {Object.keys(editingItem).map((key) => key !== 'id' && (
                <InputField
                  key={key}
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  value={editingItem[key]}
                  onChangeText={(text) => setEditingItem({ ...editingItem, [key]: text })}
                  multiline={key === 'affectedAreas' || key === 'impact'}
                />
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
              <Text style={styles.submitButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Confirm Delete Modal */}
      {isModalVisible && deleteType && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this {deleteType}?</Text>
            <TouchableOpacity style={styles.submitButton} onPress={confirmDelete}>
              <Text style={styles.submitButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelDelete}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  formContainer: {
    padding: 20,
  },
  inputBox: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listText: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 5,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default DashboardScreen;
