export default function FriendsList({
	setIsFriendsList,
	isFriendsList,
	users,
	setReceiver,
	user,
	friendIds,
	usersInput,
	setUsersInput,
}) {
	return (
		<div
			className="side-two"
			style={{
				left: isFriendsList ? "0" : "-100%",
			}}
		>
			<div
				className="row newMessage-heading"
				onClick={() => setIsFriendsList(!isFriendsList)}
			>
				<div className="row newMessage-main">
					<div className="col-sm-2 col-xs-2 newMessage-back">
						<i className="fa fa-arrow-left" aria-hidden="true"></i>
					</div>
					<div className="col-sm-10 col-xs-10 newMessage-title">New Chat</div>
				</div>
			</div>

			<div className="row composeBox">
				<div className="col-sm-12 composeBox-inner">
					<div className="form-group has-feedback">
						<input
							id="composeText"
							type="text"
							className="form-control"
							name="searchText"
							placeholder="Search People"
							onChange={(e) => setUsersInput(e.target.value)}
							value={usersInput}
						/>
						<span className="glyphicon glyphicon-search form-control-feedback"></span>
					</div>
				</div>
			</div>

			<div className="row compose-sideBar">
				{users
					.filter((el) => {
						if (el.$id !== user?.$id && friendIds.includes(el.$id) === false) {
							return true;
						} else {
							return false;
						}
					})
					.map((elem) => {
						return (
							<div
								className="row sideBar-body"
								key={elem.$id}
								onClick={() => setReceiver(elem)}
							>
								<div className="col-sm-3 col-xs-3 sideBar-avatar">
									<div className="avatar-icon">
										<img
											src={`https://i.pravatar.cc/150?u=${elem.email}`}
											alt="user-gambar"
										/>
									</div>
								</div>
								<div className="col-sm-9 col-xs-9 sideBar-main">
									<div className="row">
										<div className="col-sm-8 col-xs-8 sideBar-name">
											<span className="name-meta">{elem.name}</span>
										</div>
										<div className="col-sm-4 col-xs-4 pull-right sideBar-time">
											<span className="time-meta pull-right">18:18 </span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
