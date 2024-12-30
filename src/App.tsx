import "./App.css";
import { Button } from "./components/ui/button";

function App() {
    return (
        <div style={{ padding: "1rem", fontFamily: "Arial" }}>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <Button>Click Me</Button>
        </div>
    );
}

export default App;
