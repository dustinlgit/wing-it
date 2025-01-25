const places = [
    { name: "Eiffel Tower", description: "An iconic Paris landmark offering stunning views.", image: "https://quiltripping.com/wp-content/uploads/2017/07/DSC_0781-scaled.jpg" },
    { name: "Statue of Liberty", description: "A symbol of freedom in New York Harbor.", image: "https://cdn.britannica.com/31/94231-050-C6B60B89/Statue-of-Liberty-Island-Upper-New-York.jpg" },
    { name: "Great Wall of China", description: "A magnificent ancient structure stretching across China.", image: "https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg" },
    { name: "Big Ben", description: "A famous clock tower in London.", image: "https://storage.googleapis.com/mari-a5cc7.appspot.com/photos/regular/ef0d6b06-e455-4b0a-ad5f-c88769c6bc9c.jpg" },
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
    console.log("Swiping card to: ", direction);
    const cardStack = document.getElementById('cardStack');
    if (cardStack.children.length > 0) {
        const topCard = cardStack.children[0];

        // Prevent re-triggering animation
        if (topCard.classList.contains('swipe-left') || topCard.classList.contains('swipe-right')) {
            return;
        }

        topCard.classList.add(direction);

        setTimeout(() => {
            cardStack.removeChild(topCard);
            reorderStack();
        }, 0);
    } else {
        cardStack.innerHTML = "<h2>No more places!</h2>";
    }
}

function reorderStack() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        if (index < 4) {
            card.style.display = "block";
            card.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";  // Ensure transition is applied
            card.style.transform = `translateY(${-index * 30}px) scale(${1 - index * 0.05})`;
            card.style.opacity = index === 3 ? '0' : `${1 - index * 0.3}`;
            card.style.zIndex = `${3 - index}`;
        } else {
            card.style.display = "none";
        }
    });
}

// Load cards when page is ready
document.addEventListener('DOMContentLoaded', loadCards);