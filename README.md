# Welcome to the DVT Weather Forecast App

# Expo App README

## Project Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```sh
   EXPO_PUBLIC_FIREBASE_API_KEY=""
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=""
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=""
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=""
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
   EXPO_PUBLIC_FIREBASE_APP_ID=""
   EXPO_PUBLIC_WEATHER_API_KEY=""
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=""
   ```
   The project owner will provide the required credentials.

### Running the App
To start the development server, run:
```sh
npm expo start
```
or
```sh
yarn expo start
```

## Folder Structure
```
.expo
app/
assets/
components/
config/
constants/
context/
interfaces/
languages/
node_modules/
plop_templates/
services/
store/
utils/
.env
.gitignore
app.json
babel.config.js
expo-env.d.ts
i18n.ts
index.js
package-lock.json
package.json
plopfile.js
README.md
tailwind.config.js
tsconfig.json
```

### Authentication
You will need to log in using the provided credentials:
```sh
Email: ""
Password: ""
```
The login details will be provided.