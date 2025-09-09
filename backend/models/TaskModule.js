import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    
    task: {
        type: String,
        required: [true, "Task is required"]
    }, 
    detail:{
        type: String, 
        // default: "No details"
    }, 
    date: {
        type: Date,
        default: Date.now
    } ,
    done: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})


// Virtual field to format date
todoSchema.virtual("formattedDate").get(function () {
  return this.date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

todoSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Todo", todoSchema);