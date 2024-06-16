import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

// ----------- Add Item -----------
const addItem = () => {
  const db = getDatabase(app);
  const newItemRef = push(ref(db, "/menu/items"));
  set(newItemRef, {
    name: "Fries",
    price: 20,
    cost: 1000,
    stock: 50,
    available: true,
    description: "Deep-fried potato. Not really healthy",
    category: "Snack",
    var_options: [
      {
        var_group: "Size",
        variants: [
          {
            _id: "112411",
            var_name: "Small",
            priceDelta: 0,
            costDelta: 0,
            available: true,
          },
          {
            _id: "1geg11",
            var_name: "Medium",
            priceDelta: 500,
            costDelta: 200,
            available: true,
          },
          {
            _id: "14561",
            var_name: "Large",
            priceDelta: 800,
            costDelta: 300,
            available: true,
          },
        ],
      },
      {
        var_group: "Toppings",
        variants: [
          {
            _id: "13232",
            var_name: "Pepperoni",
            priceDelta: 120,
            costDelta: 20,
            available: true,
          },
          {
            _id: "323yg1",
            var_name: "Ham",
            priceDelta: 300,
            costDelta: 100,
            available: true,
          },
          {
            _id: "11ghber",
            var_name: "Cheese",
            priceDelta: 400,
            costDelta: 200,
            available: true,
          },
        ],
      },
    ],
  });
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

const addItemIds = async ({ snapshot }) => {
  // add itemId
  if (snapshot.exists()) {
    const items = snapshot.val();
    const newItems = Object.keys(items).map((id) => {
      return { ...items[id], _id: id };
    });
    return newItems;
  }
};

export { addItem, getAllItems };
