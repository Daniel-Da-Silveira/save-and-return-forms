//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

// Add your routes here

// Form pages
router.post("/question-2", (req, res) => {
  res.redirect("/question-2");
});

router.post("/question-3", (req, res) => {
  res.redirect("/question-3");
});

router.post("/question-4", (req, res) => {
  res.redirect("/question-4");
});

router.post("/question-5", (req, res) => {
  res.redirect("/question-5");
});

router.post("/question-6", (req, res) => {
  res.redirect("/question-6");
});

router.post("/question-7", (req, res) => {
  res.redirect("/question-7");
});

router.post("/question-8", (req, res) => {
  res.redirect("/question-8");
});

router.post("/check-answers", (req, res) => {
  res.redirect("/check-answers");
});

router.post("/confirmation", (req, res) => {
  res.redirect("/confirmation");
});

// Save and exit functionality
router.post("/save-progress", (req, res) => {
  // Store the security answer for later validation
  req.session.data.securityAnswer = req.body.securityAnswer;
  req.session.data.securityQuestion = req.body.securityQuestion;

  console.log("Saving progress - security answer:", req.body.securityAnswer);
  console.log(
    "Saving progress - security question:",
    req.body.securityQuestion
  );
  console.log("Session data after save:", req.session.data);

  res.redirect("/confirm-email");
});

router.post("/confirm-email", (req, res) => {
  // Preserve the security answer that was saved from save-progress
  // The security answer should already be in req.session.data.securityAnswer
  console.log(
    "Confirming email, security answer is:",
    req.session.data.securityAnswer
  );

  // Store the confirmed email
  req.session.data.confirmedEmail = req.body.email;

  console.log("Email confirmed:", req.body.email);
  console.log("Session data after email confirmation:", req.session.data);

  res.redirect("/progress-saved");
});

router.get("/confirm-email", (req, res) => {
  res.render("confirm-email");
});

router.get("/notify-email", (req, res) => {
  res.render("notify-email");
});

router.post("/progress-saved", (req, res) => {
  res.redirect("/progress-saved");
});

router.post("/resume-form", (req, res) => {
  res.redirect("/resume-form");
});

router.post("/welcome-back", (req, res) => {
  res.redirect("/welcome-back");
});

router.post("/failed-attempts", (req, res) => {
  res.redirect("/failed-attempts");
});

router.post("/link-expired", (req, res) => {
  res.redirect("/link-expired");
});

router.post("/session-expired", (req, res) => {
  res.redirect("/session-expired");
});

// Security answer validation
router.post("/validate-security-answer", (req, res) => {
  const userInput = req.body.userSecurityAnswer; // User's input from the form
  const correctAnswer = req.session.data.securityAnswer || "test answer"; // The answer saved during save-progress
  const attempts = (req.session.data.attempts || 0) + 1;

  console.log("User input:", userInput);
  console.log("Correct answer:", correctAnswer);
  console.log("Attempts:", attempts);

  req.session.data.attempts = attempts;

  // Normalize both answers for comparison
  const normalizedUserInput = userInput ? userInput.toLowerCase().trim() : "";
  const normalizedCorrectAnswer = correctAnswer
    ? correctAnswer.toLowerCase().trim()
    : "";

  console.log("Normalized user input:", normalizedUserInput);
  console.log("Normalized correct answer:", normalizedCorrectAnswer);
  console.log(
    "Do they match?",
    normalizedUserInput === normalizedCorrectAnswer
  );

  if (userInput && normalizedUserInput === normalizedCorrectAnswer) {
    // Correct answer - redirect to welcome back
    console.log("Answer is correct - redirecting to welcome-back");
    delete req.session.data.attempts; // Reset attempts
    res.redirect("/welcome-back");
  } else if (attempts >= 3) {
    // Too many attempts - redirect to failed attempts page
    console.log("Too many attempts - redirecting to failed-attempts");
    delete req.session.data.attempts; // Reset attempts
    res.redirect("/failed-attempts");
  } else {
    // Incorrect answer but still has attempts - go back to resume form
    console.log("Incorrect answer - redirecting back to resume-form");
    res.redirect("/resume-form");
  }
});
