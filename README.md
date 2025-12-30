# 📝 SupaNotes – React Native Notes App

SupaNotes is a simple and secure **Notes application** built using **React Native CLI** and **Supabase**.
This project demonstrates authentication, secure CRUD operations, offline handling, theming, and the ability to ship a working Android APK.

---

## 🎯 Objective

Build a Notes app that demonstrates:
- Email & password authentication using Supabase
- Secure Notes CRUD operations
- Persistent user sessions
- Offline-safe behavior
- Clean and usable UI
- Working Android APK (debug build)

---

## 🛠 Tech Stack

- React Native CLI
- Supabase (Authentication & Database)
- Redux Toolkit (State management)
- AsyncStorage
- Android (APK)



---

## 📌 Project Setup Steps

### 1️⃣ Clone the Repository
```bash
git https://github.com/mumnanikunj/CRUD_Supabase.git
cd CRUD_Supabase
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 4️⃣ Start Metro Bundler
```bash
npx react-native start
```
Keep this terminal running.

---

## ▶️ How to Run the Project Locally

### Android (Debug Mode)
1. Ensure an Android emulator or physical device is connected
2. Run the app:
```bash
npx react-native run-android
```

### Debug APK Location
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔐 Authentication Approach Used

- Supabase email & password authentication
- Session persistence enabled via AsyncStorage
- Session is restored automatically on app restart
- Supabase SDK handles token refresh internally
- Logout clears Supabase session and Redux state

> Access tokens are never stored manually.

---

## 🗃 Supabase Schema Details

### `notes` Table

| Field Name   | Type      | Description               |
|--------------|-----------|---------------------------|
| id           | uuid      | Primary key               |
| title        | text      | Note title                |
| content      | text      | Note content              |
| user_id      | uuid      | References auth.users(id) |
| created_at   | timestamp | Creation time             |
| updated_at   | timestamp | Last update time          |

### Row Level Security (RLS)

```sql
alter table notes enable row level security;

create policy "Users can view their notes"
on notes for select
using (auth.uid() = user_id);

create policy "Users can insert their notes"
on notes for insert
with check (auth.uid() = user_id);

create policy "Users can update their notes"
on notes for update
using (auth.uid() = user_id);

create policy "Users can delete their notes"
on notes for delete
using (auth.uid() = user_id);
```

---

## 📡 Offline Handling

- App opens normally when offline
- Splash screen never blocks navigation
- Login & signup show offline messages
- Notes fetch displays offline/error state
- Create, update, and delete actions are disabled when offline
- App never crashes due to network loss

---

## 🌗 Light / Dark Theme

- Supports system light and dark theme
- Theme toggle available in Settings screen
- Theme preference stored in AsyncStorage
- UI is fully theme-aware

---

## 🚪 Logout

- Secure logout via Supabase
- Clears cached user profile
- Resets Redux notes state
- Redirects to authentication flow

---

## ⚖️ Assumptions & Trade-offs

- Offline handling is graceful (no offline sync)
- Notes are not cached locally
- Realtime subscriptions are not used
- Focus is on correctness and stability over extra features
- Debug APK is used for submission

---

## 👤 Author

Nikunj Mumna
