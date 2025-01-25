const { generateBasedOnLocation } = require('./src/generateBy')

// const places = [
//     { name: "Eiffel Tower", description: "An iconic Paris landmark offering stunning views.", image: "https://quiltripping.com/wp-content/uploads/2017/07/DSC_0781-scaled.jpg" },
//     { name: "Statue of Liberty", description: "A symbol of freedom in New York Harbor.", image: "https://cdn.britannica.com/31/94231-050-C6B60B89/Statue-of-Liberty-Island-Upper-New-York.jpg" },
//     { name: "Great Wall of China", description: "A magnificent ancient structure stretching across China.", image: "https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg" },
//     { name: "Big Ben", description: "A famous clock tower in London.", image: "https://storage.googleapis.com/mari-a5cc7.appspot.com/photos/regular/ef0d6b06-e455-4b0a-ad5f-c88769c6bc9c.jpg" },
//     { name: "Colosseum", description: "A Roman amphitheater in Rome.", image: "https://www.thetrainline.com/cms/media/11558/italy-rome-colosseum.jpg?mode=crop&width=1080&height=1080&quality=70" },
//     { name: "Taj Mahal", description: "A mausoleum in Agra, India.", image: "https://th-thumbnailer.cdn-si-edu.com/eBP1w0wGm1n7tZ4XtovPdnvxDOg=/800x800/filters:focal(1471x1061:1472x1062)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg" },
//     { name: "Petra", description: "An ancient city in Jordan.", image: "https://cdn.britannica.com/88/189788-050-9B5DB3A4/Al-Dayr-Petra-Jordan.jpg" }
// ];


// async function main() {
//     const recommendations = await generateBasedOnLocation();
//     // console.log("Top recommendations based on your location:");
//     console.log(recommendations);
//   }
  
// main();

async function loadCards() {
    const places = await generateBasedOnLocation();
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = ''; 
    console.log(places);
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