# 📘 Student Dashboard App

A modern, responsive dashboard built with **Next.js**, designed to help users manage student and course information. Featuring **Firebase authentication**, reusable components, toast notifications, and a clean developer experience.

---

## 🚀 Features

- 🔐 **Authentication**
  - Firebase-based login and signup with modal UI
  - Securely access student details after login

- 📚 **Course Management**
  - View, search, and filter course listings
  - Add new courses with name, description, and difficulty level
  - Toast notifications on successful actions

- 👥 **Student Management**
  - List all students with filtering options
  - View detailed student profiles
  - Add students through a validated form

- 💾 **Local Storage**
  - Lightweight persistence using custom `useLocalStorage` hook
  - Optional sync for user/session data

- 🎨 **Responsive Design**
  - Mobile-first layout using Tailwind CSS
  - Clean, accessible UI components

---

## 📁 Project Structure


<img width="415" alt="Screenshot 2025-05-08 at 22 03 52" src="https://github.com/user-attachments/assets/b7c5541d-eaf7-4abd-9c3a-58d4198680e3" />


yaml
Copy code

---

## 🛠️ Technologies Used

- **React** with **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** for UI styling
- **Firebase** for authentication
- **Lucide React** for icons
- **Toast system** for user feedback
- Custom hooks (`useLocalStorage`, `useToast`, etc.)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-dashboard.git
cd student-dashboard
```
2. Install Dependencies
bash
Copy code
npm install
3. Configure Firebase
Create a Firebase project at Firebase Console and enable Email/Password authentication.

Update the Firebase configuration in lib/firebase.ts:

ts
Copy code
// lib/firebase.ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
4. Run the Development Server
bash
Copy code
npm run dev
Visit http://localhost:3000 in your browser.

🔍 Demo Walkthrough
🔐 Log in or sign up via modal

➕ Add a course with name, description, and level

🎓 Browse and filter student list

📁 View student details (if authenticated)

✅ Toast appears on key actions

🌟 Potential Enhancements
Add real-time Firestore support

Course editing and deletion

User profile management

Role-based access control (Admin vs Viewer)

Deploy to Vercel or Firebase Hosting

📸 Screenshots
Add screenshots or a demo video here showing the dashboard, course creation, and authentication flow.

📝 License
This project is open-source under the MIT License.

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

🙏 Acknowledgments
ShadCN UI

Firebase

Lucide Icons

