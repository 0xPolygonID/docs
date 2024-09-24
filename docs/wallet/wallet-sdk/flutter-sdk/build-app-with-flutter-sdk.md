---
id: build-app-with-flutter-sdk
title: Build an app with the Flutter SDK
sidebar_label: Build an app with the SDK
description: Get started with creating an app with the Flutter SDK.
keywords:
  - docs
  - optimism id
  - wallet
  - flutter
  - app
  - sdk
---

:::tip

Follow the instructions on the [<ins>Flutter docs</ins>](https://docs.flutter.dev/get-started/install) to install and get started with Flutter and the Dart programming language.

:::

Once your Flutter and Dart plugins are installed, you can start creating your first Flutter app.

1. On the Terminal or Powershell, change your directory to where you want to install your app:

   ```bash
   cd new-app-directory
   ```

2. Create your first app; let's call it "firstapp".

   ```bash
   flutter create firstapp
   flutter run
   ```

   With these commands, the Flutter SDK creates a new project from scratch.

3. Flutter creates your app.

4. Change your directory to your app:

   ```bash
   cd firstapp
   ```

:::note

In your directory, inside your app, there is a `lib` folder, which contains a `main.dart` file. This file contains the Dart code and for your own app, you will need to replace its content with your own code.

:::

## Pubspec.yaml File

In your app folder, open the `pubspec.yaml` in your editor. The `pubspec.yaml` file contains the following information about your app:

- Name of your app
- Description
- Version and build number of your app
- Environment
- Dependencies

### Add Dependencies of your app to Pubspec.yaml

Dependencies are any additional packages that your app requires to run smoothly. These dependencies can be automatically updated to the latest version by running the following command:

```bash
flutter pub upgrade --major-versions
```

To update the dependencies manually, change the dependency version number to the latest one.
