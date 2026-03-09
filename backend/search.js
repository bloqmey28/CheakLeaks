
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

    // Real Email Leak Check via XposedOrNot API
    try {
        const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(query)}`);

        if (response.status === 404) {
            return {
                found: false,
                message: `No se encontraron brechas para ${query}. Objetivo limpio.`,
                sources: []
            };
        }

        const data = await response.json();

        if (data.status === 'success' && data.breaches && data.breaches.length > 0) {
            const breachesList = data.breaches[0]; // It returns an array of arrays [[ "Breach1", "Breach2" ]]

            // Format top 10 breaches for the UI
            const formattedSources = breachesList.slice(0, 10).map((b, idx) => ({
                name: b,
                date: "Verificada (XposedOrNot)",
                data: ["Email Filtrado", "Posible Contraseña"],
                link: `https://xposedornot.com/breaches#${b}`,
                instructions: "Información expuesta en brecha pública."
            }));

            return {
                found: true,
                message: `ALERTA: El correo ${query} ha aparecido en ${breachesList.length} bases de datos hackeadas filtradas.`,
                sources: formattedSources
            };
        }

        return {
            found: false,
            message: `No se encontraron filtraciones para ${query}. El objetivo parece estar limpio.`,
            sources: []
        };

    } catch (err) {
        console.error('Error fetching breach data:', err);
        return {
            found: false,
            message: `Error interno al consultar la base de datos de filtraciones reales para ${query}.`,
            sources: []
        };
    }
};
