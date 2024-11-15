# Chronos

Chronos is a simple, lightweight assignment and time management tool for students. It is designed to help students keep track of their assignments and deadlines, and to help them manage their time effectively.

Chronos is built with <img src=[React] width="20" height="20"> React, <img src=[Next] width="20" height="20"> Next.js, <img src=[TypeScript] width="20" height="20"> TypeScript, <img src=[Tailwind] width="20" height="20"> Tailwind CSS, <img src=[Firebase] width="20" height="20"> Firebase, <img src=[Firebase-Firestore] width="20" height="20"> Firestore, and <img src=[Firebase-Authentication] width="20" height="20"> Firebase Authentication.

## Firestore structure

Each user has their own unique base64 ID.

```
schedules
  - userID
    - assignments
      - assignmentID
        - title
        - type
        - timestamp
        - endTimestamp
        - description
```

[//]: # (Image references for the README.md)

[Firebase]: /github/images/firebase/logo.svg
[Firebase-Firestore]: /github/images/firebase/firestore.svg
[Firebase-Authentication]: /github/images/firebase/authentication.svg
[Next]: /github/images/next/logo.svg
[React]: /github/images/react/logo.svg
[Tailwind]: /github/images/tailwind/logo.svg
[TypeScript]: /github/images/typescript/logo.svg