import { useGameLoop } from './hooks/useGameLoop';
import { Providers } from './providers';
import { GameUI } from './components/GameUI';

function AppInner() {
  useGameLoop();
  return <GameUI />;
}

export function App() {
  return (
    <Providers>
      <AppInner />
    </Providers>
  );
}
