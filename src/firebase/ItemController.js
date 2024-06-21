import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

// ----------- Add Item -----------
const addItem = async ({ itemData }) => {
  const db = getDatabase(app);
  const newItemRef = push(ref(db, "/menu/items"));
  await set(newItemRef, itemData);
};

// ----------- Get all Items --------
const getAllItems = async () => {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "/menu/items");
    const itemsSnapshot = await get(dbRef);
    if (itemsSnapshot.exists()) {
      return addItemIds({ snapshot: itemsSnapshot });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching items", error);
  }
};

export { addItem, getAllItems };

const addItemIds = ({ snapshot }) => {
  // add itemId
  if (snapshot.exists()) {
    const items = snapshot.val();
    const newItems = Object.keys(items).map((id) => {
      return { ...items[id], _id: id };
    });
    return newItems;
  }
};
