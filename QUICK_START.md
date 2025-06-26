# The Mantle - Quick Start Guide

## 🚀 Running in Demo Mode (No Azure AD Required)

The application now supports a demo mode that allows you to run and test The Mantle without configuring Azure AD.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Access the Application
Open your browser and navigate to: http://localhost:3000

### 4. Login with Demo Accounts
The application will automatically detect that Azure AD is not configured and show demo login options:

- **Demo User** (demo@pangeatech.com) - Regular employee access
- **Vivek N** (vivek.n@pangeatech.com) - CEO access
- **Admin User** (admin@pangeatech.com) - IT Admin access

Select any user from the dropdown and click "Sign in".

## 🔐 Setting Up Azure AD (Production)

To use real Azure AD authentication:

### 1. Create `.env.local` file
```bash
cp .env.local.example .env.local
```

### 2. Add your Azure AD credentials
```env
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=your-actual-client-id
NEXT_PUBLIC_AZURE_AD_AUTHORITY=https://login.microsoftonline.com/your-actual-tenant-id
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
NEXT_PUBLIC_POST_LOGOUT_URI=http://localhost:3000
```

### 3. Configure Azure AD
Follow the detailed guide in `/docs/AZURE_AD_SETUP.md`

## 🎯 Features to Explore

Once logged in, explore these features:

1. **Left Panel**
   - Rolling Values with GOAT perspectives
   - Event Countdown timers
   - Must Watch content
   - Current Competitions

2. **Main Dashboard**
   - News Carousel
   - Live Analytics Ticker
   - Awards Predictions
   - Pangea By Numbers
   - Legendary Leaderboards

3. **Navigation**
   - Analytics page (`/analytics`)
   - Awards Center (`/awards`)
   - User profile (top right dropdown)

## 📱 Mobile Experience

The application is fully responsive. Try resizing your browser or accessing from a mobile device.

## 🐛 Troubleshooting

### "Cannot read properties of undefined"
- Clear your browser cache and cookies
- Restart the development server

### Authentication loops
- Clear sessionStorage: Open DevTools > Application > Storage > Clear Site Data

### Styles not loading
- Make sure you're running `npm run dev` (not `npm start`)
- Check that Tailwind CSS is properly configured

## 📞 Support

For issues or questions:
- Check `/docs/AZURE_AD_SETUP.md` for Azure AD configuration
- Review the project documentation in `/PROJECT_COMPLETE.md`
- Report issues in the project repository

---

**Happy exploring The Mantle! 🎉**