const movies = [
    { title: "Toy Story", genres: "Animation|Children|Comedy" },
    { title: "Jumanji", genres: "Adventure|Children|Fantasy" },
    { title: "Grumpier Old Men", genres: "Comedy|Romance" },
    { title: "Waiting to Exhale", genres: "Comedy|Drama" },
    { title: "Father of the Bride Part II", genres: "Comedy" },
    { title: "Heat", genres: "Action|Crime|Thriller" },
    { title: "Sabrina", genres: "Comedy|Romance" },
    { title: "Tom and Huck", genres: "Adventure|Children" },
    { title: "Sudden Death", genres: "Action" },
    { title: "GoldenEye", genres: "Action|Adventure|Thriller" },
    { title: "American President", genres: "Comedy|Drama|Romance" },
    { title: "Dracula: Dead and Loving It", genres: "Comedy|Horror" },
    { title: "Balto", genres: "Adventure|Animation|Children" },
    { title: "Nixon", genres: "Drama" },
    { title: "Cutthroat Island", genres: "Action|Adventure|Romance" },
    { title: "Casino", genres: "Crime|Drama" },
    { title: "Sense and Sensibility", genres: "Drama|Romance" },
    { title: "Ace Ventura: When Nature Calls", genres: "Comedy" },
    { title: "Money Train", genres: "Action|Comedy|Drama" },
    { title: "Get Shorty", genres: "Comedy|Crime|Thriller" },
    { title: "Copycat", genres: "Crime|Drama|Thriller" },
    { title: "Assassins", genres: "Action|Crime|Thriller" },
    { title: "Powder", genres: "Drama|Sci-Fi" },
    { title: "Leaving Las Vegas", genres: "Drama|Romance" },
    { title: "Othello", genres: "Drama" },
    { title: "Now and Then", genres: "Children|Drama" },
    { title: "Persuasion", genres: "Drama|Romance" },
    { title: "City of Lost Children", genres: "Adventure|Drama|Fantasy" },
    { title: "Shanghai Triad", genres: "Crime|Drama" },
    { title: "Dangerous Minds", genres: "Drama" },
    { title: "Twelve Monkeys", genres: "Drama|Sci-Fi" },
    { title: "Babe", genres: "Children|Drama" },
    { title: "Dead Man Walking", genres: "Crime|Drama" },
    { title: "It Takes Two", genres: "Children|Comedy" },
    { title: "Clueless", genres: "Comedy|Romance" },
    { title: "Cry, the Beloved Country", genres: "Drama" },
    { title: "Richard III", genres: "Drama|War" },
    { title: "Seven", genres: "Crime|Thriller" },
    { title: "Usual Suspects", genres: "Crime|Thriller" },
    { title: "Mighty Aphrodite", genres: "Comedy" },
    { title: "Lamerica", genres: "Drama" },
    { title: "Big Green", genres: "Children|Comedy" },
    { title: "Georgia", genres: "Drama" },
    { title: "Home for the Holidays", genres: "Comedy|Drama" },
    { title: "Postman", genres: "Adventure|Drama|Sci-Fi" },
    { title: "Apollo 13", genres: "Drama" },
    { title: "Batman Forever", genres: "Action|Adventure|Comedy" },
    { title: "Braveheart", genres: "Action|Drama|War" },
    { title: "Up Close and Personal", genres: "Drama|Romance" },
    { title: "Copycat", genres: "Crime|Drama|Thriller" },
    { title: "Desperado", genres: "Action|Romance|Thriller" },
    { title: "Die Hard with a Vengeance", genres: "Action|Thriller" }
];

function displayMovieOptions() {
    const movieCheckboxes = document.getElementById("movieCheckboxes");

    if (movies.length === 0) {
        console.warn("No movies found in the dataset."); 
        return;
    }

    movies.forEach(movie => {
        if (!movie.title) {
            console.warn("Skipping entry without a title:", movie); 
            return;
        }

        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="favorites" value="${movie.title}">
            ${movie.title}
        `;
        movieCheckboxes.appendChild(label);
    });
}


function getRecommendations() {
    const selectedTitles = Array.from(document.querySelectorAll('input[name="favorites"]:checked'))
                               .map(input => input.value);

    if (selectedTitles.length === 0) {
        alert("Please select at least one movie to get recommendations.");
        return;
    }

    const selectedGenres = [];
    selectedTitles.forEach(title => {
        const movie = movies.find(m => m.title === title);
        if (movie) {
            selectedGenres.push(...movie.genres.split('|'));
        }
    });

    const genreCounts = selectedGenres.reduce((counts, genre) => {
        counts[genre] = (counts[genre] || 0) + 1;
        return counts;
    }, {});

    const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

    const recommendations = movies
        .filter(movie => !selectedTitles.includes(movie.title))
        .map(movie => {
            const matchingGenres = movie.genres.split('|').filter(genre => sortedGenres.includes(genre));
            return { title: movie.title, score: matchingGenres.length };
        })
        .filter(movie => movie.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = '<h3>Recommended Movies:</h3><ul>' +
        recommendations.map(r => `<li>${r.title} (Score: ${r.score})</li>`).join('') +
        '</ul>';
}

window.onload = displayMovieOptions;
