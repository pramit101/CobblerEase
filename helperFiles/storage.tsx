import AsyncStorage from "@react-native-async-storage/async-storage";

const product_key = "@product_items";
const service_key = "@service_items";

// Function to save data to AsyncStorage

export const saveData = async (product: {
  id: string;
  name: string;
  price: string;
}) => {
  const main_list = await AsyncStorage.getItem(product_key);
  const parsedList = main_list ? JSON.parse(main_list) : [];

  parsedList.push(product);
  await AsyncStorage.setItem(product_key, JSON.stringify(parsedList));
};

export const retrieveData = async () => {
  const main_list = await AsyncStorage.getItem(product_key);
  const parsedList = main_list ? JSON.parse(main_list) : [];
  return parsedList;
};

export const save_service_data = async (service: {
  name: string;
  description: string;
}) => {
  const main_list = await AsyncStorage.getItem(service_key);
  const parsedList = main_list ? JSON.parse(main_list) : [];

  parsedList.push(service);
  await AsyncStorage.setItem(service_key, JSON.stringify(parsedList));
};

export const retrieve_service_data = async () => {
  const main_list = await AsyncStorage.getItem(service_key);
  const parsedList = main_list ? JSON.parse(main_list) : [];
  return parsedList;
};

export const clearData = async () => {
  await AsyncStorage.removeItem(product_key);
  await AsyncStorage.removeItem(service_key);
};

export const removeItem = async (id: string) => {
  const main_list = await AsyncStorage.getItem(product_key);
  const parsedList = main_list ? JSON.parse(main_list) : [];

  const updatedList = parsedList.filter(
    (item: { id: string }) => item.id !== id
  );
  await AsyncStorage.setItem(product_key, JSON.stringify(updatedList));
};
export const removeServiceItem = async (name: string) => {
  const main_list = await AsyncStorage.getItem(service_key);
  const parsedList = main_list ? JSON.parse(main_list) : [];

  const updatedList = parsedList.filter(
    (item: { name: string }) => item.name !== name
  );
  await AsyncStorage.setItem(service_key, JSON.stringify(updatedList));
};
