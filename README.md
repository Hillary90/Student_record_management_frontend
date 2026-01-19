# Student Record Management - Frontend

A modern React application for managing student records with a clean, responsive interface built with Vite and Tailwind CSS.

## Live Demo

**[View Live Application](https://hillary90.github.io/Student_record_management_frontend/)**

**[Backend Repository](https://github.com/Hillary90/Student_record_management_backend.git)**

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Student Management**: Add, view, edit, and delete student records
- **Grade Tracking**: Manage student grades and academic performance
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time API Status**: Connection status indicator
- **Protected Routes**: Secure navigation with authentication guards

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 
- **Routing**: React Router DOM 
- **HTTP Client**: Axios
- **Icons**: Lucide React 
- **Notifications**: React Toastify 

## Prerequisites

- Node.js 16+
- npm 

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hillary90/Student_record_management_frontend.git
   cd Student_record_management_frontend/srm_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Configuration

Environment variables in `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production (`.env.production`):
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## Project Structure

```
src/
├── api/                 # API configuration
├── assets/             # Static assets
├── components/         # Reusable components
│   ├── auth/          # Authentication components
│   ├── common/        # Common UI components
│   ├── grades/        # Grade-related components
│   ├── layout/        # Layout components
│   └── students/      # Student-related components
├── context/           # React context providers
├── pages/             # Page components
├── services/          # API service functions
├── App.jsx           # Main app component
├── index.css         # Global styles
└── main.jsx          # App entry point
```

## Key Components

### Authentication
- **LoginPage**: User login with API status indicator
- **Register**: User registration form
- **ProtectedRoute**: Route protection wrapper
- **AuthContext**: Authentication state management

### Student Management
- **Students**: Student list with search and filters
- **StudentDetail**: Individual student view
- **StudentForm**: Add/edit student form
- **StudentCard**: Student display card

### Grade Management
- **Grades**: Grade list and management
- **GradeForm**: Add/edit grade form

### Layout
- **Layout**: Main application layout
- **Navbar**: Top navigation bar
- **Sidebar**: Side navigation menu

### Common Components
- **Button**: Reusable button component
- **Input**: Form input component
- **Modal**: Modal dialog component
- **Loading**: Loading spinner component
- **SearchBar**: Search functionality
- **Select**: Dropdown select component

## API Integration

The frontend communicates with the backend API through:

- **Axios Configuration**: Centralized HTTP client setup
- **Service Layer**: Organized API calls by feature
- **Error Handling**: Consistent error management
- **Authentication**: JWT token management
  
## Security

- **JWT Storage**: Secure token handling
- **Route Protection**: Authentication guards
- **Input Validation**: Form validation and sanitization
- **HTTPS**: Use HTTPS in production

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Use meaningful commit messages

## License

This project is licensed under the MIT License.