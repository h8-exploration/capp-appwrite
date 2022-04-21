import ChatList from "../components/ChatList";
import FriendsList from "../components/FriendsList";
import { useState } from "react";
import { useEffect } from "react";
import appwrite from "../sdk/appwrite";
import ChatRoom from "../components/ChatRoom";
import { Query } from "appwrite";

export default function Chat() {
	const [isFriendsList, setIsFriendsList] = useState(false);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(null);
	const [receiver, setReceiver] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState(null);

	useEffect(() => {
		appwrite.subscribe(
			["collections.625f26197236a205746e.documents"],
			(response) => {
				setNewMessage(response.payload);
			}
		);
	}, []);

	useEffect(() => {
		setMessages([newMessage, ...messages]);
	}, [newMessage]);

	useEffect(() => {
		fetch("http://localhost:4000/users")
			.then((resp) => resp.json())
			.then((data) => setUsers(data.users))
			.catch((err) => {
				console.log("🚀 ~ file: Chat.js ~ line 15 ~ useEffect ~ err", err);
			});

		let promise = appwrite.account.get();

		promise.then(
			function(response) {
				setUser(response);
			},
			function(error) {
				console.log("🚀 ~ file: Chat.js ~ line 27 ~ useEffect ~ error", error);
			}
		);
	}, []);

	useEffect(() => {
		if (user) {
			let promise = appwrite.database.listDocuments("625f2658dbe1156b814e", [
				Query.search("userIds", [user?.$id]),
			]);
			promise.then(
				function(response) {
					setRooms(response.documents);
				},
				function(error) {
					console.log(error); // Failure
				}
			);
		}
	}, [user]);

	useEffect(() => {
		let promise = appwrite.database.listDocuments("625f2658dbe1156b814e", [
			Query.search("userIds", [user?.$id]),
		]);
		promise.then(
			function(response) {
				setRooms(response.documents);
			},
			function(error) {
				console.log(error); // Failure
			}
		);
	}, [receiver]);

	useEffect(() => {
		if (receiver) {
			let promise = appwrite.database.listDocuments("625f2658dbe1156b814e", [
				Query.search("userIds", [user?.$id]),
				Query.search("userIds", [receiver?.$id]),
			]);
			promise.then(
				function(response) {
					if (response.documents.length < 1) {
						let promise = appwrite.database.createDocument(
							"625f2658dbe1156b814e",
							"unique()",
							{
								name: "",
								userIds: [user?.$id, receiver?.$id],
							}
						);
						promise.then(
							function(response) {
								console.log(response); // Success
							},
							function(error) {
								console.log(error); // Failure
							}
						);
					}
				},
				function(error) {
					console.log(error); // Failure
				}
			);
		}
	}, [receiver]);

	useEffect(() => {
		if (user && receiver) {
			let promise = appwrite.database.listDocuments(
				"625f26197236a205746e",
				[
					Query.search("userIds", [user?.$id]),
					Query.search("userIds", [receiver?.$id]),
				],
				10,
				0,
				"",
				"",
				["createdAt"],
				["DESC"]
			);
			promise.then(
				function(response) {
					setMessages(response.documents);
				},
				function(error) {
					console.log(error); // Failure
				}
			);
		}
	}, [receiver]);

	const handleSendMessage = (payload) => {
		let promise = appwrite.database.createDocument(
			"625f26197236a205746e",
			"unique()",
			{
				userIds: [user?.$id, receiver?.$id],
				userId: user?.$id,
				text: payload.text,
				image: "",
				roomId: "",
				createdAt: new Date(),
			},
			["role:all"],
			["role:all"]
		);
		promise.then(
			function(response) {},
			function(error) {
				console.log(
					"🚀 ~ file: Chat.js ~ line 118 ~ handleSendMessage ~ error",
					error
				);
			}
		);
	};

	return (
		<div className="container app">
			<div className="row app-one">
				<div className="col-sm-4 side">
					<ChatList
						isFriendsList={isFriendsList}
						setIsFriendsList={setIsFriendsList}
						user={user}
						rooms={rooms}
						users={users}
						setReceiver={setReceiver}
					/>
					<FriendsList
						isFriendsList={isFriendsList}
						setIsFriendsList={setIsFriendsList}
						users={users}
						setReceiver={setReceiver}
						user={user}
					/>
				</div>

				<div className="col-sm-8 conversation">
					{receiver && (
						<ChatRoom
							receiver={receiver}
							onSend={handleSendMessage}
							messages={messages}
							user={user}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
