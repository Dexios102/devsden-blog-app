/* MongoDB Connection */
import { connect, disconnect } from "mongoose";

const mongodb = process.env.MONGODB_URI as string;

/* MongoDB Connect */
export const connectDB = async () => {
  try {
    const conn = await connect(mongodb);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

/* MongoDB Disconnect */
export const disconnectDB = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
