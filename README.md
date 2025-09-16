# Club d'Échecs du Lycée

Ce dépôt contient le code source du site web du club d'échecs du lycée.  
Le site est développé en HTML, CSS et JavaScript, et utilise Tailwind via CDN pour le style.  

## 🎯 Objectif
- Présenter les activités du club
- Mettre en ligne les tournois, événements et résultats
- Suivre la progression ELO des membres

## 🚀 Déploiement
Le site est hébergé grâce à [GitHub Pages](https://pages.github.com/).

Lien direct : (ajouter ici ton lien quand GitHub Pages sera activé)

## 📂 Structure
- `index.html` → page principale
- `styles.css` → styles personnalisés
- `script.js` → scripts du site
- `images/` → logos et illustrations
- `data/` → données ELO au format JSON

## 📜 Licence
Ce projet est librement utilisable, modifiable et redistribuable sous licence MIT.


# 📝 Fiche Git pratique – Dépôt du Club d’Échecs

## 🚀 Cycle classique (mettre à jour le dépôt GitHub)

1. Vérifier l’état du projet  
    >>> git status

2. Ajouter tous des fichiers ou déplacer des fichiers
    >>> git add .
    >>> git commit -m "Description des modifications"
    >>> git push

3. Ajouter un nouveau fichier
    >>> git add nouveau_fichier.html
    >>> git commit -m "Ajout nouveau fichier"
    >>> git push

4. Supprimer un fichier
    >>> git rm fichier.png
    >>> git commit -m "Suppression d’un fichier inutile"
    >>> git push

5. Voir l'historique des commits
    >>> git log --oneline --graph

6. Annuler un fichier ajouté par erreur avant commit
    >>> git reset HEAD nom_du_fichier

7. Annuler toutes les modifs locales non commitées.
    >>> git checkout -- .

