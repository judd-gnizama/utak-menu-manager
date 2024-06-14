import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

// ----------- Add Category -----------
const addCategory = async ({ categoryName }) => {
  if (!categoryName) {
    throw Error("No given category name");
  }
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "/menu/categories");
    const existSnapshot = await get(dbRef);

    if (!existSnapshot.exists()) {
      await set(push(dbRef), { categoryName });
    }

    const existCategories = Object.values(existSnapshot.val());
    const exist = existCategories.filter(
      (cat) => cat.categoryName === categoryName
    );
    if (exist.length <= 0) {
      const newCategoryRef = push(ref(db, "/menu/categories"));
      await set(newCategoryRef, { categoryName });
    } else {
      console.log("Already taken");
    }
  } catch (error) {
    console.error("Error in adding Category", error);
  }
};

// ----------- Get all Items --------
const getAllCategories = async () => {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "/menu/categories");
    const categoriesSnapshot = await get(dbRef);
    if (categoriesSnapshot.exists()) {
      const categoryNames = Object.values(categoriesSnapshot.val()).map(
        (cat) => cat.categoryName
      );
      return categoryNames;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

export { addCategory, getAllCategories };
