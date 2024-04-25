const sql = require("../config/pg_db.js");


const Taches = (tache) => {
    this.utilisateur_id = tache.utilisateur_id;
    this.titre = tache.titre;
    this.description = tache.description;
    this.date_debut = tache.date_debut;
    this.date_echeance = tache.date_echeance;
    this.complete = tache.complete;
};

Taches.creerUneTache = (req) => {
    return new Promise((resolve, reject) => {

        const requete = `INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5, $6)`;
        const params = [req.body.utilisateur_id, req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete];
        console.log(req.body.complete);
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.trouverUneTache = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT utilisateur_id, titre, description, date_debut, date_echeance, complete FROM taches WHERE id = $1`;
        const params = [id];

        sql.query(requete, params, (erreur, resultat) => {
            console.log(erreur);
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.trouverLesTaches = (utilisateur_id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM taches WHERE utilisateur_id = $1 AND complete = $2`;
        const params = [utilisateur_id, false];

        sql.query(requete, params, (erreur, resultat) => {
            console.log(erreur);
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.trouverToutesLesTaches = (utilisateur_id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM taches WHERE utilisateur_id = $1`;
        const params = [utilisateur_id];

        sql.query(requete, params, (erreur, resultat) => {
            console.log(erreur);
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.modifierUneTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update taches set titre = $1, description = $2, date_debut = $3, date_echeance = $4, complete = $5 where id = $6`;
        let params = [req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete, req.params.id]
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.modifierStatusTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update taches set complete = $1 where id = $2`;
        let params = [req.body.complete, req.params.id]
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.verifierUneTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT id FROM taches WHERE id = $1`;
        let params = [req.params.id]
        
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.supprimerUneTache = (req) => {
    return new Promise((resolve, reject) => {
        
            let requete = `DELETE FROM taches where id = $1`;
            let params = [req.params.id]
        
        

            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
                }
                console.log(resultat)
                // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                resolve(resultat.rows);
            });
    });
};


module.exports = Taches;