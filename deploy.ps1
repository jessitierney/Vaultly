$workdir = "c:\Users\jessi\OneDrive\Documents\vAULTLY\vaultly.budget.26"
Set-Location $workdir

Write-Host "====== GIT STAGING AND COMMIT ======"
Write-Host ""

# Stage all files
Write-Host "[1] Staging all files..."
git add .

# Show status
Write-Host "[2] Checking git status..."
$status = git status --porcelain
$count = ($status | Measure-Object -Line).Lines
Write-Host "Files staged: $count"

# Show sample of files
Write-Host ""
Write-Host "[3] Sample of staged files:"
$status | Select-Object -First 20

# Count by type
Write-Host ""
$added = ($status | Where-Object { $_ -match "^A  " } | Measure-Object -Line).Lines
$modified = ($status | Where-Object { $_ -match "^ M " } | Measure-Object -Line).Lines
Write-Host "Added: $added"
Write-Host "Modified: $modified"

# Commit
Write-Host ""
Write-Host "[4] Creating commit..."
git commit -m "Initial commit: Add complete Vaultly project with all source files, configuration, and assets"

# Show result
Write-Host ""
Write-Host "[5] Commit result:"
git log --oneline -1

Write-Host ""
Write-Host "====== PUSH TO GITHUB ======"
Write-Host "[6] Pushing to GitHub..."
git push origin main -v

Write-Host ""
Write-Host "====== PUSH COMPLETE ======"
