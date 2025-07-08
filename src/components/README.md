# Components Directory Structure

This directory contains all React components organized by functionality and reusability.

## Main Components (Root Level)

These are the primary, high-level components used directly in pages:

- **`HabitForm.tsx`** - Form for creating new habits
- **`HabitGrid.tsx`** - Main grid displaying all habits and their completion status
- **`Header.tsx`** - Page header with title and description

## Subdirectories

### `habit-grid/`

Components specific to the habit grid functionality:

- **`HabitGridHeader.tsx`** - Header row with day labels and dates
- **`HabitRow.tsx`** - Individual habit row with day cells and actions
- **`HabitDayCell.tsx`** - Single day cell for habit completion tracking

### `navigation/`

Navigation-related components:

- **`WeekNavigation.tsx`** - Week navigation controls (prev/next/current week)

### `ui/`

Reusable UI components that can be used across the application:

- **`Notification.tsx`** - Generic notification component for success/error messages

## Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Modularity**: Components are organized by domain and reusability
- **SOLID Principles**: Following dependency inversion and interface segregation
- **Functional Programming**: All components are pure functions with TypeScript interfaces

## Import Patterns

```typescript
// Main components
import { HabitForm } from "@/components/HabitForm";
import { HabitGrid } from "@/components/HabitGrid";
import { Header } from "@/components/Header";

// Subdirectory components
import { HabitGridHeader } from "@/components/habit-grid/HabitGridHeader";
import { WeekNavigation } from "@/components/navigation/WeekNavigation";
import { Notification } from "@/components/ui/Notification";
```

## Test Structure

Test files mirror the component structure in `tests/components/` with the same subdirectory organization.
