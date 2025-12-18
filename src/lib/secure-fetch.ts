/** This is a drop-in replacement for the standard browser fetch. This file
 * acts as an Interecptor that takes the page's request and signs it using
 * the browser's crypto.subtle engine, adds the headers, and releases the request.
 * https://nextjs.org/docs/app/api-reference/file-conventions/proxy#setting-headers
 * 
*/

const SECRET_KEY = process.env.NEXT_PUBLIC_RSEC_SECRET; // hardcoded for testing
const USER_ID = "1"; // hardcoded for testing

interface SecureRequestInit extends Omit<RequestInit, "body"> {
  body?: any; // We allow 'any' here so you can pass objects like { text: inp }
}

/**
 * A wrapper around the native fetch API that adds HMAC-SHA256 signatures.
 */
export async function secureFetch(url: string, options: SecureRequestInit = {}): Promise<Response> {
    /* Backend code for reference:
    body_str = body_bytes.decode()

        message = f"{user_id}.{rSec_Timestamp}.{method}.{path}.{body_str}"
        reconstructed_signature = hmac.new(
            secret_key.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()
     */

    // 1. Fetching request details
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const method = (options.method || "GET").toUpperCase(); // Default to GET
    // If url is "http://localhost:8000/analyze" we want just "/analyze"
    let path = url;
    try {
        if (url.startsWith("http")) {
        const urlObj = new URL(url);
        path = urlObj.pathname;
        }
    } catch (e) {
        path = url; 
    }

    let bodyStr = "";
    // Handle body stringify if necessary since fetch can take body as string or other types;
    // This step standardizes it to string for signing.
    if (options.body) {
        bodyStr = typeof options.body === "string" 
        ? options.body  
        : JSON.stringify(options.body);
    }

    // 2. Constructing the message & signature
    const message = `${USER_ID}.${timestamp}.${method}.${path}.${bodyStr}`;
    const signature = await generateSignature(message, SECRET_KEY);

    // 3. Adding in custom headers
    const headers: HeadersInit = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        // "X-" prefix to match backend
        "X-rSec-Timestamp": timestamp,
        "X-rSec-Signature": signature,
        "x-user-id": USER_ID,
    };

    return fetch(url, {
    ...options,
    headers,
    body: bodyStr || undefined, // Ensure body is undefined for GET requests
  });
}

async function generateSignature(message: string, secretKey: string): Promise<string> {
    const encoder = new TextEncoder();
    const messageUint8Array = encoder.encode(message);
    const keyUint8Aray = encoder.encode(secretKey);
    
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyUint8Aray,
        { name: "HMAC", hash: "SHA-256" },
        false, // key is not extracable; set to true if you need to export it later
        ["sign"] // key can be used to sign
    );
    
    const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        messageUint8Array
    );
    
    return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}