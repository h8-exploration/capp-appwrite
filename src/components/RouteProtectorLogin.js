import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import appwrite from "../sdk/appwrite";

export default function RouteProtectorLogin({ children }) {
	const [isAuth, setIsAuth] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		let promise = appwrite.account.get();
		promise.then(
			function(_) {
				navigate("/");
			},
			function(_) {
				setIsAuth(false);
			}
		);
		// eslint-disable-next-line
	}, []);

	if (isAuth === null)
		return (
			<div className="container app">
				<div className="row app-one">
					<div
						style={{
							display: "flex",
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<h1>Loading...</h1>
					</div>
				</div>
			</div>
		);
	return children;
}
