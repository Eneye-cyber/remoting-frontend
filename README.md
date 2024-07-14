
# React TypeScript Book Library

Welcome to the React TypeScript Book Library! This application allows users to explore a collection of books and authors, view detailed information, add new books and authors, and perform searches. Additionally, it supports user authentication. 
The counterpart backend repo is at https://github.com/Eneye-cyber/e-libs.git

## Features

### User Interface

#### Home Page
- Displays a list of books with their titles and authors.

#### Book Details Page
- Displays detailed information about a specific book.

#### Author Details Page
- Displays detailed information about a specific author.

### User Authentication
- Implement basic login functionality to consume the authentication endpoint.

### Form Handling
- Implement basic forms for adding and editing books and authors.

### Search Functionality
- Implement search functionality to search for books by title and authors by name.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- A backend server or API endpoint for authentication and data fetching.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Eneye-cyber/remoting-frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd remoting-frontend
    ```
3. Install the dependencies:
    ```bash
    yarn install
    ```
4. Fill the .env variable with the backend uri:
    VITE_API_URL = 'http://localhost:8000/api'
    

### Running the Application

1. Start the development server:
    ```bash
    yarn dev
    ```
2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components (Home, BookDetails, AuthorDetails)
├── api/                 # API calls and authentication services
├── App.tsx              # Main app component
├── main.tsx            # Entry point
├── context/             # Auth Context Provider
├── types/               # TypeScript types and interfaces
└── libs/                # React query, validation and Utility functions
```

## Scripts

- `npm drv`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the code using ESLint.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please reach out to [alaoeneye@gmail.com](mailto:alaoeneye@gmail.com).
