'use server';
import { redirect } from "next/navigation";
import { saveModel } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if(
        isInvalidText(meal.title) || 
        isInvalidText(meal.summary) || 
        isInvalidText(meal.creator) || 
        isInvalidText(meal.creator_email) || 
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid input',
        };
    }

    await saveModel(meal);

    // 先清除 Data Cache，接著收到要 re-render route segment 的 request 後，重新 fetch data，並存一份新的快取：
    revalidatePath('/meals');
    redirect('/meals');
}