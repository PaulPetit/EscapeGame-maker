// Inclusion des librairies nécessaires
#include <Servo.h>
#include <SoftwareSerial.h>

// Création d'une liaison série sur les broches D3 et D2
SoftwareSerial BTSerial(3, 2);

// Création d'un objet pour contrôler le servomoteur
Servo servoMoteur;

//-----------------------------------------------------------------------------------------------------//
//Pour ajouter les codes, remplir le tableau codes[] et indiquer le nombre de codes dans nbCodes

// Définit la taille du tableau de codes
#define nbCodes 2

// Tableau contenant tous les codes corrects
String codes[nbCodes] = {"0000", "1234"};

//-----------------------------------------------------------------------------------------------------//
// Chaine de caractères correspondant aux données envoyées par le module Bluetooth HC-05
String data;

// Fonction pour ouvrir le coffre
void ouvrirCoffre() {
  servoMoteur.write(180);
}

// Fonction pour fermer le coffre
void fermerCoffre() {
  servoMoteur.write(0);
}

// Initialise la liaison série et initialise le servomoteur
void initArduino() {
  BTSerial.begin(9600);
  servoMoteur.attach(9);
  fermerCoffre();
}

// Fonction setup appelée une seule fois lors de la mise sous tension de l'Arduino Nano
void setup() {
  initArduino();
}

// Fonction principale appelée en boucle jusqu'à la mise hors tension de l'Arduino Nano
void loop() {
  // Vérifie si des données sont disponibles sur le port série
  if (BTSerial.available() > 0) {
    // Lit les données depuis le port série
    data = BTSerial.readString();

    // Parcourt le tableau de codes

    for (int i = 0; i <= nbCodes; i++) {
      // Sile code est rouvé dans le tableau, on ouvre le coffre, on envoie un
      // message de confirmation au module Bluetooth HC-05 puis on quitte la boucle
      if (codes[i] == data) {
        BTSerial.println("codeCorrect");
        ouvrirCoffre();
        break;
      }
      // Si le code envoyé n'est pas dans le tableau, on ferme le coffre er on envoie un
      // message d'échec au module Bluetooth HC-05
      if (i == nbCodes) {
        BTSerial.println("codeIncorrect");
        fermerCoffre();
      }
    }
  }
}







