const { Schema, model, SchemaTypes } = require("mongoose");

const testScoreSchema = new Schema({
  score: {
    type: Number,
    min: 0,
    max: 10,
    required: "Marks are required",
  },
  round: {
    type: Number,
    min: 1,
    max: 3,
    required: "Round is required",
  },
  studentId: {
    type: SchemaTypes.ObjectId,
    ref: "Candidate",
    required: true,
  },
});

exports.TestScore = model("TestScore", testScoreSchema);
