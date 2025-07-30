
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Home from './Home';
import type { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center font-sans text-slate-800 dark:text-slate-200">
          <div className="text-center p-10">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
             <p className="mt-4 text-slate-500 dark:text-slate-400">Loading Session...</p>
          </div>
       </div>
    )
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto max-w-2xl p-4 md:p-8">
        {!session ? <Auth /> : <Home key={session.user.id} session={session} />}
      </div>
    </div>
  );
};

export default App;
