# Team Steam - Frontend Challenge

A modern React application for team management and authentication, built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd frontend-challenge
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## Features

### Authentication
- **User Registration**: New users can create an account using email and password
- **User Login**: Secure authentication system with JWT tokens
- **Protected Routes**: Certain routes are only accessible to authenticated users
- **Persistent Sessions**: User sessions are maintained across page reloads

### Dashboard
- **User Management**: View and manage team members
- **User Details**: Click on any user to view detailed information in a modal
- **Pagination**: Navigate through multiple pages of user data
- **Responsive Design**: Fully responsive layout that works on all device sizes

### Theme System
- **Light/Dark Mode**: Toggle between light and dark themes
- **Persistent Theme**: Theme preference is saved in local storage
- **CSS Variables**: Consistent theming using CSS custom properties

### UI/UX Features
- **Loading States**: Elegant loading indicators during data fetching
- **Error Handling**: User-friendly error messages using toast notifications
- **Form Validation**: Client-side validation using Formik and Yup
- **Responsive Navigation**: Mobile-friendly navigation with user status

### Technical Features
- **TypeScript**: Full TypeScript support for better type safety
- **State Management**: Redux Toolkit for global state management
- **API Integration**: Axios for API calls with interceptors
- **Query Management**: React Query for efficient server state management
- **Routing**: React Router v7 for client-side routing
- **CSS Framework**: TailwindCSS for utility-first styling
- **Code Quality**: ESLint configuration for code quality
- **Modern Tooling**: Vite for fast development and building

## Project Structure

```
src/
├── api/              # API integration and axios setup
├── auth/             # Authentication related components
├── components/       # Reusable UI components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── redux/            # Redux state management
└── types/            # TypeScript type definitions
```

## Authentication Flow

The application uses JWT-based authentication:
1. User registers/logs in
2. Server returns JWT token
3. Token is stored in localStorage
4. Token is included in subsequent API requests
5. User session is maintained until logout

## API Integration

The application integrates with the ReqRes API (https://reqres.in) for demonstration purposes:
- GET /api/users - Fetch users list
- GET /api/users/:id - Fetch single user
- POST /api/register - User registration
- POST /api/login - User authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
