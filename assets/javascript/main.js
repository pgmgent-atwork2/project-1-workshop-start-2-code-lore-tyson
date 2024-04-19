function init() {
  memoryGameCards();
}

function memoryGameCards() {
  const defaultCard = "front";

  const images = [
    { id: 1, url: "eekhoorn" },
    { id: 2, url: "eendje" },
    { id: 3, url: "egel" },
    { id: 4, url: "flamingos" },
    { id: 5, url: "geit" },
    { id: 6, url: "giraffe" },
    { id: 7, url: "hond" },
    { id: 8, url: "ijsbeer" },
    { id: 9, url: "kat" },
    { id: 10, url: "kittens" },
    { id: 11, url: "kwal" },
    { id: 12, url: "lama" },
    { id: 13, url: "leeuw" },
    { id: 14, url: "nijlpaard" },
    { id: 15, url: "olifant" },
    { id: 16, url: "panda" },
    { id: 17, url: "papegaai" },
    { id: 18, url: "pinguin" },
    { id: 19, url: "schildpad" },
    { id: 20, url: "tijger" },
    { id: 21, url: "zebra" },
    { id: 22, url: "wolf" },
    { id: 23, url: "vogels" },
    { id: 24, url: "uil" },
    { id: 25, url: "stokstaartje" },
    { id: 26, url: "rhino" },
    { id: 27, url: "pauw" },
    { id: 28, url: "rendieren" },
    { id: 29, url: "dolphijn" },
    { id: 30, url: "apen" },
    { id: 31, url: "apen2" },
    { id: 32, url: "beer" },
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
  for (const { id } of memoryGameImages) {
    html += `<img class="memory-game__card" data-id="${id}" src="assets/images/${defaultCard}.jpg" />`;
  }
  $el.innerHTML = html;

  flipCard(newImagesAmount);
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

function flipCard(images) {
  const $el = document.querySelector(".memory-game__cards");
  let flippedCards = [];
  let flippedCardCounter = 0;

  for (const $subEl of $el.children) {
    $subEl.addEventListener("click", function () {
      const $front = $subEl.src.includes("front");
      if ($front) {
        const id = $subEl.getAttribute("data-id");
        const url = images.find((image) => image.id == id).url;
        $subEl.src = `assets/images/pexels-${url}.jpg`;
        if (flippedCards.length < 2) {
          flippedCards.push($subEl);
          if (flippedCards.length == 2) {
            document.querySelector(".memory-game__overlay").style.display =
              "block";
            setTimeout(() => {
              const results = checkMatch(flippedCards);
              if (results) {
                flippedCards = [];
                flippedCardCounter++;
                if (flippedCardCounter === 18) {
                  const $popup = document.querySelector(".memory-game__popup");
                  $popup.style.display = "block";
                  $popup.innerHTML =
                    "<h1>Proficiat je bent gewonnen!</h1><button onclick='location.reload()'>Opnieuw spelen</button>";
                }
              } else {
                flippedCards.forEach(($card) => {
                  $card.src = "assets/images/front.jpg";
                });
                flippedCards = [];
              }
              document.querySelector(".memory-game__overlay").style.display =
                "none";
            }, 1000);
          }
        }
      }
    });
  }
}

function checkMatch(flippedCards) {
  if (
    flippedCards[0].getAttribute("data-id") ===
    flippedCards[1].getAttribute("data-id")
  ) {
    return true;
  }
  return false;
}

init();
