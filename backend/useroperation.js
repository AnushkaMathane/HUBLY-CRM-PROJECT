import { getDB } from "./mongo-context.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const collectionName = "users";

// CREATE USER
export async function createUser(user) {
  try {
    const id = await getLatestUserId();
    user.id = id;

    // ADD DEFAULT ROLE
    user.role = user.role || "user";

    if (user.password)
      user.password = await bcrypt.hash(user.password, 10);

    const result = await getDB().collection(collectionName).insertOne(user);

    if (result.acknowledged) {
      const insertedUser = await getDB()
        .collection(collectionName)
        .findOne({ _id: result.insertedId });

      return { user: insertedUser };
    } else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error("Create error:", err);
    throw err;
  }
}

// READ ALL USERS
export async function getAllUser() {
  try {
    return await getDB().collection(collectionName).find({}).toArray();
  } catch (err) {
    console.error("Read all error:", err);
  }
}

// GET LATEST USER ID
export async function getLatestUserId() {
  try {
    const user = await getDB()
      .collection(collectionName)
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    return user.length > 0 ? user[0].id + 1 : 1;
  } catch (err) {
    console.error("Read all error:", err);
  }
}

// UPDATE USER
export async function updateUser(user) {
  try {
    const updateObj = {
      name: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    if (user.password)
      updateObj.password = await bcrypt.hash(user.password, 10);

    const result = await getDB()
      .collection(collectionName)
      .updateOne({ _id: new ObjectId(user.id) }, { $set: updateObj });

    return result.modifiedCount;
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
}

// DELETE USER
export async function deleteUser(id) {
  try {
    const result = await getDB()
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
}

// LOGIN USER
export async function loginUser(username, password) {
  try {
    const user = await getDB()
      .collection(collectionName)
      .findOne({ email: username });

    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
