# Habit Tracker TDD

A modern habit tracking application built with Next.js 15, following Test-Driven Development (TDD) principles and clean architecture patterns.

## 🎯 Overview

This habit tracker helps users build consistent daily habits by providing an intuitive weekly view for tracking completions. The application demonstrates professional development practices including TDD, SOLID principles, and optimized client-server architecture.

## ✨ Features

- **Weekly Habit Tracking**: Visual grid showing habit completion status for each day
- **Interactive Management**: Add new habits, mark daily completions, and archive habits
- **Week Navigation**: Browse between different weeks and jump to current week
- **Real-time Feedback**: Success/error notifications for user actions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Data Persistence**: Local storage implementation for habit data

## 🏗️ Architecture

### Design Principles

- **Test-Driven Development (TDD)**: All features developed test-first
- **SOLID Principles**: Clean, maintainable, and extensible code
- **Domain-Driven Design**: Clear separation of business logic and presentation
- **Server-First Rendering**: Maximized server components for optimal performance

### Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # React components (organized by domain)
│   ├── habit-grid/        # Habit grid specific components
│   ├── navigation/        # Navigation components
│   └── ui/               # Reusable UI components
├── domain/               # Business logic and entities
│   └── habit/           # Habit domain models and services
├── hooks/               # Custom React hooks
└── lib/                # Utility functions and configurations

tests/
├── components/         # Component tests (mirrors src/components)
├── domain/            # Domain logic tests
└── hooks/            # Hook tests
```

### Component Architecture

#### Server Components (Optimized for Performance)

- `HabitGrid` - Main habit tracking grid
- `HabitGridHeader` - Grid header with day labels
- `HabitRow` - Individual habit rows
- `Header` - Page header
- `WeekNavigation` - Week navigation controls
- `Notification` - Success/error messages

#### Client Components (Interactive Elements)

- `HabitForm` - Habit creation form with validation
- `HabitDayCell` - Individual day cells with click handlers
- `page.tsx` - Main page with state management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library
- **Styling**: Tailwind CSS
- **State Management**: Custom hooks with React state
- **Data Storage**: Local Storage (with repository pattern)
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd habit-tracker-tdd

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000/habits](http://localhost:3000/habits) to view the application.

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Testing
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage

# Code Quality
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## 🧪 Testing Strategy

The project follows TDD methodology with comprehensive test coverage:

- **Unit Tests**: Domain logic, utilities, and individual components
- **Integration Tests**: Component interactions and data flow
- **Hook Tests**: Custom React hooks behavior
- **Repository Tests**: Data persistence layer

Run tests with:

```bash
pnpm test
```

## 📦 Domain Model

### Core Entities

```typescript
interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  isArchived: boolean;
}

interface HabitCompletion {
  habitId: string;
  date: string; // ISO date string
  completed: boolean;
}
```

### Services

- **HabitService**: Core business logic for habit management
- **HabitRepository**: Data persistence abstraction
- **LocalStorageHabitRepository**: Browser storage implementation

## 🎨 UI/UX Features

- **Intuitive Grid Layout**: Weekly view with clear visual indicators
- **Status Indicators**: ✓ completed, ✗ incomplete, ○ no data
- **Today Highlighting**: Current day highlighted with blue ring
- **Future Date Protection**: Cannot mark future dates as completed
- **Responsive Design**: Works seamlessly on all device sizes
- **Accessible**: Proper ARIA labels and keyboard navigation

## 🚀 Performance Optimizations

- **Server-Side Rendering**: Maximum use of server components
- **Optimized Bundle**: Minimal client-side JavaScript
- **Static Generation**: Pre-rendered pages for better performance
- **Efficient Re-renders**: Optimized state management and component structure

## 🔮 Future Enhancements

- Backend integration (API routes)
- User authentication
- Habit statistics and analytics
- Habit categories and tags
- Export/import functionality
- Progressive Web App (PWA) features

## 📝 Development Notes

This project demonstrates modern React/Next.js development practices:

- **Clean Architecture**: Separation of concerns with clear boundaries
- **Type Safety**: Full TypeScript implementation
- **Component Composition**: Reusable, composable components
- **Performance**: Optimized rendering and bundle size
- **Maintainability**: Well-structured, documented, and tested code

## 📄 License

[Add your license here]
