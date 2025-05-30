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

## 💬 Comments & Screenshots

This section is for showcasing the features of the app. The encrypted data doesn't contain any sensitive information, however I have populated with links to websites that I find useful.

<br><br>

### Auth Page (`/auth`)

<br>

| Auth Page |
|-------------------|
| ![Auth_Page Screenshot](https://drive.google.com/uc?export=view&id=auth-page) |

This is the application's starting page, where password is entered into the key input field. I chose to use sessionStorage to store the password so that it persists across manual tab reloads, but is automatically cleared when the tab or browser window is closed.
Since multiple components in the app need access to the password, I use the useContext hook to share and retrieve it efficiently across the application.

<br><br>

### Tags Page (`/tags`)

<br>

| Tags Page |
|-------------------|
| ![Tags_Page Screenshot](https://drive.google.com/uc?export=view&id=tags-page) |

The app supports encrypted tags, which means that the stored data is organized more effectively. Like the data itself, all tags are encrypted for security. Tags can also include subtags, enabling a hierarchical structure for more precise categorization and filtering. When a tag is edited or deleted, all stored sensitive information associated with that tag is also automatically updated to reflect the change.

| Add Subtag | Move Tag |
|-------------------|-------------------|
| ![Add_Subtag Screenshot](https://drive.google.com/uc?export=view&id=tags-options-add) | ![Move_Tag Screenshot](https://drive.google.com/uc?export=view&id=tags-options-move) | 

Tags also come with options which are adding a new subtag, moving the tag up or down in the list, and deleting it.


| Delete Tag |
|-------------------|
| ![Delete_Tag Screenshot](https://drive.google.com/uc?export=view&id=tags-options-delete) |

When deleting a tag, a confirmation window will be shown to prevent accidental deletion.

| Bottom Section |
|-------------------|
| ![Bottom_Section Screenshot](https://drive.google.com/uc?export=view&id=tags-page-bottom) |

The bottom of the page contains the date of the last save and the save button.

| Save Changes |
|-------------------|
| ![Save_Changes Screenshot](https://drive.google.com/uc?export=view&id=tags-page-bottom-2) |

Upon pressing the save button, it will be disabled and a spinner will be shown.

| Toaster |
|-------------------|
| ![Toaster Screenshot](https://drive.google.com/uc?export=view&id=tags-options-delete) |

Once the save is successful, a confirmation toaster will be shown and the tags, stored data and last save date will be refetched.

https://github.com/user-attachments/assets/bfb38a6e-afcf-4a6b-b7e2-30094af3ef55

When edit mode is disabled, you can hover over tags for the hierarchical structure to be highlighted.<br>
**Note:** Due to GitHub's video size limitations, the highlighting looks laggy. However, during actual use of the application, the highlighting occurs instantly and smoothly.

| Encrypted Tag |
|-------------------|
| ![Encrypted_Tag Screenshot](https://drive.google.com/uc?export=view&id=tags-encr) |

An example of encrypted tag and its subtags.

| Incorrect Key |
|-------------------|
| ![Incorrect_Key Screenshot](https://drive.google.com/uc?export=view&id=tags-wrong-key) |

When the provided password (key) is incorrect, the backend still returns the data, but it's not decrypted.

<br><br>

### Data Page (`/data`)

<br>

| Data Page |
|-------------------|
| ![Data Screenshot](https://drive.google.com/uc?export=view&id=data-page) |

This is the page for viewing your encrypted data. At the top, there’s a filtering section with a text input and a multiselect for tags. The search functionality is designed so that results update after pressing the blue search button (typing alone does not trigger a live search). However the live search does get triggered if the multiselect is changed or if the delete button gets pressed.

| Multiselect |
|-------------------|
| ![Multiselect Screenshot](https://drive.google.com/uc?export=view&id=data-page-2) |

When a tag with child tags is selected, an additional multiselect is rendered below it, allowing you to choose from its child tags.

| Multiselect |
|-------------------|
| ![Multiselect Screenshot](https://drive.google.com/uc?export=view&id=data-page-3) |

The fetched data must match all of the selected tags, meaning the filter uses an "AND" relationship (only entries containing every selected tag will be returned). Removing a tag from the middle of the hierarchy will also remove all of its child tags. So, deleting "Colors" will also delete "Tools" and "Shades". 

| Adding Data |
|-------------------|
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-new-1) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-new-2) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-new-3) |

The middle of the page contains the date of the last save and a button for a new entry. The button opens the same modal that is used for editing an entry and contains 3 rows, one for name, one for tags (which will render additional multiselects if child tags exist) and one for additial values (with the ability of adding, moving up or down and deleting).

| Adding Data |
|-------------------|
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-new-4) |

When the submit button is pressed, the modal closes, the data is sent to the JSON server for encryption and storage, and the data list is then refetched (with matching toast notifications). 

| Editing Data |
|-------------------|
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-edit-1) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-edit-2) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-edit-3) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=data-edit-4) |

Each entry can be edited or deleted. Clicking the delete button opens a confirmation dialog, while clicking the edit button displays a modal window with the reused form from adding an entry.

| Copying Data |
|-------------------|
| ![Copying_Data Screenshot](https://drive.google.com/uc?export=view&id=data-copy) |

Copying values (such as a link) is made easier with a button that appears when you hover over the text.

| Rendering Data List |
|-------------------|
| ![Rendering_Data_List Screenshot](https://drive.google.com/uc?export=view&id=data-list) |

The list is rendered using the `useInfiniteQuery` hook in combination with the `react-intersection-observer` library, which is used to implement an infinite scroll that loads more data as the bottom of the page is reached.

| Encrypted Data |
|-------------------|
| ![Encrypted_Tag Screenshot](https://drive.google.com/uc?export=view&id=data-encr) |

An example of encrypted data.

<br><br>

### Decrypt & Encrypt Page (`/decrypt-encrypt`)

<br>

| Decrypt & Encrypt Data and Tags |
|-------------------|
| ![Decrypt_&_Encrypt_Data_and_Tags Screenshot](https://drive.google.com/uc?export=view&id=decrypt-encrypt-page) |

This page is for decrypting using the current key both data and tags and then encrypting with the new key. It will also cause for all data to be refetched.

### UI Responsiveness

The application is also fit for mobile devices even though it wasn't part of the scope.

| Auth Page |
|-------------------|
| ![Auth_Page Screenshot](https://drive.google.com/uc?export=view&id=small-auth) |


| Tags Page |
|-------------------|
| ![Tags_Page Screenshot](https://drive.google.com/uc?export=view&id=small-tags) |

| Encrypt Decrypt Page |
|-------------------|
| ![Encrypt_Decrypt_Page Screenshot](https://drive.google.com/uc?export=view&id=small-decrypt-encrypt) |

| Data Page Top | Data Page List |
|-------------------|-------------------|
| ![Data Page Top Screenshot](https://drive.google.com/uc?export=view&id=small-data-1) | ![Data Page List Screenshot](https://drive.google.com/uc?export=view&id=small-data-4) |

On small screens (mobile), in order to adapt the copy functionality, the paragraph needs to be tapped to show its coresponding copy button.

| Modal Tags Scroll | Modal Other Scroll |
|-------------------|-------------------|
| ![Modal Tags Scroll Screenshot](https://drive.google.com/uc?export=view&id=small-data-2) | ![Modal Other Scroll Screenshot](https://drive.google.com/uc?export=view&id=small-data-3) |

| Confirm Action |
|-------------------|
| ![Confirm Action Screenshot](https://drive.google.com/uc?export=view&id=small-data-5) |










