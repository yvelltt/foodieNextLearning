
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';
import { error } from 'console';
import { resolve } from 'path';
import { promises } from 'fs';

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

export async function saveModel(meal) {
    console.log(meal.image.name);
    try {
        meal.slug = slugify(meal.title, { lower: true });
        meal.instructions = xss(meal.instructions);
        const extension = meal.image.name.split('.').pop();
        const fileName = `${meal.slug }.${extension}`;
    
        const stream = fs.createWriteStream(`public/images/${fileName}`);
    
        // const bufferedImage = await meal.image.arrayBuffer();
    
        // stream.write(Buffer.from(bufferedImage), () => {
        //     if (error) {
        //         throw new Error('Saving image failed!');
        //     }
        // });
        
        meal.image.arrayBuffer().then(bufferedImage => {
            // Convert ArrayBuffer to Buffer
            const buffer = Buffer.from(bufferedImage);
        
            // Write buffer to stream
            stream.write(buffer);
        
            // Close the stream after writing is done
            stream.end();
        
        }).catch(err => {
            console.error('Error retrieving the ArrayBuffer:', err);
        });
    
        meal.image = `/images/${fileName}`;
    
        db.prepare(`
            INSERT INTO meals (
                title, 
                summary, 
                instructions,  
                image,
                creator, 
                creator_email,
                slug
            ) VALUES ( 
                @title, 
                @summary, 
                @instructions,  
                @image,
                @creator, 
                @creator_email,
                @slug
            )`).run(meal);
    } catch(error) {
        console.log(error);
    }
}