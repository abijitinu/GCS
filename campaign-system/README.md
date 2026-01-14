# P&G Campaign System

This is a modern web application for managing P&G marketing campaigns, built with Vite, React, and Vanilla CSS variables for the P&G design system.

## Features

- **Dashboard**: High-level overview of engagement, active brands, and reach.
- **Campaign Management**: Track campaigns like "Widen The Screen" across regions.
- **Design System**: Implements P&G's corporate identity (Blue #003DA5, Montserrat font).
- **Responsive Layout**: Sidebar navigation and glassmorphic header.
- **Data Visualization**: Integrated Chart.js for analytics.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (CSS Variables) + Inline styles for dynamic components.
- **Icons**: Lucide React
- **Charts**: Chart.js / React-Chartjs-2
- **Animations**: Framer Motion

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

- `src/components/layout`: Sidebar, Header, Layout wrapper.
- `src/pages`: Dashboard and placeholder pages for other modules.
- `src/index.css`: Global styles and Design Tokens.

## Assets

- "Widen The Screen" assets are referenced via Unsplash placeholders and CSS gradients to match the visual identity found on the P&G media center.
