import { parseFile } from "@fast-csv/parse";
import { database } from "./firebase";
import { NewUserProps } from "./types";

const userRef = database.ref("users");
const csvFilePath = "src/users.csv";
const BATCH_SIZE = 999; // Maximum allowed by Firebase

// remove all users
export const removeAllUsers = async () => {
  try {
    await userRef.remove();
    console.log("All users removed successfully.");
  } catch (error) {
    console.error("Users could not be removed:", error);
  }
};

const createUser = async (user) => {
  try {
    await userRef.push(user);
  } catch (error) {
    console.error("Data could not be saved:", error);
  }
};

const checkIfUserExists = async (email: string) => {
  const snapshot = await userRef
    .orderByChild("email")
    .equalTo(email)
    .once("value");
  return snapshot.exists();
};

const updateUser = async (id: string, user: NewUserProps) => {
  try {
    await userRef.child(id).update(user);
  } catch (error) {
    console.error("Data could not be updated:", error);
  }
};

export const insertDataFromCSV = async () => {
  let recordCount = 0;
  const startTime = performance.now();
  let endTime;
  try {
    userRef.orderByChild("email").off(); // Disable indexing
  } catch (error) {
    console.error("Error disabling indexing:", error);
  }

  const processCSV = async () => {
    console.log("Processing CSV file...");
    try {
      const readStream = parseFile("src/users.csv", { headers: true });
      let batch = [];
      for await (const data of readStream) {
        recordCount++;
        const userExists = await checkIfUserExists(data.email);
        const updatePromise = userExists ? updateUser(data.id, data) : null;
        batch.push(userExists ? updatePromise : createUser(data));
        if (batch.length >= BATCH_SIZE) {
          await Promise.all(batch); // Wait for batch of writes to complete
          batch = []; // Reset batch
        }
      }

      // Process any remaining records in the batch
      if (batch.length > 0) {
        await Promise.all(batch);
      }

      console.log("Total records processed:", recordCount);
      endTime = performance.now();
      console.log(`Execution time: ${endTime - startTime} milliseconds`);
    } catch (error) {
      console.error("Error processing CSV file:", error);
    } finally {
      // Re-enable indexing
      userRef.orderByChild("email").on("value", (snapshot) => {
        console.log("Indexing enabled");
      });
    }
  };
  processCSV();
};
