import appwrite from "../sdk/appwrite";

const responseGoogle = (response) => {
	appwrite.account.createOAuth2Session("google", "http://localhost:3000");
};

export default function Login() {
	return (
		<div>
			<h1>Login</h1>
			<button onClick={responseGoogle}>login</button>
		</div>
	);
}
