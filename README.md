# Math Tools Mobile App

This is a React Native (Expo) port of the Math Tools web application.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npx expo start
    ```

3.  To run on Android Emulator:
    Press `a` in the terminal after starting expo.

4.  To run on iOS Simulator (Mac only):
    Press `i`.

## Building APK

To build an APK for Android:

1.  Install EAS CLI:
    ```bash
    npm install -g eas-cli
    ```

2.  Login to Expo:
    ```bash
    eas login
    ```

3.  Configure build:
    ```bash
    eas build:configure
    ```

4.  Build:
    ```bash
    eas build -p android --profile preview
    ```

## Project Structure

-   `src/components/ui`: Reusable UI components (Buttons, Cards, Chips, etc.) styled with NativeWind.
-   `src/screens`: Application screens.
-   `src/lib`: Core logic and helper functions.
-   `src/navigation`: Navigation configuration.
