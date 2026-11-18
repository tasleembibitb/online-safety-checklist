// Online Safety Checklist — password strength, phishing red flags, spot-the-scam quiz, safe habits.
const STORAGE_KEY = "tb-online-safety-v1";

const COMMON = ["password", "password123", "123456", "12345678", "qwerty", "abc123", "letmein", "admin", "welcome", "12345"];

const QUIZ = [
  { text: "Congratulations! You are shortlisted for a Data Entry job. Fill this form and pay a Rs. 500 registration fee to confirm your seat.",
    answer: "scam",
    why: "Scam. A real employer never asks for a fee before you join. A 'shortlisted' message with no company name and a fee is the classic trap." },
  { text: "Your bank account will be blocked today. Send your OTP now to keep it active.",
    answer: "scam",
    why: "Scam. Banks never ask for your OTP by message or call. An OTP is yours alone — sharing it hands over your account." },
  { text: "Your interview is scheduled at our Sukkur office on Monday at 11 AM. Please bring your CV and original documents. No fee is charged at any stage.",
    answer: "safe",
    why: "Likely safe — a real place, a real time, and it clearly says no fee. Still verify the office address on the company's official site before you go." }
];

function saveState() {
  const state = {
    flags: [...document.querySelectorAll("#flags input")].map(c => c.checked),
    habits: [...document.querySelectorAll("#habits input")].map(c => c.checked)
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    document.querySelectorAll("#flags input").forEach((c, i) => { c.checked = !!state.flags[i]; });
    document.querySelectorAll("#habits input").forEach((c, i) => { c.checked = !!state.habits[i]; });
  } catch (e) { /* fall through */ }
}

// --- Password strength ---
const pwInput = document.getElementById("pw-input");
const meterFill = document.getElementById("meter-fill");
const pwStrength = document.getElementById("pw-strength");
const rules = document.querySelectorAll("#pw-rules li");

function checkPassword(pw) {
  const checks = {
    length: pw.length >= 12,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    digit: /[0-9]/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
    common: pw.length > 0 && !COMMON.includes(pw.toLowerCase())
  };
  let score = Object.values(checks).filter(Boolean).length;
  if (pw.length === 0) score = 0;
  rules.forEach(li => li.classList.toggle("pass", !!checks[li.dataset.rule]));
  const pct = Math.round((score / 6) * 100);
  meterFill.style.width = pct + "%";
  let label, cls, color;
  if (pw.length === 0) { label = "Not tested"; cls = ""; color = "#a83232"; }
  else if (score <= 2) { label = "Weak"; cls = "weak"; color = "#a83232"; }
  else if (score <= 3) { label = "Fair"; cls = "fair"; color = "#8a5a00"; }
  else if (score <= 4) { label = "Good"; cls = "good"; color = "#1d5fa8"; }
  else { label = "Strong"; cls = "strong"; color = "#177245"; }
  pwStrength.textContent = label;
  pwStrength.className = "badge " + cls;
  meterFill.style.background = color;
}

pwInput.addEventListener("input", () => checkPassword(pwInput.value));

document.getElementById("pw-toggle").addEventListener("click", e => {
  const show = pwInput.type === "password";
  pwInput.type = show ? "text" : "password";
  e.target.textContent = show ? "Hide" : "Show";
});

// --- Red flags ---
function updateRisk() {
  const count = document.querySelectorAll("#flags input:checked").length;
  const el = document.getElementById("risk-summary");
  if (count === 0) {
    el.textContent = "0 red flags ticked — check the message carefully.";
    el.className = "summary";
  } else if (count <= 2) {
    el.textContent = count + " red flag" + (count > 1 ? "s" : "") + " — be careful. Verify the sender before you reply or pay anything.";
    el.className = "summary warn";
  } else {
    el.textContent = count + " red flags — this looks like a scam. Pay nothing and send no CNIC or bank details.";
    el.className = "summary danger";
  }
  saveState();
}

document.querySelectorAll("#flags input").forEach(c => c.addEventListener("change", updateRisk));

// --- Habits ---
function updateHabits() {
  const boxes = document.querySelectorAll("#habits input");
  const done = [...boxes].filter(c => c.checked).length;
  const el = document.getElementById("habit-summary");
  el.textContent = done + " of " + boxes.length + " safe habits ticked.";
  el.className = "summary" + (done === boxes.length ? " safe" : "");
  saveState();
}

document.querySelectorAll("#habits input").forEach(c => c.addEventListener("change", updateHabits));

document.getElementById("reset-all").addEventListener("click", () => {
  document.querySelectorAll("#flags input, #habits input").forEach(c => { c.checked = false; });
  updateRisk();
  updateHabits();
});

// --- Quiz ---
const quizEl = document.getElementById("quiz");
QUIZ.forEach((q, i) => {
  const item = document.createElement("div");
  item.className = "quiz-item";
  const quote = document.createElement("blockquote");
  quote.textContent = q.text;
  const label = document.createElement("p");
  label.textContent = "Message " + (i + 1) + " — Safe or scam?";
  const actions = document.createElement("div");
  actions.className = "actions";
  const safeBtn = document.createElement("button");
  safeBtn.type = "button";
  safeBtn.className = "btn btn-secondary btn-small";
  safeBtn.textContent = "Safe";
  const scamBtn = document.createElement("button");
  scamBtn.type = "button";
  scamBtn.className = "btn btn-secondary btn-small";
  scamBtn.textContent = "Scam";
  const answer = document.createElement("p");
  answer.className = "quiz-answer";
  function reveal(pick) {
    const ok = pick === q.answer;
    answer.textContent = (ok ? "Correct. " : "Not quite. ") + q.why;
    answer.className = "quiz-answer show " + (ok ? "correct" : "wrong");
    safeBtn.disabled = true;
    scamBtn.disabled = true;
  }
  safeBtn.addEventListener("click", () => reveal("safe"));
  scamBtn.addEventListener("click", () => reveal("scam"));
  actions.appendChild(safeBtn);
  actions.appendChild(scamBtn);
  item.appendChild(quote);
  item.appendChild(label);
  item.appendChild(actions);
  item.appendChild(answer);
  quizEl.appendChild(item);
});

loadState();
updateRisk();
updateHabits();
