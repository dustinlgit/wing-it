const { generateBasedOnLocation } = require('./src/generateBy')

// async function main() {
//     const recommendations = await generateBasedOnLocation();
//     // console.log("Top recommendations based on your location:");
//     console.log(recommendations);
//   }
  
// main();

function loadCards() {
    const places = generateBasedOnLocation();
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = ''; 
    // console.log(places);
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

        // Prevent re-triggering animation
        if (topCard.classList.contains('swipe-left') || topCard.classList.contains('swipe-right')) {
            return;
        }

        // Start swipe animation
        topCard.classList.add(direction);


        // Remove the card after its animation completes
        topCard.addEventListener('transitionend', () => {
            topCard.remove();
            reorderStack();
        }, { once: true });
    } else {
        cardStack.innerHTML = "<h2>No more places!</h2>";
    }
}

function reorderStack() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
            card.style.transform = `translateY(${-index * 32}px) scale(${1 - index * 0.05})`;
            card.style.opacity = index === 3 ? '0' : `${1 - index * 0.3}`;
            card.style.zIndex = `${3 - index}`;
        });
    });
}

document.querySelector('.btn-like').addEventListener('click', () => {
    console.log("Like button clicked");
    like();
});

document.querySelector('.btn-dislike').addEventListener('click', () => {
    console.log("Dislike button clicked");
    dislike();
});

document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    reorderStack();
});