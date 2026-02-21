# Interest-Based Scored Feed Application 🚀

Welcome to the Interest-Based Scored Feed Application! This is a complete, production-ready Full-Stack application containing a Node.js Backend and a React Frontend.

This application creates a mock personalized social media feed based on a user's specific interests. As the user views, likes, comments, and shares posts, their interactions are automatically recorded in real-time to generate an Engagement Score.

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB (with Mongoose ODM)

---

## 💻 Step-by-Step Installation Guide (For Beginners)

Don't worry if you are new to this! Just follow these steps in order to get the project running perfectly on your Windows machine.

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

### Step 2: Configure the Backend
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

### Step 3: Seed (Populate) the Database with Data
We need to fill your empty database with some fake posts and users!
1. Make sure you are still in the `backend` folder in your terminal.
2. Run this command:
   ```bash
   npm run seed
   ```
3. If successful, you will see "Database seeded successfully!". Your cloud database now has data!

### Step 4: Start the Backend Server
1. In the exact same terminal, start your backend application:
   ```bash
   npm run dev
   ```
2. It should say "MongoDB Connected" and "Server running on port 5000". Leave this terminal window open and running.

### Step 5: Start the Frontend React App
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

**🎉 Congratulations! You should now see the beautiful React Frontend in your browser!**

---

## 📘 How to Use the App
- **Scrolling**: As you scroll down the feed, cards that come into view will automatically trigger an API call to record a "View". You will see your Total Score increase automatically!
- **Interactions**: Click the "Like", "Comment", and "Share" buttons. Notice how the Engagement Widget instantly updates, and "Liked" buttons are properly disabled for repeat clicks.
- **Pagination**: Scroll to the very bottom and click "Load More" to test the database pagination.

---

## 🔌 API Endpoints Documentation

If you are using Postman (a `postman_collection.json` file is included in this repository), here are the endpoints:

- **GET `/feed/:userId?page=1&limit=10`**: Fetches paginated feed posts tailored to the user's interests.
- **GET `/user/:userId/score`**: Fetches the total engagement score and a breakdown.
- **POST `/activity/view`**: Records a view (payload: `{ "userId": "U1", "feedId": "..." }`).
- **POST `/activity/like`**: Records a like.
- **POST `/activity/comment`**: Records a comment.
- **POST `/activity/share`**: Records a share.
