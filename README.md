Patryk Mansfeld - Zadanie Programistyczne

    Zadanie programistyczne zostało wykonane przy pomocy frameworka Next.js z użyciem typescript.
    Zostały także użyte dodatkowe biblioteki takie jak:
        - axios
        - tailwind css 

W celu uruchomienia zadania należy przejść w pierwszej kolejniości do folderu "meteo-server"

    1. cd RPA-Recruitment-Patryk-Mansfeld
    2. cd meteo-server

następnie należy pobrać wszystkie wymagane paczki komendą

    npm install

a następnie odpalić serwer backednowy komendą 

    npm start

po zrealizowaniu tych kroków server backendowy który będzie dostarczał dane do aplikacji frontendowej będzie już działał

Kolejnym punktem będzie uruchomienie aplikacji fronendowej zaczynając od przejścia do folderu za pomocą 

    cd meteo-frontend

po przejści do odpowiedzniego folderu ponownie pobieramy paczki potzrbne do funkcjonowania projektu za pomocą 

    npm install

a następnie uruchamiamy projekt za pomocą 

    npm run dev

po użyciu powyższych komend całość aplikacji będzie już dostępna do testowania. Aby wejść w interakcje z aplikają należy przejść w przeglądarce na adress :

    http://localhost:8000/api/reports - aplikacja backendowa
    http://localhost:3000/ - aplikacja frontendowa

teraz można dowoli testować aplikaję.