<img width="800" alt="GitHub README banner_ JWT Laravel JWT REST API" src="https://github.com/avocado-media/laravel-jwt-rest-api/assets/32078923/b802da74-2719-4e76-ab61-bf565cb38b69">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This repository contains a Laravel 10 with JWT authentication boilerplate
using the [tymon/jwt-auth](https://github.com/tymondesigns/jwt-auth) package, inspired by
the [Laravel Breeze](https://github.com/laravel/breeze) package (API stack).

## Features

- JWT authentication (login, register, password reset, email verification)
- Profile updating
- Password changing
- Tests (using [Pest](https://pestphp.com/))
- [Laravel Telescope](https://laravel.com/docs/8.x/telescope) (disabled by default)
- Swagger

## Installation

> Note: the application does not have a `package.json` since this project purely a REST API that will not use any
> JavaScript or asset builders such as Vite.

1. `cp .env.example .env`
2. `composer install`
3. `php artisan jwt:secret` (generate a secret key that will be used to sign your tokens)
4. `php artisan migrate:fresh --seed`
5. `php artisan l5-swagger:generate` (generate Swagger documentation - `/api/documentation`)
6. `php artisan serve`

## Literature
- [Password Hashing: Pepper + Salt](https://stackoverflow.com/questions/16891729/best-practices-salting-peppering-passwords) - Just Use The Algorithms As They Exist

## License

This project is open-sourced software licensed under the MIT license.
