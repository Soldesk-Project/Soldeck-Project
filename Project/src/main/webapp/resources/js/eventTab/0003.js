//-----CSS 파일 추가-----------------------------------------
//(function() {
//	
//	const CSS_FILE_PATH = '/resources/css/eventTab/0003.css';
//	let linkEle = document.createElement('link');
//	linkEle.rel = 'stylesheet';
//	linkEle.href = CSS_FILE_PATH;
//	document.head.appendChild(linkEle);
//})();


window.cleanupEventTab0001 = function() {
	if (window.runner && typeof window.runner.stopListening === 'function') {
		window.runner.stopListening();
		window.runner = null;
	}
	delete window.Runner;
};
(function() {
	
	window.addEventListener('keydown', function(e) {
		if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	});	
	
	
	
	
//----- 게임 ------------------------------------------------------------------
	
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const items = ["꽝", "꽝", "꽝", "꽝", "50", "100", "200", "500"];
const colors = ["#00B8D4", "#FF7D00", "#00B8D4", "#FF7D00", "#00B8D4", "#FF7D00", "#00B8D4", "#FF7D00"];

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;
let angle = 0;
let spinning = false;
let spinAngle = 0;
let spinVelocity = 0;

function drawRoulette() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const arc = (2 * Math.PI) / items.length;

  for (let i = 0; i < items.length; i++) {
    // 각 섹터 그리기
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle + i * arc, angle + (i + 1) * arc);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    // 텍스트
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + (i + 0.5) * arc);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.fillText(items[i], radius - 10, 10);
    ctx.restore();
  }

  // 화살표
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius - 20);
  ctx.lineTo(centerX - 20, centerY - radius - 60);
  ctx.lineTo(centerX + 20, centerY - radius - 60);
  ctx.closePath();
  ctx.fillStyle = "#333";
  ctx.fill();
}

const spinBtn = document.getElementById("spin");


//수정된 spinRoulette 함수
function spinRoulette() {
	if (spinning) return;

	spinning = true;
	spinVelocity = Math.random() * 0.2 + 0.25;
	animateSpin();
}

//페이지 로드 시 버튼 상태 설정
window.addEventListener('DOMContentLoaded', () => {
	let myPoint=document.querySelector('.my-point').innerText;
	if (myPoint<100) {
		spinBtn.disabled = true;
	 spinBtn.textContent = "포인트가 부족합니다";
	} else {
		spinBtn.disabled = false;
	 spinBtn.textContent = "SPIN";
	}
});

function animateSpin() {
  if (spinVelocity > 0.005) {
    spinAngle += spinVelocity;
    spinVelocity *= 0.98; // 감속
    angle = spinAngle;
    drawRoulette();
    requestAnimationFrame(animateSpin);
  } else {
    spinning = false;
    // 결과 계산
    const arc = (2 * Math.PI) / items.length;
    let selected = items.length - Math.floor(((angle + Math.PI / 2) % (2 * Math.PI)) / arc) - 1;
    if (selected < 0) selected += items.length;
    setTimeout(() => {
      alert("결과: " + items[selected]);
      console.log(items[selected]-100);
      if (items[selected]>0) {
    	  savePoint(items[selected]-100);
      }else{
    	  savePoint(-100);
      }
    }, 300);
  }
}

drawRoulette();
document.getElementById("spin").addEventListener("click", spinRoulette);



//-----------------------------------------------------------------------------------------------------

function savePoint(point) {
	console.log(point);
	if(point!=null){
		fetch('/event/savePoint',{
			method : 'post',
			headers : {
			      'content-type' : 'application/json; charset=utf-8'
		    },
		    body : JSON.stringify({point: point})
		})
	    .then(response => response.json())
	    .then(result => {
	      console.log(result);
	      location.reload();
	    })
	    .catch(err => console.log(err));
	}
}



})();
