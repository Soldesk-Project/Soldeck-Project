////-----CSS 파일 추가-----------------------------------------
//(function() {
//	
//	const CSS_FILE_PATH = '/resources/css/eventTab/0002.css';
//	let linkEle = document.createElement('link');
//	linkEle.rel = 'stylesheet';
//	linkEle.href = CSS_FILE_PATH;
//	document.head.appendChild(linkEle);
//})();
//-----------------------------------------------------------------------------------

fetch('/event/list/0002')
.then(response => response.json())
.then(data => {
	console.log(data);
	const container = document.querySelector(".rank");
	let ranking = `
		<h1>랭킹</h1>
		<table>
			<tr>
				<td>등수</td>
				<td>닉네임</td>
				<td>점수</td>
			</tr>`;

	  data.forEach((rank, idx) => {
		  if (rank.game_score_2>0 ){
			  ranking+= `
						<tr>
							<td>${idx+1}등</td>
							<td>${rank.mem_nick }</td>
							<td class="score-td">${rank.game_score_2 }</td>
						</tr>
				  	`;
		  }

	  });
	  ranking+=`</table>`;
	  container.innerHTML=ranking;
  })
  .catch(error => console.error("랭킹  로드 실패:", error));


fetch('/event/list/0002/myScore')
.then(response => response.json())
.then(data => {
	console.log(data);
	const container = document.querySelector(".myRank");
	let ranking = `
		<h1>내 점수</h1>
		<table>
		<tr>
			<td>닉네임</td>
			<td>점수</td>
		</tr>`;
	if (data.game_score_2>0 ){
		ranking+= `
			<tr>
				<td>${data.mem_nick }</td>
				<td class="score-td myScore">${data.game_score_2 }</td>
			</tr>
			`;
	}
		
	ranking+=`</table>`;
	container.innerHTML=ranking;
})
.catch(error => console.error("내 점수 로드 실패:", error));















//-----------------------------------------------------------------------------------
window.cleanupEventTab0001 = function() {
	  if (window.runner && typeof window.runner.stopListening === 'function') {
	    window.runner.stopListening();
	    window.runner = null;
	  }
	  delete window.Runner;
	};
window.addEventListener('keydown', function(e) {
	if (e.keyCode === 32 && e.target === document.body) {
	  	e.preventDefault();
  	}
});
//-----키 락-----------------------------------------------------
(function() {
window.addEventListener('keydown', function(e) {
	if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
});



//----- 게임 ------------------------------------------------------------------
	
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let score = 0;
let highScore=0;

let snake;
let fruit;
let gameInterval;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

}());

function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fruit.draw();
      snake.update();
      snake.draw();

      if (snake.eat(fruit)) {
        score++;
        document.getElementById("score").textContent = score;
        fruit.pickLocation();
      }

      snake.checkCollision();
    }, 250);
  }
}

function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
}

function gameOver() {
	if (score>highScore) {
		highScore=score;
	}
  snake.reset();
  stopGame();
  saveScore();
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.tail = [];

  this.draw = function () {
    ctx.fillStyle = "#4CAF50";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.tail.length - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.y < 0 || this.x >= canvas.width || this.y >= canvas.height) {
      gameOver();
    }
  };

  this.changeDirection = function (direction) {
    switch (direction) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      case "Left":
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
    }
  };

  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.tail.push({ x: this.x - this.xSpeed, y: this.y - this.ySpeed });
      return true;
    }
    return false;
  };

  this.checkCollision = function () {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        gameOver();
      }
    }
  };

  this.reset = function () {
    this.x = 0;
    this.y = 0;
    this.tail = [];
    this.xSpeed = scale;
    this.ySpeed = 0;
    score = 0;
    document.getElementById("score").textContent = score;
  };
}

function Fruit() {
  this.x = 0;
  this.y = 0;

  this.pickLocation = function () {
    this.x = Math.floor(Math.random() * columns) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
  };

  this.draw = function () {
    ctx.fillStyle = "#FF4136";
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}

window.addEventListener("keydown", (event) => {
  const direction = event.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

document.querySelector(".start-btn").addEventListener("click", startGame);

function saveScore() {
	let myGameScore=document.querySelector('.myScore').innerText;
	console.log(highScore);
	console.log(myGameScore);
	
	if (myGameScore<highScore) {
		fetch('/event/saveGameScore2',{
			method : 'post',
			headers : {
			      'content-type' : 'application/json; charset=utf-8'
		    },
		    body : JSON.stringify({game_score_2 : highScore})
		})
	    .then(response => response.json())
	    .then(result => {
	      if(result) {
	          console.log("점수 갱신 성공!");
	//          location.reload();
	        } else {
	          console.log("기존 점수보다 낮거나 같아서 갱신되지 않았습니다.");
	        }
	      highScore=0;
	    })
	    .catch(err => console.log(err));
		}
	}


})();








