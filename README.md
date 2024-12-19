# Innovation Excellence Indicators Portal

This portal tracks, measures, and showcases innovation excellence within educational institutions by aggregating data, providing analytics, and presenting key indicators through a user-friendly interface. It fosters collaboration, data-driven decision-making, and recognition of innovative achievements.

## Getting Started

Follow these instructions to set up the project locally and get it running.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or later)
- **npm** (v8 or later) or **yarn**
- **MongoDB Atlas** account for database hosting
- **Render** account for backend deployment
- **Vercel** account for frontend deployment
- **Firebase** account for authentication

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Set up the backend:**
   - Navigate to the backend directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add the following environment variables:
     ```env
     PORT=5000
     MONGODB_URI=<Your MongoDB Atlas URI>
     JWT_SECRET=<Your JWT Secret Key>
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set up the frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd client
     cd sih
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. **Connect to MongoDB Atlas:**
   - Log in to your MongoDB Atlas account.
   - Create a new cluster and database.
   - Add your cluster connection string to the `MONGODB_URI` variable in the backend `.env` file.

5. **Set up Firebase Authentication:**
   - Log in to your Firebase account.
   - Create a new Firebase project.
   - Enable authentication methods (e.g., Email/Password, Google Sign-In, etc.) in the Firebase console.
   - Add your Firebase configuration to the `REACT_APP_FIREBASE_*` environment variables in the frontend `.env` file.

6. **Deploy the application:**
   - **Backend Deployment:**
     - Use Render to deploy the backend manually after each local updation server by connecting your repository and setting up the required environment variables.
   - **Frontend Deployment:**
     - Use Vercel to deploy the frontend by linking your repository and providing the `REACT_APP_API_URL` and Firebase environment variables.

Now your application should be fully functional and accessible through the deployed URLs.
