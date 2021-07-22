# Node.js / Express template
## Usage

1. Install dependencies: `npm install` (alternatively, you can use Yarn or PNPM)
2. Copy `.env.sample` as `.env` and adjust it to your needs
3. Connect to mysql and make : `SOURCE DBProjectNARY.sql` (file in the folder Données_site)
3. Start the app on your local machine: `npm start`

5. For the User :

- Get all users : 
METHOD: GET localhost:8080/api/users

- Post a user : 
METHOD: POST localhost:8080/api/users

 Format example : 
 {
    "admin": 1,
    "nom": "Bhz",
    "prenom": "Milad",
    "password": "lesbonstuyaux",
    "email": "milad.bhz@gmail.com",
    "genre": "homme",
    "age": 28,
    "taille": 180,
    "poids": 80,
    "NAP": 1.8,
    "premenopause": 0,
    "postmenopause": 0,
    "enceinte_prem_trim": 0,
    "enceinte_deux_trim": 0,
    "enceinte_trois_trim": 0,
    "proteines": 2800,
    "Profil_idProfil": 6
}

- Delete a user by id : 
METHOD: DELETE localhost:8080/api/users/:id

- Modify a user by id : 
METHOD: PUT localhost:8080/api/users/:id

 Format example : 
 {
    "age": 28,
    "taille": 180,
    "NAP": 1.8,
}


6. For the Food :

- Get all users : 
METHOD: GET localhost:8080/api/foods


7. For the Profil :

- Get all profils : 
METHOD: GET localhost:8080/api/profils

- Get profil by id : 
METHOD: GET localhost:8080/api/profils/:id