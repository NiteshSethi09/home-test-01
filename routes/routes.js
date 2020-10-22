const { Router } = require("express");
const router = Router();
const { Candidate } = require("../model/candidte");
const { TestScore } = require("../model/test_score");

router.post("/create", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .json({ msg: "Provide both name and email for registrtion." });
  }

  // checking if candidate exsts with provided email id or not?
  if (await Candidate.findOne({ email })) {
    return res
      .status(400)
      .json({
        msg: "Candidate account with this email id already registered.",
      });
  }

  // Registering candidate if all upper conditions passed.
  await Candidate.create({ name, email })
    .then(() => res.json({ msg: "Candidate registered succesfully." }))
    .catch((err) => console.log("Getting some problem while registering."));
});

router.post("/test", async (req, res) => {
  const { score, round, studentId } = req.body;
  if (!score || !round || !studentId) {
    return res
      .status(400)
      .json({ msg: "Something is missing while providing test information." });
  }

  // Checking if score have already set for this candidate or not.
  if (await TestScore.findOne({ studentId, round })) {
    return res.status(400).json({
      msg: "You have already submitted score for this candidate in this round.",
    });
  }

  // Assign marks to candidate if all upper conditions passed.
  await TestScore.create({ studentId, score, round })
    .then(() => res.json({ msg: "Test result saved successfully." }))
    .catch((err) => console.log("Error occured while saving test result."));
});

router.get("/result", async (req, res) => {
  const { round } = req.body;
  let flag = 0,
    totalScore = 0;
  if (!round) {
    return res.status(400).json({ msg: "Provide the necessary informations." });
  }

  // getting candidate data and sorting all of them in order to get the higest scoring candidate.
  const testArr = await TestScore.find({ round })
    .populate("studentId")
    .sort("-score");

  for (let { score } of testArr) {
    totalScore += score;
    flag++;
  }
  // Average marks according to a specific round for all registered candidates.
  const avg = Math.ceil(totalScore / flag);
  // Highest scoring candidate in this specific round is =>
  const candidateWithHighestScore = testArr[0].studentId;
  // Highest scoring candidate marks in this specific round is =>
  const highestScore = testArr[0].score;

  return res.json({
    "Average marks": avg,
    "Candidate with highest score": candidateWithHighestScore,
    "Highest score of this candidate": highestScore,
  });
});

module.exports = router;
