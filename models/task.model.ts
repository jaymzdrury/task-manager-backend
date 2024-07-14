import { Schema, Document, model } from "mongoose";

export interface TaskModel extends Document {
  title: string;
  description: string;
  date: Date;
  complete: string;
  users: string[];
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    complete: {
      type: String,
      enum: ["ToDo", "In Progress", "Done"],
      require: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: false, versionKey: false }
);

export default model<TaskModel>("Task", TaskSchema);
