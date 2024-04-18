function init() {
  memoryGameCards();
}

function memoryGameCards() {
  const images = [
    "eekhoorn",
    "eendje",
    "egel",
    "flamingos",
    "geit",
    "giraffe",
    "hond",
    "ijsbeer",
    "kat",
    "kittens",
    "kwal",
    "lama",
    "leeuw",
    "nijlpaard",
    "olifant",
    "panda",
    "papegaai",
    "pinguin",
    "schildpad",
    "tijger",
    "zebra",
    "wolf",
    "vogels",
    "uil",
    "stokstaartje",
    "rhino",
    "pauw",
    "rendieren",
    "dolphijn",
    "apen",
    "apen2",
    "beer",
  ];

  const newImagesAmount = [];

  for (let i = 0; i < 18; i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    newImagesAmount.push(randomImage);
    images.splice(randomIndex, 1);
  }
  newImagesAmount.push(...newImagesAmount);
  const memoryGameImages = randomOrder(newImagesAmount);

  const $el = document.querySelector(".memory-game__cards");
  let html = "";
  for (const image of memoryGameImages) {
    html += `<img class="memory-game__card" src="assets/images/pexels-${image}.jpg" alt="${image}" />`;
  }
  $el.innerHTML = html;
}

function randomOrder(images) {
  let currentIndex = images.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [images[currentIndex], images[randomIndex]] = [
      images[randomIndex],
      images[currentIndex],
    ];
  }
  return images;
}

init();
