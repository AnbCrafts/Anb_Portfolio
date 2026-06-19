# Portfolio Backend API Services Guide

This module is a Node.js & Express.js REST API server powering the developer portfolio. It connects to a MongoDB database, manages secure authentication using JWT sessions with Multi-Factor Authentication (MFA), handles media file uploads via Cloudinary, and delivers automated emails using Nodemailer.

---

## 1. Technical Stack
*   **Runtime Environment**: Node.js (ES Modules syntax, `"type": "module"`)
*   **Web Framework**: Express.js
*   **Database ORM**: Mongoose (MongoDB)
*   **Authentication**: JSON Web Tokens (JWT) & HTTP-Only Cookies
*   **Security Controls**: Helmet (HTTP security headers), CORS (configured for multiple origins), Express Rate Limit (DDoS defense), and bcryptjs (password hashing)
*   **File Upload Pipeline**: Multer + Multer Storage Cloudinary
*   **Email Transporter**: Nodemailer (configured for SMTP/Gmail)
*   **Data Validation**: Zod / Express Validator

---

## 2. Folder Structure Overview

```
backend/
├── server.js              # Server entry point (seeds admin & connects DB)
├── src/
│   ├── Config/            # DB connection and Cloudinary configs
│   ├── Controllers/       # Request handlers & logic controllers
│   ├── Middleware/        # Authentication, file upload, & validation checks
│   ├── Routes/            # Router configurations
│   ├── Schema/            # Mongoose schemas & data models
│   ├── Services/          # Nodemailer SMTP services
│   ├── Utility/           # Token utilities and error class handlers
│   ├── Validations/       # Zod validation rules
│   └── app.js             # Express app setup, CORS, and middleware pipeline
```

### Folder Roles
*   **[Config](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Config)**: Bootstraps external services like Mongoose DB connection ([db.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Config/db.js)) and Cloudinary ([Cloudinary.Config.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Config/Cloudinary.Config.js)).
*   **[Controllers](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Controllers)**: Houses controllers that process requests, communicate with Mongoose models, and format responses.
*   **[Middleware](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Middleware)**: Contains `protect` middleware ([Auth.Middleware.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Middleware/Auth.Middleware.js)) to verify JWT, file upload processing (`Upload.Middleware.js`), and global error handling.
*   **[Routes](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Routes)**: Exposes router paths. Private endpoints are locked down with the `protect` middleware.
*   **[Schema](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema)**: Defines Mongoose structural collections, constraints, hooks, and virtual methods.
*   **[Services](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Services)**: Implements nodemailer SMTP wrapper ([email.service.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Services/email.service.js)).
*   **[Utility](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Utility)**: Exposes utilities like token generators ([jwt.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Utility/jwt.js)) or errors ([AppError.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Utility/AppError.js)).
*   **[Validations](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Validations)**: Request validator objects utilizing Zod libraries.

---

## 3. Database Schema Reference

Mongoose schemas are located in the `src/Schema/` folder:

### 1. User Schema ([User.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/User.Schema.js))
*   **Fields**:
    *   `name` (String, required)
    *   `email` (String, required, unique, lowercase)
    *   `password` (String, required, minlength: 6, hashed)
    *   `role` (String, enum: `["SuperAdmin"]`, default: `"SuperAdmin"`)
    *   `otp` (String, default: `null`)
    *   `otpExpires` (Date, default: `null`)
*   **Hooks**: `pre("save")` automatically hashes passwords using `bcryptjs` with salt rounds = 10.
*   **Instance Methods**: `comparePassword(enteredPassword)` returns boolean.

### 2. Project Schema ([Project.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Project.Schema.js))
*   **Fields**:
    *   `title` (String, required)
    *   `slug` (String, unique, lowercase)
    *   `description` (String, required)
    *   `category` (String, required, enum: `["frontend", "fullstack", "ai"]`)
    *   `techStack` (Array of Strings)
    *   `githubUrl`, `liveUrl`, `demoVideo` (Strings)
    *   `thumbnail` (String URL, required)
    *   `gallery` (Array of String URLs)
    *   `featured` (Boolean, default: `false`)
    *   `displayOrder` (Number, default: `0`)
    *   `status` (String, enum: `["active", "draft"]`, default: `"active"`)
*   **Hooks**: `pre("save")` automatically slugifies the project title if no custom slug is supplied.

### 3. Story Schema ([Story.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Story.Schema.js))
*   **Fields**:
    *   `title` (String, required)
    *   `slug` (String, unique, lowercase)
    *   `image` (String URL, required)
    *   `tag` (String, required, e.g. "Hackathon", "Certification")
    *   `description` (String, required)
    *   `year` (String, required)
    *   `location` (String, required)
    *   `built` (Array of Strings)
    *   `learned` (Array of Strings)
    *   `timeline` (Array of Strings)
    *   `certificate` (String URL)
    *   `gallery` (Array of Strings)
    *   `published` (Boolean, default: `true`)
*   **Hooks**: `pre("save")` automatically slugifies the title.

### 4. Skill Schema ([Skill.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Skill.Schema.js))
*   **Fields**:
    *   `name` (String, required, unique)
    *   `icon` (String icon class)
    *   `category` (String, required, enum: `["Frontend", "Backend", "Database", "DevOps & Tools"]`)
    *   `proficiency` (Number, min: 0, max: 100, default: 80)
    *   `displayOrder` (Number, default: 0)

### 5. Experience Schema ([Experience.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Experience.Schema.js))
*   **Fields**:
    *   `title` (String, required)
    *   `company` (String, required)
    *   `location` (String)
    *   `year` (String display range, required, e.g. "2025 - Present")
    *   `desc` (String details, required)
    *   `type` (String, enum: `["work", "education", "achievement"]`, default: `"work"`)
    *   `skills` (Array of Strings)
    *   `certificate` (String URL)
    *   `displayOrder` (Number, default: 0)

### 6. Certificate Schema ([Certificate.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Certificate.Schema.js))
*   **Fields**:
    *   `title` (String, required)
    *   `issuer` (String, required)
    *   `issueDate` (Date, required)
    *   `certificateUrl` (String, required)
    *   `thumbnail` (String URL)

### 7. Resume Schema ([Resume.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Resume.Schema.js))
*   **Fields**:
    *   `title` (String, required)
    *   `fileUrl` (String URL, required)
    *   `active` (Boolean, default: false)
*   **Hooks**: `pre("save")` checks if `active` is set to `true`. If so, it updates all other resumes to `active: false` dynamically, keeping a single active resume representation at any time.

### 8. Contact Schema ([Contact.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Contact.Schema.js))
*   **Fields**:
    *   `name` (String, required)
    *   `email` (String, required, validated format)
    *   `subject` (String, default: "General Inquiry")
    *   `message` (String, required)
    *   `status` (String, enum: `["Pending", "Read", "Replied", "Archived"]`, default: `"Pending"`)

### 9. Settings Schema ([Settings.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Settings.Schema.js))
*   **Fields**: Link accounts (`github`, `linkedin`, `email`, `twitter`, `phone`, `location`). There is only one settings document initialized on database seed.

### 10. Media Schema ([Media.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Media.Schema.js))
*   **Fields**: `name`, `type` (image, video, pdf, raw), `url`, `publicId` (Cloudinary reference), `size` (bytes).

### 11. Testimonial Schema ([Testimonial.Schema.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Schema/Testimonial.Schema.js))
*   **Fields**: `name`, `role`, `company`, `image`, `message`, `rating` (1 to 5), `featured`.

---

## 4. Key Services & Workflows

### Startup Auto-Seeding
On server boot, [server.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/server.js) triggers a seeding routine:
1.  Queries the database to check if a user with `role: "SuperAdmin"` exists.
2.  If none is found, it instantiates an administrator account using credentials defined in `.env`:
    *   Email: `SUPERADMIN_EMAIL` (default: `anubhawgupta664@gmail.com`)
    *   Password: `SUPERADMIN_PASSWORD` (default: `anb@19022205`)
3.  Queries `Settings` collection. If empty, it seeds default contact links and location models.

### Nodemailer SMTP Service
Mail delivery is centralized inside [email.service.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Services/email.service.js):
*   **SMTP Detection**: The service checks for variables `SMTP_USER` and `SMTP_PASS` in the configuration.
*   **SMTP Fallback in Dev**: If credentials are missing, the email content, recipient, subject, and the generated OTP code are printed inside a visual console frame in the terminal instead of failing. This enables easy development testing without configuring an active SMTP server.
*   **Transporter**: If credentials are present, a secure Nodemailer transport connects to the server and fires the email.

### Multi-Factor Authentication (MFA)
The secure login structure runs in a two-stage flow:
1.  **Stage 1: `/api/auth/login/init`**:
    *   Matches incoming email and password.
    *   If correct, generates a 6-digit random code (`otp`).
    *   Sets `otp` and `otpExpires` (Current time + 10 minutes) on the User model.
    *   Sends this OTP to the user's email (or prints to terminal console in case of missing SMTP credentials).
    *   Returns `{ success: true, mfaRequired: true }`.
2.  **Stage 2: `/api/auth/login/verify`**:
    *   Validates the incoming email and OTP code.
    *   Verifies that the current time has not passed the expiration window.
    *   On validation success, it clears `otp` and `otpExpires` fields from the model database.
    *   Generates a short-lived `accessToken` (returns in body) and a long-lived secure `refreshToken` (saved as a HTTP-Only secure cookie).

### Cloudinary File Uploads
Media uploads leverage [Multer Middleware](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Middleware/Upload.Middleware.js) bound to the Cloudinary Storage adapter:
*   Incoming requests with a file payload (e.g. `multipart/form-data`) are intercepted.
*   The middleware automatically pipes the stream to Cloudinary under folders:
    *   `portfolio/images` (images)
    *   `portfolio/videos` (videos)
    *   `portfolio/documents` (PDF files)
    *   `portfolio/media` (generic media assets)
*   Cloudinary uploads return the remote storage URL and public ID, mapping to `req.file.path` and `req.file.filename`.
*   [Media.Controller.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/backend/src/Controllers/Media.Controller.js) saves these to the DB. Deletion checks the asset type and clears it from Cloudinary via `cloudinary.uploader.destroy` before DB removal.

---

## 5. API Endpoints Reference

### 🔐 Auth Routing (`/api/auth`)
*   `POST /seed` : Run SuperAdmin seeding manually (returns message).
*   `POST /login/init` : Validate password and issue MFA OTP.
    *   *Body*: `{ "email": "admin@portfolio.com", "password": "secure_password" }`
*   `POST /login/verify` : Validate OTP and issue auth tokens.
    *   *Body*: `{ "email": "admin@portfolio.com", "otp": "123456" }`
*   `POST /forgot-password` : Request a password reset OTP.
    *   *Body*: `{ "email": "admin@portfolio.com" }`
*   `POST /reset-password` : Confirm OTP and write a new password.
    *   *Body*: `{ "email": "admin@portfolio.com", "otp": "123456", "newPassword": "new_secure_pass" }`
*   `POST /refresh` : Generates a new access token from the refresh token cookie.
*   `POST /logout` `[PROTECTED]` : Clears auth cookies.
*   `GET /profile` `[PROTECTED]` : Returns active SuperAdmin details.
*   `PUT /profile` `[PROTECTED]` : Updates name, email, or password.

### 📁 CRUD Resource Routing
All portfolio CMS routes support public fetching and protected editing:
*   `GET /api/<resource>` : Fetches public entries. Supported resources: `projects`, `stories`, `skills`, `experience`, `certificates`, `testimonials`, `resume/active`, `settings`.
*   `POST /api/<resource>` `[PROTECTED]` : Creates a new resource entry.
*   `PUT /api/<resource>/:id` `[PROTECTED]` : Updates an existing entry by database ID.
*   `DELETE /api/<resource>/:id` `[PROTECTED]` : Removes an entry by ID.

### ✉️ Contact Inbox Routing (`/api/contact`)
*   `POST /` : Public contact submission.
*   `GET /` `[PROTECTED]` : Fetches contact inbox list.
*   `PATCH /:id` `[PROTECTED]` : Update inquiry status (`Pending`, `Read`, `Replied`, `Archived`).
*   `DELETE /:id` `[PROTECTED]` : Delete inbox item.

---

## 6. Development Scripts

From the `/backend` directory:
*   **Install dependencies**:
    ```powershell
    npm install
    ```
*   **Run in development mode** (reloads automatically using `nodemon`):
    ```powershell
    npm run dev
    ```
*   **Start server in production environment**:
    ```powershell
    npm start
    ```
*   **Seed Database Check Script**: Checks MongoDB admin status.
    ```powershell
    node check_db.js
    ```
