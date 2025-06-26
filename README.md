# The Mantle - Pangea's Internal Culture Hub

## Overview
The Mantle is a comprehensive internal culture hub that celebrates achievements, tracks metrics, and embodies Pangea's values through product-themed design. It serves as the cultural heartbeat of the organization.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access at http://localhost:3000
```

See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions.

## Features

### Left Panel
- **Rolling Values**: Company values with GOAT examples
- **Event Countdown**: Real-time countdowns to important events
- **Must Watch**: Curated content from colleagues
- **Competitions**: Ongoing challenges and contests

### Main Content
- **News Carousel**: Latest updates across 5 categories
- **Live Analytics Ticker**: Real-time company metrics
- **Awards Section**: Predictions and betting system
- **Pangea By Numbers**: Comprehensive metrics dashboard
- **Legendary Leaderboards**: Fun rankings and achievements

## Tech Stack
- **Frontend**: Next.js 15.2.4, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Azure AD (MSAL) with mock fallback
- **Features**: PWA support, real-time updates, responsive design

## Project Status

**Current State**: Functional Prototype  
**Production Ready**: ❌ (Score: 30/100)

### What's Complete ✅
- Full UI/UX implementation
- Responsive design (no horizontal scroll)
- Component architecture
- Mock authentication
- PWA configuration

### What's Missing ❌
- Backend API (all data mocked)
- Database integration
- Test coverage (87.5% failing)
- Production authentication
- Monitoring/logging
- Deployment configuration

See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for detailed status.

## Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Testing
npm test

# Build
npm run build

# Full production check
npm run test:prod
```

## Documentation

- [Project Plan](./projectplan.md) - Detailed development plan and backlog
- [Quick Start Guide](./QUICK_START.md) - Setup and demo instructions
- [Production Checklist](./PRODUCTION_CHECKLIST.md) - Production readiness assessment
- [Test Results](./PRODUCTION_TEST_RESULTS.md) - Latest test results
- [Azure AD Setup](./docs/AZURE_AD_SETUP.md) - Authentication configuration

## Contributing

This is an internal Pangea project. Please follow the existing code patterns and ensure all tests pass before submitting changes.

## License

Proprietary - Pangea Technologies Internal Use Only

---

🚀 Built with love by the Pangea team