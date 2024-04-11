import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/libs/meals';
import { notFound } from 'next/navigation';



export default async function MealPostPage({ params }) {
    const meal = await getMeal(params.Mealslug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');


    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by<a href={`mailto:${'EMAIL'}`}>
                            Name
                        </a>
                    </p>
                    <p className={classes.summary}>
                        SUMMARY
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: `${meal.instructions}`, }}>
                </p>
            </main>
        </>
    );
}