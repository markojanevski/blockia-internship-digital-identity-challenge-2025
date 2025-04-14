"use client";
import React, { useState } from "react";

export default function Home() {
  const [verificationResult, setVerificationResult] = useState<string>("");

  async function handleLoginWithID() {
    try {
      // 1. Generate a key pair (using either Subtle Crypto or tweetnacl)
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-256",
        },
        true, // whether the key is extractable (needed for exporting)
        ["sign", "verify"] // what the key can do
      );

      // 2. Create your message string:
      // BLOCKIA-<YOUR_NAME>-<FIRST_6_CHARS_OF_GITHUB_ID>-<CURRENT_DATE>
      const YOUR_NAME = "Marko Janevski";
      const FIRST_6_GITHUB = "markoj";
      const TODAY_YYYYMMDD = "20250414"; // Hardcode or compute programmatically

      const messageToSign = `BLOCKIA-${YOUR_NAME}-${FIRST_6_GITHUB}-${TODAY_YYYYMMDD}`;

      // 3. Sign the message with the private key
      function strToArrayBuffer(str: string) {
        const encoder = new TextEncoder();
        return encoder.encode(str);
      }
      
      // Sign the message
      const signatureArrayBuffer = await window.crypto.subtle.sign(
        {
          name: "ECDSA",
          hash: { name: "SHA-256" },
        },
        keyPair.privateKey,
        strToArrayBuffer(messageToSign)
      );
      
      // Convert signature to base64 so we can send it as JSON
      function arrayBufferToBase64(buffer: ArrayBuffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      
      const signatureBase64 = arrayBufferToBase64(signatureArrayBuffer);
      
      
      // 4. Send { message, signature, publicKey } to /api/verify
      const exportedPublicKey = await window.crypto.subtle.exportKey(
        "spki", // format
        keyPair.publicKey
      );
      const publicKeyBase64 = arrayBufferToBase64(exportedPublicKey);
      
      // 5. Get the response and set the verification result

      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSign,
          signature: signatureBase64,
          publicKey: publicKeyBase64,
        }),
      });
      
      const result = await response.json();
      // result should look like:
      // { verified: true/false, message: "some message" }
      
      // Then set your state so you can display on the page
      setVerificationResult(result.message);

    } catch (error) {
      console.error(error);
      setVerificationResult("An error occured");
    }
  }

  return (
    <div>
      <h1>Sign & Verify – A Personal Digital Identity Demo</h1>
      <button onClick={handleLoginWithID}>Login with your ID</button>
      <p>{verificationResult}</p>
    </div>
  );
}
