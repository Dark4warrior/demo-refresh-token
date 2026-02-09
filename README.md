Cette démonstration technique illustre le mécanisme de Refresh Token dans une architecture client-serveur. 
Elle montre comment maintenir une session utilisateur active de manière sécurisée et transparente, conformément aux standards RFC 6749.

Installation
Installer les dépendances :

Bash
npm install express jsonwebtoken cors
Lancer le serveur :

Bash
node server.js
Comment tester (Démo)
Ouvrir index.html dans Chrome.

Ouvrir la console (F12) -> Onglet Network.

Login : Récupération des deux jetons.

Attendre 5 secondes (expiration de l'Access Token).

Appeler API : Observation du flux automatique :

Erreur 401 Unauthorized.

Requête automatique vers /token.

Ré-exécution de la requête initiale avec succès.

Structure
server.js : API Express avec gestion JWT.

index.html : Client avec logique d'interception Axios.
