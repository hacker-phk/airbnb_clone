

# Airbnb Clone

## Overview

This project is an **Airbnb clone** built with modern web technologies. It simulates the core functionalities of Airbnb, allowing users to post and book hotels. The application is a full-stack solution that leverages a range of technologies to provide a seamless user experience.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **React:** Used for building the dynamic user interface with hooks like `useEffect`, `useLocation`, and `useState`.
- **Node.js & Express:** Powering the server-side logic and API endpoints.
- **MongoDB & Mongoose:** Managing data storage and schema modeling.
- **Axios:** Handling HTTP requests to interact with the backend.
- **CORS:** Configured to manage cross-origin requests.
- **JWT & Cookies:** Implemented for secure authentication and session management.
- **Git:** Used for version control and collaboration.

## Features

- **Hotel Posting:** Users can post details of hotels including description, price, and availability.
- **Hotel Booking:** Users can book hotels directly through the application.
- **Authentication:** Secure user authentication with JWT and session management using cookies.
- **User Management:** User registration and login features.

## Setup

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Clone the Repository

```bash
git clone https://github.com/yourusername/airbnb-clone.git
cd airbnb-clone
```

### Install Dependencies

Navigate to both the client and server directories and install the necessary packages:

**Client:**

```bash
cd client
npm install
```

**Server:**

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Run the Application

Start the server:

```bash
cd server
npm start
```

Start the client:

```bash
cd client
npm start
```

Your application should now be running on `http://localhost:3000` (client) and `http://localhost:5000` (server).

## Usage

- **Register/Log In:** Access the application at `http://localhost:3000` and register or log in to access the features.
- **Post Hotels:** Once logged in, you can post new hotels with details like description, price, and availability.
- **Book Hotels:** Browse through posted hotels and book them as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and write appropriate tests.
