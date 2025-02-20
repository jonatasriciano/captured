
📌 Captured API - README
========================

Captured API is a **Node.js** application built with **TypeScript**, **MongoDB**, and **Docker**. It allows users to **store, classify, and search for properties** using AI-generated tags from OpenAI and Gemini LLMs.

🚀 Features
-----------

*   Property classification using AI-generated tags.
*   Import properties from a JSON file.
*   Search properties by AI-extracted tags.
*   Swagger documentation for API endpoints.
*   Dockerized setup for easy deployment.

📂 Project Structure
--------------------

├── Dockerfile

├── docker-compose.yml

├── eslint.config.mjs

├── json_upload/

│   └── properties.json

├── nodemon.json

├── package-lock.json

├── package.json

├── src/

│   ├── config/

│   │   ├── database.ts

│   │   └── swagger.ts

│   ├── controllers/

│   │   ├── classificationController.ts

│   │   └── propertyController.ts

│   ├── docs/

│   │   └── apiDocs.ts

│   ├── interfaces/

│   │   └── IProperty.ts

│   ├── models/

│   │   └── PropertyModel.ts

│   ├── routes/

│   │   ├── classificationRoutes.ts

│   │   ├── importRoutes.ts

│   │   └── propertyRoutes.ts

│   ├── server.ts

│   └── services/

│       └── classificationService.ts

└── tsconfig.json
        

⚙️ Environment Variables (\`.env\`)
-----------------------------------

The application requires a \`.env\` file in the root directory to configure database and API keys:

MONGO\_URI=mongodb://mongodb:27017/captureddb

PORT=3000

OPENAI\_API\_KEY=your\_openai\_api\_key

GEMINI\_API\_KEY=your\_gemini\_api\_key
        

🔧 Setup & Installation
-----------------------

Follow these steps to get started:

### 1️⃣ Clone the repository

git clone https://github.com/your-repo/captured.git
cd captured
        

### 2️⃣ Install dependencies

npm install
        

### 3️⃣ Run the application

docker-compose up --build -d
        

### 4️⃣ Access the API

http://localhost:3000
        

🛠️ API Endpoints
-----------------

### 1️⃣ Import Properties

**POST** `/api/import`

{
    "message": "Import completed successfully",
    "inserted": 10,
    "skipped": 3
}
        

### 2️⃣ Classify Properties

**POST** `/api/properties/classify`

{
    "message": "Properties classified successfully",
    "updated": 10,
    "skipped": 5
}
        

### 3️⃣ Add a New Property

**POST** `/api/properties`

{
    "id": "abc123",
    "titulo": "Luxury Apartment in Downtown",
    "numeroSuites": 3,
    "numeroBanheiros": 2,
    "valor": 1250000
}
        

### 4️⃣ Search Properties by AI Tags

**POST** `/api/properties/search`

{
    "questionTags": \["Modern", "Spacious", "Ocean View"\],
    "properties": \[
        {
            "property": {
                "id": "123",
                "titulo": "Luxury Apartment with Sea View",
                "tags": \["Luxury", "Modern", "Ocean View", "Spacious"\]
            },
            "score": 3
        }
    \]
}
        

📄 API Documentation (Swagger)
------------------------------

The API documentation is available at:

http://localhost:3000/api-docs
        

📌 Contribution Guide
---------------------

Contributions are welcome! Follow these steps:

1.  Fork the repository.
2.  Create a feature branch.
3.  Commit your changes following best practices.
4.  Push to the branch and create a Pull Request.

📝 License
----------

This project is licensed under the MIT License.

📧 Contact
----------

For any issues or questions, reach out at **jonatasricianotj@gmail.com**
