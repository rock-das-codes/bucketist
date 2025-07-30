
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface ShareModalProps {
  userId: string;
  onClose: () => void;
  onViewFriendList: (key: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ userId, onClose, onViewFriendList }) => {
    const [activeTab, setActiveTab] = useState<'share' | 'view'>('share');
    const [myKey, setMyKey] = useState<string | null>(null);
    const [loadingKey, setLoadingKey] = useState(true);
    const [friendKey, setFriendKey] = useState('');
    const [copied, setCopied] = useState(false);

    const fetchMyKey = useCallback(async () => {
        setLoadingKey(true);
        const { data, error } = await supabase
            .from('share_keys')
            .select('share_key')
            .eq('user_id', userId)
            .single();

        if (data) {
            setMyKey(data.share_key);
        } else if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error('Error fetching share key:', error);
        }
        setLoadingKey(false);
    }, [userId]);
    
    useEffect(() => {
        if (activeTab === 'share') {
            fetchMyKey();
        }
    }, [fetchMyKey, activeTab]);
    
    const generateKey = async () => {
        setLoadingKey(true);
        const { data, error } = await supabase
            .from('share_keys')
            .insert({ user_id: userId })
            .select('share_key')
            .single();

        if (data) {
            setMyKey(data.share_key);
        } else {
            // Handle unique constraint violation if key already exists
            if (error?.code === '23505') {
                fetchMyKey();
            } else {
                console.error('Error generating key:', error);
            }
        }
        setLoadingKey(false);
    };
    
    const copyToClipboard = () => {
        if (myKey) {
            navigator.clipboard.writeText(myKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    const handleViewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onViewFriendList(friendKey);
    };

    const tabClasses = (tabName: 'share' | 'view') => 
        `w-1/2 py-3 text-center font-semibold cursor-pointer border-b-2 transition-colors ${
        activeTab === tabName
            ? 'border-teal-500 text-teal-500'
            : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        }`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                    <div className={tabClasses('share')} onClick={() => setActiveTab('share')}>Share My List</div>
                    <div className={tabClasses('view')} onClick={() => setActiveTab('view')}>View Friend's List</div>
                </div>

                <div className="p-8">
                    {activeTab === 'share' && (
                        <div>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Share Your List</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Generate a secret key to give friends read-only access to your bucket list.</p>
                            {loadingKey ? (
                                <div className="h-24 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                                </div>
                            ) : myKey ? (
                                <div>
                                    <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <i className="fas fa-key text-slate-400"></i>
                                        <input type="text" readOnly value={myKey} className="flex-grow bg-transparent font-mono text-sm text-slate-600 dark:text-slate-400 outline-none"/>
                                        <button onClick={copyToClipboard} className="bg-teal-500 text-white font-bold py-1 px-3 rounded-md text-sm hover:bg-teal-600 transition-colors">
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">This key does not expire, but you can delete and regenerate it in your Supabase dashboard.</p>
                                </div>
                            ) : (
                                <button onClick={generateKey} className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-teal-500 hover:to-blue-600 transition-all">
                                    Generate My Secret Key
                                </button>
                            )}
                        </div>
                    )}

                    {activeTab === 'view' && (
                        <div>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">View a Friend's List</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Paste a key you've received from a friend to see their bucket list.</p>
                            <form onSubmit={handleViewSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={friendKey}
                                    onChange={(e) => setFriendKey(e.target.value)}
                                    placeholder="Paste friend's key here..."
                                    className="flex-grow p-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-800 transition-all"
                                >
                                    View
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
