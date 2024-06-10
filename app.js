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
    { image: 'images/ForestLP.png', caption: 'Nature Sounds Generator' },
    { image: 'images/SeaLP.png', caption: '"The waves of the sea help me get back to me." - Jill Davis.' },
    { image: 'images/SidelakeLP.png', caption: 'Time wasted at the lake is time well spent' }
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
    if (isTransitioning) return; // Prevent overlapping transitions
    isTransitioning = true;

    const currentSlide = slideSprites[currentSlideIndex];
    const nextSlide = slideSprites[nextIndex];
    const transitionSpeed = 0.002; // Adjust the speed of the fade effect
    const delayBetweenSlides = 6000; // Time to wait between slides in milliseconds

    app.ticker.add(fadeOutCurrentSlide);

    function fadeOutCurrentSlide() {
        currentSlide.alpha -= transitionSpeed;
        if (currentSlide.alpha <= 0) {
            currentSlide.alpha = 0;
            app.ticker.remove(fadeOutCurrentSlide);
            app.ticker.add(fadeInNextSlide);
            currentSlideIndex = nextIndex;
            updateCaption(currentSlideIndex);
        }
    }

    function fadeInNextSlide() {
        nextSlide.alpha += transitionSpeed;
        if (nextSlide.alpha >= 1) {
            nextSlide.alpha = 1;
            app.ticker.remove(fadeInNextSlide);
            isTransitioning = false; // Allow new transitions
            setTimeout(() => { app.ticker.add(nextSlideTick) }, delayBetweenSlides);
        }
    }
}

// Automatically transition to the next slide every 4 seconds plus transition time
const nextSlideTick = () => nextSlide();
setTimeout(() => { app.ticker.add(nextSlideTick) }, 6000);
