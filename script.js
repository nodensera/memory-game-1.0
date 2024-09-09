const CARDS = [
    {
      id: 1,
      name: 'lapis',
      img: 'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/pencil-dynamic-premium.png'
    },
    {
      id: 2,
      name: 'balde',
      img: 'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/bucket-dynamic-premium.png'
    },
    {
      id: 3,
      name: 'plus',
      img: 'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/plus-dynamic-premium.png'
    },
    {
      id: 4,
      name: 'cubo',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/cube-dynamic-premium.png'
    },
    {
      id: 5,
      name: 'cartao',
      img: 'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/card-dynamic-premium.png'
    },
    {
      id: 6,
      name: 'chave',
      img: 'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/key-dynamic-premium.png'
    },
    {
      id: 7,
      name: 'tesouras',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/scissor-dynamic-premium.png'
    },
    {
      id: 8,
      name: 'sol',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/sun-dynamic-premium.png'
    },
    {
      id: 9,
      name: 'guarda chuva',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/umbrella-dynamic-premium.png'
    },
    {
      id: 10,
      name: 'telefono',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/phone-only-dynamic-premium.png'
    },
    {
      id: 11,
      name: 'presente',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/gift-dynamic-premium.png'
    },
    {
      id: 12,
      name: 'relampago',
      img:
        'https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/flash-dynamic-premium.png'
    }
  ];
  const cardContainer = document.querySelector('.card-container');
  const available = document.querySelector('#available');
  const modalTitle = document.querySelector('#modal-title');
  const modal = document.querySelector('#modal');
  let currentCards = [...CARDS, ...CARDS];
  let isPaused = false;
  let counter = CARDS.length + 18;
  let isLose = false;
  
  // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    let counter = array.length,
      temp,
      index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
  
  function win() {
    isPaused = true;
    modalTitle.innerHTML = 'Você venceu!! 😀';
    modal.classList.add('modal--open');
  }
  
  function lose() {
    isLose = true;
    modalTitle.innerHTML = 'Você perdeu... 🙁';
    modal.classList.add('modal--open');
  }
  
  function handleClick(e) {
    const { target } = e;
    if (
      !isPaused &&
      !isLose &&
      !target.classList.contains('card--guessed') &&
      !target.classList.contains('card--picked')
    ) {
      isPaused = true;
      const picked = cardContainer.querySelector('.card--picked');
      if (picked) {
        if (picked.dataset.id === target.dataset.id) {
          target.classList.remove('card--picked');
          picked.classList.remove('card--picked');
          target.classList.add('card--guessed');
          picked.classList.add('card--guessed');
          isPaused = false;
        } else {
          target.classList.add('card--picked');
          setTimeout(() => {
            target.classList.remove('card--picked');
            picked.classList.remove('card--picked');
            isPaused = false;
          }, 1500);
        }
        console.log('counter', counter);
        counter -= 1;
        available.innerHTML = counter;
        if (counter === 0) {
          lose();
        }
      } else {
        target.classList.add('card--picked');
        isPaused = false;
      }
  
      // Validate is already win
      const isWin = cardContainer.querySelectorAll('card--guessed').length === currentCards.length;
      if (isWin) {
        win();
      }
    }
  }
  
  function drawCards() {
    cardContainer.innerHTML = '';
    available.innerHTML = counter;
  
    shuffle(currentCards).forEach((el) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-id', el.id);
      card.innerHTML = `
          <div class="card__front">
            <img
              class="front__img"
              src="${el.img}"
              alt="${el.name}"
            />
            <h6 class="card__name">${el.name}</h6>
          </div>
          <div class="card__back">
            <img
              class="back__img"
              src="https://static.vecteezy.com/system/resources/previews/021/664/484/non_2x/speech-bubble-thought-bubble-comic-bubble-transparent-free-free-png.png"
              alt="Thought"
            />
          </div>
        `;
      card.addEventListener('click', handleClick);
      cardContainer.appendChild(card);
    });
  }
  
  document.querySelector('#play-again').addEventListener('click', function () {
    modal.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    counter = CARDS.length + 10;
    drawCards();
  });
  
  drawCards();
  