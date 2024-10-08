import {body} from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('login', 'Укажите Логин').isLength({min: 3}),
    body('phone', 'Укажите номер телефона').isLength({min: 12}),
    body('orders','Неверный список заказов').optional().isString(),
    body('favorites','Неверный список избранных').optional().isString(),
]

export const clothesCreateValidation = [
    body('title', 'Введите название товара').isLength({ min: 3 }).isString(),
    body('price', 'Введите цену товара').isNumeric(),
    body('colors', 'Неверный формат цвета').isArray({ min: 1 }).custom((arr) => arr.every((color) => typeof color === 'string')),
    body('sizes', 'Неверный формат размеров').isArray({ min: 1 }).custom((arr) => arr.every((size) => typeof size === 'string')),
    body('category', 'Введите категорию').isString(),
    body('inStock', 'Введите количество').isNumeric(),
    body('gender', 'Введите пол').optional().isString(),
    body('images', 'Неверный формат картинок').optional().isArray().custom((arr) => arr.every((image) => typeof image === 'string')),
];

export const addOrderValidation = [
    body('name', 'Введите ваше имя').isLength({min: 3}).isString(),
    body('surname', 'Введите ваше фамилие').isLength({min: 3}).isString(),
    body('email', 'Введите ваш email').isLength({min: 3}).isEmail(),
    body('phone', 'Введите ваш номер телефона').isLength({min: 12}),
    body('orders', 'Сделайте покупку').isArray(),
]

