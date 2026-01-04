import { AppRouter } from './routes/AppRouter';
import { Sidebar } from './features/shared/components/Sidebar';
import { TopBar } from './features/shared/components/TopBar';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-900 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto bg-slate-950">
          <AppRouter />
        </main>
      </div>
    </div>
  );
}

export default App;