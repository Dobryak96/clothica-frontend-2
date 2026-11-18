# Clothica

Clothica is an online clothing store. You can browse categories, filter goods, read reviews, add items to the cart and place an order, with or without an account.

This is a team training project built by developers and QA engineers.

Live site: https://clothica-frontend-2.vercel.app

## Features

- home page with popular categories, popular goods and latest reviews
- goods list with filters by category, size, price and gender
- product page with description, rating and reviews
- cart that keeps your items between visits
- checkout for guests and signed-in users
- personal cabinet with order history and profile data

The layout is responsive and built Mobile First: 375px, 768px and 1440px.

## Pages

| Page | Route |
|---|---|
| Home | `/` |
| Categories | `/categories` |
| Goods | `/goods` |
| Product | `/goods/[goodId]` |
| Cart | `/basket` |
| Checkout | `/order` |
| Cabinet | `/profile` |
| Sign up / Log in | `/auth/register`, `/auth/login` |

## Tech stack

Frontend: Next.js 15, TypeScript, CSS Modules, Zustand, Formik, Yup, Axios, Swiper, Sonner. Hosted on Vercel.

Backend: Node.js, Express, MongoDB, Mongoose, Joi, Swagger. Hosted on Render.

## Getting started

```bash
git clone https://github.com/Ivan-pes/clothica-frontend-2.git
cd clothica-frontend-2
npm install
npm run dev
```

## Team

### Developers

| Name | Frontend | Backend |
|---|---|---|
| [Ivan Korolyov](https://github.com/Ivan-pes), Team Lead | Pagination, project setup, code review | `PATCH /api/users/current` |
| [Taras Makhanko](https://github.com/Narenzy) | Header, Hero | `POST /api/auth/logout` |
| [Uliana Oleksiienko](https://github.com/Uliana-Oleksiienko) | Footer, Last reviews, Reviews slider | `GET /api/feedbacks`, `POST /api/subscriptions` |
| [Oleksandr Horokhov](https://github.com/Dobryak96) | Sign up | `POST /api/auth/register` |
| [Yura Mashchak](https://github.com/yuramashchak) | Log in | `POST /api/auth/login` |
| [Mila Nazarenko](https://github.com/MalaksumaMila) | Style section, Popular categories | `GET /api/orders` |
| [Nikita Levchenko](https://github.com/nikitaleao) | Popular goods | |
| [Anhelina Bondar](https://github.com/anhelina-bondar) | Categories page | `GET /api/categories` |
| [Viktoriia](https://github.com/ukrainevictoria) | Goods page, filters, product card | `GET /api/goods` |
| [Julia Skliarenko](https://github.com/Julia-Skliarenko) | Product page, reviews form | `POST /api/feedbacks` |
| [Anastasiia Semeniuk](https://github.com/Summershinne) | Cart, goods order list | `GET /api/goods/:goodId` |
| [Vasyl Liubchenko](https://github.com/proteck72) | Checkout | `POST /api/orders` |
| [Kyrylo Bytsiura](https://github.com/kyryle) | Cabinet, empty state message | `GET /api/users/current` |

### QA

| Name | Area |
|---|---|
| [Oksana Trif](https://github.com/OxanaTrif), QA Team Lead | sign up, log in, header, footer, pagination |
| [Iryna Mykytiuk](https://github.com/IrynaMik) | home, product page, reviews |
| [Yuliia](https://github.com/yuliia794) | goods page, cabinet |
| [Olena Ihnatiuk](https://github.com/OlenaIhnatiuk823) | checkout, cart, categories |
