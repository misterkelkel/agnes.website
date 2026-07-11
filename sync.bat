@echo off
REM ============================================================================
REM sync.bat — innerwork circle / agnes.website GitHub Pages publish
REM Run from the repo root: C:\Users\admin\agnes.website\
REM Deploys the production static bundle (index.html, _astro/, admin/) to
REM GitHub Pages. Requires the Astro build to have already run
REM (npm run build --workspace site1-corporate-hub) so root files exist.
REM ============================================================================
setlocal

echo [1/6] git init
git init

echo [2/6] git remote add origin
git remote add origin https://github.com/misterkelkel/agnes.website.git

echo [3/6] git branch -M main
git branch -M main

echo [4/6] git add .
git add .

echo [5/6] git commit
git commit -m "feat: initial multi-site baseline structure"

echo [6/6] git push -u origin main
git push -u origin main

echo Done.
endlocal
