import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

// ----------- Add Item -----------
const addItem = () => {
  const db = getDatabase(app);
  const newItemRef = push(ref(db, "/menu/items"));
  set(newItemRef, {
    name: "Fries",
    priceInCents: 2000,
    costInCents: 1000,
    stock: 50,
    available: true,
    description: "Deep-fried potato. Not really healthy",
    category: "Snack",
    var_options: [
      {
        var_group: "Size",
        variations: [
          {
            var_name: "Small",
            priceDeltaInCents: 0,
            costDeltaInCents: 0,
            available: true,
          },
          {
            var_name: "Medium",
            priceDeltaInCents: 500,
            costDeltaInCents: 200,
            available: true,
          },
          {
            var_name: "Large",
            priceDeltaInCents: 800,
            costDeltaInCents: 300,
            available: true,
          },
        ],
      },
      {
        var_group: "Toppings",
        variations: [
          {
            var_name: "Pepperoni",
            priceDeltaInCents: 120,
            costDeltaInCents: 20,
            available: true,
          },
          {
            var_name: "Ham",
            priceDeltaInCents: 300,
            costDeltaInCents: 100,
            available: true,
          },
          {
            var_name: "Cheese",
            priceDeltaInCents: 400,
            costDeltaInCents: 200,
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
