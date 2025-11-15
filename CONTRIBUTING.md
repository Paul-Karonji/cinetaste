# Contributing to CineTaste

Thank you for your interest in contributing to CineTaste! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add: your feature description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📝 Commit Message Guidelines

We follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add mood-based filtering to watchlist
fix: resolve rating star display issue
docs: update setup instructions
```

## 🎨 Code Style

- Use TypeScript for all new files
- Follow the existing code structure and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind CSS for styling (avoid custom CSS when possible)

## 🧪 Testing

Before submitting a PR:

1. Test your changes locally
2. Ensure the app builds without errors: `npm run build`
3. Check for linting errors: `npm run lint`
4. Verify database migrations work if you modified the schema

## 📂 Project Structure

- `/src/app` - Next.js pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/src/types` - TypeScript type definitions
- `/prisma` - Database schema and migrations

## 🔍 Pull Request Process

1. Ensure your PR description clearly describes the problem and solution
2. Include screenshots for UI changes
3. Reference any related issues
4. Update documentation if needed
5. Wait for review and address any feedback

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

## 💡 Feature Requests

We welcome feature requests! Please:

- Check if the feature already exists or has been requested
- Clearly describe the feature and its benefits
- Explain the use case
- Be open to discussion and feedback

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help maintain a positive community

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

## ❓ Questions?

Feel free to open an issue for any questions about contributing!

Thank you for contributing to CineTaste! 🎬
