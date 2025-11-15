# CineTaste - Setup Guide

Welcome to CineTaste! This guide will help you set up and run the application locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cinetaste
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/cinetaste?schema=public"

# NextAuth - Generate a random secret
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# TMDB API - Get your API key from https://www.themoviedb.org/settings/api
TMDB_API_KEY="your-tmdb-api-key-here"
TMDB_API_BASE_URL="https://api.themoviedb.org/3"
```

### 4. Get TMDB API Key

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key to the `.env` file

### 5. Set Up the Database

Create a PostgreSQL database:

```bash
# Using PostgreSQL CLI
createdb cinetaste

# Or using psql
psql -U postgres
CREATE DATABASE cinetaste;
\q
```

### 6. Run Database Migrations

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 7. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Management

### View Database in Prisma Studio

```bash
npm run prisma:studio
```

This opens a visual database editor at [http://localhost:5555](http://localhost:5555)

### Reset Database

```bash
npx prisma migrate reset
```

### Create a New Migration

```bash
npx prisma migrate dev --name migration_name
```

## 🏗️ Project Structure

```
cinetaste/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/              # API routes
│   │   ├── page.tsx          # Home page
│   │   ├── watchlist/        # Watchlist page
│   │   ├── history/          # History page
│   │   ├── explore/          # Explore/Search page
│   │   ├── mood/             # Mood recommender
│   │   ├── stats/            # Stats dashboard
│   │   ├── friends/          # Friends & Social
│   │   └── title/            # Title detail pages
│   ├── components/           # React components
│   │   ├── Navbar.tsx
│   │   ├── TitleCard.tsx
│   │   ├── Button.tsx
│   │   ├── RatingStars.tsx
│   │   ├── MoodBadge.tsx
│   │   └── ...
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.ts         # Prisma client
│   │   └── tmdb.ts           # TMDB API client
│   ├── styles/               # Global styles
│   │   └── globals.css
│   └── types/                # TypeScript types
│       └── index.ts
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🎨 Design System

### Color Palette (Cinematic Dark Theme)

- **Primary**: `#E50914` (Red) - Buttons, highlights, accents
- **Secondary**: `#221F1F` (Dark Charcoal) - Cards, panels
- **Accent**: `#F5F5F5` (Off-White) - Text, icons
- **Highlight**: `#B81D24` (Deep Red) - Active states
- **Background**: `#121212` (Blackish) - Main background

### Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- **Headings**: Bold, large sizes with gradient effects
- **Body Text**: Off-white (#F5F5F5) on dark background

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
```

## 📦 Key Dependencies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Next-Auth** - Authentication (ready to implement)
- **Axios** - HTTP client
- **Zustand** - State management

## 🌟 Features

### Core Features

1. **MyWatch List** - Save and organize titles to watch
2. **History Timeline** - Track everything you've watched
3. **Smart Recommendations** - AI-powered suggestions (ready for implementation)
4. **Rating & Review System** - Rate titles with 1-5 stars and mood tags
5. **Title Profile Pages** - Detailed information about each title
6. **Mood Recommender** - Get suggestions based on your mood
7. **Stats Dashboard** - Analytics about your watching habits
8. **Multi-User Support** - Independent accounts (ready for implementation)
9. **Friends & Social** - Permission-based social features (ready for implementation)

### TMDB Integration

The app integrates with The Movie Database (TMDB) API for:
- Movie and TV show data
- Search functionality
- Trending titles
- Similar recommendations
- High-quality posters and backdrops

## 🔐 Authentication (To Implement)

The app is set up for NextAuth.js authentication. To implement:

1. Create authentication pages in `src/app/auth/`
2. Set up NextAuth configuration
3. Add authentication middleware
4. Protect routes as needed

## 🤖 AI Recommendation Engine (To Implement)

The database schema supports an AI recommendation engine that can:
- Analyze user ratings and moods
- Track viewing patterns
- Suggest personalized content
- Offer mood-based recommendations

To implement, create recommendation algorithms that use:
- User rating history
- Mood tag patterns
- Genre preferences
- Viewing frequency

## 🔒 Privacy & Security

- All user data is private by default
- Friends require explicit permission to view activity
- Passwords are hashed with bcryptjs
- Environment variables protect sensitive data
- HTTPS recommended for production

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Compatible with any platform supporting Next.js:
- Netlify
- Railway
- Render
- DigitalOcean

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in .env
DATABASE_URL="postgresql://username:password@localhost:5432/cinetaste"
```

### TMDB API Issues

- Ensure your API key is valid
- Check API rate limits
- Verify `TMDB_API_KEY` in `.env`

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is currently unpublished and proprietary. Contact the owner for usage permissions.

## 💡 Tips

- Use Prisma Studio for easy database management
- Check the browser console for API errors
- Enable React DevTools for component debugging
- Use the `/stats` page to see your activity patterns

---

**Need Help?** Check the documentation or open an issue!

Happy watching! 🎬🍿
