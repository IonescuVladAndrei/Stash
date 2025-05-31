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

## 📦 Installation
```bash
git clone https://github.com/IonescuVladAndrei/Stash.git
cd stash
npm install
npm run dev
```

Key: ``U2FsdGVkX19TFI4dB9CfqXU5fuc4yCP/k4ToLPZTBhQ=11``

## 💬 Comments & Screenshots

This section is for showcasing the features of the app. The encrypted data doesn't contain any sensitive information, however I have populated with links to websites that I find useful.

<br><br>

### Auth Page (`/auth`)

<br>

| Auth Page |
|-------------------|
| ![Auth_Page Screenshot](https://drive.google.com/uc?export=view&id=1IhmMgIUGbZ01a7FFz4247fuTaq2jI33K) |

This is the application's starting page, where password is entered into the key input field. I chose to use sessionStorage to store the password so that it persists across manual tab reloads, but is automatically cleared when the tab or browser window is closed.
Since multiple components in the app need access to the password, I use the useContext hook to share and retrieve it efficiently across the application.

<br><br>

### Tags Page (`/tags`)

<br>

| Tags Page |
|-------------------|
| ![Tags_Page Screenshot](https://drive.google.com/uc?export=view&id=1GZQF6uwAl3ZCZIny7dXOOSy0d8K8laWh) |

The app supports encrypted tags, which means that the stored data is organized more effectively. Like the data itself, all tags are encrypted for security. Tags can also include subtags, enabling a hierarchical structure for more precise categorization and filtering. When a tag is edited or deleted, all stored sensitive information associated with that tag is also automatically updated to reflect the change.

| Add Subtag | Move Tag |
|-------------------|-------------------|
| ![Add_Subtag Screenshot](https://drive.google.com/uc?export=view&id=1GbI-ubnIivv2h8x97BlZKJZHLDkSZmez) | ![Move_Tag Screenshot](https://drive.google.com/uc?export=view&id=1GgQpSA4C8DoXzv4WOAdtJs9Rsqb_RhI-) | 

Tags also come with options which are adding a new subtag, moving the tag up or down in the list, and deleting it.


| Delete Tag |
|-------------------|
| ![Delete_Tag Screenshot](https://drive.google.com/uc?export=view&id=1GjoBZsUwt0TPvz6FZALyJjtXQGfmE5SE) |

When deleting a tag, a confirmation window will be shown to prevent accidental deletion.

| Bottom Section |
|-------------------|
| ![Bottom_Section Screenshot](https://drive.google.com/uc?export=view&id=1GkUcQ1LJ8Sa4CXZtf5C8oHUItFjhgHk8) |

The bottom of the page contains the date of the last save and the save button.

| Save Changes |
|-------------------|
| ![Save_Changes Screenshot](https://drive.google.com/uc?export=view&id=1GlbG_dzvKGXoAN7Ll5qfagPoWS3MuERH) |

Upon pressing the save button, it will be disabled and a spinner will be shown.

| Toaster |
|-------------------|
| ![Toaster Screenshot](https://drive.google.com/uc?export=view&id=1Gs7ym7sD_uQF-D3sDMqMBe9h7CKpByq3) |

Once the save is successful, a confirmation toaster will be shown and the tags, stored data and last save date will be refetched.

https://github.com/user-attachments/assets/bfb38a6e-afcf-4a6b-b7e2-30094af3ef55

When edit mode is disabled, you can hover over tags for the hierarchical structure to be highlighted.<br>
**Note:** Due to GitHub's video size limitations, the highlighting looks laggy. However, during actual use of the application, the highlighting occurs instantly and smoothly.

| Encrypted Tag |
|-------------------|
| ![Encrypted_Tag Screenshot](https://drive.google.com/uc?export=view&id=1GtYMFM2gtyr3CgDiGIn0b3qiWHFJ09Bd) |

An example of encrypted tag and its subtags.

| Incorrect Key |
|-------------------|
| ![Incorrect_Key Screenshot](https://drive.google.com/uc?export=view&id=1GvidDy1IytpDHpBOhkSV3xvgGfJySg_-) |

When the provided password (key) is incorrect, the backend still returns the data, but it's not decrypted.

<br><br>

### Data Page (`/data`)

<br>

| Data Page |
|-------------------|
| ![Data Screenshot](https://drive.google.com/uc?export=view&id=1Gtw4EWjYjusi2E4K8eYkY_FfVLt62sUa) |

This is the page for viewing your encrypted data. At the top, there’s a filtering section with a text input and a multiselect for tags. The search functionality is designed so that results update after pressing the blue search button (typing alone does not trigger a live search). However the live search does get triggered if the multiselect is changed or if the delete button gets pressed.

| Multiselect |
|-------------------|
| ![Multiselect Screenshot](https://drive.google.com/uc?export=view&id=1H1d-hYfquHfNVCwEZxAUEFwyiIiDTLzM) |

When a tag with child tags is selected, an additional multiselect is rendered below it, allowing you to choose from its child tags.

| Multiselect |
|-------------------|
| ![Multiselect Screenshot](https://drive.google.com/uc?export=view&id=1H8FtpzKlomrGVbuL-Ibj68mCX5Y8QZyy) |

The fetched data must match all of the selected tags, meaning the filter uses an "AND" relationship (only entries containing every selected tag will be returned). Removing a tag from the middle of the hierarchy will also remove all of its child tags. So, deleting "Colors" will also delete "Tools" and "Shades". 

| Adding Data |
|-------------------|
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1H90YcD1RmO8o3QrXaEN9vTdgEPEc1_Uq) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HFwPpRQljLcQDfxIWpAmg6ioPOQy8nhn) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HQ6-8PbRJzdAQs7on9lDTGwQknsaJffr) |

The middle of the page contains the date of the last save and a button for a new entry. The button opens the same modal that is used for editing an entry and contains 3 rows, one for name, one for tags (which will render additional multiselects if child tags exist) and one for additial values (with the ability of adding, moving up or down and deleting).

| Adding Data |
|-------------------|
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HVxaM16W3-9xP7L0eaAGIiQ77P44Yqln) |

When the submit button is pressed, the modal closes, the data is sent to the JSON server for encryption and storage, and the data list is then refetched (with matching toast notifications). 

| Editing Data |
|-------------------|
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HZI4NMcJInNCxt9b7bNWkYPkMaRAoGU-) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HdiE_6cj5onDFW-d4zVAL6XDZzer0MdP) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HkEzEkSHqnmMhguay1hDOcz34-gIT-Qo) |
| ![Adding_Data Screenshot](https://drive.google.com/uc?export=view&id=1HfZ-w5rIfujnWGsYK87buCZdSMZTwic9) |

Each entry can be edited or deleted. Clicking the delete button opens a confirmation dialog, while clicking the edit button displays a modal window with the reused form from adding an entry.

| Copying Data |
|-------------------|
| ![Copying_Data Screenshot](https://drive.google.com/uc?export=view&id=1HxTDLi8wVlrvUcODFCRIOyXpoSxFbyVP) |

Copying values (such as a link) is made easier with a button that appears when you hover over the text.

| Rendering Data List |
|-------------------|
| ![Rendering_Data_List Screenshot](https://drive.google.com/uc?export=view&id=1I76kTZZwBWWEegBxGrTHkIzuN0R-w7Ad) |

The list is rendered using the `useInfiniteQuery` hook in combination with the `react-intersection-observer` library, which is used to implement an infinite scroll that loads more data as the bottom of the page is reached.

| Encrypted Data |
|-------------------|
| ![Encrypted_Tag Screenshot](https://drive.google.com/uc?export=view&id=1IBb0v52XcQsPEyaa9zjFM8OFicc_EGxD) |
An example of encrypted data.

<br><br>

### Decrypt & Encrypt Page (`/decrypt-encrypt`)

<br>

| Decrypt & Encrypt Data and Tags |
|-------------------|
| ![Decrypt_&_Encrypt_Data_and_Tags Screenshot](https://drive.google.com/uc?export=view&id=1IDFdt9cdPx9ODtIXSOgowAYgSgIaUGB0) |

This page is for decrypting using the current key both data and tags and then encrypting with the new key. It will also cause for all data to be refetched.

### UI Responsiveness

The application is also fit for mobile devices even though it wasn't part of the scope.

| Auth Page |
|-------------------|
| ![Auth_Page Screenshot](https://drive.google.com/uc?export=view&id=1IEvbktrq8_dOhD9oYF6tYv5aKjolxopX) |


| Tags Page |
|-------------------|
| ![Tags_Page Screenshot](https://drive.google.com/uc?export=view&id=1IK1yMWSV6-rIgw8TmsKt0lQv2u4Y1NkQ) |

| Encrypt Decrypt Page |
|-------------------|
| ![Encrypt_Decrypt_Page Screenshot](https://drive.google.com/uc?export=view&id=1IO1WGRPcB1DHxaYmoYfiH99kHl_tDGY3) |

| Data Page Top | Data Page List |
|-------------------|-------------------|
| ![Data Page Top Screenshot](https://drive.google.com/uc?export=view&id=1IYP1VQGpTx7TwL-YOxFoq_M7w-cBmUxd) | ![Data Page List Screenshot](https://drive.google.com/uc?export=view&id=1IgJAqz2tgnYExYuixwHlUgN6QSb2Rp3Q) |

On small screens (mobile), in order to adapt the copy functionality, the paragraph needs to be tapped to show its coresponding copy button.

| Modal Tags Scroll | Modal Other Scroll |
|-------------------|-------------------|
| ![Modal Tags Scroll Screenshot](https://drive.google.com/uc?export=view&id=1IcdmTMNQSdxL_T-zgGFKyEjVY_2AfxER) | ![Modal Other Scroll Screenshot](https://drive.google.com/uc?export=view&id=1Id6zC3oBIfezyVW1g3ay59TwhAumaVND) |

| Confirm Action |
|-------------------|
| ![Confirm Action Screenshot](https://drive.google.com/uc?export=view&id=1GWNx3eAZ_d74uXrbekMgkR727FasVkNp) |










