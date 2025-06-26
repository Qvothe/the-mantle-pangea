# Azure AD Setup Guide for The Mantle

This guide walks you through setting up Azure AD authentication for The Mantle.

## Prerequisites

- Azure subscription with Azure Active Directory
- Admin access to register applications in Azure AD
- Node.js and npm installed locally

## Step 1: Register Application in Azure AD

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure the application:
   - **Name**: The Mantle - Pangea Internal
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: 
     - Platform: Single-page application (SPA)
     - URI: `http://localhost:3000` (for development)
     - Add `https://themantle.pangeatech.com` for production

## Step 2: Configure Application

1. After registration, note down:
   - **Application (client) ID**: This is your `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`
   - **Directory (tenant) ID**: Use this to build your authority URL

2. Go to **Authentication** section:
   - Under **Single-page application**, add redirect URIs:
     - `http://localhost:3000` (development)
     - `https://themantle.pangeatech.com` (production)
   - Enable **Access tokens** and **ID tokens**
   - Set **Supported account types** to "Single tenant"

3. Go to **API permissions**:
   - Add the following Microsoft Graph permissions:
     - `User.Read` (Delegated)
     - `profile` (Delegated)
     - `openid` (Delegated)
     - `email` (Delegated)
   - Click **Grant admin consent**

## Step 3: Configure The Mantle

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update the values in `.env.local`:
   ```
   NEXT_PUBLIC_AZURE_AD_CLIENT_ID=your-application-client-id
   NEXT_PUBLIC_AZURE_AD_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
   NEXT_PUBLIC_POST_LOGOUT_URI=http://localhost:3000
   ```

## Step 4: Test Authentication

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:3000`
4. You should be redirected to Azure AD login
5. Sign in with your Pangea corporate account
6. You should be redirected back to The Mantle dashboard

## Step 5: Production Deployment

For production deployment:

1. Update redirect URIs in Azure AD to your production domain
2. Update environment variables:
   ```
   NEXT_PUBLIC_REDIRECT_URI=https://themantle.pangeatech.com
   NEXT_PUBLIC_POST_LOGOUT_URI=https://themantle.pangeatech.com
   ```

## Troubleshooting

### Common Issues

1. **AADSTS50011 Error**: The redirect URI doesn't match
   - Ensure the redirect URI in Azure AD matches exactly with your app

2. **AADSTS700054 Error**: response_type 'id_token' is not enabled
   - Enable ID tokens in the Authentication section

3. **CORS Errors**: 
   - Ensure your domain is added to the redirect URIs
   - Check if you're using the correct authority URL

### Security Best Practices

1. Never commit `.env.local` to version control
2. Use environment-specific configurations
3. Regularly rotate client secrets (if using confidential client)
4. Monitor sign-in logs in Azure AD
5. Implement proper session timeout policies

## Additional Resources

- [Microsoft Authentication Library (MSAL) for React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
- [Azure AD Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
- [MSAL.js Configuration](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications)