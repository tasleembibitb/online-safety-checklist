# Online Safety Checklist

A single-page web app that teaches the basics of staying safe online —
the same skills taught in VU's free **Digital Awareness course (PTC801,
4 weeks)**: strong passwords, spotting phishing, and protecting your
personal data.

Built by **Tasleem Bibi** (final-year BSCS, Begum Nusrat Bhutto Women
University, Sukkur, Sindh, Pakistan). The red flags here come from real
experience: a "shortlisted" message that led to a form asking for a
Rs. 500 fee — a classic scam, and the reason this checklist exists.

## How to run

No build step and no server needed:

1. Open `index.html` in any modern browser (double-click it, or serve the folder).
2. Try the password checker, tick the phishing red flags, take the
   spot-the-scam quiz, and tick your safe habits.
3. Your ticks are saved in your browser (localStorage).

## Features

- **Password strength checker** — live meter plus a rule checklist
  (12+ characters, capital and small letters, a number, a symbol, and not a
  common password). Checked only in your browser, nothing is sent anywhere.
  Never type a real password into a demo — test with a made-up one.
- **Phishing red-flag checklist** — 8 red flags (fee asked, CNIC / bank
  details / OTP asked, unknown sender, pressure tactics, mismatched link,
  bad grammar, "shortlisted" out of nowhere, unknown download). The risk
  score warns you when a message looks like a scam.
- **Spot the scam — mini quiz** — three real-style messages, safe or scam,
  with the reason explained after every answer.
- **Safe habits checklist** — different password per site, 2FA on email,
  never share an OTP, check the sender before clicking, verify a job on the
  official site, keep apps updated. Saved in your browser.
- Clean, professional design in dark navy and teal (TB branding),
  mobile-responsive. No personal photo, no fake logos.

## The one rule to remember

If a form asks for a fee, your CNIC or bank details before you join, it is
not a job — it is a scam. Pay nothing, send nothing, and ask someone you
trust first.

## Files

- `index.html` — page structure and the four sections
- `style.css` — dark navy / teal styling, mobile-responsive
- `script.js` — password checker, risk score, quiz and localStorage saving
- `README.md` — this file

## Note

This is a demo learning tool. It cannot guarantee that a message is safe
or a scam — when in doubt, verify on the official website or ask someone
you trust. Built as a companion to VU's Digital Awareness course (PTC801);
enrolment in that course is a separate step and is not claimed here.
