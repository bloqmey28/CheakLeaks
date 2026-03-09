
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { translations } from './translations';
import { Globe } from 'lucide-react';

// Create Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

function App() {
    const [lang, setLang] = useState('es'); // Default Spanish

    const toggleLang = () => {
        setLang(prev => (prev === 'es' ? 'en' : 'es'));
    };

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-900 text-cyan-400 font-mono relative">

                    {/* Global Language Toggle */}
                    <button
                        onClick={toggleLang}
                        className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-gray-800 border border-cyan-700 px-3 py-1 rounded hover:bg-cyan-900 transition"
                    >
                        <Globe size={16} />
                        <span className="uppercase text-xs font-bold">{lang}</span>
                    </button>

                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </LanguageContext.Provider>
    );
}

export default App;
