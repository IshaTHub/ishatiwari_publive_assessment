🗳️ Election Management System (CMS Module)

    This project implements a scalable Election Module inside a CMS, supporting elections, constituencies, political parties, candidates, and results.
    It demonstrates data modeling, relationships, API design, and frontend consumption using a working React application.


📌 Problem Statement

    Design an Election Module inside a CMS with:

    Minimum required CMS entities

    Clear relationships between entities

    Sample API responses

    Frontend pages consuming the CMS data

    Scalability for future elections

🏗️ High-Level Architecture

    Frontend: React (Vite)

    Routing: React Router

    State Management: React Context

    API Layer: Mock CMS API service (can be replaced with real backend)

    Rendering Strategy:

    CSR for admin workflows

    SSR-ready structure for public election pages

📂 CMS Entity Design
1️⃣ Election

Represents a single election event.

    | Field               | Type                | Description          |
    | ------------------- | ------------------- | -------------------- |
    | id                  | number              | Unique identifier    |
    | name                | string              | Election name        |
    | date                | string (YYYY-MM-DD) | Election date        |
    | status              | string              | upcoming / completed |
    | constituenciesCount | number              | Derived field        |


2️⃣ Constituency

Geographical region under an election.

    | Field       | Type   | Description       |
    | ----------- | ------ | ----------------- |
    | id          | number | Unique identifier |
    | code        | string | Constituency code |
    | name        | string | Constituency name |
    | electionId  | number | Linked election   |
    | totalVoters | number | Registered voters |


3️⃣ Party

    | Field | Type   | Description       |
    | ----- | ------ | ----------------- |
    | id    | number | Unique identifier |
    | name  | string | Party name        |
    | abbr  | string | Abbreviation      |
    | color | string | Party color       |


4️⃣ Candidate

Candidate contesting in a constituency.

    | Field          | Type   | Description         |
    | -------------- | ------ | ------------------- |
    | id             | number | Unique identifier   |
    | name           | string | Candidate name      |
    | partyId        | number | Linked party        |
    | constituencyId | number | Linked constituency |
    | age            | number | Candidate age       |
    | bio            | string | Short description   |


5️⃣ Result

Stores voting outcome.

    | Field          | Type    | Description            |
    | -------------- | ------- | ---------------------- |
    | id             | number  | Unique identifier      |
    | candidateId    | number  | Candidate reference    |
    | constituencyId | number  | Constituency reference |
    | votes          | number  | Votes received         |
    | winner         | boolean | Winner flag            |


🔗 Entity Relationships
Election
 ├── Constituencies (1:N)
 │    ├── Candidates (1:N)
 │    │    └── Party (N:1)
 │    └── Results (1:N)


One Election has many Constituencies

One Constituency has many Candidates

One Candidate belongs to one Party

Results link candidates and constituencies

🔌 Sample CMS API Response
Election Detail API (Aggregated)
{
  "id": 1,
  "name": "2024 General Election",
  "date": "2024-11-05",
  "status": "completed",
  "constituencies": [
    {
      "id": 1,
      "code": "NORTH-01",
      "name": "North District",
      "totalVoters": 50000
    }
  ],
  "candidates": [
    {
      "id": 1,
      "name": "John Smith",
      "party": "Democratic Party",
      "partyColor": "#0066cc",
      "constituencyId": 1
    }
  ],
  "results": [
    {
      "candidateId": 1,
      "votes": 25000,
      "winner": true
    }
  ]
}

🖥️ Frontend Pages & Routing
| Page            | URL              | Rendering       |
| --------------- | ---------------- | --------------- |
| CMS Dashboard   | `/dashboard`     | CSR             |
| Elections List  | `/elections`     | CSR             |
| Election Detail | `/elections/:id` | CSR (SSR-ready) |


🧭 Application Flow

1. CMS Admin

    -Manage elections, constituencies, parties, candidates, and results via CRUD dashboard

2. Public View

    -Users view elections list

    -Click an election to see all related data

3. Data Resolution

    -Election ID drives loading of constituencies

    -Constituencies drive candidates and results

⚙️ State Management

    Global election state handled using React Context

    Current election stored centrally for cross-page access

    API layer abstracted to allow backend replacement

🚀 Scalability Considerations

    Supports multiple elections without schema changes

    Entity relationships are ID-based

    API layer can be replaced with:

    REST CMS (Strapi, Directus)

    GraphQL

    SSR-compatible routing for SEO-critical pages

    Additional entities (alliances, regions, phases) can be added easily

▶️ Running the Project Locally
    npm install
    npm run dev

The application runs locally using a mock CMS API.


✅ Summary

    This project demonstrates:

    CMS-style data modeling

    Clean separation of entities

    Relationship-driven frontend rendering

    Scalable election architecture

    Production-ready structure with minimal complexity# ishatiwari_publive_assessment
