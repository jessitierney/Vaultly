#!/bin/bash
cd "c:\Users\jessi\OneDrive\Documents\vAULTLY\vaultly.budget.26"

echo "========== GIT STATUS =========="
git status

echo ""
echo "========== STAGING ALL FILES =========="
git add .

echo ""
echo "========== FILES STAGED =========="
git diff --cached --name-only | head -50

echo ""
echo "========== COMMITTING =========="
git commit -m "Add complete Vaultly project with all source files, configuration, and assets"

echo ""
echo "========== PUSHING =========="
git push origin main

echo ""
echo "========== COMPLETE =========="
