import { Appwrite } from "appwrite";

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
	.setEndpoint("http://localhost/v1") // Your Appwrite Endpoint
	.setProject("625f260b9bfb71c1d299"); // Your project ID

export default appwrite;
