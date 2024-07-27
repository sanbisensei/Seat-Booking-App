//first we select our html spots with their respective class and id.
// 1.we use querry selectior for on one div called container.
// 2.then we use qurrry selector all for multiple seat and used an css method to only select those seats witch are not occupied.


const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')






// to get movie ticket price we first need to get the element first.
const movieSelect = document.getElementById('movie')
populateUI();
// after that we value method to get the value(ticket price)
let ticketPrice = +movieSelect.value;
//Q. why did we use + before the movieselect.value?
// => because if we dont use + then thie ticketPrice will give us string & if we use + then it automatically convert itself in number datatype. and we need number datatype to perform sum and other math stuffs.

// save selected movie index & price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



// update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // local storage part (start)
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)
    )

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))
    // local storage part(end)


    const selectedSeatsCount = selectedSeats.length;

    console.log(selectedSeatsCount);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage and populate ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index)=> {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
} 



// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount(); 
})

 


// seat click event
container.addEventListener('click',e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})


// initial count and total set
updateSelectedCount();