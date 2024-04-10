export default function MealPostPage( {params} ) {
    return (
        <main>
            <h1 style={{ color: 'white', textAlign: 'center' }}>
                Time to get { params.Mealslug }!
            </h1>
        </main>
    );
}