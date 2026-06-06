#!/usr/bin/env bash
# =============================================================================
# setup.sh — Bootstrap script for the ecommerce platform monorepo
# =============================================================================
# Usage: bash scripts/setup.sh
# =============================================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}  Ecommerce Platform — Monorepo Setup${NC}"
echo -e "${BLUE}=====================================================${NC}"
echo ""

# ---------------------------------------------------------------------------
# Check prerequisites
# ---------------------------------------------------------------------------
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Node.js
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js is not installed. Install Node 20+ from https://nodejs.org${NC}"
  exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo -e "${RED}✗ Node.js version must be >= 20. Current: $(node --version)${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# pnpm
if ! command -v pnpm &> /dev/null; then
  echo -e "${YELLOW}  pnpm not found. Installing pnpm@9...${NC}"
  npm install -g pnpm@9
fi
echo -e "${GREEN}✓ pnpm $(pnpm --version)${NC}"

# Git
if ! command -v git &> /dev/null; then
  echo -e "${RED}✗ Git is not installed.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Git $(git --version | cut -d' ' -f3)${NC}"

echo ""

# ---------------------------------------------------------------------------
# Environment setup
# ---------------------------------------------------------------------------
echo -e "${YELLOW}Setting up environment variables...${NC}"

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "${GREEN}✓ Created .env from .env.example${NC}"
  echo -e "${YELLOW}  ⚠ Don't forget to fill in your values in .env${NC}"
else
  echo -e "${GREEN}✓ .env already exists${NC}"
fi

echo ""

# ---------------------------------------------------------------------------
# Install dependencies
# ---------------------------------------------------------------------------
echo -e "${YELLOW}Installing dependencies...${NC}"
pnpm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# ---------------------------------------------------------------------------
# Setup Git hooks
# ---------------------------------------------------------------------------
echo -e "${YELLOW}Setting up Husky git hooks...${NC}"
pnpm husky 2>/dev/null || echo -e "${YELLOW}  (Husky setup will complete after first git commit)${NC}"
echo -e "${GREEN}✓ Git hooks configured${NC}"
echo ""

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo -e "${GREEN}=====================================================${NC}"
echo -e "${GREEN}  Setup complete! 🎉${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo ""
echo -e "Next steps:"
echo -e "  1. Fill in your values in ${BLUE}.env${NC}"
echo -e "  2. Run ${BLUE}pnpm --filter api exec prisma generate${NC}"
echo -e "  3. Run ${BLUE}pnpm --filter api exec prisma migrate dev${NC}"
echo -e "  4. Run ${BLUE}pnpm dev${NC} to start all apps"
echo ""
echo -e "  📖 See ${BLUE}docs/development-guide.md${NC} for more details"
echo ""
