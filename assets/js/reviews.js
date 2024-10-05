const reviews = [
    { name: 'Juliana Bragança', text: 'Thank you for your partnership during these six months! May we continue for a long time! And the helper is great, I have nothing to complain about.', rating: 4.5 },
    { name: 'Roseann', text: 'Hi Gisele, Thanks so much for a wonderful service you and Katherine provided today.  I came home to a clean and organized home.  As usual you did a terrific job with the cleaning and the lovely organization really makes me feel  fantastic.Thank you!!! ', rating: 5 },
    { name: 'Isha', text: 'The cleaning was amazing as usual!', rating: 4 },
    { name: 'Jonathan', text: 'Hi Gisele, sounds good! Katherine was great and the work was perfect as always.', rating: 4.5 },
    { name: 'Chris', text: 'My place looks amazing. Thank you for all the extras you do, I so appreciate you.  I have never been good at finding things a place and you re so good at that. It was lovely to see you.', rating: 5 },
    { name: 'Sandra', text: 'Thank you, Gisele. Katherine was wonderful.', rating: 4 }
];

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fa fa-star"></i>';
        } else if (i - rating === 0.5) {
            stars += '<i class="fa fa-star-half-alt"></i>';
        } else {
            stars += '<i class="fa fa-star-o"></i>';
        }
    }
    return stars;
}

function createReviewCards() {
    const carouselContainer = document.querySelector('.carousel-container');
    reviews.forEach(review => {
        const card = document.createElement('div');
        card.classList.add('carousel-card');
        card.innerHTML = `
            <p><em>"${review.text}"</em></p>
            <p>- ${review.name}</p>
            <div class="stars">
                ${generateStars(review.rating)}
            </div>
        `;
        carouselContainer.appendChild(card);
    });
}

createReviewCards();

const cards = document.querySelectorAll('.carousel-card');
const leftButton = document.querySelector('.carousel-button.left');
const rightButton = document.querySelector('.carousel-button.right');
let currentIndex = 0;
const visibleCards = 1; 

function updateCarousel() {
    const cardWidth = cards[0].clientWidth;
    document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

rightButton.addEventListener('click', () => {
    if (currentIndex + visibleCards < cards.length) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    updateCarousel();
});

leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - visibleCards; 
    }
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();
