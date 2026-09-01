$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Set-Location "C:\Users\lenovo\Documents\Default Project\pizza-ride01\pizza-ride01-main"

Write-Host "Starting Pizza Ride API server on http://localhost:3000 ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:PORT='3000'; `$env:NODE_ENV='development'; pnpm --filter @workspace/api-server run dev"

Start-Sleep -Seconds 3

Write-Host "Starting Pizza Ride website on http://localhost:5173 ..."
$env:PORT = "5173"
$env:BASE_PATH = "/"
$env:NODE_ENV = "development"
pnpm --filter @workspace/pizza-ride run dev
