$(document).ready(function () {
    password();
    fontSize();
    optWrap();
    titWrap();
});

function password() {
    /* ===============================
    4자리 입력 UX
    =============================== */
    const inputs = document.querySelectorAll('.pin-wrap input');

    inputs.forEach((input, i) => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9]/g, '');
            if (input.value && i < inputs.length - 1) {
                inputs[i + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && i > 0) {
                inputs[i - 1].focus();
            }
        });
    });

    /* ===============================
    5분 타이머
    =============================== */
    const timerEl = document.getElementById('timer');

    if (timerEl) {
        let time = 300; // 5분 = 300초
        const timer = setInterval(() => {
            const min = String(Math.floor(time / 60)).padStart(2, '0');
            const sec = String(time % 60).padStart(2, '0');
            timerEl.textContent = `${min} : ${sec}`;

            if (time <= 0) {
                clearInterval(timer);
                timerEl.textContent = '00:00';
            }

            time--;
        }, 1000);
    }

}

function setCookie(name, value) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/';
}

function getCookie(name) {
    const value = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
    return value ? decodeURIComponent(value.split('=')[1]) : null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function fontSize() {
    const ele = document.getElementById("wrap");
    const btns = document.querySelectorAll('.btn-font');
    if (!ele) return;

    if (getCookie('size') === 'active') {
        ele.classList.add('active')
    } else {
        ele.classList.remove('active')
    }
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            ele.classList.toggle('active')
            const isActive = ele.classList.contains('active')
            setCookie('size', isActive ? 'active' : '', 30);
        })
    })
}



function optWrap() {
  const $optWraps = $('.opt-wrap');
  const $completeBtn = $('.btn-yellow');
  const duration = 400;

  function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    requestAnimationFrame(animation);
  }

  // 모든 opt-wrap에 선택이 되었는지 체크
  function checkAllSelected() {
    let allSelected = true;

    $optWraps.each(function () {
      const hasSelected = $(this).find('input[type="radio"]:checked').length > 0;
      if (!hasSelected) {
        allSelected = false;
        return false; // break
      }
    });

    if (allSelected) {
      $completeBtn.prop('disabled', false);
    } else {
      $completeBtn.prop('disabled', true);
    }
  }

  $optWraps.each(function (index) {
    $(this).find('input[type="radio"]').on('change', function () {
      const $nextWrap = $optWraps.eq(index + 1);
      
      // 완료 버튼 상태 체크
      checkAllSelected();

      if (!$nextWrap.length) return;

      const targetY = $nextWrap.offset().top;
      smoothScrollTo(targetY, duration);
    });
  });
}

function titWrap(){
    const ele = document.querySelector(".tit-wrap");
    if(ele){
        ele.addEventListener('click', () => {
            ele.classList.toggle('active')
        })
    }
}