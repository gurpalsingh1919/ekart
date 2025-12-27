```markdown
# 🛒 eKart: Simple E-commerce Shopping Cart

A robust, backend-driven shopping cart system built with **Laravel 12**, **Inertia.js (React)**, and **Tailwind CSS**. This project demonstrates database-persistent cart management, automated stock monitoring, and scheduled administrative reporting.



---

## 🚀 Key Requirements Met

### **1. Authenticated Shopping Cart**
- Every cart is associated with the **Authenticated User model**.
- Cart actions (Add, Update, Remove) are stored in the database, ensuring persistence across sessions and devices.
- Uses Laravel's built-in authentication for secure access.

### **2. Low Stock Notification (Queued Job)**
- **Trigger:** A `ProductObserver` watches for stock changes.
- **Action:** When a product's stock hits **5 or less**, a `SendLowStockEmail` job is dispatched.
- **Queue:** The email is processed asynchronously via a Laravel Queue to keep the user experience fast.

### **3. Daily Sales Report (Scheduled Task)**
- **Automation:** A scheduled job runs every evening (via Cron).
- **Function:** Scans the `order_items` table for the day's sales and sends a summary report (total products sold and total revenue) to a dummy admin email.

---

## 🛠 Tech Stack

- **Backend:** Laravel 12
- **Frontend:** React (Inertia.js)
- **Styling:** Tailwind CSS
- **Database:** MySQL (via Laravel Herd)
- **Notifications:** Laravel Mail & Queues

---

## 📂 Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone and Install
```bash
git clone [https://github.com/gurpalsingh1919/ekart.git]
cd ekart
composer install
npm install

```

### 2. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate

```

*Make sure to update your `.env` file with your database name and credentials.*

### 3. Database Migration

```bash
php artisan migrate

```

### 4. Running the Application

You will need two terminal windows open:

```bash
# Terminal 1: Start the Laravel server
php artisan serve

# Terminal 2: Compile frontend assets
npm run dev

```

---

## ⚙️ Background Workers

### **Processing Emails (Queue)**

To handle the Low Stock notifications, you must run the queue worker:

```bash
php artisan queue:work

```

### **Testing the Daily Report**

To trigger the Daily Sales Report immediately (without waiting for the scheduled time), use:

```bash
php artisan report:daily-sales

```
