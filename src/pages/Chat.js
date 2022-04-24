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
	const [usersFiltered, setUsersFiltered] = useState([]);
	const [usersInput, setUsersInput] = useState("");
	const [user, setUser] = useState(null);
	const [receiver, setReceiver] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState(null);
	const [friendIds, setFriendIds] = useState([]);
	const [friends, setFriends] = useState([]);
	const [friendsFiltered, setFriendsFiltered] = useState([]);
	const [friendsInput, setFriendsInput] = useState("");

	useEffect(() => {
		appwrite.subscribe(
			[`collections.${process.env.REACT_APP_CHATS_COLLECTION_ID}.documents`],
			(response) => {
				setNewMessage(response.payload);
			}
		);
	}, []);

	useEffect(() => {
		if (newMessage) {
			if (
				newMessage.userIds.includes(user.$id) &&
				newMessage.userIds.includes(receiver.$id)
			) {
				setMessages([newMessage, ...messages]);
			}
		}
		// eslint-disable-next-line
	}, [newMessage]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_CUSTOM_SERVER_ENDPOINT}/users`)
			.then((resp) => resp.json())
			.then((data) => {
				setUsers(data.users);
				setUsersFiltered(data.users);
			})
			.catch((err) => {
				console.log("🚀 ~ file: Chat.js ~ line 15 ~ useEffect ~ err", err);
			});
	}, []);

	useEffect(() => {
		const _friendIds = friendIds.join();
		if (_friendIds !== "") {
			fetch(
				`${process.env.REACT_APP_CUSTOM_SERVER_ENDPOINT}/users?friendIds=${_friendIds}`
			)
				.then((resp) => resp.json())
				.then((data) => {
					setFriends(data.users);
					setFriendsFiltered(data.users);
				})
				.catch((err) => {
					console.log("🚀 ~ file: Chat.js ~ line 15 ~ useEffect ~ err", err);
				});
		}
	}, [friendIds]);

	useEffect(() => {
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
			let promise = appwrite.database.listDocuments(
				process.env.REACT_APP_FRIENDS_COLLECTION_ID,
				[Query.search("userId", [user?.$id])]
			);
			promise.then(
				function(response) {
					const _friendIds = response.documents.map((doc) => doc.friendId);
					setFriendIds(_friendIds);
				},
				function(error) {
					console.log(error); // Failure
				}
			);
		}
	}, [user]);

	useEffect(() => {
		if (receiver) {
			if (!friendIds.includes(receiver.$id)) {
				let promise = appwrite.database.createDocument(
					process.env.REACT_APP_FRIENDS_COLLECTION_ID,
					"unique()",
					{
						friendId: receiver?.$id,
						userId: user?.$id,
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

				let promise2 = appwrite.database.createDocument(
					process.env.REACT_APP_FRIENDS_COLLECTION_ID,
					"unique()",
					{
						friendId: user?.$id,
						userId: receiver?.$id,
						createdAt: new Date(),
					},
					["role:all"],
					["role:all"]
				);
				promise2.then(
					function(response) {},
					function(error) {
						console.log(
							"🚀 ~ file: Chat.js ~ line 118 ~ handleSendMessage ~ error",
							error
						);
					}
				);
				setFriends([...friends, receiver]);
				setFriendsFiltered([...friendsFiltered, receiver]);
				setUsers(users.filter((el) => el.$id !== receiver.$id));
				setUsersFiltered(users.filter((el) => el.$id !== receiver.$id));
			}
		}
		// eslint-disable-next-line
	}, [receiver]);

	useEffect(() => {
		if (user && receiver) {
			let promise = appwrite.database.listDocuments(
				process.env.REACT_APP_CHATS_COLLECTION_ID,
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
		// eslint-disable-next-line
	}, [receiver]);

	useEffect(() => {
		const _usersFiltered = users.filter(
			(item) => item.name.toLowerCase().indexOf(usersInput) >= 0
		);
		setUsersFiltered(_usersFiltered);
		// eslint-disable-next-line
	}, [usersInput]);

	useEffect(() => {
		const _friendsFiltered = friends.filter(
			(item) => item.name.toLowerCase().indexOf(friendsInput) >= 0
		);
		setFriendsFiltered(_friendsFiltered);
		// eslint-disable-next-line
	}, [friendsInput]);

	const handleSendMessage = (payload) => {
		let promise = appwrite.database.createDocument(
			process.env.REACT_APP_CHATS_COLLECTION_ID,
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
						users={friendsFiltered}
						setReceiver={setReceiver}
						friendsInput={friendsInput}
						setFriendsInput={setFriendsInput}
					/>
					<FriendsList
						isFriendsList={isFriendsList}
						setIsFriendsList={setIsFriendsList}
						users={usersFiltered}
						friendIds={friendIds}
						setReceiver={setReceiver}
						user={user}
						usersInput={usersInput}
						setUsersInput={setUsersInput}
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
