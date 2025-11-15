// api/lockstatus.js
// Vercel Serverless Function (Node.js)

const RAILWAY_API_URL = "https://robo-backend-production-34af.up.railway.app/api/status";

export default async function (req, res) {
  try {
    // 1. Vercel securely fetches the status from your Railway backend
    const response = await fetch(RAILWAY_API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Check if the secure fetch was successful
    if (!response.ok) {
      throw new Error(`Railway status check failed with HTTP code ${response.status}`);
    }

    const data = await response.json();
    const isLocked = data.boxlocked;

    // 2. Determine the simple status string
    const statusString = isLocked ? "locked" : "unlocked";

    // 3. Vercel returns the simple status as plain text (HTTP compatible)
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(statusString);

  } catch (error) {
    console.error("Proxy Error:", error.message);
    // Send a simple 'error' string if the fetch fails
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).send("error");
  }
}
