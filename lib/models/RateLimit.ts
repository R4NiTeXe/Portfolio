import mongoose, { Schema, type InferSchemaType } from "mongoose";

const rateLimitSchema = new Schema({
  key: { type: String, required: true, index: true },
  windowStart: { type: Number, required: true },
  count: { type: Number, default: 1 },
  expiresAt: { type: Date, required: true, expires: 0 },
});

export type RateLimitDoc = InferSchemaType<typeof rateLimitSchema>;

export const RateLimit =
  (mongoose.models.RateLimit as mongoose.Model<RateLimitDoc>) ??
  mongoose.model<RateLimitDoc>("RateLimit", rateLimitSchema);