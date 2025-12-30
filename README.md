# 📝 SupaNotes – React Native Notes App

SupaNotes is a simple and secure **Notes application** built using **React Native CLI** and **Supabase**.  
It demonstrates authentication, secure CRUD operations, offline-safe behavior, theming, and the ability to ship a working Android APK.

---

## 🎯 Objective

Build a Notes app that demonstrates:

- Supabase Authentication
- Secure Notes CRUD
- Persistent login session
- Offline handling (no crashes)
- Clean UI with Light / Dark theme
- Working Android APK (debug or release)

---

## 🛠 Tech Stack

- **React Native CLI**
- **Supabase** (Authentication + Database)
- **Redux Toolkit** (State management)
- **AsyncStorage**
- **Android (APK)**

❌ No Expo  
❌ No backend other than Supabase  

---

## ✨ Features

### 🔐 Authentication
- Email & password signup
- Email & password login
- Session persists after app restart
- Secure logout

---

### 🗂 Notes (CRUD)
- Create notes
- Edit notes (modal-based)
- Delete notes
- List user notes

Each note includes:
- `id`
- `title`
- `content`
- `user_id`
- `created_at`
- `updated_at`

🔒 **Security:**  
Users can only access their own notes via Supabase Row Level Security (RLS).

---

### 📡 Offline Handling (Option A)

- App opens normally when offline
- Splash screen never blocks navigation
- Login & signup show offline messages
- Notes fetch shows offline state
- Create / Update / Delete disabled when offline
- App never crashes due to network loss

---

### 🌗 Light / Dark Theme
- System-based theme support
- Theme toggle in Settings
- Theme stored in AsyncStorage
- Notes list, modals, and settings are theme-aware

---

### 🚪 Logout
- Secure Supabase logout
- Clears cached user profile
- Resets Redux notes state
- Redirects to Auth flow

---

## 📱 App Flow

Splash Screen
↓
Restore Supabase Session (local)
↓
Authenticated → Notes (Bottom Tabs)
Unauthenticated → Login / Signup


---

## 🧠 Architecture Overview

- **Supabase**
  - Auth
  - Session persistence
  - Database access
- **Redux Toolkit**
  - Notes list
  - Loading & error state
- **AsyncStorage**
  - User profile (non-sensitive)
  - Theme preference

⚠️ Tokens are never stored manually.

---

## 🗃 Supabase Database Schema

### Notes Table

```sql
create table notes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text,
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
