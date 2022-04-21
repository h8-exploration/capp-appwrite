import { useState } from "react";
import dayjs from "dayjs";

export default function ChatRoom({ receiver, onSend, messages, user }) {
	const [text, setText] = useState("");

	const handleSend = () => {
		if (text === "") {
			return alert("pesan tidak boleh kosong");
		}
		onSend({ text });
		setText("");
	};

	return (
		<>
			<div className="row heading">
				<div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
					<div className="heading-avatar-icon">
						<img src={`https://i.pravatar.cc/150?u=${receiver?.email}`} />
					</div>
				</div>
				<div className="col-sm-8 col-xs-7 heading-name">
					<a className="heading-name-meta">{receiver?.name} </a>
					<span className="heading-online">Online</span>
				</div>
				<div className="col-sm-1 col-xs-1  heading-dot pull-right">
					<i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
				</div>
			</div>

			<div className="row message" id="conversation">
				<div className="row message-previous">
					<div className="col-sm-12 previous">
						<a id="ankitjain28" name="20">
							Show Previous Message!
						</a>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column-reverse" }}>
					{messages.map((message, index) => {
						if (message?.userId === user?.$id) {
							return (
								<div className="row message-body" key={index}>
									<div
										className="col-sm-12 message-main-sender"
										style={{ height: "auto" }}
									>
										<div className="sender">
											<div className="message-text">{message?.text}</div>
											<span className="message-time pull-right">
												{dayjs(message?.createdAt).format("ddd. HH:mm")}
											</span>
										</div>
									</div>
								</div>
							);
						}

						return (
							<div className="row message-body" key={index}>
								<div
									className="col-sm-12 message-main-receiver"
									style={{ height: "auto" }}
								>
									<div className="receiver">
										<div className="message-text">{message?.text}</div>
										<span className="message-time pull-right">
											{dayjs(message?.createdAt).format("ddd. HH:mm")}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="row reply">
				<div className="col-sm-1 col-xs-1 reply-emojis">
					<i className="fa fa-smile-o fa-2x"></i>
				</div>
				<div className="col-sm-9 col-xs-9 reply-main">
					<textarea
						className="form-control"
						rows="1"
						id="comment"
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
				</div>
				<div className="col-sm-1 col-xs-1 reply-recording">
					<i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
				</div>
				<div className="col-sm-1 col-xs-1 reply-send" onClick={handleSend}>
					<i className="fa fa-send fa-2x" aria-hidden="true"></i>
				</div>
			</div>
		</>
	);
}
