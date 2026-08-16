import mongoose, { Schema, type InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

export type MessageDoc = InferSchemaType<typeof messageSchema> & {
  createdAt: Date;
  updatedAt: Date;
};

export const Message =
  (mongoose.models.Message as mongoose.Model<MessageDoc>) ??
  mongoose.model<MessageDoc>("Message", messageSchema);