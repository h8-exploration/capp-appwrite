import ChatList from "../components/ChatList";
import FriendsList from "../components/FriendsList";
import { useState } from "react";
import { useEffect } from "react";
import appwrite from "../sdk/appwrite";
import ChatRoom from "../components/ChatRoom";

export default function Chat() {
	const [isFriendsList, setIsFriendsList] = useState(false);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(null);
	const [receiver, setReceiver] = useState(null);

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

	return (
		<div className="container app">
			<div className="row app-one">
				<div className="col-sm-4 side">
					<ChatList
						isFriendsList={isFriendsList}
						setIsFriendsList={setIsFriendsList}
						user={user}
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
					{receiver && <ChatRoom receiver={receiver} />}
				</div>
			</div>
		</div>
	);
}
