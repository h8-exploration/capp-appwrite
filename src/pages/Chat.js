import ChatList from "../components/ChatList";
import FriendsList from "../components/FriendsList";
import { useState } from "react";

export default function Chat() {
	const [isFriendsList, setIsFriendsList] = useState(false);

	return (
		<div className="container app">
			<div className="row app-one">
				<div className="col-sm-4 side">
					<ChatList
						isFriendsList={isFriendsList}
						setIsFriendsList={setIsFriendsList}
					/>
					<FriendsList
						isFriendsList={isFriendsList}
						setIsFriendsList={setIsFriendsList}
					/>
				</div>

				<div className="col-sm-8 conversation">
					<div className="row heading">
						<div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
							<div className="heading-avatar-icon">
								<img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
							</div>
						</div>
						<div className="col-sm-8 col-xs-7 heading-name">
							<a className="heading-name-meta">John Doe </a>
							<span className="heading-online">Online</span>
						</div>
						<div className="col-sm-1 col-xs-1  heading-dot pull-right">
							<i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
						</div>
					</div>

					<div className="row message" id="conversation">
						<div className="row message-previous">
							<div className="col-sm-12 previous">
								<a onclick="previous(this)" id="ankitjain28" name="20">
									Show Previous Message!
								</a>
							</div>
						</div>

						<div className="row message-body">
							<div className="col-sm-12 message-main-receiver">
								<div className="receiver">
									<div className="message-text">Hi, what are you doing?!</div>
									<span className="message-time pull-right">Sun</span>
								</div>
							</div>
						</div>

						<div className="row message-body">
							<div className="col-sm-12 message-main-sender">
								<div className="sender">
									<div className="message-text">I am doing nothing man!</div>
									<span className="message-time pull-right">Sun</span>
								</div>
							</div>
						</div>
					</div>

					<div className="row reply">
						<div className="col-sm-1 col-xs-1 reply-emojis">
							<i className="fa fa-smile-o fa-2x"></i>
						</div>
						<div className="col-sm-9 col-xs-9 reply-main">
							<textarea className="form-control" rows="1" id="comment"></textarea>
						</div>
						<div className="col-sm-1 col-xs-1 reply-recording">
							<i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
						</div>
						<div className="col-sm-1 col-xs-1 reply-send">
							<i className="fa fa-send fa-2x" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
