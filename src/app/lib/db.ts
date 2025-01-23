import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if(connectionState === 1) {
        console. log ("Already connected");
        return;
    }

    if (connectionState === 2) {
        console. log ("Connecting...");
        return
    }
    try {
        await mongoose.connect(MONGODB_URI! , {
            dbName: 'xego-app-00',
            bufferCommands: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {   
        console.log("Error: " + error);
        throw new Error("Error connecting to MongoDB: " + error);

    }
}
export default connect;