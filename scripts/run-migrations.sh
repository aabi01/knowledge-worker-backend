#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Running migrations...${NC}"

# Run migrations
npx typeorm-ts-node-commonjs migration:run -d src/config/typeorm.config.ts

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Migrations completed successfully!${NC}"
else
    echo -e "${RED}Migration failed${NC}"
    exit 1
fi
