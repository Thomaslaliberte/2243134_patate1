const Taches = require("../models/taches.model.js");
const SousTaches = require("../models/sousTaches.model.js");
const { description, date_debut, date_echeance, complete } = require("../models/taches.model.js");

exports.creerUneTache = (req, res) => {
    var message = "";
    if (!req.body.utilisateur_id) {
        message += "utilisateur_id\r\n";
    }
    if (!req.body.titre) {
        message += "titre\r\n";
    }
    if (!req.body.description) {
        message += "description\r\n";
    }
    if (!req.body.date_debut) {
        message += "date_debut\r\n";
    }
    if (!req.body.date_echeance) {
        message += "date_echeance\r\n";
    }
    if (req.body.complete == null) {
        message += "complete\r\n";
    }

    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    };
    // Appel à la fonction trouverUnProfesseur dans le modèle
    Taches.creerUneTache(req)

        // Si c'est un succès
        .then((tache) => {
            // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
            res.send({ message: "la tache " + req.body.titre + " à été ajouter avec succès" });
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la creation de la tache"
            });
        });
};

exports.trouverUneTache = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id du tache est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Taches.trouverUneTache(req.params.id)
        // Si c'est un succès
        .then((tache) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!tache[0]) {
                res.status(404);
                res.send({
                    message: `Tache introuvable avec l'id ${req.params.id}`
                });
                return;
            }
            // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
            res.send(tache[0]);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération de la  tache"
            });
        });
};

exports.trouverLesTaches = (req, res) => {
    var message = "";
    if (!req.body.utilisateur_id) {
        message += "utilisateur_id\r\n";
    }
    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    };
    if (!req.body.complete) {
        // Appel à la fonction trouverUnProfesseur dans le modèle
        Taches.trouverLesTaches(req.body.utilisateur_id)
            // Si c'est un succès
            .then((taches) => {
                // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
                if (!taches[0]) {
                    res.status(404);
                    res.send({
                        message: `Taches introuvables `
                    });
                    return;
                }
                // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                res.send(taches);
            })
            // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Erreur lors de la récupération des taches"
                });
            });
    }
    else {
        Taches.trouverToutesLesTaches(req.body.utilisateur_id)
            // Si c'est un succès
            .then((taches) => {
                // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
                if (!taches[0]) {
                    res.status(404);
                    res.send({
                        message: `Taches introuvable `
                    });
                    return;
                }
                // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                res.send(taches);
            })
            // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Erreur lors de la récupération des taches"
                });
            });
    }
}

exports.modifierUneTache = (req, res) => {
    // Teste si le paramètre id est présent et valide
    var message = "";
    if (!req.body.titre) {
        message += "titre\r\n";
    }
    if (!req.body.description) {
        message += "description\r\n";
    }
    if (!req.body.date_debut) {
        message += "date_debut\r\n";
    }
    if (!req.body.date_echeance) {
        message += "date_echeance\r\n";
    }
    if (req.body.complete == null) {
        message += "complete\r\n";
    }
    if (!req.params.id) {
        message += "id\r\n";
    }
    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    }
    Taches.verifierUneTache(req.params.id)
        .then((valeur) => {
            if (valeur != "") {
                // Appel à la fonction trouverUnProfesseur dans le modèle
                Taches.modifierUneTache(req)
                    // Si c'est un succès
                    .then((tache) => {

                        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                        res.send({ message: "La tache " + [req.params.id] + " a été modifier avec succès", tache: { id: req.params.id, titre: req.body.titre, description: req.body.desciption, date_debut: req.body.date_debut, date_echeance: req.body.date_echeance, complete: req.body.complete } })
                    })
                    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la verification de la tache" + [req.params.id]
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la tache " + [req.params.id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de la tache " + [req.params.id]
            });
        });
};

exports.modifierStatusTache = (req, res) => {
    // Teste si le paramètre id est présent et valide
    var message = "";
    if (req.body.complete == null) {
        message += "complete\r\n";
    }
    if (!req.params.id) {
        message += "id\r\n";
    }
    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    }
    Taches.verifierUneTache(req.params.id)
        .then((valeur) => {
            if (valeur != "") {
                // Appel à la fonction trouverUnProfesseur dans le modèle
                Taches.modifierStatusTache(req)
                    // Si c'est un succès
                    .then((tache) => {

                        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                        res.send({ message: "Le tache " + [req.params.id] + " a été modifier avec succès", tache: { id: req.params.id, complete: req.body.complete } })
                    })
                    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la modification de la tache " + [req.params.id]
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la tache " + [req.params.id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de la tache " + [req.params.id]
            });
        });
};


exports.supprimerUneTache = (req, res) => {
    // Teste si le paramètre id est présent et valide

    Taches.verifierUneTache(req.params.id)
        .then((valeur) => {
            if (valeur[0]) {
                // Appel à la fonction trouverUnProfesseur dans le modèle
                SousTaches.supprimerUneSousTache(req)
                    // Si c'est un succès
                    .then((tache2) => {

                        Taches.supprimerUneTache(req)
                            // Si c'est un succès
                            .then((tache) => {

                                // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                                res.send({ message: "La tache " + [req.params.id] + " a été supprimer avec succès", tache: { id: req.params.id, tache: tache } })
                            })
                            // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                            .catch((erreur) => {
                                console.log('Erreur : ', erreur);
                                res.status(500)
                                res.send({
                                    message: "echec lors de la suppression de la tache " + [req.params.id]
                                });
                            });
                    })
                    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la suppression des taches "
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la tache " + [req.params.id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de " + [req.params.id]
            });
        });
}; 