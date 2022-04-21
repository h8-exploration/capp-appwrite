import { Routes, Route } from "react-router-dom";
import { Login, Register, Chat } from "./pages";
// import "./assets/style.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Chat />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}

export default App;
