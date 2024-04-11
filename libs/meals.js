import sql from 'better-sqlite3';
import { resolve } from 'styled-jsx/css';

const db = sql('meals.db');

export async function getMeals() {
    // fake wait for test loading page
    // await new Promise((resolve)=> setTimeout(resolve, 5000));
    // throw new Error('Load');
    return db
        .prepare('SELECT * FROM meals')
        .all();
}

export async function getMeal(slug) {
    return db
    .prepare('SELECT * FROM meals where slug = ?')
    .get(slug);
}