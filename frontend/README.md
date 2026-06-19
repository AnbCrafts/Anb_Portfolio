# Portfolio Frontend Client Guide

This is the public-facing React application for the developer portfolio. It is designed to be highly interactive, modern, performant, and reliable. The client fetches database entries dynamically via the REST API and incorporates a robust fallback system using static mock databases so that the UI remains fully populated and visually stunning even if the backend is offline.

---

## 1. Technical Stack
*   **Core framework**: React 19 (Vite Single Page Application bundler)
*   **Styling (CSS)**: Tailwind CSS v4 (incorporating modern utility configurations and variables)
*   **State Management**: Redux Toolkit & React Redux
*   **Animations**: Framer Motion (used for entry fades, stagger grids, hover expansions, and page transitions)
*   **Icons**: Lucide React
*   **HTTP Client**: Axios (with shared configurations)
*   **Form Management**: React Hook Form + Zod resolvers for input checking

---

## 2. Folder Structure Overview

```
frontend/
├── src/
│   ├── Api/               # API endpoint service files
│   ├── Axios/             # Axios instance client configuration
│   ├── Components/        # Reusable UI widgets, cards, layouts
│   ├── DB/                # Fallback static database files
│   ├── Pages/             # Individual page components (views)
│   ├── Store/             # Redux slice state controllers
│   ├── animations/        # Custom motion transition sets
│   ├── assets/            # Static images and icons
│   ├── App.css            # Stylesheets
│   ├── App.jsx            # Main app router
│   ├── index.css          # Tailwind boot styling
│   ├── main.jsx           # Entry point mounting index
│   └── store.js           # Redux store config
```

### Folder Roles
*   **[Api](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Api)**: Exports modular Axios API request functions for each backend collection (e.g. [project.api.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Api/project.api.js), [settings.api.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Api/settings.api.js)).
*   **[Axios](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Axios)**: Builds [axiosInstance.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Axios/axiosInstance.js) configured with `baseURL` (`import.meta.env.VITE_API_URL`) and `withCredentials: true`.
*   **[Components](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Components)**: Shared items including Navbar, Footer, ProjectCard, and special visual timelines.
*   **[DB](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/DB)**: Hosts local Javascript arrays of portfolio content ([FrontendProjects.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/DB/FrontendProjects.js), [FullStackProjects.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/DB/FullStackProjects.js), [StoryDB.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/DB/StoryDB.js)) used for fallback seeding.
*   **[Pages](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages)**: High-level view nodes mapped to the application routes.
*   **[Store](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Store)**: Implements [portfolioStore.js](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Store/portfolioStore.js) slice logic.
*   **[animations](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/animations)**: Stores transition settings like fade-ins, card flyouts, and layout stagger effects.

---

## 3. Redux Store & Portfolio Data Pipeline

State management is centralized in the Redux store to coordinate fetching public content and sending messages:

### Portfolio Slice Async Thunks
1.  **`fetchPortfolioData`**: 
    *   Triggers when the app starts or when pages refresh.
    *   Dispatches parallel HTTP requests using `Promise.all` to fetch all public portfolio resource data:
        *   `getProjects()`, `getStories()`, `getSkills()`, `getExperiences()`, `getCertificates()`, `getSettings()`, `getTestimonials()`, `getActiveResume()`.
    *   Saves the results directly to the Redux state arrays.
    *   Gracefully catches errors (e.g. if the resume is not yet uploaded) to avoid blocking the rest of the application data flow.
2.  **`submitContactForm`**:
    *   Sends user inquiries from the Hire/Contact page to the server endpoint `/api/contact`.
    *   Manages loading states (`idle`, `loading`, `succeeded`, `failed`) and stores response messages.

### Redux Initial State
```javascript
{
  projects: [],
  stories: [],
  skills: [],
  experience: [],
  certificates: [],
  testimonials: [],
  settings: null,
  activeResume: null,
  loading: false,
  error: null,
  submitContactStatus: 'idle',
  submitContactError: null,
}
```

---

## 4. Dynamic-to-Static Fallback Flow

To ensure the portfolio is always functional and populated (even without database network connections), components implement a hybrid data retrieval mechanism:

1.  **Fetch Dispatch**: The application dispatches `fetchPortfolioData` when loading.
2.  **Redux Check**: Components query the Redux state (e.g., `useSelector((state) => state.portfolio.projects)`).
3.  **Fallback Evaluation**:
    *   If database records exist, the component maps and renders the database content.
    *   If the database connection fails, the API returns an error, or the lists are empty, the component falls back to static seed data imported from the `src/DB/` folder or local mock arrays.
    *   *Example in Code* ([Stories.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/Stories.jsx)):
        ```javascript
        const dbStories = useSelector((state) => state.portfolio.stories);
        const mappedDbStories = dbStories.map(story => ({ ... }));
        // If DB stories array is empty, swap to fallback
        const stories = mappedDbStories.length > 0 ? mappedDbStories : storiesFallback;
        ```

This architecture ensures high availability for recruiters and visitors, preventing broken page layouts or blank states.

---

## 5. Client Routing Overview

The client uses `react-router-dom` to route between layout views:
*   `/` ([Home.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/Home.jsx)): Landing page overview, summary introduction.
*   `/about` ([AboutPage.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/AboutPage.jsx)): Detailed background, skill proficiencies grid, experience/education timelines, certifications gallery, and references.
*   `/projects` ([ProjectPage.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/ProjectPage.jsx)): Tabs filter layout separating Projects (Frontend, Fullstack, AI) and featuring an archive grid list.
*   `/stories` ([Stories.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/Stories.jsx)): Timeline interface illustrating career highlights, hackathons, and certifications.
*   `/stories/:slug` ([SingleStory.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/SingleStory.jsx)): Deep-dive modal view of a specific journey milestone showing technologies used, lessons learned, and galleries.
*   `/hire` ([Hire.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/Hire.jsx)): Contact page integrating an interactive contact form and showing general availability status.
*   `*` ([NotFound.jsx](file:///e:/Anb_Carfts_Projects/Target%20CV/Portfolio/frontend/src/Pages/NotFound.jsx)): Custom 404 page redirecting to home.

---

## 6. Development Scripts

From the `/frontend` directory:
*   **Install dependencies**:
    ```powershell
    npm install
    ```
*   **Run development server**:
    ```powershell
    npm run dev
    ```
    The client website starts running locally on port `5173`.
*   **Build production bundle**:
    ```powershell
    npm run build
    ```
*   **Preview production build locally**:
    ```powershell
    npm run preview
    ```
