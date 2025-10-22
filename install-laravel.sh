#!/bin/bash

# Путь установки
APP_DIR="/var/www/app"

# Создаём каталог, если отсутствует
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
fi

cd "$APP_DIR" || exit 1

# Проверяем, установлен ли уже Laravel
if [ ! -f "artisan" ]; then
    echo "Installing Laravel into $APP_DIR..."
    composer create-project --prefer-dist laravel/laravel . "^10.0" --no-interaction

    # Установка дополнительных пакетов
    composer require laravel/sanctum --no-interaction

    # Генерация ключа и базовые команды
    php artisan key:generate --no-interaction

    # Настройка прав доступа
    chown -R www-data:www-data /var/www
    chmod -R 775 storage bootstrap/cache

    echo "Laravel installation completed!"
else
    echo "Laravel is already installed in $APP_DIR."
fi