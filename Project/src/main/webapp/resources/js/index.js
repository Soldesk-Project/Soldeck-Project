document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('popup-close');

    setTimeout(function() {
        popup.style.display = 'block';
    }, 1000);

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    document.querySelector(".pop-up_image").addEventListener('click',()=>{
    	location.href='/event/main';
    });
});

// 메인 페이지 이미지 슬라이더
const slides = document.getElementById("slides");
const slideContainers = document.querySelectorAll('#slides .slide-container');
const slideCount = slideContainers.length;
let currentImageIndex = 0;

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let autoSlideInterval;
const autoSlideDelay = 3000; // 자동 슬라이드 간격 (3초)

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlider('image', 1);
    }, autoSlideDelay);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

startAutoSlide();

slides.addEventListener("mousedown", startDrag);
slides.addEventListener("mouseup", endDrag);
slides.addEventListener("mouseleave", endDrag);
slides.addEventListener("mousemove", drag);

function startDrag(e) {
    isDragging = true;
    startX = e.pageX;
    animationID = requestAnimationFrame(animation);
    stopAutoSlide();
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = e.pageX;
    const diff = currentPosition - startX;
    let tentativeTranslate = prevTranslate + diff;

    const maxTranslate = 0;
    const minTranslate = -((slides.children.length - 1) * slides.offsetWidth);

    if (tentativeTranslate > maxTranslate) {
        currentTranslate = maxTranslate;
    } else if (tentativeTranslate < minTranslate) {
        currentTranslate = minTranslate;
    } else {
        currentTranslate = tentativeTranslate;
    }
}

function endDrag() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentImageIndex < slideCount - 1) {
        currentImageIndex++;
    } else if (movedBy > 100 && currentImageIndex > 0) {
        currentImageIndex--;
    }

    setPositionByIndex();
    resetAutoSlide();
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = -currentImageIndex * slides.offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

const sliderIndexes = { // 함수 내에서 sliderIndexes를 관리
        today: 0,
        preference: 0,
        friend: 0
    };

function moveSlider(name, direction) {
    if (name === 'image') {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = slideCount - 1;
        } else if (currentImageIndex >= slideCount) {
            currentImageIndex = 0;
        }

        const translateValue = -currentImageIndex * 100 + '%';
        slides.style.transform = 'translateX(' + translateValue + ')';
        resetAutoSlide();
    } else {
        const track = document.getElementById(`${name}-slider`);
        if (!track) return;
        const items = track.children.length;
        const itemsPerPage = 3;
        const itemWidth = 340;

        const maxIndex = Math.ceil(items / itemsPerPage) - 1;
        

        if (!sliderIndexes.hasOwnProperty(name)) {
            sliderIndexes[name] = 0; // 해당 슬라이더의 인덱스 초기화
        }

        sliderIndexes[name] += direction;
        if (sliderIndexes[name] < 0) sliderIndexes[name] = 0;
        if (sliderIndexes[name] > maxIndex) sliderIndexes[name] = maxIndex;

        const translateX = -sliderIndexes[name] * itemWidth * itemsPerPage;
        track.style.transform = `translateX(${translateX}px)`;
    }
}

// 지역별 지도 이동 함수
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.btn-fir').forEach(btn => {
        btn.addEventListener('click', () => {
            let keyword = btn.getAttribute("value");
            console.log("클릭된 키워드:", keyword);
            sessionStorage.setItem('keyword', keyword);
            sessionStorage.setItem('actionType', 'category');
            location.href = "../search/map";
        });
    });
});

const userData = document.getElementById('user-data');
const user_no = userData.dataset.user || '';

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
	showRating();
	showReview();
	showFriend();
	showGroup();
	rankRestEventListeners();
});

// 가게 클릭 이벤트
function showRestEventListeners() {
    document.querySelectorAll('.recommendation-slider-window').forEach(window => {
        window.addEventListener('click', (event) => {
            const item = event.target.closest('.recommendation-item');
            if (!item) return;

            const rest_no = item.dataset.rest_no;
            if (rest_no) {
                location.href = `/search/view?rest_no=${rest_no}`;
            }
        });
    });
}

// 병렬 fetch
function fetchData() {
    const headers = { 'Accept': 'application/json' };

    const todayPromise = fetch('/search/index/todayData', { headers })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .catch(err => {
            console.error("Today fetch error:", err);
            return [];
        });

    const preferencePromise = user_no
        ? fetch('/search/index/likeKateData', { headers })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(err => {
                console.error("Preference fetch error:", err);
                return [];
            })
        : Promise.resolve([]);

    Promise.all([todayPromise, preferencePromise]).then(([todayData, preferenceData]) => {
    	showList("today-slider", todayData);
        if (user_no) {
        	showList("preference-slider", preferenceData);
        }
        showRestEventListeners(); // 한 번만 호출
    });
}

function showList(containerId, dataArray) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(dataArray)) {
        console.error(`Invalid container or data for ${containerId}`);
        return;
    }

    container.innerHTML = dataArray.map(json => {
        const rest_no = json.rest_no || 'default';
        const img_src = json.rest_img_name || '';
        return `
            <div class="recommendation-item" data-rest_no="${rest_no}">
                <img src="${img_src}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">
            </div>
        `;
//                <p>${json.rest_name || '이름 없음'}</p>; // 가게 이름 필요하면 return의 </div>위에 넣기
    }).join('');
}

// 탭 클릭 이벤트
document.querySelectorAll('.rank-header > div').forEach(tap => {
  tap.addEventListener('click', () => {
    const tabType = tap.getAttribute('data-tab');

    // 탭 스타일 업데이트
    document.querySelectorAll('.rank-header > div').forEach(t => t.classList.remove('active'));
    tap.classList.add('active');

    // 콘텐츠 전환
    document.querySelectorAll('.rank-content > div').forEach(content => {
      content.classList.remove('show');
    });
    document.querySelector(`.content-${tabType}`).classList.add('show');
  });
});

// 가게 클릭 이벤트
function rankRestEventListeners() {
    document.querySelectorAll('.rank-content').forEach(window => {
        window.addEventListener('click', (event) => {
            const item = event.target.closest('.review, .rating');
            if (!item) return;

            const rest_no = item.dataset.rest_no;
            if (rest_no) {
                location.href = `/search/view?rest_no=${rest_no}`;
            }
        });
    });
}

function getRating(callback) {
    const url = `/comment/restAvgRate`;
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        callback(data || {});
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback({});
    });
}

function showRating() {
    const rating = document.querySelector('.content-rating');
    if (!rating) {
        console.error('평점 정보(.content-rating show)를 찾을 수 없습니다.');
        return;
    }
    
    getRating(jsonArray => {
        let msg = '';
        jsonArray.forEach(json => {
            msg += `<div class="ratings">`;
            msg += 	`<div class="rating" data-rest_no="${json.rest_no}">${json.rest_name} : ${json.avg_rate}점</div>`;
            msg += `</div>`;
        });

        rating.innerHTML = msg;
    });
}
function getReview(callback) {
	const url = `/comment/restReviewCount`;
	fetch(url, {
		headers: {
			'Accept': 'application/json'
		}
	})
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		callback(data || {});
	})
	.catch(err => {
		console.error("Fetch error:", err.message);
		callback({});
	});
}

function showReview() {
	const review = document.querySelector('.content-review');
	if (!review) {
		console.error('리뷰 정보(.content-review)를 찾을 수 없습니다.');
		return;
	}
	
	getReview(jsonArray => {
		let msg = '';
		jsonArray.forEach(json => {
			msg += `<div class="reviews">`;
			msg += 	`<div class="review" data-rest_no="${json.rest_no}">${json.rest_name} : ${json.com_count}</div>`;
			msg += `</div>`;
		});
		
		review.innerHTML = msg;
	});
}

document.querySelectorAll('.taps > div').forEach(tap => {
	  tap.addEventListener('click', () => {
	    const tabType = tap.getAttribute('data-tab');

	    // 탭 스타일 업데이트
	    document.querySelectorAll('.taps > div').forEach(t => t.classList.remove('active'));
	    tap.classList.add('active');

	    // 콘텐츠 전환
	    document.querySelectorAll('.tap-content > div').forEach(content => {
	      content.classList.remove('show');
	    });
	    document.querySelector(`.content-${tabType}`).classList.add('show');

	    // 이동 버튼 전환
	    document.querySelectorAll('.tap-move > div').forEach(move => {
	      move.classList.remove('show');
	    });
	    document.querySelector(`.move-${tabType}`).classList.add('show');
	  });
	});

//탭 클릭 이벤트
document.querySelectorAll('.tap-move > div').forEach(move => {
	  move.addEventListener('click', () => {
	    if (move.classList.contains('move-friend')) {
	      window.location.href = '/friendlist/friendList';
	    } else if (move.classList.contains('move-group')) {
	      window.location.href = '/grouplist/groupList';
	    }
	  });
	});
function getFriend(callback) {
  const url = `/friendlist/friendListData`;
  fetch(url, {
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      callback(data || {});
  })
  .catch(err => {
      console.error("Fetch error:", err.message);
      callback({});
  });
}

function showFriend() {
  const friend = document.querySelector('.content-friend');
  if (!friend) {
      console.error('친구 정보(.content-friend)를 찾을 수 없습니다.');
      return;
  }

  // body에서 memNo 값을 가져오기
  const myNo = document.body.dataset.memNo;

  getFriend(jsonArray => {
      let msg = '';
      jsonArray.forEach(json => {
          const friendNick = json.friendMember.mem_nick;
          const friendNo = json.friendMember.mem_no;

          msg += `<div class="friends">`;
          msg += `  <div class="friend" data-friend-no="${friendNo}">${friendNick}</div>`;
          msg += `</div>`;
      });

      friend.innerHTML = msg;

      // 친구 닉네임 클릭 이벤트 바인딩
      document.querySelectorAll('.friend').forEach(friendEl => {
          friendEl.addEventListener('click', e => {
              const friendNo = friendEl.dataset.friendNo;
              if (friendNo) {
                  // roomNo 계산 (두 사용자의 번호를 합친 값)
                  const roomNo = myNo < friendNo ? `${myNo}${friendNo}` : `${friendNo}${myNo}`;
                  console.log(roomNo);

                  // 해당 채팅방으로 이동
                  location.href = `/chat/privateChatRoom/${roomNo}`;
              } else {
                  alert("친구 번호가 없습니다.");
              }
          });
      });
  });
}



function getGroup(callback) {
  const url = `/grouplist/memberGroupListData`;
  fetch(url, {
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      callback(data || {});
  })
  .catch(err => {
      console.error("Fetch error:", err.message);
      callback({});
  });
}

function showGroup() {
  const group = document.querySelector('.content-group');
  if (!group) {
      console.error('그룹 정보(.content-group)를 찾을 수 없습니다.');
      return;
  }
  
  getGroup(jsonArray => {
      let msg = '';
      jsonArray.forEach(json => {
          msg += `<div class="groups">`;
          msg += 	`<div class="group">${json.chat_title}</div>`;
          msg += `<input type="hidden" class="group_no" value="${json.group_no}">`
          msg += `</div>`;
      });

      group.innerHTML = msg;
      //-----그룹 이름 클릭 시 채팅방으로 이동--------------------------------------------
      document.querySelectorAll(".group").forEach(moveChatRoom => {
      	moveChatRoom.addEventListener('click',e=>{
      		e.preventDefault();
      		// 현재 input 기준으로 가장 가까운 div에서 groupNo를 찾기
      		const groupNo = moveChatRoom.nextElementSibling.value;
      		location.href="../chat/chatRoom/" + groupNo;
      	});
      })
  });
}