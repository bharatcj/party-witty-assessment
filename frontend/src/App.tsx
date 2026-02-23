
import { ScoreProvider } from './context/ScoreContext';
import { ScoreWidget } from './components/ScoreWidget';
import { FeedList } from './components/FeedList';
import { Toaster } from 'react-hot-toast';

const MOCK_USER_ID = 'U1';

function App() {
    return (
        <ScoreProvider userId={MOCK_USER_ID}>
            <Toaster position="bottom-right" />
            <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
                <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                        <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            InterestFeed
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                U1
                            </div>
                            <span className="font-medium text-slate-700 hidden sm:block">Test User</span>
                        </div>
                    </div>
                </header>

                <main className="max-w-5xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 order-2 lg:order-1">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 px-1">Your Curated Feed</h2>
                            <FeedList userId={MOCK_USER_ID} />
                        </div>

                        <div className="lg:col-span-4 order-1 lg:order-2">
                            <ScoreWidget />
                        </div>
                    </div>
                </main>
            </div>
        </ScoreProvider>
    );
}

export default App;
