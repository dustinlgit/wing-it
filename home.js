const places = [
    { name: "Eiffel Tower", description: "An iconic Paris landmark offering stunning views." },
    { name: "Statue of Liberty", description: "A symbol of freedom in New York Harbor." },
    { name: "Great Wall of China", description: "A magnificent ancient structure stretching across China." }
];
let currentIndex = 0;

function updateCard() {
    if (currentIndex < places.length) {
        document.getElementById('placeName').innerText = places[currentIndex].name;
        document.getElementById('placeDescription').innerText = places[currentIndex].description;
    } else {
        document.getElementById('placeCard').innerHTML = "<h2>No more places!</h2>";
    }
}

function like() {
    const card = document.getElementById('placeCard');
    card.classList.add('swipe-right');
    setTimeout(() => {
        // alert(`You liked: ${places[currentIndex].name}`);
        currentIndex++;
        resetCard();
    }, 500);
}

function dislike() {
    const card = document.getElementById('placeCard');
    card.classList.add('swipe-left');
    setTimeout(() => {
        // alert(`You disliked: ${places[currentIndex].name}`);
        currentIndex++;
        resetCard();
    }, 500);
}

function resetCard() {
    const card = document.getElementById('placeCard');
    card.classList.remove('swipe-right', 'swipe-left');
    updateCard();
}