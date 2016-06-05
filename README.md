![alt text](https://raw.githubusercontent.com/Johj/fapp/master/src/images/logo.png "Fapp Icon")
# Fapp
Fapp (Food app) is a new social media application that provides a platform for users to capture, share, and explore diverse experiences of foods and drinks. Whether you prefer gourmet courses, have a sweet tooth for desserts, or feel *thirsty* for fancy drinks, Fapp  will provide users with a straightforward and streamline network to satisfy their cravings.

## Table of Contents
 - [Requirements](#requirements)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Known Issues](#known-issues)
 - [Team](#team)
 - [Open Source Libraries](#open-source-libraries)
 - [License](#license)

## Requirements
**Suggested Environment**

Samsung Galaxy S6
 - Android Version 6.0 API 23
 - 3072 MB RAM
 - 1440x2560 640 dpi
 - 4 processors

## Installation
Currently, Fapp is only supported on Android. The application can be installed in two ways:

##### Running on an Emulator
1. Set up the React-Native environment following the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide.
2. `git clone https://github.com/Johj/fapp`
3. `cd fapp && npm install`
5. Open your emulator ([Genymotion](https://www.genymotion.com/) is suggested).
6. On one bash terminal, `cd` into the folder and run: `react-native start`. Leave this open in the background.
7. On another bash terminal, `cd` into the folder and run: `react-native run-android`.

##### Running the APK
1. Download the APK [here](https://github.com/Johj/fapp/raw/master/app-release.apk).
2. Give permissions to install on your device.
3. If your device denies installation due to the APK being unsigned, take steps to disable that on your device and continue with the installation.
4. The application should install and appear in your applications drawer.

## Usage
Please refer to our extensive [documentation](https://github.com/Johj/fapp/tree/master/artifacts).

**Test Account Credentials**

| User           | Email                      | Password    |
|----------------|----------------------------|-------------|
| Gary Gillespie | garypopulated@<a/>gary.com | password123 |
| Gary Gillespie | garyclean@<a/>gary.com     | password123 |
| Susan Marx     | abc@<a/>abc.com            | abc         |
| Rick Ord       | rrr@<a/>rrr.com            | rrr         |
| Taylor Swift   | tay@<a/>tay.com            | tay         |

## Known Issues
 - If the application crashes during runtime, please kindly reload the application.
 - The logout action does not take you back to the login scene. You must close the application and rerun.
 - When creating a post, filtered images render on scroll causing lag and buggy images.
 - If you encounter any other issues, please let us know [here](https://github.com/Johj/fapp/issues).

## Team

##### Team POOP (People Order Our Programs)
 - Project Manager: **[Peter Han](https://github.com/Johj)**
 - Software Development Lead: **[Andrew Han](https://github.com/andrewthehan)**
 - Quality Assurance Lead: **[RJ Dioneda](https://github.com/dionedarj)**
 - Algorithm Specialist: **[Jessica Lin](https://github.com/jessicalin216)**
 - User Interface Specialist: **[Emma Li](https://github.com/emui1155665)**
 - Software Architect: **[Vinson Gong](https://github.com/vinsongong)**
 - Business Analyst: **[Ketan Kelkar](https://github.com/krkelkar)**
 - Senior System Analyst: **[David Le](https://github.com/ledavid79)**
 - Database Specialist: **[Daniel Seong](https://github.com/thedseong)**
 - Database Specialist: **[Jonathan Shuai](https://github.com/jonathanshuai)**

## Open Source Libraries
 - [firebase 2.4.2](https://www.firebase.com/)
 - [gl-react 2.2.0](https://github.com/ProjectSeptemberInc/gl-react)
 - [gl-react-native 2.24.0](https://github.com/ProjectSeptemberInc/gl-react-native)
 - [react 0.14.8](https://github.com/facebook/react)
 - [react-native 0.25.1](https://github.com/facebook/react-native)
 - [react-native-action-button 1.1.5](https://github.com/mastermoo/react-native-action-button)
 - [react-native-animatable 0.6.0](https://github.com/oblador/react-native-animatable)
 - [react-native-image-picker 0.18.15](https://github.com/marcshilling/react-native-image-picker)
 - [react-native-radio-buttons 0.11.0](https://github.com/ArnaudRinquin/react-native-radio-buttons)
 - [react-native-scrollable-tab-view 0.4.2](https://github.com/skv-headless/react-native-scrollable-tab-view)
 - [react-native-share 1.0.10](https://github.com/EstebanFuentealba/react-native-share)
 - [react-native-slider 0.7.1](https://github.com/jeanregisser/react-native-slider)
 - [react-native-vector-icons 2.0.2](https://github.com/oblador/react-native-vector-icons)

## License
[Apache License](https://raw.githubusercontent.com/Johj/fapp/master/LICENSE)
