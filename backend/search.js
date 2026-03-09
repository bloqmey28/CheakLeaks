
export const searchBreaches = async (query) => {
    // Simulate delay
    const delay = Math.floor(Math.random() * 2000) + 500;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Hash Detection (MD5/SHA1/SHA256)
    // Regex for 32 (MD5), 40 (SHA1), 64 (SHA256) hex characters
    const isHash = /^[a-fA-F0-9]{32,64}$/.test(query);

    if (isHash) {
        return {
            found: true,
            message: `CRITICAL: Hash ${query.substring(0, 8)}... matched in high-value target database.`,
            sources: [
                {
                    name: "SilkRoad 4.0 Dump",
                    date: "2025-11-02",
                    data: ["Password Hash", "IP Address", "Physical Address"],
                    link: "magnet:?xt=urn:btih:5iee65d45s456e4564... (SIMULATED)",
                    instructions: "Use a BitTorrent client over Tor to download."
                },
                {
                    name: "Genesis Market Logs",
                    date: "2024-05-15",
                    data: ["Browser Fingerprint", "Cookies"],
                    link: "http://genesis...onion (SIMULATED)",
                    instructions: "Access using Tor Browser."
                }
            ]
        };
    }

    // Email Mock Logic
    const isLeak = Math.random() > 0.3; // 70% chance of leak
    if (isLeak) {
        return {
            found: true,
            message: `Target ${query} found in multiple compromised datasets.`,
            sources: [
                {
                    name: "Collection #1",
                    date: "2019-01-07",
                    data: ["Email", "Password"],
                    link: "magnet:?xt=urn:btih:7a9... (SIMULATED)",
                    instructions: "Public combo list."
                },
                {
                    name: "LinkedIn Scrap",
                    date: "2021-04-09",
                    data: ["Phone", "Job Title", "Email"],
                    link: "http://dark...onion (SIMULATED)",
                    instructions: "Private forum access required."
                }
            ]
        };
    }

    return {
        found: false,
        message: `No breaches found for ${query}. Target appears clean.`,
        sources: []
    };
};
