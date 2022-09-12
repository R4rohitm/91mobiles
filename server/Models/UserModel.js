const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    first_name: { type: String, required: [true, "Enter Your First Name"] },
    last_name: { type: String, required: [true, "Enter Your Last Name"] },
    email: {
      type: String,
      required: [true, "Enter Your Valid Email Address"],
      unique: [true, "Email is already used"],
    },
    mobile: {
      type: Number,
      required: [true, "Enter Your Valid Mobile Number"],
      unique: [true, "Mobile number is already used"],
      validate: {
        validator: function (val) {
          return val.toString().length === 10;
        },
        message: (val) => `${val.value} has to be 10 digits`,
      },
    },
    password: {
      type: String,
      required: [true, "Enter a Password"],
    },
    role: {
      type: String,
      required: [true, "Enter Role"],
      enum: ["Admin", "Member", "Trainer"],
      default: "Member",
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const UserModel = new model("user", UserSchema);

module.exports = UserModel;
