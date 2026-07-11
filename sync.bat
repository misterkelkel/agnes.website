@echo off
REM ============================================================================
REM sync.bat — innerwork circle / agnes.website  (automated build + deploy)
REM Run from the repo root: C:\Users\admin\agnes.website\
REM
REM 1. Builds each Astro project inside  _source\<site>\  (its "build" script
REM    runs `astro build` then `publish.mjs`, which copies _source\<site>\dist\*
REM    into the matching root subfolder AND rewrites asset URLs to relative
REM    ./_astro/...  so the site works under BOTH local file:// and GitHub Pages).
REM 2. Runs the git pipeline: add / commit / force-push to origin main.
REM
REM Source is kept out of the deploy via .gitignore (_source/, node_modules/, .astro/).
REM Only the root index.html (Master Portal) + the 3 published subfolders ship.
REM ============================================================================
setlocal EnableDelayedExpansion
cd /d "%~dp0"

set "SITES=site1-corporate-hub site2-media-studios site3-community-portal"

echo [1/4] Building + publishing all three projects from _source/
for %%S in (%SITES%) do (
  echo   -> %%S
  pushd "_source\%%S"
  if errorlevel 1 (
    echo   [ERROR] cannot enter _source\%%S — aborting.
    exit /b 1
  )
  call npm run build
  if errorlevel 1 (
    echo   [ERROR] npm run build failed for %%S — aborting.
    popd
    exit /b 1
  )
  popd
)

echo [2/4] git add .
git add .

echo [3/4] git commit
git commit -m "chore: automated multi-site production build"
if errorlevel 1 (
  echo   [NOTE] nothing to commit (tree clean) — continuing to push.
)

echo [4/4] git push origin main --force
git push origin main --force
if errorlevel 1 (
  echo   [ERROR] git push failed — check remote/credentials.
  exit /b 1
)

echo.
echo Done. Master Portal + 3 hubs pushed to origin/main.
endlocal
