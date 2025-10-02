#!/usr/bin/env bash
# Build script pour Render

set -o errexit  # exit on error

# Installer les dépendances Python
pip install -r requirements.txt

# Collecter les fichiers statiques
python manage.py collectstatic --no-input

# Exécuter les migrations
python manage.py migrate