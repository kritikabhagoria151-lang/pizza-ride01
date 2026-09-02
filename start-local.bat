@echo off
for /f "usebackq eol=# tokens=1,* delims==" %%A in ("%~dp0pizza-ride01-main\.env") do set "%%A=%%B"
start cmd /k "cd /d C:\Users\lenovo\Documents\Default Project\pizza-ride01\pizza-ride01-main\artifacts\api-server && set PORT=3000 && set NODE_ENV=development && node --enable-source-maps ./dist/index.mjs"
timeout /t 3 /nobreak
start cmd /k "cd /d C:\Users\lenovo\Documents\Default Project\pizza-ride01\pizza-ride01-main\artifacts\pizza-ride && pnpm run dev"