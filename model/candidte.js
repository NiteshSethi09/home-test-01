const { Schema, model } = require("mongoose");

const candidateSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  email: {
    type: String,
    required: "Email is required",
  },
});

exports.Candidate = model("Candidate", candidateSchema);
