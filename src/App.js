import { Routes, Route } from "react-router-dom";
import { Login, Chat } from "./pages";
import RouteProtector from "./components/RouteProtector";
import RouteProtectorLogin from "./components/RouteProtectorLogin";

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
			<Route
				path="/login"
				element={
					<RouteProtectorLogin>
						<Login />
					</RouteProtectorLogin>
				}
			/>
		</Routes>
	);
}

export default App;
