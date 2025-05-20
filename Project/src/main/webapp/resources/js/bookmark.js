//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/bookmark.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

const CSS_FILE_PATH2 = '/resources/css/header.css';
let linkEle2 = document.createElement('link');
linkEle2.rel = 'stylesheet';
linkEle2.href = CSS_FILE_PATH2;
document.head.appendChild(linkEle2);

const CSS_FILE_PATH3 = '/resources/css/footer.css';
let linkEle3 = document.createElement('link');
linkEle3.rel = 'stylesheet';
linkEle3.href = CSS_FILE_PATH3;
document.head.appendChild(linkEle3);
//-----버튼 클릭 이벤트---------------------------------------------
document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', () => {
		let type = btn.getAttribute("id");
		
		if(type == 'bookmarkBtn'){
			openModal();
		}else if(type == 'outBookMarkBtn'){
			outBookmark();
			closeModal();
		}else if(type == 'cancelModalBtn'){
	    	closeModal();
		}else if(type == 'leftBtn'){
			privateToPublicBookmark();
		}else if(type == 'rightBtn'){
			publicToPrivateBookmark();
	    }
	});
});
//-----가게 이름 이동------------------------------------------
document.querySelectorAll(".info-text a").forEach(moveRestView => {
	moveRestView.addEventListener('click',e=>{
		e.preventDefault();
		const view = moveRestView.closest(".view").querySelector("#restNo").value;
		console.log(view);
		location.href="../search/view?rest_no="+view;
	});
})
//document.querySelectorAll(".view-img img").forEach(moveRestView => {
//	moveRestView.addEventListener('click',e=>{//더블클릭으로 이동
//		e.preventDefault();
//		const view = moveRestView.closest(".view").querySelector("#restNo").value;
//		location.href="../search/view?rest_no="+view;
//	});
//})
//-----북마크 아이템 클릭 시 restNo 저장---------------------------------------
document.querySelectorAll(".view").forEach(viewItem => {
    viewItem.addEventListener('click', function(e) {
        // 클릭된 요소가 버튼, input, img 태그가 아닐 경우에만 restNo를 업데이트
        if (!e.target.closest('button') && !e.target.closest('input') && !e.target.closest('img')) {
            restNo = this.querySelector("#restNo").value;
            isPublic = this.querySelector(".is-public").value;
            // 선택된 아이템에 시각적인 효과를 줄 수도 있습니다 (예: 테두리 강조)
            document.querySelectorAll(".view").forEach(v => v.classList.remove('selected'));
            this.classList.add('selected');
        }
    });
});
//-----가게 이름 글자수에 맞게 input태그 길이 변경---------------------
window.addEventListener('load', ()=>{
	document.querySelectorAll('.res-name').forEach(input => resizeInput(input));
});
function resizeInput(input) {
	const size = input.nextElementSibling;
	size.textContent = input.value;
	size.style.font = window.getComputedStyle(input).font;
	input.style.width = size.offsetWidth + 'px';
}
//-----즐겨찾기 삭제 확인 모달-------------------------------------------
const modal = document.querySelector('.bookmark-check-modal');
function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  restNo=0;
}

//-----데이터 가져오기 ------------------------------
//즐겨찾기 -> 가게 번호
let restNo;
document.querySelectorAll(".bookmark").forEach(bookmarkBtn => {
	bookmarkBtn.addEventListener('click',e=>{
		e.preventDefault();
		restNo = bookmarkBtn.closest(".view-info").querySelector("#restNo").value;
	});
})
//멤버 번호
let memberNo=document.querySelector("#memNo").value;
//----- 즐겨찾기 삭제 함수-------------------------------------------------
function outBookmark() {
	console.log(restNo);
	console.log(memberNo);

	fetch(`/mypage/favorites/remove/${restNo}`, {
		  method: 'DELETE',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({mem_no: memberNo, rest_no: restNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}
//-----버튼 지역별 목록-----------------------------------------------------------
//document.addEventListener('DOMContentLoaded', ()=>{
//    const allBtn = document.getElementById('all');
//    allBtn.classList.add('active');
//    document.querySelectorAll('.view').forEach(view => {
//        view.style.display = '';
//    });
//    allBtn.addEventListener('click',()=>{
//    	allBtn.classList.add('active');
//    	document.querySelectorAll('.view').forEach(view => {
//            view.style.display = '';
//        });
//    	document.querySelectorAll('.btn').forEach(btn=>{
//    		btn.classList.remove('active');
//    	});
//    });
//    document.querySelectorAll('.btn').forEach(btn=>{
//        btn.addEventListener('click', function(){
//            if (this.classList.contains('active')) {
//                this.classList.remove('active');
//                allBtn.classList.add('active');
//                document.querySelectorAll('.view').forEach(view=>{
//                    view.style.display='';
//                });
//                return;
//            }
//            document.querySelectorAll('.btn').forEach(activeBtn=>{
//                activeBtn.classList.remove('active');
//                allBtn.classList.remove('active');
//            });
//            btn.classList.add('active');
//            let region = this.value;
//            document.querySelectorAll('.view').forEach(view=>{
//                if (view.dataset.adr == region) {
//                    view.style.display = '';
//                } else {
//                    view.style.display = 'none';
//                }
//            });
//        });
//    });
//});

document.addEventListener('DOMContentLoaded', ()=>{
    const allBtn = document.getElementById('all');
    let btns = document.querySelectorAll('.btn');
    let views= document.querySelectorAll('.view');
    
    function allViews() {
    	views.forEach(view => {
    		view.style.display = '';
    	});
	}
    function clearBtn() {
		btns.forEach(btn=>{
			allBtn.classList.remove('active');
			btn.classList.remove('active');
		});
	}
    
    allViews();
    allBtn.classList.add('active');
    
    allBtn.addEventListener('click',()=>{
    	clearBtn();
    	allBtn.classList.add('active');
    	allViews();
    });
    
    btns.forEach(btn=>{
        btn.addEventListener('click', function(){
            if (this.classList.contains('active')) {
            	clearBtn();
                allBtn.classList.add('active');
                allViews();
                return;
            }
            
            clearBtn();
            btn.classList.add('active');
            
            views.forEach(view=>{
            	view.style.display=(view.dataset.adr == this.value)?'':'none';
            });
        });
    });
});

//-----가게 선택시 정보 가져오기---------------------------------------------------------------
let isPublic;

document.querySelectorAll('.view').forEach(view=>{
	view.addEventListener('click', function(e){
		if (e.target.closest('button')||e.target.closest('input')){
			return;
		}
		
		
		if (this.classList.contains('active')) {
			this.classList.remove('active');
			restNo=0;
    		return;
		}
		document.querySelectorAll('.view').forEach(view2=>{
    		view2.classList.remove('active');
    	});
    	restNo = this.closest(".view").querySelector("#restNo").value;
    	isPublic= this.closest(".view").querySelector(".is-public").value;
		view.classList.add('active');
    });
});
//-----버튼으로 즐겨찾기 설정 변경--------------------------------------------------------
function publicToPrivateBookmark() {
	if (restNo==0 || restNo==null) {
		alert('가게가 선택되지 않았습니다');
		return;
	}
	if (isPublic=='N') {
		alert('이미 비공개 즐겨찾기 입니다');
		return;
	}
	fetch('/mypage/bookmark/private', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({mem_no: memberNo, rest_no: restNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
	
}
function privateToPublicBookmark() {
	if (restNo==0 || restNo==null) {
		alert('가게가 선택되지 않았습니다');
		return;
	}
	if (isPublic=='Y') {
		alert('이미 공개 즐겨찾기 입니다');
		return;
	}
	fetch('/mypage/bookmark/public', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({mem_no: memberNo, rest_no: restNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}
//사이드 탭 클릭 후 active 유지
window.addEventListener('DOMContentLoaded', () => {

	  const links = document.querySelectorAll('.side li a');
	  const currentPath = window.location.pathname.replace(/\/$/, '').toLowerCase();

	  links.forEach(link => {
	    const href = link.getAttribute('href');
	    const absoluteHref = new URL(href, window.location.origin).pathname.replace(/\/$/, '').toLowerCase();

	    if (currentPath === absoluteHref) {
	      link.classList.add('active');
	    }
	  });
	});