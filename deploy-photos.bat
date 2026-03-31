@echo off
echo === Collective 85 Photo Deploy ===
echo.

cd /d "C:\Users\xueg1\Excella Dropbox\Xue Gong\...Biz\.All Websites\collective85"

if not exist "images" (
    mkdir images
    echo Created images folder
)

echo.
echo Checking for photos in images folder...
dir /b images\*.jpg 2>nul | find /c ".jpg"

echo.
echo Adding all changes to git...
git add -A
git commit -m "Add photo gallery with 16 web-optimized images, replace Coming Soon placeholder"
git pull origin main
git push origin main

echo.
echo === Deploy complete! Check collective85.com ===
pause
