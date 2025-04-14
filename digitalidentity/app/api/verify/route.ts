// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// This function name must match the HTTP method (POST, GET, etc.)
export async function POST(req: NextRequest) {
  try {
    const { message, signature, publicKey } = await req.json();

    if (!message || !signature || !publicKey) {
      return NextResponse.json(
        { verified: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const signatureBuffer = base64ToArrayBuffer(signature);
    const publicKeyBuffer = base64ToArrayBuffer(publicKey);

    const importedPublicKey = await crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["verify"]
    );

    const encoder = new TextEncoder();
    const isVerified = await crypto.subtle.verify(
      { name: "ECDSA", hash: { name: "SHA-256" } },
      importedPublicKey,
      signatureBuffer,
      encoder.encode(message)
    );

    if (isVerified) {
      return NextResponse.json({
        verified: true,
        message: "Identity verified successfully",
      });
    } else {
      return NextResponse.json(
        { verified: false, message: "Verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { verified: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
