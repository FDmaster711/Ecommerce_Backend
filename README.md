ENGLISH

# 🚀 Ecommerce API

## 🔗 Live Demo & Documentation
**Swagger UI:** [https://ecommerce-api-x8jv.onrender.com/api-docs/](https://ecommerce-api-x8jv.onrender.com/api-docs/)

---

### ℹ️ For Recruiters & Testers
You can test the live API directly via the Swagger UI link above.

**⚠️ Performance & Testing Notes:**
1.  **Cold Start Delay:** This service is hosted on **Render's Free Tier**. If the API has been inactive for a while, the first request may take **30-60 seconds** to respond while the server "wakes up". Subsequent requests will be instant.
2.  **Real Data Ready:** The examples provided in the "Try it out" section contain **valid IDs and data** from the live **Neon (PostgreSQL)** database. You generally don't need to modify the input fields; simply click **"Execute"** to see the results.

**🛠 Architecture:**
This project utilizes a decoupled cloud architecture to ensure performance and data persistence:
* **Backend:** Node.js + Express deployed on **Render**.
* **Database:** PostgreSQL managed by **Neon Tech**.

---

## 📝 Project Overview

This is a robust and scalable **RESTful API** designed to power a full-featured E-commerce platform. Built with **Node.js** and **Express**, it handles critical business logic including user authentication, product management, and order processing.

The project focuses on clean architecture, data integrity, and developer experience through comprehensive documentation. It is deployed using a decoupled architecture (Render + Neon) to simulate a real-world production environment.

### 🛠️ Tech Stack
* **Core:** Node.js, Express.js
* **Database:** PostgreSQL (Hosted on Neon Tech)
* **ORM:** Prisma (Schema modeling & migrations)
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt
* **Documentation:** Swagger UI (OpenAPI 3.0)
* **Deployment:** Render (Web Service)

### ✨ Key Features
* **🔐 Secure Authentication:** User registration and login flows protected with JWT and password hashing.
* **📦 Inventory Management:** CRUD operations for Products and Categories with relational data integrity.
* **🛒 Order Processing:** Logic to handle customer orders (Simulated).
* **📑 Interactive Documentation:** Fully documented endpoints via Swagger, allowing real-time testing without external tools like Postman.
* **🛡️ Production Ready:** Configured with environment variables, CORS policies, and SSL connections for secure deployment.




SPANISH



# 🚀 Ecommerce API

## 🔗 Live Demo & Documentation
**Swagger UI:** [https://ecommerce-api-x8jv.onrender.com/api-docs/](https://ecommerce-api-x8jv.onrender.com/api-docs/)

---

### 🇪🇸 Para Reclutadores y Testers / For Recruiters & Testers
Puedes probar la API funcionando en tiempo real directamente desde el enlace de arriba.

**⚠️ Notas sobre el rendimiento (Performance Notes):**
1.  **Retraso Inicial (Cold Start):** El servicio está alojado en el plan gratuito de **Render**. Si el servidor ha estado inactivo, la primera petición puede tardar **30-60 segundos** en responder mientras el servicio se "despierta". Las peticiones siguientes serán instantáneas.

2.  **Datos Reales (Real Data):** Los ejemplos pre-cargados en Swagger ("Try it out") contienen **IDs y datos reales** que existen actualmente en la base de datos **Neon (PostgreSQL)**. No necesitas buscar IDs manualmente, simplemente presiona **"Execute"**.
**🛠 Arquitectura / Architecture:**
Este proyecto utiliza una arquitectura desacoplada para garantizar la persistencia de datos en la nube:
* **Backend:** Node.js + Express en **Render**.
* **Database:** PostgreSQL en **Neon Tech**.

---

## 📝 Descripción del Proyecto

Esta es una **API RESTful** robusta y escalable diseñada para impulsar una plataforma de comercio electrónico completa. Construida con **Node.js** y **Express**, maneja la lógica de negocio crítica, incluyendo autenticación de usuarios, gestión de productos y procesamiento de pedidos.

El proyecto se centra en una arquitectura limpia, integridad de datos y experiencia del desarrollador mediante documentación completa. Está desplegado usando una arquitectura desacoplada (Render + Neon) para simular un entorno de producción real.

### 🛠️ Stack Tecnológico
* **Core:** Node.js, Express.js
* **Base de datos:** PostgreSQL (Alojado en Neon Tech)
* **ORM:** Prisma (modelado de esquemas y migraciones)
* **Autenticación:** JSON Web Tokens (JWT) y Bcrypt
* **Documentación:** Swagger UI (OpenAPI 3.0)
* **Despliegue:** Render (Web Service)

### ✨ Características clave
* **🔐 Autenticación segura:** Flujos de registro e inicio de sesión protegidos con JWT y hash de contraseñas.
* **📦 Gestión de inventario:** Operaciones CRUD para Productos y Categorías con integridad relacional.
* **🛒 Procesamiento de pedidos:** Lógica para manejar pedidos de clientes (simulado).
* **📑 Documentación interactiva:** Endpoints totalmente documentados vía Swagger, permitiendo pruebas en tiempo real sin herramientas externas como Postman.
* **🛡️ Listo para producción:** Configurado con variables de entorno, políticas CORS y conexiones SSL para despliegue seguro.


