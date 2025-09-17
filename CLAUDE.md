# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Max Leilão is a SaaS web platform for aggregating vehicle auction data in Brazil. The application serves as a centralized hub for buyers and sellers to find auction vehicles from multiple leiloeiros (auctioneers) across the country, eliminating the need to manually monitor 150+ leiloeiro websites in São Paulo and 3,000+ nationwide.

The platform consumes data from an external scraping service, provides advanced filtering capabilities inspired by Web Motors, and sends notifications (including WhatsApp alerts) about new vehicles matching user interests.

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **UI Components**: Shadcn/ui (New York style) with extensive registry support
- **TypeScript**: v5 with strict configuration
- **Fonts**: Geist Sans and Geist Mono
- **Build Tools**: Turbopack enabled for dev and build

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Directory Structure
```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── layout.tsx       # Root layout with Geist fonts
│   ├── page.tsx         # Home page (currently default Next.js template)
│   └── globals.css      # Global styles with Tailwind and custom theme
└── lib/
    └── utils.ts         # Utility functions (cn for class merging)
```

### Styling System
- Uses Tailwind CSS v4 with inline theme configuration
- Custom CSS variables for light/dark mode support
- Pre-configured design system with neutral base color
- Border radius system (sm, md, lg, xl variants)
- Custom sidebar, chart, and accent color variants

## Shadcn/ui Configuration

The project is configured with extensive UI library registries:
- Style: New York
- Base color: Neutral
- CSS variables enabled
- Path aliases configured (@/components, @/lib, @/hooks, etc.)
- Icon library: Lucide React
- 30+ external registries available (@aceternity, @magicui, @originui, etc.)

## Available MCP Tools

### Context7 (Documentation & Library Management)
**ALWAYS** search Context7 documentation before adding new dependencies

### Shadcn/UI (Component Management)
**ALWAYS** use MCP Shadcn tools for importing and installing components

### GitHub (Version Control & Project Management)
**ALWAYS** use MCP GitHub tools for all Git operations and project management

### Playwright (Browser Testing & Automation)
**ALWAYS** use MCP Playwright for visual testing and browser automation

### Vercel (Deployment & Hosting)
**ALWAYS** use MCP Vercel for deployment and hosting management

### IDE Integration
**Use for development environment integration**

## Development Workflow Guidelines

### Adding Dependencies
1. Use Context7 tools to find library documentation
2. Install and configure following best practices

### UI Development
1. Use Shadcn tools to find and install components
2. Get usage examples and verify installation

### Testing & QA
1. Use Playwright for browser testing and automation
2. Take screenshots and accessibility snapshots

### Version Control
1. Use GitHub tools for all Git operations
2. Manage pull requests and code reviews

### Deployment
1. Use Vercel tools to deploy and manage hosting
2. Debug deployment issues with build logs

## Project Context

### Business Requirements
- Client: Vitor Lima (experienced auction buyer/seller)
- Target: 150+ leiloeiros in São Paulo, 3,000+ in Brazil
- Data source: External scraping service (updates twice daily)
- Key features: Advanced filtering, WhatsApp notifications, financial calculator
- External dependency: Scraping service API integration required
- Brand identity: Pre-existing "Max Leilão" visual identity to be followed

### Technical Dependencies
- External scraping service for auction data
- WhatsApp integration for notifications
- Financial calculator integration
- Redirect mechanism to original leiloeiro websites

### Project Constraints
- Critical deadline: Early November
- Landing page requirement (added scope)
- Must maintain existing brand visual identity