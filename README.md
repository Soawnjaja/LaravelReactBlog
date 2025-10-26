# My Blog (Laravel + React) — запуск

## Требования
- Установлен и запущен Docker Desktop
- Node.js v20.10.0
- Свободный порт 8000

## 1) Клонирование
```bash
git clone https://github.com/Soawnjaja/LaravelReactBlog.git
cd LaravelReactBlog  
```

## 2) Поднять контейнеры (Docker должен быть запущен)
```bash
docker compose up -d --build
```

## 3) Установка Laravel .env и ключ 
Команды выполнять из корня
```bash
docker compose exec app sh -lc '
  set -e
  cd /var/www/app
  test -f .env || cp .env.example .env
  sed -i -E "s/^DB_CONNECTION=.*/DB_CONNECTION=mysql/" .env
  sed -i -E "s/^DB_HOST=.*/DB_HOST=db/" .env
  sed -i -E "s/^DB_PORT=.*/DB_PORT=3306/" .env
  sed -i -E "s/^DB_DATABASE=.*/DB_DATABASE=myblog/" .env
  sed -i -E "s/^DB_USERNAME=.*/DB_USERNAME=dbuser/" .env
  sed -i -E "s/^DB_PASSWORD=.*/DB_PASSWORD=dbpass/" .env
  composer install --no-interaction --prefer-dist
  php artisan key:generate --force
'
```

## 4) Миграции и сиды
```bash
docker compose exec app sh -lc 'cd /var/www/app && php artisan migrate --force && php artisan db:seed --class=DemoSeeder'
```

## 5) Сборка фронтенда
```bash
cd app && npm install && npm run build
```

## 6) Открыть приложение
```
http://localhost:8000
```



