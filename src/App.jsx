import { useState } from "react";
import StartPage from "./Page/StartPage";
import GamePage from "./Page/GamePage";

function App() {
    const [game, setGame] = useState(true);
    return (
        <>
            <div className="w-full h-full min-h-screen bg-gray-200 flex items-center">
                {game ? (
                    <StartPage handleGame={setGame} />
                ) : (
                    <GamePage setGame={setGame} />
                )}
            </div>
        </>
    );
}

export default App;
