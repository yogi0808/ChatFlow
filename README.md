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

<img src="https://github.com/user-attachments/assets/ab337256-26fa-4676-8893-44d5ca284fd9" width="250">
<img src="https://github.com/user-attachments/assets/0dd9187e-318c-4b85-9e07-724050ef5372" width="250">
<img src="https://github.com/user-attachments/assets/f1a99e96-e56c-468c-b95f-44526259791c" width="250">
<img src="https://github.com/user-attachments/assets/d1370ad6-0eee-4819-91fa-d5559010cd1e" width="250">
<img src="https://github.com/user-attachments/assets/58f3c191-f28c-4c52-b8f7-aa6b2071f712" width="250">
<img src="https://github.com/user-attachments/assets/a9a22d65-4794-42c7-b5df-5670ab1231b3" width="250">
<img src="https://github.com/user-attachments/assets/740cd5c3-dc24-40a4-8c0f-0fee4472f3c8" width="250">

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
   expo start
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
