Built with ❤️ for High Seas 2024-2025

<img src="/github/images/highseas/banner.svg" width="100" height="100"> <img src="/github/images/highseas/flag.svg" width="100" height="100">

<img src="https://img.shields.io/endpoint?url=https://waka.hackclub.com/api/compat/shields/v1/U078EKGQW2H/interval:all_time/project:chronos&label=chronos&color=blue">

# Chronos
<img src="/github/images/chronos/banner.svg" width="100">

Chronos is a simple, lightweight assignment and time management tool for students. It is designed to help students keep track of their assignments and deadlines, and to help them manage their time effectively.

Chronos is built with <img src="/github/images/next/logo.svg" width="20" height="20"> Next.js, <img src="/github/images/react/logo.svg" width="20" height="20"> React, <img src="/github/images/tailwind/logo.svg" width="20" height="20"> Tailwind CSS, and <img src="/github/images/typescript/logo.svg" width="20" height="20"> TypeScript. It uses <img src="/github/images/firebase/logo.svg" width="20" height="20"> Firebase for authentication and <img src="/github/images/firebase/firestore.svg" width="20" height="20"> Firestore for the database.

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

All rights to brand logos belong to their respective owners. This project is not affiliated with any of the brands mentioned above.
