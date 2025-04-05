chay react native voi port khac : yarn start --port=4444

xem port dang chay: netstat -ano | findstr :8081
dung: taskkill /PID 24160 /F


rmdir /s /q node_modules

gradlew clean

npx react-native run-android
