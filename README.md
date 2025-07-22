# Lumina — Trauma & Loss Support Social Network

Lumina is a social platform designed to provide a safe, empathetic, and supportive space for sharing stories related to trauma and loss, with a focus on users in Israel. Lumina empowers users to connect anonymously or openly, discover support groups, and access mental health resources.

---

## Features

- **Post stories** about trauma and loss with options for public, private, anonymous, or friends-only visibility.
- **Tagging system** for better categorization and searching.
- **Media support**: attach images or media URLs to posts.
- **Anonymous sharing** to protect user identity.
- **User profile and display names** with privacy options.
- **AI-powered support group and one-on-one matching** (planned).
- **Private journaling** feature (planned).
- **Directory of mental health resources**.

---

## Tech Stack

- **Frontend**: React + MUI (Material-UI) for UI components
- **Backend**: Java Spring Boot with REST API
- **Database**: MongoDB for posts (document storage), MySQL for user and relational data
- **Authentication**: JWT-based auth with user claims
- **Localization**: i18next for translations (currently Hebrew and English)
- **Other**: Elasticsearch for advanced search (planned)

---

## Development Notes

- Posts are stored as documents in MongoDB, supporting flexible schema (arrays for tags, optional media URLs).
- User info and authentication data stored in MySQL.
- JWT tokens carry user claims like userId for secure API access.
- UI components follow Material Design for accessibility and responsiveness.
- Dynamic text alignment based on post language (LTR/RTL).
- Error handling and validation built into form components.

---

## Future Plans

- AI-powered support group and one-on-one matching.
- Private journals with encryption.
- Improved media upload & storage.
- Enhanced search with Elasticsearch.
- Multi-language support beyond Hebrew and English.
- Mobile app version.

---

## Contact

Project maintained by Ben Daniels  
Email: ben.daniels@example.com  
GitHub: [github.com/Ben55565/Lumina](https://github.com/Ben55565/Lumina)
