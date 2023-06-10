import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: [3, "Name is too short"],
      maxlength: [20, "Name cannot be more than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a valid user role",
      },
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "password is too short"],
      maxlength: [50, "password cannot be more than 50 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createJWT = (user) => {
  const token = jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);
