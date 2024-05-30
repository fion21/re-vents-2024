## Revents 2024 Udemy Course

**Project Purpose:**
This project was built to practice my ReactJS, Redux and Firebase Skill. It is a website to create and join events with full CRUD funtionalities. The project use Redux for state management and Firebase firestore to store data at backend.

This is my second attempt at the project as I have a previous edition on this account as well, however this has been a great refresher.

## Skills Used
ReactJS
Vite
Typescript
React Router
Semantic UI React
React Hooks
Redux
Firebase Authentication
Firebase Firestore
Firebase Functions
Here Maps
Formik(to manage forms)

*** End of Section 5 ***
- createBrowserRouter()
- `<Outlet />`
-  NavLink
- Link
- useLocation()

*** End of Section 6 ***
- redux
- Scratch folder (test redux)

*** End of Section 7 ***
- React-hook-form
- auth, modal
- login, pw, regex, reducer

An exercise followed from Neil Cummings' React, Redux and Firestore course. It is a social event app.

## Installation notes

Since I have excluded the API key, the project won't work directly as you install it. You need to create three files: env.js, keys.js, and firebase.js

### About env.js

This file should be in the /public/ folder. It will have the following code:

```javascript
const googleMaps = document.getElementById('googleMaps')

googleMaps.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places'
```

Change the YOUR_API_KEY_HERE part with your actual API key.

### About keys.js

This file should be in the /src/app/config/ folder. It will have the following code:

```javascript
export const GOOGLE_MAPS = 'YOUR_API_KEY_HERE'
```

Change the YOUR_API_KEY_HERE part with your actual API key.

### About firebase.js

This file should be in the /src/app/config/ folder. It will have the following code:

```javascript
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
```

Change the strings with your actual app credentials. You can obtain them from the project settings.

### Firestore rules

The following rules are applied to the Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
    	allow read: if isSignedIn();
      allow update, create: if request.auth.uid == userId;
      match /photos/{document=**} {
      	allow read: if isSignedIn();
        allow write: if request.auth.uid == userId;
      }
    }
    match /following/{userId}/{document=**} {
    	allow read: if isSignedIn();
      allow write: if request.auth.uid == userId;
      allow update: if resource.id == request.auth.uid;
    }
    match /events/{document=**} {
    	allow read, list;
      allow update: if isHost();
      allow update: if isSignedIn() && updateAttendeeFieldsOnly();
      allow create: if isSignedIn();
    }
  }
}

function isSignedIn() {
	return request.auth.uid != null;
}

function isHost() {
	return isSignedIn() && resource.data.hostUid == request.auth.uid;
}

function updateAttendeeFieldsOnly() {
	return incomingData().diff(existingData()).changedKeys().hasOnly(['attendeeIds', 'attendees'])
}

function existingData() {
	return resource.data;
}

function incomingData() {
	return request.resource.data;
}
```
