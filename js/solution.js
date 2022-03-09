const movieSelector = document.querySelector('#movie');
const seats = document.querySelector('.container');
const naSeats = document.querySelectorAll('.row .seat:not(.occupied)');

const movie = {
  name: 'Avengers: Endgame',
  price: 10,
  numberOfSeats: 0,
  calculate() {
    return this.price * this.numberOfSeats;
  },
};

window.addEventListener('load', () => {
  placeSavedValues();
  updateFinalText();
});

seats.addEventListener('click', (item) => {
  const itemClasses = item.target.classList;
  if (itemClasses.contains('seat') && !itemClasses.contains('occupied')) {
    if (itemClasses.contains('selected')) {
      movie.numberOfSeats--;
    } else {
      movie.numberOfSeats++;
    }
    itemClasses.toggle('selected');

    updateFinalText();
  }
});

movieSelector.addEventListener('change', (item) => {
  movie.name =
    item.target.options[item.target.selectedIndex].innerText.split(' (')[0];
  movie.price = item.target.value;

  updateFinalText();
});

function updateFinalText() {
  saveToLocalStorage();

  document.querySelector('#count').innerText = movie.numberOfSeats;
  document.querySelector('#film').innerText = movie.name;
  document.querySelector('#total').innerText = movie.calculate();
}

function placeSavedValues() {
  const preSelectedSeats = JSON.parse(
    localStorage.getItem('selectedSeatIndexes')
  );

  movie.name = localStorage.getItem('movie') ?? 'Avengers: Endgame';
  movie.price = localStorage.getItem('price') ?? 10;

  if (preSelectedSeats !== null && preSelectedSeats.length > 0) {
    naSeats.forEach((seat, index) => {
      if (preSelectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  [...movieSelector.options].forEach((m) => {
    if (m.innerText.search(movie.name) >= 0) {
      m.setAttribute('selected', 'selected');
    }
  });

  movie.numberOfSeats = preSelectedSeats?.length ?? 0;
}

function saveToLocalStorage() {
  const selectedSeats = document.querySelectorAll('.row  .seat.selected');
  const indexHolder = [...selectedSeats].map((seat) =>
    [...naSeats].indexOf(seat)
  );

  localStorage.setItem('selectedSeatIndexes', JSON.stringify(indexHolder));
  localStorage.setItem('movie', movie.name);
  localStorage.setItem('price', movie.price);
}