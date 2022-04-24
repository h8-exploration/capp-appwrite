import { Routes, Route } from "react-router-dom";
import { Login, Register, Chat } from "./pages";
import RouteProtector from "./components/RouteProtector";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<RouteProtector>
						<Chat />
					</RouteProtector>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}

export default App;
