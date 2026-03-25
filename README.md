# 🧢 # MazterCaps
[English] | [Español](README.es.md)

Welcome to the **MazterCaps** repository! This project is a high-performance, responsive landing page designed for a premium headwear brand. It combines clean aesthetics with interactive modern technology to provide a seamless shopping experience.

---

## 🚀 Project Overview

As a web developer, my focus for this project was to create a **high-conversion interface** that feels both professional and approachable. The site isn't just a static page; it's a dynamic application that handles product data, interactive 3D models, and a fluid mobile-first design.

### Key Highlights:
* **Dynamic Product Loading:** Uses a centralized JSON system to update prices, stock, and colors without touching the HTML.
* **3D Interaction:** Integration of Google's `<model-viewer>` for a 360° product view.
* **Conversion Focused:** Direct integration with WhatsApp for instant customer service.

---

## 🛠 Technology "Tier List"

Here is how I ranked the tools and techniques used to bring MazterCaps to life:

| Tier | Technology / Strategy | Why it's here? |
| :--- | :--- | :--- |
| **S (God Tier)** | **Vanilla JavaScript** | Drives the entire logic (Modals, Dropdowns, Data injection) without heavy libraries. |
| **A (Elite)** | **CSS Grid & Flexbox** | Creates a rock-solid responsive layout that looks great on any screen size. |
| **A (Elite)** | **3D Model-Viewer** | Provides a "Premium Feel" by letting users see the product from every angle. |
| **B (Pro)** | **CSS Variables** | Makes "modding" or rebranding the site incredibly fast (change one color, change the whole site). |
| **B (Pro)** | **JSON Integration** | Simplifies inventory management for the end-user. |

---

## 📱 Features & Functionality

### 1. Smart Navigation & Menus 🍔
The header features a **minimalist dropdown**. Instead of cluttering the screen, the "Productos" menu only appears when needed, keeping the focus on the visuals. It's fully accessible and closes automatically when you click away.

### 2. Interactive Gallery 📸
The gallery isn't just a slider. When you select a color bubble, the logic:
* Swaps the main image with a smooth **fade-out transition**.
* Re-renders the thumbnail grid for that specific color.
* Updates the price and measurements in real-time.

### 3. Responsive Design 📲
The site is built with a **mobile-first** mindset. On desktops, you get a sophisticated split-screen grid. On mobile devices:
* The 3D viewer expands to fill the view.
* The "Comparison Cards" stack vertically for easy reading.
* Buttons become larger and more "thumb-friendly."

### 4. The 3D Render Section 🧊
We use an interactive `.glb` model. This allows users to zoom and rotate the cap, simulating a physical "in-store" experience. I've added **Feature Tags** (floating labels) that highlight specific benefits like "Solar Protection" or "Breathable Fabric."

---

## 💻 Coding & "Modding" Guide

If you want to customize (or "mod") this project, here is how the engine works:

### **The Scripting Logic**
The `script.js` acts as the brain. It uses a function called `cargarProducto()`. This function takes data from your JSON and automatically fills in the name, price, and technical specs. 
* **Stock Control:** If the JSON says `stock_total: 0`, the script automatically disables the purchase button and changes the status to "Agotado" (Sold Out).

### **Styling & Branding**
I used **CSS Variables** at the top of the `style.css` file. 
```css
:root {
    --camel: #C19A6B;  /* The main brand color */
    --white: #ffffff;
    --transition: 0.4s;
}
```
Want a different brand look? Just change the `--camel` hex code, and the entire site (buttons, badges, borders, icons) updates instantly.

### **The Contact Modal**
The contact form is replaced by a high-conversion **WhatsApp Modal**. It includes the physical store location in Bogotá and a direct API link to start a chat, reducing the friction between the user and the sale.

---

## 🏁 Future Improvements
* Add a dark mode toggle.
* Implement a search bar for specific cap models.
* Integrate an automated "Shopping Cart" local storage.

**Would you like me to show you how to connect this to a real database like Firebase or Supabase next?**
