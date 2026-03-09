
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import { useLanguage } from '../App';

export default function Auth() {
    const { t } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            await axios.post(`${endpoint}`, { email, password }, { withCredentials: true });
            if (isLogin) {
                navigate('/dashboard');
            } else {
                setIsLogin(true);
                alert(t('regSuccess'));
            }
        } catch (err) {
            setError(err.response?.data?.message || t('errorGeneric'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 border-2 border-cyan-500 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] p-8 mt-10">
                <div className="flex justify-center mb-6">
                    <ShieldCheck className="w-16 h-16 text-cyan-400 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-2 tracking-widest uppercase">
                    {isLogin ? t('accessPortal') : t('newIdentity')}
                </h2>
                <p className="text-center text-cyan-700 mb-8 text-sm">{t('secureConnection')}</p>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-500 p-3 rounded mb-4 text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-cyan-700" size={20} />
                        <input
                            type="email"
                            placeholder={t('enterEmail')}
                            className="w-full bg-gray-900 border border-cyan-700 rounded py-3 pl-10 pr-4 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-cyan-700" size={20} />
                        <input
                            type="password"
                            placeholder={t('enterPassword')}
                            className="w-full bg-gray-900 border border-cyan-700 rounded py-3 pl-10 pr-4 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="text-xs text-gray-400 px-1">
                            Password must be 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special.
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-gray-900 font-bold py-3 rounded uppercase tracking-wider transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                        {isLogin ? (
                            <span className="flex items-center justify-center gap-2"><LogIn size={18} /> {t('authenticate')}</span>
                        ) : (
                            <span className="flex items-center justify-center gap-2"><UserPlus size={18} /> {t('register')}</span>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-cyan-600 hover:text-cyan-400 text-sm underline decoration-dotted underline-offset-4"
                    >
                        {isLogin ? t('waitAccount') : t('alreadyAccess')}
                    </button>
                </div>
            </div>
        </div>
    );
}
