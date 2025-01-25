const places = [
    { name: "Eiffel Tower", description: "An iconic Paris landmark offering stunning views.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" },
    { name: "Statue of Liberty", description: "A symbol of freedom in New York Harbor.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" },
    { name: "Great Wall of China", description: "A magnificent ancient structure stretching across China.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" },
    { name: "Big Ben", description: "A famous clock tower in London.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" },
    { name: "Colosseum", description: "A Roman amphitheater in Rome.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" },
    { name: "Taj Mahal", description: "A mausoleum in Agra, India.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" },
    { name: "Petra", description: "An ancient city in Jordan.", image: "https://lh3.googleusercontent.com/places/ANXAkqH5J_xFlIsrt7KqhjKAIhEtkD6Tadw8tT9C207ZXn7SE0jdfpeu5MaAarbGi7eJo8JTXyesv1byRbC9SSTf0fHWuBO57vRzh50=s1600-w800" }
];

// Load cards dynamically into the stack
function loadCards() {
    const cardStack = document.getElementById('cardStack');
    places.forEach((place) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <div class="text-overlay">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
            </div>
        `;
        cardStack.appendChild(card);
    });
    reorderStack();
}

// Handle liking/disliking the top card
function like() {
    processSwipe('swipe-right');
}

function dislike() {
    processSwipe('swipe-left');
}

function processSwipe(direction) {
    const cardStack = document.getElementById('cardStack');
    if (cardStack.children.length > 0) {
        const topCard = cardStack.children[0];
        topCard.classList.add(direction);

        // Remove the card after animation completes
        setTimeout(() => {
            cardStack.removeChild(topCard);
            reorderStack();
        }, 600); // Matching with CSS transition time
    } else {
        document.getElementById('cardStack').innerHTML = "<h2>No more places!</h2>";
    }
}

// Reorder remaining cards to simulate stacking effect
function reorderStack() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        if (index < 3) {
            card.style.display = "block";
            card.style.transform = `translateY(${-index * 42}px) scale(${1 - index * 0.05})`;
            card.style.opacity = `${1 - index * 0.3}`;
            card.style.zIndex = `${3 - index}`;
        } else {
            card.style.display = "none";
        }
    });
}

// Load cards when page is ready
document.addEventListener('DOMContentLoaded', loadCards);