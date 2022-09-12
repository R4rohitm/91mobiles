const { Schema, model, SchemaTypes } = require("mongoose");

const UploadSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: [true, "Need to provide the users Id"],
  },
  filepath: { type: String, required: [true, "Upload the valid file"] },
});

const UploadsModel = new model("upload", UploadSchema);

module.exports = UploadsModel;
