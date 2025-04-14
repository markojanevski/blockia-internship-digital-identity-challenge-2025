# Blockia Labs – Spring 2025 Internship Challenge

### Title: Sign & Verify – A Personal Digital Identity Demo

## What You'll Build
A simple web application that shows how digital signatures work - similar to how modern passwordless login systems function. Instead of using a password, you'll prove your identity using cryptography (like signing a digital document).

## Technical Stack (What You'll Use)
- **Frontend**: Next.js framework with React and TypeScript
- **Backend**: Next.js API Routes (built into Next.js)
- **Cryptography**: Choose one of these libraries:
  - crypto.subtle (built into browsers)
  - tweetnacl (a simple crypto library)
  - Node's crypto module (built into Node.js)

## Digital Identity Details
You need to hardcode these exact values in your code:
- Your Name (example: "Elena Jovanova") - it doesn't need to be your real name, as we don't collect personal information
- First 6 characters of your GitHub ID (example: "elenaj")
- Today's Date in YYYYMMDD format (example: "20250414" for April 14, 2025)

## How the App Should Work
1. Display a simple frontend page with a "Login with your ID" button
2. When clicked, your app should:
   - Create a new cryptographic key pair (like creating a digital signature stamp - choose any algorithm: ECDSA or EdDSA)
   - Create and sign a message that includes your identity details (message format provided below)
   - Send this information to your backend API (API format described below) to verify it's really you
   - Show the outcome of the verification on the page

## Message Structure
Your message should follow this format:
```
BLOCKIA-<YOUR_NAME>-<FIRST_6_CHARS_OF_GITHUB_ID>-<CURRENT_DATE>
```
For example: `BLOCKIA-ElenaJovanova-elenaj-20250414`

## API Communication
Your backend app should implement this API endpoint:

### Verify Signature (/api/verify)
- **Method**: POST
- **Request Body**:
```json
{
  "message": "BLOCKIA-YourName-github-20250414",
  "signature": "base64-encoded-signature",
  "publicKey": "base64-encoded-public-key"
}
```
- **Response**:
```json
{
  "verified": true,
  "message": "Identity verified successfully"
}
```

## How to Submit Your Project
1. Fork this repostiry
2. Modify it to solve the chellenge
2. Include in your README:
   - Your name
   - Your GitHub username
   - A sample of your signed message
   - Instructions for running your project
3. Send the project Github link as response to contact@blockialabs.com
3. BONUS: Record and attach a 1-2 minute video (ex. using Loom) explaining HOW your app is working

## Time Limit
You have 5 days to complete and submit this challenge.

## Important Note
This is an educational exercise. No real cryptographic keys or personal information should be shared with anyone.

## Need Help?
Focus on:
1. Setting up a basic Next.js project
2. Understanding how digital signatures work (plenty of tutorials online)
3. Getting the frontend-backend communication working
4. Testing that your verification works correctly


-------------------------------------------------------

My submission:

Name: Marko Janevski (any name)
GitHub Username: markoj (first 6 characters from github username)

Sample Signed Message: BLOCKIA-MarkoJanevski-markoj-20250414


How to run the project:
1.Clone the repo: git clone https://github.com/markojanevski/blockia-internship-digital-identity-challenge-2025
2.cd digitalidentity
3.Open terminal(cmd) and run next lines
3.npm install
4.npm run dev
5.Open https://localhost:3000 in your browser
6.Click on Login with your ID button to see the verification result
