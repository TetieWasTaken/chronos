# Chronos

Chronos is a simple, lightweight assignment and time management tool for students. It is designed to help students keep track of their assignments and deadlines, and to help them manage their time effectively.

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