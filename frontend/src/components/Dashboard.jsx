
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, AlertTriangle, CheckCircle, Terminal, LogOut, ExternalLink, Info, Globe, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';

// Simulated Logs Component
const SystemLogs = () => {
    const [logs, setLogs] = useState([]);
    const messages = [
        "Scanning port 443...", "Handshake established", "Decryption key found", "Packet trace complete",
        "Bypassing firewall...", "Access granted", "Downloading payload...", "Analyzing hash...",
        "Connection stable", "Monitoring traffic", "IP spoofing active", "Proxy chain rotating"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const time = new Date().toLocaleTimeString();
            setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 8));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/80 border border-green-900/50 p-4 rounded font-mono text-xs h-48 overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-green-900 text-green-200 px-2 text-[10px]">SYS_LOGS</div>
            {logs.map((log, i) => (
                <div key={i} className="text-green-500/80 mb-1 animate-in slide-in-from-left-2 fade-in duration-300">
                    {log}
                </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
    );
};

// Cyber Map Component (Visual)
const CyberMap = () => {
    return (
        <div className="relative h-48 bg-black/80 border border-cyan-900/50 rounded overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 right-0 bg-cyan-900 text-cyan-200 px-2 text-[10px]">GLOBAL_THREAT_MAP</div>
            <Globe className="text-cyan-900/30 w-32 h-32 animate-pulse" />

            {/* Random Dots */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-700"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-32 bg-cyan-500/10 rotate-45 transform"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        </div>
    );
};

export default function Dashboard() {
    const { t } = useLanguage();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults(null);

        try {
            const res = await axios.post('http://localhost:4000/api/search', { query }, { withCredentials: true });
            setResults(res.data);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/');
            }
            console.error(err);
            alert(t('errorGeneric'));
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
        navigate('/');
    };

    return (
        <div className="min-h-screen text-cyan-400 font-mono p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0f1c] to-black">
            {/* Header */}
            <header className="flex justify-between items-center border-b border-cyan-900/50 pb-4 mb-8 pt-6 px-4 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Activity className="text-cyan-500 animate-pulse" />
                    <h1 className="text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                        LEAKCHECK<span className="text-white text-xs align-top opacity-50">OS v2.2</span>
                    </h1>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/20 transition-all text-xs tracking-widest uppercase">
                    <LogOut size={16} /> {t('terminateSession')}
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Search & Results */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-900/50 border border-cyan-800/30 rounded-lg p-8 shadow-[0_0_50px_rgba(0,255,255,0.05)] backdrop-blur-md">
                        <h2 className="text-xl mb-6 text-center text-cyan-300 tracking-widest">{t('targetAcquisition')}</h2>

                        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                className="flex-1 bg-black/50 border border-cyan-800 text-cyan-100 p-4 rounded focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,255,255,0.2)] text-lg placeholder-cyan-900/50 transition-all"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-cyan-700/20 hover:bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 font-bold px-8 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                            >
                                {loading ? <span className="animate-spin">⟳</span> : <Search size={20} />}
                                {t('scanNetwork')}
                            </button>
                        </form>

                        {/* Results */}
                        {loading && (
                            <div className="text-center py-12 space-y-4">
                                <div className="text-cyan-500 text-4xl animate-pulse tracking-widest">{t('scanning')}</div>
                                <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-400 animate-[progress_1.5s_ease-in-out_infinite] w-2/3 shadow-[0_0_10px_cyan]"></div>
                                </div>
                                <p className="text-xs text-cyan-700 font-mono">{t('connecting')}</p>
                            </div>
                        )}

                        {results && (
                            <div className={`mt-8 border-t border-dashed ${results.found ? 'border-red-500/50' : 'border-green-500/50'} pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    {results.found ? (
                                        <AlertTriangle className="w-12 h-12 text-red-500 animate-bounce" />
                                    ) : (
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                    )}
                                    <div className="text-2xl font-bold tracking-wider">
                                        {results.found ? <span className="text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">{t('breachDetected')}</span> : <span className="text-green-500 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">{t('noLeaks')}</span>}
                                    </div>
                                </div>

                                <p className="text-center text-lg mb-8 text-gray-300">{results.message}</p>

                                {results.found && (
                                    <div className="grid gap-4">
                                        {results.sources.map((source, idx) => (
                                            <div key={idx} className="bg-red-950/20 border border-red-500/30 p-4 rounded hover:bg-red-900/10 transition group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-red-400 text-lg group-hover:text-red-300 transition-colors">{source.name}</h3>
                                                        <p className="text-xs text-red-500/60">{t('breachDate')}: {source.date}</p>
                                                    </div>
                                                    <div className="flex gap-2 flex-wrap justify-end">
                                                        {source.data.map((d, i) => (
                                                            <span key={i} className="text-[10px] bg-red-900/50 text-red-200 px-2 py-1 rounded border border-red-800/50">{d}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {(source.link || source.instructions) && (
                                                    <div className="mt-4 pt-3 border-t border-red-500/20 text-sm space-y-3">
                                                        {source.link && (
                                                            <div className="flex items-start gap-2 overflow-hidden bg-black/30 p-2 rounded">
                                                                <ExternalLink size={14} className="text-yellow-500 mt-1 shrink-0" />
                                                                <div className="break-all font-mono">
                                                                    <span className="text-yellow-600 text-xs font-bold block mb-1">SOURCE LINK</span>
                                                                    <code className="text-yellow-200/80 text-xs">{source.link}</code>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {source.instructions && (
                                                            <div className="flex items-start gap-2 bg-black/30 p-2 rounded">
                                                                <Info size={14} className="text-cyan-500 mt-1 shrink-0" />
                                                                <div className="font-mono">
                                                                    <span className="text-cyan-600 text-xs font-bold block mb-1">ACCESS PROTOCOL</span>
                                                                    <span className="text-gray-400 text-xs">{source.instructions}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Widgets */}
                <div className="space-y-6">
                    <CyberMap />
                    <SystemLogs />

                    <div className="bg-gray-900/50 border border-cyan-800/30 rounded p-4 text-xs text-gray-500 text-center">
                        <p>SECURE CONNECTION ESTABLISHED</p>
                        <p>ENCRYPTION: AES-256-GCM</p>
                        <p className="mt-2 text-cyan-900">NODE: FRA-01</p>
                    </div>
                </div>

            </main>
        </div>
    );
}
