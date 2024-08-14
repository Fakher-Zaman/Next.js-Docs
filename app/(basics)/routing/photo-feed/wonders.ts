export type WonderImage = {
    id: string;
    name: string;
    src: string;
    photographer: string;
    location: string;
};

const wonders: WonderImage[] = [
    {
        id: "1",
        name: "Great Wall of China",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-1.jpg",
        photographer: "Photo by Max van den Oetelaar on Unsplash",
        location: "China",
    },
    {
        id: "2",
        name: "Petra",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-2.jpg",
        photographer: "Photo by Reiseuhu on Unsplash",
        location: "Jordan",
    },
    {
        id: "3",
        name: "Christ the Redeemer",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-3.jpg",
        photographer: "Photo by Andrea Leopardi on Unsplash",
        location: "Brazil",
    },
    {
        id: "4",
        name: "Machu Picchu",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-4.jpg",
        photographer: "Photo by Jared Schwitzke on Unsplash",
        location: "Peru",
    },
    {
        id: "5",
        name: "Chichen Itza",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-5.jpg",
        photographer: "Photo by E Mens on Unsplash",
        location: "Mexico",
    },
    {
        id: "6",
        name: "Roman Colosseum",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-6.jpg",
        photographer: "Photo by Andrea Cipriano on Unsplash",
        location: "Italy",
    },
    {
        id: "7",
        name: "Taj Mahal",
        src: "https://fakher-zaman.github.io/Image-Resources/photo-feed-7.jpg",
        photographer: "Photo by Su San Lee on Unsplash",
        location: "India",
    },
];

export default wonders;