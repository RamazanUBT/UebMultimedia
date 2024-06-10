// Initialize the PixiJS application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
});
document.getElementById('app').appendChild(app.view);

// Array of slide objects with image and caption
const slides = [
    { image: 'images/ForestLP.png', caption: 'Nature Sounds Generator', buttonColor: '#7b844d' },
    { image: 'images/SeaLP.png', caption: '"The waves of the sea help me get back to me." - Jill Davis.', buttonColor: '#aad5f6' },
    { image: 'images/SidelakeLP.png', caption: 'Time wasted at the lake is time well spent', buttonColor: '#d2b48c' }
];

let currentSlideIndex = 0;
const slideSprites = [];

// Load slides into PixiJS
slides.forEach((slide, index) => {
    const texture = PIXI.Texture.from(slide.image);
    const sprite = new PIXI.Sprite(texture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    sprite.alpha = index === 0 ? 1 : 0;
    slideSprites.push(sprite);
    app.stage.addChild(sprite);
});

const captionElement = document.getElementById('caption');
updateCaption(currentSlideIndex);

// Function to update the caption
function updateCaption(index) {
    captionElement.querySelector('h1').textContent = slides[index].caption;
}

// Function to transition to the next slide
function nextSlide() {
    transitionToSlide((currentSlideIndex + 1) % slides.length);
}

// Function to transition to the previous slide
function prevSlide() {
    transitionToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
}

// Flag to indicate if a transition is ongoing
let isTransitioning = false;

// Function to handle the transition between slides
function transitionToSlide(nextIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentSlide = slideSprites[currentSlideIndex];
    const nextSlide = slideSprites[nextIndex];
    const transitionSpeed = 0.002; 
    const delayBetweenSlides = 7000; 

    app.ticker.add(fadeOutCurrentSlide);

    function fadeOutCurrentSlide() {
        currentSlide.alpha -= transitionSpeed;
        if (currentSlide.alpha <= 0) {
            currentSlide.alpha = 0;
            app.ticker.remove(fadeOutCurrentSlide);
            app.ticker.add(fadeInNextSlide);
            currentSlideIndex = nextIndex;
            updateCaption(currentSlideIndex);
            updateButtonColor(slides[currentSlideIndex].buttonColor);
        }
    }

    function fadeInNextSlide() {
        nextSlide.alpha += transitionSpeed;
        if (nextSlide.alpha >= 1) {
            nextSlide.alpha = 1;
            app.ticker.remove(fadeInNextSlide);
            isTransitioning = false; 
            setTimeout(() => { app.ticker.add(nextSlideTick) }, delayBetweenSlides);
        }
    }
}


const nextSlideTick = () => nextSlide();
setTimeout(() => { app.ticker.add(nextSlideTick) }, 7000);

//Change the color of the "Explore" button
function updateButtonColor(color) {
    const exploreButton = document.querySelector('.caption a');
    exploreButton.style.backgroundColor = color;
}

// Implementing hover effect for the "Explore" button
const exploreButton = document.querySelector('.caption a');

exploreButton.addEventListener('mouseover', () => {
    exploreButton.style.opacity = '0.8';
    TweenMax.to(exploreButton, 0.3, { scaleX: 0.9, scaleY: 0.9, ease: Power2.easeOut });
});

exploreButton.addEventListener('mouseout', () => {
    exploreButton.style.opacity = '1';
    TweenMax.to(exploreButton, 0.3, { scaleX: 1, scaleY: 1, ease: Power2.easeOut });
});