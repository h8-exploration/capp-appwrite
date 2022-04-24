import appwrite from "../sdk/appwrite";

const responseGoogle = () => {
	appwrite.account
		.createOAuth2Session("google", "http://localhost:3000")
		.then((resp) => {
			console.log("🚀 ~ file: Login.js ~ line 6 ~ responseGoogle ~ resp", resp);
		})
		.catch((err) => {
			console.log("🚀 ~ file: Login.js ~ line 10 ~ responseGoogle ~ err", err);
		});
};

export default function Login() {
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
					<div
						style={{
							justifyContent: "center",
							alignItems: "center",
							height: "auto",
							width: "auto",
							boxShadow: "box-shadow: 1px 1px 1px grey",
						}}
					>
						<div
							className="customBtn"
							style={{
								backgroundColor: "#fff",
								borderRadius: "5px",
								padding: "0px 15px 0px 5px",
							}}
							onClick={responseGoogle}
						>
							<span className="icon"></span>
							<span
								style={{
									fontWeight: "bold",
									fontSize: "17px",
									fontFamily: "Roboto, sans-serif",
								}}
							>
								Login with Google
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
