@echo off
set PATH=%PATH%;C:\Program Files\nodejs

cd /d "C:\Users\lenovo\Documents\Default Project\pizza-ride01\pizza-ride01-main"

echo Starting Pizza Ride API server on http://localhost:3000 ...
start "Pizza Ride API" cmd /k "set PORT=3000 && set NODE_ENV=development && pnpm --filter @workspace/api-server run dev"

timeout /t 3 /nobreak >nul

echo Starting Pizza Ride website on http://localhost:5173 ...
set PORT=5173
set BASE_PATH=/
set NODE_ENV=development
call pnpm --filter @workspace/pizza-ride run dev
