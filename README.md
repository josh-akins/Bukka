# Bukka — Nigerian Food Ordering App

Bukka is a responsive restaurant and food-ordering web application built with React, Vite, and Tailwind CSS. The project aims to provide a convenient way for customers to discover Nigerian meals through a clean, accessible, and mobile-friendly interface.

This project is being developed incrementally, with an emphasis on reusable components, maintainable code, responsive UI design, and practical React development patterns.

**Current milestone:** Phase 1 — App Shell & Landing Page  
**Project status:** Initial frontend implementation  
**Backend integration:** Not yet implemented

## Project Objectives

The goal is to develop a portfolio-ready food-ordering application that progressively introduces real-world frontend development practices, including:

- Component-based UI development and reuse.
- Responsive layouts and mobile-friendly interactions.
- Client-side navigation and page composition.
- Structured menu data and reusable rendering logic.
- State management for future cart and checkout functionality.
- Progressive integration of backend services and persistent order management.

## Phase 1 — App Shell & Landing Page

Phase 1 establishes the visual foundation of the application and introduces the shared layout, landing page, and initial meal-discovery experience.

### Implemented Features

- **Responsive landing page:** Built a hero section with a split-grid layout, prominent calls to action, and responsive image positioning.
- **Featured meals carousel:** Implemented a horizontally scrollable meal carousel supporting touch interactions and native scroll snapping.
- **Desktop carousel controls:** Added previous and next navigation controls with visibility behavior based on the carousel's scroll position.
- **Featured meals page:** Added a dedicated `/featured` route displaying available meals marked as featured.
- **Reusable menu cards:** Developed reusable `MenuCard` components displaying meal images, names, descriptions, categories, and prices.
- **Category resolution:** Mapped category identifiers to readable category names for presentation.
- **Currency formatting:** Displayed meal prices using Nigerian naira formatting.
- **Loading and empty states:** Added skeleton and fallback UI states for featured meal presentation.
- **Image fallback handling:** Provided a default dish image when a meal image cannot be loaded.
- **Shared application layout:** Integrated reusable navigation and footer components across the implemented routes.
- **Client-side routing:** Used React Router to navigate between the home page and featured meals page.

### Current User Experience

Users can visit the home page, discover featured meals, browse the dedicated featured meals page, and navigate between the implemented routes.

At this stage, the application focuses on presentation and meal discovery. The complete ordering workflow has not yet been implemented.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI development |
| Vite 8 | Development server and production build tooling |
| React Router 7 | Client-side navigation |
| Tailwind CSS 4 | Responsive styling and layout |
| Lucide React | Interface icons |
| Simple Icons | Social media icons |
| ESLint | Code quality and linting |

## Getting Started

### Prerequisites

- Node.js compatible with the installed Vite version.
- npm.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/josh-akins/Bukka
cd bukka
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server. |
| `npm run build` | Builds the production application into `dist/`. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint checks. |

## Application Routes

| Route | Description | Status |
|---|---|---|
| `/` | Landing page with hero section and featured meals carousel. | Implemented |
| `/featured` | Displays all available meals marked as featured. | Implemented |
| `/menu` | Full menu with search and category filtering. | Planned |
| `/menu/:id` | Individual meal details. | Planned |
| `/cart` | Shopping cart and quantity management. | Planned |
| `/checkout` | Customer details and order summary. | Planned |
| `/orders` | Customer order history. | Planned |

Routes marked as planned are not part of the current implementation.

## Menu Data and Featured Meals

Menu data is maintained locally in `src/data/menu.js`.

Each menu item can contain the following properties:

- `id`: Unique meal identifier.
- `name`: Meal name.
- `description`: Short meal description.
- `price`: Numeric price in Nigerian naira.
- `category`: Category identifier associated with the category data.
- `image`: Image path relative to the public directory.
- `available`: Indicates whether the meal is available.
- `featured`: Indicates whether the meal should appear in featured sections.

The exported `featuredMenuItems` collection filters the menu to include only meals that are both available and marked as featured.

The home page displays up to six featured meals in the carousel, while the `/featured` page displays the complete filtered collection.

Featured meal selection and availability can be adjusted through the corresponding properties in the local menu data.

## Project Structure

```text
src/
├── assets/          # Brand assets and icon components
├── components/      # Reusable UI components
│   ├── Hero
│   ├── Navbar
│   ├── Footer
│   ├── FeaturedMeal
│   └── menu/
│       └── MenuCard
├── data/            # Local menu and category data
├── layouts/         # Shared page layout
├── pages/           # Home and Featured pages
├── App.jsx          # Router and route definitions
├── main.jsx         # Application entry point
└── index.css        # Global styles and Tailwind CSS
public/
└── images/          # Publicly served image assets
```

## Current Scope and Known Limitations

The following limitations are intentional at this stage and will be addressed as development progresses:

- **Local data only:** Menu records are imported from JavaScript. No backend API or database is connected.
- **No complete ordering workflow:** Order buttons and calls to action are not yet connected to a functional cart or checkout process.
- **Search and filtering:** Navigation search and category filtering are planned for a subsequent milestone.
- **Meal details:** Menu cards may contain links to `/menu/:id`, but the corresponding details route is not yet implemented.
- **Image coverage:** Some menu records reference images that are not currently included in `public/images`. A fallback image is used when an image fails to load.
- **Placeholder destinations:** Links for sections such as Reviews, About Us, and policy pages remain placeholders until their corresponding pages or destinations are implemented.
- **No order persistence:** Customer orders, payments, and order statuses are not connected to a backend.

## Validation

Before committing or merging changes, run the following checks:

```bash
npm run lint
npm run build
```

These commands check for linting issues and verify that the application can be built for production. They should be run before the milestone is considered validated.

Manual verification should also cover:

- Navigation between implemented routes.
- Hero section responsiveness across screen sizes.
- Carousel scrolling and desktop navigation controls.
- Featured meal filtering based on availability and featured status.
- Menu card rendering and image fallback behavior.

## Phase 2 — Menu Discovery & Interaction

With the initial landing page and application shell established, the next milestone will focus on making meal discovery more functional.

Planned work includes:

1. Implementing a dedicated full-menu page.
2. Adding category-based filtering.
3. Implementing meal search.
4. Completing individual meal detail pages.
5. Improving empty states and unavailable-meal behavior.
6. Expanding menu data and improving food image coverage.

Once the menu-discovery experience is working, development will progress to shared cart state, quantity management, checkout, and order history.

## Development Approach

Bukka is being developed in incremental, testable milestones. Each phase builds on the previous one, keeping the application understandable and maintainable while introducing more advanced frontend concepts.

The current release establishes the landing page and shared UI foundation. Subsequent milestones will expand the application from a meal-discovery interface into a functional food-ordering experience.

