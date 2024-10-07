# Chat Flow

Chat Flow is a mobile chat application built using React Native with Expo and Firebase Real-Time Database. The app allows users to log in or register, search for friends, and start real-time conversations with them. The user interface is inspired by the clean and minimalistic design of ChatGPT.

## Features

- **User Authentication**: Users can sign up or log in securely to access the chat features.
- **Friend Search**: Users can search for other users by username to start a chat.
- **Real-Time Chat**: Messages are sent and received in real time using Firebase's Real-Time Database.
- **Clean UI**: The user interface is inspired by ChatGPT for a seamless and minimal experience.
- **Responsive Design**: Adapts to various screen sizes for an optimized user experience.

## Tech Stack

- **React Native** with Expo: For building the mobile app.
- **Firebase Real-Time Database**: For handling real-time messages between users.
- **Firebase Authentication**: For secure user login and registration.
- **Expo**: For faster development, testing, and building of the app.

## Screenshots

<img src="https://github.com/user-attachments/assets/d4723fb0-a889-408d-87ac-50a352b1fb19" width="250">
<img src="https://github.com/user-attachments/assets/4dcf0d69-0b95-48aa-a3be-2afcbe56f989" width="250">
<img src="https://github.com/user-attachments/assets/91749d0c-2ee4-4f95-b1b9-c30ce808e580" width="250">
<img src="https://github.com/user-attachments/assets/e52d2224-7f89-4089-9680-2ab3101527a3" width="250">
<img src="https://github.com/user-attachments/assets/bb8bfb04-e625-4c51-a4c4-ace7fc741153" width="250">
<img src="https://github.com/user-attachments/assets/0542816d-7646-410f-8729-d62865374552" width="250">
<img src="https://github.com/user-attachments/assets/45a4df8a-7b56-4299-8e50-511f642ade70" width="250">
<img src="https://github.com/user-attachments/assets/ea3a37d4-985b-4fa2-8ff0-b88496e84361" width="250">

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following tools installed:

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Firebase project with Real-Time Database and Authentication enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yogi0808/ChatFlow.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ChatFlow
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file to store your Firebase configuration. Add the following keys:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. Start the app:

   ```bash
   npx expo start
   ```

## Usage

1. Open the app on your device or simulator.
2. Sign up or log in with your credentials.
3. Search for friends by username.
4. Start a real-time chat with them.

## Project Structure

The project is structured into the following directories:

```
├── app/                # Contains main application logic
├── assets/             # Stores images, fonts, and other assets
├── components/         # Reusable UI components (e.g., chat bubbles, buttons)
├── constants/          # App-wide constants (e.g., colors, fonts)
├── hooks/              # Custom React hooks
├── utils/              # Utility and helper functions
├── firebase.js         # Firebase initialization and config
├── App.js              # Main entry point of the app
└── .env                # store your Firebase configuration
```
