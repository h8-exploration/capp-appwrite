# CAPP - Realtime Chat App

CAPP App is a web based realtime chat application. It has some features like realtime chat, add friend, search people, search chat, protected route, and login using google account.

This application is built using React.js for the frontend, Boostrap for the CSS framework, Appwrite for data storage and realtime features and express.js for custom servers as needed.

The inspiration behind the making of this application is whatsapp so that it looks similar to whatsapp.

## Installation and Setup

### Appwrite

1. Install & running AppWrite on your machine. You can follow this [instruction](https://appwrite.io/docs/installation)

2. Create Appwrite Project

3. Create API keys

4. Create Database collection `chats` and `friends` with following attributes

```
friends:
  userId: String,
  friendId: String,
  createdAt: String


chats:
  userIds: [String]
  userId: String,
  text: String,
  createdAt: String
```

5. Create indexes for `chats` and `friends` collections

```
friends:
  Index Key: userId
  type: fulltext
  attributes: userId (ASC)

chats:
  Index Key: userIds
  type: fulltext
  attributes: userIds (ASC)
```

6. Set `friends` and `chats` collection permission

- Type: Collection Level
- Read Access: `role: all`
- Write Access: `role: all`

7. Enable Google OAuth2 Providers

&nbsp;

### Server

1. On root directory run this command

```
$ cd server
```

2. Install all dependencies

```
$ npm install
```

3. Set environment variables
4. Run server app

```
$ npm Start
```

&nbsp;

### Client

1. On root directory run this command

```
$ cd client
```

2. Install all dependencies

```
$ npm install
```

3. Set environment variables
4. Running client app

```
$ npm Start
```
