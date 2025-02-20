/**
 * @swagger
 * tags:
 *   - name: Properties
 *     description: Endpoints related to properties
 *   - name: Search
 *     description: Search for properties using tags
 *   - name: Import
 *     description: Import property data from a JSON file
 */

/**
 * @swagger
 * /api/import:
 *   post:
 *     summary: Import properties from a JSON file
 *     description: Reads a file from `json_upload/properties.json` and inserts properties into the database.
 *     tags:
 *       - Import
 *     responses:
 *       200:
 *         description: Successfully imported properties
 *         content:
 *           application/json:
 *             example:
 *               message: "Import completed successfully"
 *               inserted: 10
 *               skipped: 3
 *       400:
 *         description: Bad request - File not found or invalid JSON format
 *         content:
 *           application/json:
 *             examples:
 *               FileNotFound:
 *                 summary: File not found
 *                 value:
 *                   error: "File not found in json_upload directory."
 *               InvalidJSON:
 *                 summary: Invalid JSON format
 *                 value:
 *                   error: "Invalid JSON format. Expected an array of properties."
 *               EmptyJSON:
 *                 summary: JSON file is empty
 *                 value:
 *                   error: "JSON file is empty."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/properties/classify:
 *   post:
 *     summary: Classify all properties without tags
 *     description: Automatically assigns tags to properties that do not have any.
 *     tags:
 *       - Properties
 *     responses:
 *       200:
 *         description: Successfully classified properties
 *         content:
 *           application/json:
 *             example:
 *               message: "Properties classified successfully"
 *               updated: 10
 *               skipped: 5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Add a new property
 *     description: Inserts a new property into the database.
 *     tags:
 *       - Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - numeroSuites
 *               - numeroBanheiros
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Apartamento de Luxo no Centro"
 *               numeroSuites:
 *                 type: integer
 *                 example: 3
 *               numeroBanheiros:
 *                 type: integer
 *                 example: 2
 *               valor:
 *                 type: number
 *                 example: 1250000
 *     responses:
 *       201:
 *         description: Property successfully created
 *         content:
 *           application/json:
 *             example:
 *               id: "abc123"
 *               titulo: "Apartamento de Luxo no Centro"
 *               numeroSuites: 3
 *               numeroBanheiros: 2
 *               valor: 1250000
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/properties/search:
 *   post:
 *     summary: Get properties based on a user's question
 *     description: Extracts tags from the user's question and finds matching properties.
 *     tags:
 *       - Search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Estou procurando um apartamento moderno e espaçoso com vista para o mar."
 *     responses:
 *       200:
 *         description: List of matching properties
 *         content:
 *           application/json:
 *             example:
 *               questionTags: ["Modern", "Spacious", "Ocean View"]
 *               properties:
 *                 - property:
 *                     id: "123"
 *                     titulo: "Apartamento Luxo Frente Mar"
 *                     tags: ["Luxury", "Modern", "Ocean View", "Spacious"]
 *                   score: 3
 *                 - property:
 *                     id: "456"
 *                     titulo: "Cobertura Vista Mar"
 *                     tags: ["Ocean View", "Spacious"]
 *                   score: 2
 *       400:
 *         description: Bad request - Missing required field
 *         content:
 *           application/json:
 *             example:
 *               error: "Missing question in request body"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
