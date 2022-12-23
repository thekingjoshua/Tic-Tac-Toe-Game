'use strict';
const selectBox = document.querySelector('.select__box'),
	selectXBox = document.querySelector('.playerX'),
	selectOBox = document.querySelector('.playerO'),
	playBoard = document.querySelector('.play__board'),
	boxes = document.querySelectorAll('section span'),
	players = document.querySelectorAll('.players'),
	resultBox = document.querySelector('.result__box'),
	resultText = document.querySelector('.result__text'),
	replayBtn = document.querySelector('.replay__btn');

window.addEventListener('load', () => {
	boxes.forEach(box => {
		// Add event listeners to each box
		box.addEventListener('click', clickedBox);
	});
	selectXBox.addEventListener('click', () => {
		selectBox.classList.toggle('hidden'); // Hide the select player box when X is clicked
		playBoard.classList.toggle('show'); // Display the play board
		players.forEach(player => {
			player.setAttribute('class', 'players player');
		});
	});
	selectOBox.addEventListener('click', () => {
		selectBox.classList.toggle('hidden'); // Hide the select player box when O is clicked
		playBoard.classList.toggle('show'); // Display the play board
		players.forEach(player => {
			player.setAttribute('class', 'players active');
		});
	});
});

// player's move functionality
let playerSign = 'x'; // assume current player is x
let compSign = 'o'; // assume computer is o

function clickedBox(e) {
	const clickedBox = e.target;
	// console.log(clickedBox);
	players.forEach(player => {
		// If current player is X
		if (player.classList.contains('player')) {
			clickedBox.innerHTML = `<i class="fa fa-times"></i>`; // adding X inside the clicked Box
			player.classList.add('active');
			clickedBox.setAttribute('id', playerSign);
			// console.log(playerSign);
		} else {
			clickedBox.innerHTML = `<i class="fa fa-circle-o"></i>`; // adding O inside the clicked Box
			player.classList.add('active');
			// if current player is O change the sign to O
			if (playerSign === 'x') {
				playerSign = 'o';
			}
			clickedBox.setAttribute('id', playerSign);
			// console.log(playerSign);
		}
		console.log(getId(6));
		selectPlayerWinner(); // checking if the player is the winner
		clickedBox.style.pointerEvents = 'none'; // once a box is cliked, it can't be clicked again
	});
	let randomDelayTime = (Math.random() * 1000 + 200).toFixed(); // randomizing delay so the computer can delay at different time before playing
	setTimeout(() => {
		computer(); // calling computer functionality
	}, randomDelayTime); // passing random delay time
}

// computer's move functionality
function computer() {
	if (playerSign === 'o') {
		compSign = 'x';
	}
	// console.log('playersign:', playerSign);
	// console.log('compSign:', compSign);
	let arr = []; // empty array to store unselected boxes index
	boxes.forEach((box, i) => {
		if (box.childElementCount === 0) {
			arr.push(i);
		}
	});
	let randomBox = arr[Math.floor(Math.random() * arr.length)]; // getting random index from array so computer will select random unselected boxes
	if (arr.length > 0) {
		players.forEach(player => {
			// check for current player
			if (player.classList.contains('player')) {
				boxes[randomBox].innerHTML = `<i class="fa fa-circle-o"></i>`; // adding O inside the unselected Boxes
				player.classList.remove('active');
				boxes[randomBox].setAttribute('id', compSign);
			} else {
				boxes[randomBox].innerHTML = `<i class="fa fa-times"></i>`; // adding X inside the unselected Boxes
				player.classList.remove('active');
				boxes[randomBox].setAttribute('id', compSign);
			}
		});
	}
	selectCompWinner(); // checking if the computer is the winner
	if (!boxes[randomBox]) return; // exit code if undefined or null is returned
	boxes[randomBox].style.pointerEvents = 'none'; // once player or bot selects a box it can't be selected again by the player or the bot
}

function getId(idname) {
	return document.querySelector('.box' + idname).id;
}

function checkId(val1, val2, val3, sign) {
	if (getId(val1) === sign && getId(val2) === sign && getId(val3) === sign) {
		return true;
	}
}
function selectPlayerWinner() {
	if (
		checkId(1, 2, 3, playerSign) ||
		checkId(4, 5, 6, playerSign) ||
		checkId(7, 8, 9, playerSign) ||
		checkId(1, 5, 9, playerSign) ||
		checkId(7, 5, 3, playerSign) ||
		checkId(3, 5, 7, playerSign) ||
		checkId(1, 4, 7, playerSign) ||
		checkId(2, 5, 8, playerSign) ||
		checkId(3, 6, 9, playerSign)
	) {
		setTimeout(() => {
			playBoard.classList.remove('show'); // Display the play board
			resultBox.classList.remove('hidden');
		}, 300);
		resultText.innerHTML = `<p>You won this round</p>`;
	} else if (
		getId(1) != '' &&
		getId(2) != '' &&
		getId(3) != '' &&
		getId(4) != '' &&
		getId(5) != '' &&
		getId(6) != '' &&
		getId(7) != '' &&
		getId(8) != '' &&
		getId(9) != ''
	) {
		setTimeout(() => {
			playBoard.classList.remove('show'); // Display the play board
			resultBox.classList.remove('hidden');
		}, 300);
		resultText.textContent = 'Match ended as a draw';
	}
}
function selectCompWinner() {
	if (
		checkId(1, 2, 3, compSign) ||
		checkId(4, 5, 6, compSign) ||
		checkId(7, 8, 9, compSign) ||
		checkId(1, 5, 9, compSign) ||
		checkId(7, 5, 3, compSign) ||
		checkId(3, 5, 7, compSign) ||
		checkId(1, 4, 7, compSign) ||
		checkId(2, 5, 8, compSign) ||
		checkId(3, 6, 9, compSign)
	) {
		setTimeout(() => {
			playBoard.classList.remove('show'); // Display the play board
			resultBox.classList.remove('hidden');
		}, 300);
		resultText.innerHTML = `<p>Computer Won this round</p>`;
	}
}

replayBtn.addEventListener('click', () => window.location.reload());
