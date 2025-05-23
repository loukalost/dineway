import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Card styles
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#555',
    marginVertical: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
  },

  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#f5f5f5',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
