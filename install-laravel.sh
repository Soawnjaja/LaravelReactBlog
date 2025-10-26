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

    # Подготовка .env и автоконфиг для docker-compose
    if [ ! -f ".env" ]; then
        cp -n .env.example .env
    fi
    sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=mysql/' .env
    sed -i 's/^DB_HOST=.*/DB_HOST=db/' .env
    sed -i 's/^DB_PORT=.*/DB_PORT=3306/' .env
    sed -i 's/^DB_DATABASE=.*/DB_DATABASE=myblog/' .env
    sed -i 's/^DB_USERNAME=.*/DB_USERNAME=dbuser/' .env
    sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=dbpass/' .env

    # Генерация ключа приложения
    php artisan key:generate --no-interaction

    # Настройка прав доступа
    chown -R www-data:www-data /var/www
    chmod -R 775 storage bootstrap/cache

    echo "Laravel installation completed!"
else
    echo "Laravel is already installed in $APP_DIR."

    # Обновление .env под docker-compose даже для уже установленного проекта
    if [ ! -f ".env" ]; then
        cp -n .env.example .env
    fi
    sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=mysql/' .env
    sed -i 's/^DB_HOST=.*/DB_HOST=db/' .env
    sed -i 's/^DB_PORT=.*/DB_PORT=3306/' .env
    sed -i 's/^DB_DATABASE=.*/DB_DATABASE=myblog/' .env
    sed -i 's/^DB_USERNAME=.*/DB_USERNAME=dbuser/' .env
    sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=dbpass/' .env

    # Сгенерировать APP_KEY, если отсутствует
    if ! grep -q '^APP_KEY=' .env || grep -q '^APP_KEY=$' .env; then
        php artisan key:generate --no-interaction
    fi
fi