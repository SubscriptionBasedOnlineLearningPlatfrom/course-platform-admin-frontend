# 🎓 ProLearnX Admin Dashboard

A comprehensive admin dashboard for managing the ProLearnX online learning platform. Built with React 19, Vite, and Tailwind CSS for monitoring users, courses, payments, and platform analytics.

## 🌟 Features

### 👥 User Management
- **User Overview**: View all registered users (instructors, students, admins)
- **User Details**: Access detailed user profiles and activity
- **Role Management**: Manage user roles and permissions
- **User Statistics**: Track user growth and engagement metrics

### 📚 Course Management
- **Course Moderation**: Review and approve/reject new courses
- **Course Analytics**: Monitor course performance and enrollment
- **Content Review**: Ensure course quality and compliance
- **Course Statistics**: Track total courses, categories, and ratings

### 💰 Payment & Revenue
- **Payment Tracking**: Monitor all transactions and payments
- **Revenue Analytics**: View revenue trends and financial metrics
- **Payment History**: Access detailed payment records
- **Subscription Management**: Track student subscriptions and renewals

### 📊 Analytics & Reports
- **Dashboard Overview**: Real-time platform statistics
- **User Growth Charts**: Visualize user acquisition trends
- **Revenue Graphs**: Track financial performance over time
- **Enrollment Metrics**: Monitor course enrollment patterns
- **Interactive Charts**: Powered by Recharts for data visualization

### 🛠️ Platform Administration
- **System Configuration**: Manage platform settings
- **Email Templates**: Configure automated emails
- **Content Moderation**: Review user-generated content
- **Support Management**: Handle user support requests

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend server running on port 4000

### Installation

1. **Navigate to admin frontend directory**
   ```bash
   cd course-platform-admin-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5174
   ```

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Latest React with modern features
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.14** - Utility-first CSS framework

### Data Visualization
- **Recharts 3.2.1** - Composable charting library for analytics

### UI Components
- **Lucide React 0.545.0** - Beautiful icon library
- **Custom Components** - Purpose-built admin UI components

### HTTP & State
- **Axios 1.12.2** - HTTP client for API calls
- **JWT** - Token-based authentication
- **Context API** - Global state management

### Development Tools
- **ESLint 9.36.0** - Code linting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── assets/              # Static assets and images
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Admin navigation sidebar
│   ├── Header.jsx      # Dashboard header
│   ├── charts/         # Chart components (Recharts)
│   └── ...
├── pages/              # Main page components
│   ├── Dashboard.jsx   # Main admin dashboard
│   ├── Users.jsx       # User management page
│   ├── Courses.jsx     # Course management page
│   ├── Payments.jsx    # Payment tracking page
│   └── ...
├── utils/              # Utility functions
│   └── api.js         # API helper functions
├── App.jsx             # Root component with routing
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server on port 5174
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 API Integration

### Backend Configuration
The admin dashboard connects to the backend API on port 4000. Update the API URL in your environment file:

```env
VITE_API_URL=http://localhost:4000
```

### Key API Endpoints

```javascript
// User Management
GET    /admin/users                  // Get all users
GET    /admin/users/:id             // Get user details
PUT    /admin/users/:id             // Update user
DELETE /admin/users/:id             // Delete user

// Course Management
GET    /admin/courses               // Get all courses
GET    /admin/courses/:id           // Get course details
PUT    /admin/courses/:id/approve   // Approve course
DELETE /admin/courses/:id           // Delete course

// Payment Tracking
GET    /admin/payments              // Get all payments
GET    /admin/payments/:id          // Get payment details
GET    /admin/revenue               // Get revenue analytics

// Analytics
GET    /admin/stats                 // Platform statistics
GET    /admin/analytics/users       // User growth data
GET    /admin/analytics/revenue     // Revenue trends
GET    /admin/analytics/enrollments // Enrollment metrics
```

### Authentication
Admin dashboard uses JWT token authentication stored in localStorage:

```javascript
// Set token after login
localStorage.setItem('adminToken', token);

// API calls include Authorization header
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## 📊 Dashboard Components

### Analytics Dashboard
- **User Statistics**: Total users, new users, active users
- **Course Metrics**: Total courses, published, pending approval
- **Revenue Overview**: Total revenue, monthly revenue, payment trends
- **Enrollment Stats**: Total enrollments, completion rates

### Charts & Visualizations
- **Line Charts**: User growth over time, revenue trends
- **Bar Charts**: Course enrollments by category
- **Pie Charts**: User distribution (students vs instructors)
- **Area Charts**: Payment trends and forecasting

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray shades

### Component Categories
- **Layout**: Sidebar, Header, Grid containers
- **Data Display**: Cards, Tables, Charts
- **Feedback**: Alerts, Modals, Toast notifications
- **Navigation**: Menus, Breadcrumbs, Tabs

## 🔐 Authentication Flow

1. **Admin Login**: Secure login with email/password
2. **Token Generation**: Backend generates JWT token
3. **Token Storage**: Store in localStorage as 'adminToken'
4. **Protected Routes**: All admin routes require authentication
5. **Auto Logout**: Redirect to login on token expiration

## 🛡️ Security Features

- **Role-Based Access Control**: Admin-only access
- **JWT Token Validation**: Secure API authentication
- **Protected Routes**: Unauthorized access prevention
- **Session Management**: Auto logout on inactivity
- **Secure API Calls**: HTTPS in production

## 📱 Responsive Design

- **Mobile**: < 640px - Stack layout, hamburger menu
- **Tablet**: 640px - 1024px - Adaptive sidebar
- **Desktop**: > 1024px - Full dashboard with sidebar
- **Large Desktop**: > 1280px - Optimized spacing

## 🐛 Troubleshooting

### Common Issues

**Backend Connection Error**
```bash
# Verify backend is running
curl http://localhost:4000/admin/stats

# Check CORS configuration in backend
# Ensure admin frontend URL is allowed
```

**Authentication Issues**
```javascript
// Check token in localStorage
console.log(localStorage.getItem('adminToken'));

// Clear token and re-login
localStorage.removeItem('adminToken');
```

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**Chart Not Displaying**
- Verify data format matches Recharts requirements
- Check console for errors
- Ensure data is not null/undefined

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` directory.

### Environment Variables
Create `.env.production`:
```env
VITE_API_URL=https://api.prolearnx.com
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 📈 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Bundle Analysis**: Optimized chunk sizes
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Compressed images and fonts
- **API Caching**: Cache analytics data

## 🧪 Testing

```bash
# Run linter
npm run lint

# Preview production build
npm run preview

# Test API endpoints
curl http://localhost:4000/admin/stats
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/admin-feature`)
3. Commit changes (`git commit -m 'Add admin feature'`)
4. Push to branch (`git push origin feature/admin-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Documentation**: Check this README and API docs
- **Issues**: Report bugs via GitHub Issues
- **Email**: support@prolearnx.com

---

Built with ❤️ for ProLearnX Admin Team
