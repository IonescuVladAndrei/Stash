# Stash

Stash is a local, lightweight encryption app built with ReactJS, Express, JSON Server, and CryptoJS. It allows users to securely encrypt and store sensitive information — such as passwords, links, or notes — directly into a JSON file on their machine.

Using AES encryption with per-entry random salt and IV, the app ensures that all stored data remains protected, even if the storage file is accessed. The password itself never gets stored inside any file (so it is not hardcoded
) and is used to derive a strong encryption key using PBKDF2, making decryption very difficult without it.

## ✨ Features

- Client-side encryption using AES-256
- Per-entry random IV and salt for strong security
- All data stored locally in a JSON file
- Interface that
  - is responsive and easy to use
  - shows toast notifications for when actions like encryption, decryption, or copying to clipboard have succeeded or failed

## 🛠 Tech Stack

-   React + Vite
-   Styled Components
-   React Hooks + Context
-   Json Server + Express + CryptoJS


| Temp |
|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=AAA) |

### Auth Page (`/auth`)

| Auth Page |
|-------------------|
| ![Auth_Page Screenshot](https://drive.google.com/uc?export=view&id=auth-page) |

This is the application's starting page, where password is entered into the key input field. I chose to use sessionStorage to store the password so that it persists across manual tab reloads, but is automatically cleared when the tab or browser window is closed.
Since multiple components in the app need access to the password, I use the useContext hook to share and retrieve it efficiently across the application.

### Tags Page (`/tags`)

| Tags Page |
|-------------------|
| ![Tags_Page Screenshot](https://drive.google.com/uc?export=view&id=tags-page) |

The app supports encrypted tags, which means that the stored data is organized more effectively. Like the data itself, all tags are encrypted for security. Tags can also include subtags, enabling a hierarchical structure for more precise categorization and filtering. When a tag is edited or deleted, all stored sensitive information associated with that tag is also automatically updated to reflect the change.

| Add Subtag | Move Tag |
|-------------------|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-options-add) | ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-options-move) | 

Tags also come with options which are adding a new subtag, moving the tag up or down in the list, and deleting it.


| Delete tag |
|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-options-delete) |

When deleting a tag, a confirmation window will be shown to prevent accidental deletion.

| Bottom Section |
|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-page-bottom) |

The bottom of the page contains the date of the last save and the save button.

| Save changes |
|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-page-bottom-2) |

Upon pressing the save button, it will be disabled and a spinner will be shown.

| Toaster |
|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-options-delete) |

Once the save is successful, a confirmation toaster will be shown and the tags, stored data and last save date will be refetched.

https://github.com/user-attachments/assets/bfb38a6e-afcf-4a6b-b7e2-30094af3ef55

When edit mode is disabled, you can hover over tags for the hierarchical structure to be highlighted.<br>
**Note:** Due to GitHub's video size limitations, the highlighting looks laggy. However, during actual use of the application, the highlighting occurs instantly and smoothly.

| Encrypted Tag |
|-------------------|
| ![Temp Screenshot](https://drive.google.com/uc?export=view&id=tags-encr) |

An example of encrypted tag and its subtags.


