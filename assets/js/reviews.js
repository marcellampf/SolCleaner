const reviews = [
    { name: 'John Doe', text: 'Amazing service! My home has never been cleaner.', rating: 4.5 },
    { name: 'Jane Smith', text: 'The team was very professional and detailed. Highly recommended.', rating: 5 },
    { name: 'Alex Johnson', text: 'I loved the result, they were fast and efficient!', rating: 4 },
    { name: 'Emily Brown', text: 'Excellent job, would hire again!', rating: 4.5 },
    { name: 'Michael White', text: 'Best cleaning service in town!', rating: 5 },
    { name: 'Sara Black', text: 'Very satisfied with the service!', rating: 4 }
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
