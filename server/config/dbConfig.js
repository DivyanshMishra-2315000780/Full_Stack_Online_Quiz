const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error(
    "MONGO_URL is not set. Please add it to your .env or environment variables."
  );
  // Stop startup so the developer can fix the configuration
  process.exit(1);
}

async function connectToDatabase() {
  try {
    // include modern connection options; harmless if Mongoose version ignores them
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection successful");
  } catch (err) {
    // Log the real error for debugging but avoid leaking secrets accidentally
    console.error("MongoDB connection error:", err && err.message ? err.message : err);
    // Exit so the app doesn't run without a working DB connection
    process.exit(1);
  }
}

// Connection event listeners for runtime issues
mongoose.connection.on("connected", () => {
  console.log("MongoDB event: connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB event: error", err && err.message ? err.message : err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB event: disconnected");
});

// Start connection attempt
connectToDatabase();

// Export mongoose so other modules can access models and connection state
module.exports = mongoose;
