<!--imgtomp4pfp-->

const profileImage = document.getElementById('profileImage');
const profileVideo = document.getElementById('profileVideo');
const avatarZone = document.getElementById('profileContainer'); 
let isVideoPlaying = false;

avatarZone.addEventListener('click', function(e) {
    e.stopPropagation(); // Важно: клик не идет дальше аватарки
    
    if (!isVideoPlaying) {
        profileImage.style.display = 'none';
        profileVideo.style.display = 'block';
        profileVideo.play();
        profileVideo.volume = 0.2;
        isVideoPlaying = true;
    } else {
        profileVideo.style.display = 'none';
        profileImage.style.display = 'block';
        profileVideo.pause();
        profileVideo.currentTime = 0;
        isVideoPlaying = false;
    }
});

<!--lastfm block-->

async function getLastFm() {
    const user = 'xvgn';
    const apiKey = '67af21695cb44bcd9aa66996a394f8d3';
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
            const track = data.recenttracks.track[0];
            const nowPlaying = track['@attr'] && track['@attr'].nowplaying;
           
            let coverUrl = '';
            if (track.image && track.image.length > 0) {
                const mediumImage = track.image.find(img => img.size === 'medium');
                coverUrl = mediumImage ? mediumImage['#text'] : track.image[2]?.['#text'] || track.image[0]['#text'];
            }

            const coverImg = document.getElementById('lastfm-cover');
            
            if (coverUrl && coverUrl.trim() !== '' && !coverUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
                coverImg.src = coverUrl;
                coverImg.style.display = 'block';
                coverImg.style.opacity = '1';
                coverImg.style.filter = 'none';
            } else {
                coverImg.src = 'pfp.jpg';
                coverImg.style.display = 'block';
                coverImg.style.opacity = '0.7';
                coverImg.style.filter = 'grayscale(50%)';
            }
            
            document.getElementById('lastfm-title').innerHTML = nowPlaying 
                ? '<i class="fas fa-music"></i> listening rn' 
                : '<i class="fas fa-history"></i> last track';
            
            document.getElementById('lastfm-track').innerHTML = track.name;
            document.getElementById('lastfm-artist').innerHTML = track.artist['#text'];
            
        } else {
            document.getElementById('lastfm-track').innerHTML = 'nothing playing';
            document.getElementById('lastfm-artist').innerHTML = '';
            document.getElementById('lastfm-cover').style.display = 'none';
        }
    } catch (error) {
        console.error('Ошибка last.fm:', error);
        document.getElementById('lastfm-track').innerHTML = 'error';
        document.getElementById('lastfm-artist').innerHTML = '';
        document.getElementById('lastfm-cover').style.display = 'none';
    }
}

getLastFm();
setInterval(getLastFm, 10000);

<!--animated nickNames-->

const nickNames = ['xvgn', 'xaversia', 'trinityxav', 'trxav', 'личность личности не установлена'];
    let nickIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentNick = '';
    
    function typeNick() {
        const fullNick = nickNames[nickIndex];
        
        if (isDeleting) {
            currentNick = fullNick.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentNick = fullNick.substring(0, charIndex + 1);
            charIndex++;
        }
        
        document.getElementById('typing-nick').textContent = currentNick;
        
        if (!isDeleting && charIndex === fullNick.length) {
            isDeleting = true;
            setTimeout(typeNick, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            nickIndex = (nickIndex + 1) % nickNames.length;
            setTimeout(typeNick, 500);
        } else {
            setTimeout(typeNick, isDeleting ? 100 : 200);
        }
    }
    
    function blinkCursor() {
        const cursor = document.getElementById('cursor');
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    typeNick();
    blinkCursor();

<!--animated title-->

(function() {
        const steps = [
            "ㅤ" ,"x", "xv", "xvg", "xvgn", "xvgn.", "xvgn.t", "xvgn.te", 
            "xvgn.tec", "xvgn.tech", "xvgn.tec", "xvgn.te", "xvgn.t", 
            "xvgn.", "xvgn", "xvg", "xv", "x" , "ㅤ"
        ];
        let i = 0;
        
        function updateTitle() {
            console.log('Setting title to:', steps[i]);
            document.title = steps[i];
            i = (i + 1) % steps.length;
        }   
        
        updateTitle();
        setInterval(updateTitle, 300);
    })();

    let konami = [];
const secretCode = [88, 86, 71, 78, 76, 79, 86, 69, 83, 68, 73, 65, 78, 69]

document.addEventListener('keydown', (e) => {
    konami.push(e.keyCode);
    if (konami.length > secretCode.length) konami.shift();
    
    if (konami.toString() === secretCode.toString()) {
        document.getElementById('secretPage').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});

function closeSecret() {
    document.getElementById('secretPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Пример: пульсация статуса, если ты онлайн
const statusDot = document.querySelector('.status-dot');
if (statusDot) {
    statusDot.animate([
        { opacity: 0.5, transform: 'scale(1)' },
        { opacity: 1, transform: 'scale(1.1)' },
        { opacity: 0.5, transform: 'scale(1)' }
    ], {
        duration: 2000,
        iterations: Infinity
    });
}

document.addEventListener('mousemove', (e) => {
    const amount = 150; // Сила наклона (чем больше, тем сильнее эффект)
    
    // Вычисляем положение мыши относительно центра экрана
    const x = (window.innerWidth / 2 - e.pageX) / amount;
    const y = (window.innerHeight / 2 - e.pageY) / amount;

    // Выбираем все элементы, которые должны "плавать"
    const elements = document.querySelectorAll('#user-profile, #lastfm, .link, .side-log, #bankroll, #copyright');

    elements.forEach(el => {
        // Имитируем гироскоп через rotateX и rotateY
        // И акселерацию через небольшое смещение (translate)
        el.style.transform = `
            rotateY(${-x}deg) 
            rotateX(${y}deg) 
            translateX(${-x * 0.5}px) 
            translateY(${y * 0.5}px)
        `;
        
        // Передаем значения в CSS для динамических теней (если нужно)
        el.style.setProperty('--tilt-x', `${x}px`);
        el.style.setProperty('--tilt-y', `${y}px`);
    });
});