const mongoose = require("mongoose");
require("dotenv").config();

const XegoFileSchema = new mongoose.Schema({
  idxego: { type: mongoose.Schema.Types.ObjectId, ref: "Xego", required: true },
  name: { type: String, required: true },
  content: { type: String, required: false },
  path: { type: String, required: true },
  language: { type: String, required: false },
  type: { type: String, required: true },
  step: { type: Number, required: true },
  __v: { type: Number, default: 0 },
  modtime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const XegoFile = mongoose.models.XegoFile || mongoose.model("XegoFile", XegoFileSchema, "xegofiles");

(async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const fileId = new mongoose.Types.ObjectId("AQUI_VA_EL_ID_DEL_XEGOFILE");

    const updatedFile = await XegoFile.findByIdAndUpdate(
      fileId,
      {
        content: `// Updated content goes here`,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedFile) {
      console.log("⚠️ XegoFile not found.");
    } else {
      console.log("✅ XegoFile updated:", updatedFile);
    }
  } catch (error) {
    console.error("❌ Error updating XegoFile:", error);
  } finally {
    await mongoose.disconnect();
  }
})();