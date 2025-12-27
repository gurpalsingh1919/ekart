# Simple E-Commerce Shopping Cart (eKart)

A robust, simple e-commerce system built with **Laravel 12**, **Inertia.js (React)**, and **Tailwind CSS**. This project focuses on backend-driven cart management, real-time inventory monitoring, and automated administrative reporting.

---

## 🚀 Features

### **1. Shopping Experience**
- **Product Browsing:** Clean, responsive UI for viewing products.
- **Persistent Cart:** Cart items are linked to the **Authenticated User model** via the database (not session-based), ensuring a seamless experience across devices.
- **Dynamic Cart Sheet:** A slide-over cart built with React to update quantities or remove items without page reloads.

### **2. User Interface**
- **Contextual Layout:** The application utilizes a "Dashboard-only" sidebar. The shop view is full-width for better focus, while the sidebar only appears when a user is in the management/dashboard area.
- **Flash Notifications:** Real-time feedback using `Sonner` (Toaster) for cart actions and checkout success.

### **3. Inventory & Order Management**
- **Orders & Items:** Database-driven order tracking with a `One-to-Many` relationship between Orders and OrderItems.
- **Atomic Transactions:** Checkout logic ensures stock reduction and cart clearing happen as a single database transaction.

### **4. Automated Background Tasks**
- **Low Stock Notifications:** A **Laravel Observer** monitors product stock. When a product hits a threshold (≤ 5), a **Queued Job** is dispatched to email a dummy admin.
- **Daily Sales Report:** A **Scheduled Artisan Command** runs every evening to compile a summary of all items sold that day and email it to the admin.

---

Install Dependencies:

   ```Bash

   composer install
   npm install && npm run build
   Environment Configuration:

   ```Bash

   cp .env.example .env
   php artisan key:generate
   Note: Ensure your .env has the correct database credentials.
   
**Run Migrations:**

   ```Bash

    php artisan migrate


## 🛠 Tech Stack

- **Backend:** Laravel 12
- **Frontend:** React (via Laravel Starter Kit / Inertia.js)
- **Styling:** Tailwind CSS & Shadcn/UI
- **Database:** MySQL
- **Environment:** Laravel Herd (MacOS)
- **Tooling:** Ziggy (for Laravel routes in JS), Sonner (Toaster)

---

## 📂 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gurpalsingh1919/ekart.git


   Bash

**Testing Daily Sales Report:**

You don't have to wait until midnight to see it work. Run the command manually:

Bash

   php artisan report:daily-sales