# Interest-Based Scored Feed Application

Welcome to the Interest-Based Scored Feed Application! This is a complete Full-Stack application containing a Node.js Backend and a React Frontend.

This application creates a mock personalized social media feed based on a user's specific interests. As the user views, likes, comments, and shares posts, their interactions are automatically recorded in real-time to generate an Engagement Score.

## Technology Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB (with Mongoose ODM)

---

## Step-by-Step Installation Guide

### Prerequisites
Before we begin, you need to have:
1. **Node.js**: Download and install the LTS version from [nodejs.org](https://nodejs.org/).
2. **MongoDB Atlas Account**: A free cloud database.

### Step 1: Set Up MongoDB Atlas (Your Database)
1. Go to [MongoDB Cloud](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Click **Deploy a cluster** and select the **Free Tier** (M0 Sandbox).
3. Name your cluster (e.g., `Cluster0`) and click **Create**.
4. In the Security section, click **Database Access** and create a user (give it a username and a password. Save the password!).
5. In the Security section, click **Network Access**, click Add IP Address, select **Allow access from anywhere** (`0.0.0.0/0`), and Save.
6. Go back to your Cluster dashboard, click **Connect**, select **Drivers** (Node.js), and copy the long **Connection String** provided.

### Step 2: Clone the Repository
1. Open up your terminal or command prompt.
2. Run this command to download the project to your computer:
   ```bash
   git clone https://github.com/bharatcj/party-witty-assessment.git
   ```
3. Navigate into the newly created project folder:
   ```bash
   cd party-witty-assessment
   ```

### Step 3: Configure the Backend
1. Open up your terminal or command prompt.
2. Navigate into the `backend` folder:
   ```bash
   cd backend
   ```
3. Install all the necessary packages by running:
   ```bash
   npm install
   ```
4. Open the `backend/.env` file in your code editor.
5. You will see a line that says `MONGODB_URI=...`. Replace that entire URL with the Connection String you copied from MongoDB Atlas. 
   - *Important:* Replace `<password>` in the URL with the actual database password you created in Step 1.
   - *Important:* Add `/interest-feed` right before the `?` in the URL (this names your database).

### Step 4: Seed (Populate) the Database with Data
We need to fill your empty database with some fake posts and users!
1. Make sure you are still in the `backend` folder in your terminal.
2. Run this command:
   ```bash
   npm run seed
   ```
3. If successful, you will see "Database seeded successfully!". Your cloud database now has data!

### Step 5: Start the Backend Server
1. In the exact same terminal, start your backend application:
   ```bash
   npm run dev
   ```
2. It should say "MongoDB Connected" and "Server running on port 5000". Leave this terminal window open and running.

### Step 6: Start the Frontend React App
1. Open a **second, brand new terminal window**.
2. Navigate into the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install all the necessary frontend packages:
   ```bash
   npm install
   ```
4. Start the frontend application:
   ```bash
   npm run dev
   ```
5. It will give you a local URL (usually `http://localhost:5173`). Ctrl+Click or copy that URL into your web browser.

**Congratulations! You should now see the beautiful React Frontend in your browser!**

---

## How to Use the App
- **Viewing**: You must actively click on a post to open its exact details in a popup Modal. Upon successfully expanding the post, a "View" is registered and your Engagement Score is rewarded. Simple scrolling does not artificially inflate scores.
- **Interactions**: Click the "Like", "Comment", and "Share" buttons. Notice how the Engagement Widget instantly updates.
- **Unlike**: Clicking a fully-red "Like" button on an already liked post will unlike it, reducing your overall engagement score by 3 points automatically.
- **Pagination**: Scroll to the very bottom and click "Load More" to test the database pagination.

---

## API Endpoints Documentation

If you are using Postman (a `postman_collection.json` file is included in this repository), here are the endpoints:

- **GET `/feed/:userId?page=1&limit=4`**: Fetches paginated feed posts tailored to the user's interests.
- **GET `/user/:userId/score`**: Fetches the total engagement score and a breakdown.
- **POST `/activity/view`**: Records a view (payload: `{ "userId": "U1", "feedId": "..." }`).
- **POST `/activity/like`**: Records a like (+3 points).
- **POST `/activity/unlike`**: Un-records a like (-3 points).
- **POST `/activity/comment`**: Records a comment (+4 points).
- **POST `/activity/share`**: Records a share (+5 points).
