import os
from .settings import *

# Production settings
DEBUG = False

# Security settings
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-r-lc^(kwquqqm)_+x#%1&)2=^mtbpwhg1xwe8^%ak4-2)#jyrf')

# Allowed hosts - à configurer selon votre domaine
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',  # Pour Railway
    '.render.com',   # Pour Render
    '.vercel.app',   # Pour Vercel
    '.herokuapp.com', # Pour Heroku
    # Ajoutez votre domaine personnalisé ici
]

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://localhost:3000",
    # Une fois votre frontend déployé, ajoutez son URL ici
    "https://weekend-max-frontend.onrender.com",  # Remplacez par votre URL frontend
    # Ou si vous utilisez Vercel :
    # "https://weekend-max.vercel.app",
]

CORS_ALLOW_ALL_ORIGINS = False  # Sécurisé pour la production

# Database configuration (PostgreSQL recommandé pour la production)
if os.environ.get('DATABASE_URL'):
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
    }
else:
    # Fallback vers SQLite pour les tests
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings for production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# HTTPS settings (décommentez si vous utilisez HTTPS)
# SECURE_SSL_REDIRECT = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}