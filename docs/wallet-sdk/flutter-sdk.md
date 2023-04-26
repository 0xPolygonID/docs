---
id: flutter-sdk
title: Flutter SDK
sidebar_label: Flutter SDK
description: Flutter SDK is a set of tools that are built in Dart programming language and let the developers create and test apps.
keywords: 
  - docs
  - polygon id
  - holder
  - flutter sdk
  - wallet sdk
---

[Flutter SDK](https://docs.flutter.dev/) is a set of tools that are built in Dart programming language and let the developers create and test apps. It is an open-source, platform-agnostic framework that helps in building mobile apps. Flutter SDK provides a developer with CLI(Command Line Interface) tools and APIs that help built cross-platform apps. 

Flutter plug-in package helps in implementing code for a specific platform: Android/iOS/web. To know more about different types of packages and the plugins provided by Flutter, click [here](https://docs.flutter.dev/development/packages-and-plugins/developing-packages).
 
## Install Flutter SDK
 
Flutter SDK installation is available for different operating systems including Windows, macOS, Linux, and ChromeOS.
 
1. Click [here](https://docs.flutter.dev/get-started/install) to select your operating system.

2. Check for the system requirements specific to each operating system and make sure that you have all the necessary tools already installed on your system. For instance, for macOS, `git` must be pre-installed while for Windows, you need to have `git for Windows` and `Windows Powershell 5.0 or above` installed.

3. Download the installation bundle (install the latest version for stable release ) relevant to your Operating System. In the case of macOS, different bundles are available for Intel and Apple Silicon processors.

4. Extract the downloaded installation file to the desired directory on your machine. This creates a **flutter** folder in the directory. 

5. On your Terminal, change the directory to the **flutter** folder extracted in the previous step.
    ```
    cd flutter
    ```

6. To run the flutter commands, the shell you are working in must be set to the directory where your flutter binary file (.exe) is located. For this, you must first set the path:
    ```
    export PATH="$PATH:/[path where Flutter is installed]/flutter/bin"
    ```
    For example, if our extracted installation is on your Desktop, we can run the following command:
    ```
    export PATH="$PATH:/Users/username/Desktop/flutter/bin"
    ```
    where `export` sets the `PATH` on the left to the value of the `PATH` specified on the right. 

    To verify if the Path has been correctly set, we run an `echo $PATH` command:

    ```
    echo $PATH
    ```
    /opt/homebrew/bin:/opt/homebrew/sbin:/opt/local/bin:/opt/local/sbin:/Library/Frameworks/Python.framework/Versions/3.10/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Library/Apple/usr/bin:/usr/local/bin:/**Users/username/Desktop/flutter/bin**

    where the path in the bold is the intended path where we had set our path to.
 
### Using Dart with Flutter
 
Flutter apps are created using a programming language called `Dart`. An object-oriented language with similarity to C language, Dart is used for creating mobile and web applications. With Dart, Flutter apps can be developed quickly and deployed to different platforms.

**Note**: The Dart SDK comes bundled with Flutter, so if you installed Flutter, it is not required to install Dart separately. For more information on Dart, click [here](https://dart.dev).
 
### Install Flutter Plugin for Text Editors
 
Generally, developers can create a Flutter-based app using a combination of the CLI (Command Line Interface) and a text editor. The easier way is to install a plugin within the editor. The plugins for editors like Visual Studio Code, Android Studio, Emacs, and IntelliJ are available for installation. To install the plugin for both Flutter and Dart on VS Code:
 
1. Open VS Code.

2. Click **View** menu, and then click **Command Palette**.

3. On the palette, enter **Extensions**. The system displays a list of options. Select **Extensions: Install Extensions**.

4. In the **Search Extension in Markdown** box, enter **flutter**. The system displays the Flutter plugin.

Click **install**.This installs Flutter along with the Dart plugin.

## Build an App using Flutter

Once your Flutter and Dart plugins are installed, you can start creating your first Flutter app.
 
1. On the Terminal or Powershell, change your directory to where you want to install your app:
   ```
   cd new-app-directory
   ```

2. Create your first app; let's call it "firstapp".
   ```
   flutter create firstapp
   flutter run
   ```
   With these commands, the Flutter SDK creates a new project from scratch.
 
3. Flutter creates your app.
 
4. Change your directory to your app:
   ```
   cd firstapp
   ```
 
**Note**: In your directory, inside your app, there is a `lib` folder, which contains a `main.dart` file. When you click `main.dart`, it opens in your editor. This file contains the Dart code and for your own app, you will need to replace the content of this .dart file with your own code.
 
### Pubspec.yaml File
 
In your app folder, click the `pubspec.yaml` to open it in your editor. The `pubspec.yaml` file contains the following information about your app:
 
- Name of your app
- Description
- Version and build number of your app
- Environment
- Dependencies
 
#### Add Dependencies of your app to Pubspec.yaml
 
Dependencies are any additional packages that your app requires to run smoothly. These dependencies can be automatically updated to the latest version by running the following command:
 
```
flutter pub upgrade --major-versions
```
To update the dependencies manually, change the dependency version number to the latest one.
