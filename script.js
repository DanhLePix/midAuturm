document.addEventListener('DOMContentLoaded', function() {
    // Xử lý loading screen
    const loading = document.querySelector('.loading');
    
    // Ẩn loading screen sau 2 giây
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 2000);
    // Khởi tạo AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Xử lý hiển thị phần kết thúc hoành tráng
    const finalWishSection = document.getElementById('finalWish');
    let finalWishShown = false;

    function checkFinalWishVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        // Hiển thị phần kết thúc khi cuộn đến 80% trang
        if (scrollPercentage >= 80 && !finalWishShown) {
            finalWishShown = true;
            finalWishSection.style.opacity = '1';
            finalWishSection.style.transform = 'translateY(0)';
            
            // Kích hoạt animation cho AOS
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Thêm hiệu ứng đặc biệt khi xuất hiện
            setTimeout(() => {
                finalWishSection.style.animation = 'finalWishAppear 2s ease-out';
            }, 100);
        }
    }

    // Ẩn phần kết thúc ban đầu
    if (finalWishSection) {
        finalWishSection.style.opacity = '0';
        finalWishSection.style.transform = 'translateY(100px)';
        finalWishSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    }

    // Lắng nghe sự kiện cuộn
    window.addEventListener('scroll', checkFinalWishVisibility);

    // Thêm animation xuất hiện đặc biệt
    const style = document.createElement('style');
    style.textContent = `
        @keyframes finalWishAppear {
            0% {
                opacity: 0;
                transform: translateY(100px) scale(0.8);
            }
            50% {
                opacity: 0.5;
                transform: translateY(-20px) scale(1.05);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Khởi tạo Typed.js
    const typed = new Typed('.typed-text', {
        strings: [
            'Đêm Trăng Tròn Đoàn Viên',
            'Tình Yêu Thương Gia Đình',
            'Niềm Vui Trẻ Thơ',
            'Hạnh Phúc Sum Vầy',
            'Đi kiếm gấu mà chơi trung thu đi ',
            'FA bùn lắm :((('
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Xử lý âm nhạc nền
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('toggleMusic');
    let isPlaying = false;
    let playPromise = null;

    // Đặt âm lượng vừa phải (30%)
    music.volume = 0.3;

    // Tự động phát nhạc khi trang được tải
    function tryPlayMusic() {
        // Nếu đang có play promise thì không thực hiện thêm
        if (playPromise) {
            return;
        }
        
        playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicToggle.textContent = '♫ Tắt Nhạc';
                console.log('Nhạc đang phát tự động');
                playPromise = null;
            }).catch(function(error) {
                console.log('Không thể tự động phát nhạc:', error);
                playPromise = null;
                // Thử lại khi có bất kỳ tương tác nào
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('scroll', playOnInteraction, { once: true });
                document.addEventListener('mousemove', playOnInteraction, { once: true });
            });
        }
    }

    function playOnInteraction() {
        if (!isPlaying && !playPromise) {
            playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicToggle.textContent = '♫ Tắt Nhạc';
                    console.log('Nhạc đã phát sau tương tác');
                    playPromise = null;
                }).catch(function(error) {
                    console.log('Không thể phát nhạc sau tương tác:', error);
                    playPromise = null;
                });
            }
        }
    }

    // Thử phát nhạc ngay khi trang tải
    tryPlayMusic();

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            // Dừng nhạc ngay lập tức
            music.pause();
            isPlaying = false;
            musicToggle.textContent = '♫ Bật Nhạc';
        } else {
            // Phát nhạc và chờ Promise hoàn thành
            playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicToggle.textContent = '♫ Tắt Nhạc';
                    playPromise = null;
                }).catch(function(error) {
                    console.log("Không thể phát nhạc:", error);
                    playPromise = null;
                });
            } else {
                // Trường hợp play() không trả về promise
                isPlaying = true;
                musicToggle.textContent = '♫ Tắt Nhạc';
            }
        }
    });

    // Hiệu ứng đèn lồng
    const lanterns = document.querySelectorAll('.lantern');
    lanterns.forEach((lantern, index) => {
        lantern.style.animationDelay = `${index * 0.5}s`;
    });

    // Hiệu ứng parallax cho các vector khi cuộn trang
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax cho mặt trăng
        const moon = document.querySelector('.moon');
        if (moon) {
            moon.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax cho chị Hằng và thỏ Ngọc
        const fairy = document.querySelector('.fairy');
        const rabbit = document.querySelector('.rabbit');
        if (fairy) fairy.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (rabbit) rabbit.style.transform = `translateY(${scrolled * 0.25}px)`;
    });

    // Thêm hiệu ứng cho wish-cards khi hover
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Tạo các ngôi sao
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 1 + 's';
        star.style.animationDuration = (1 + Math.random() * 1) + 's';
        starsContainer.appendChild(star);
    }

    // Hiệu ứng tương tác cho bánh Trung Thu
    const mooncakes = document.querySelectorAll('.mooncake');
    mooncakes.forEach((mooncake, index) => {
        mooncake.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });

        mooncake.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // Thêm hiệu ứng click
        mooncake.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                this.style.animation = 'mooncakeFloat 4s ease-in-out infinite';
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    });

    // Hiệu ứng cho đèn lồng bay
    const floatingLanterns = document.querySelectorAll('.floating-lantern');
    
    // Thêm hiệu ứng cho đèn lồng mới
    floatingLanterns.forEach((lantern, index) => {
        lantern.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.filter = 'brightness(1.5)';
        });
        
        lantern.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    });
    floatingLanterns.forEach((lantern, index) => {
        // Thay đổi màu sắc ngẫu nhiên
        const colors = [
            'radial-gradient(#ff4757, #ff3838)',
            'radial-gradient(#ffa502, #ff6348)',
            'radial-gradient(#ff6b9d, #ee5a6f)',
            'radial-gradient(#3742fa, #2f3542)',
            'radial-gradient(#26de81, #20bf6b)',
            'radial-gradient(#a55eea, #8854d0)'
        ];
        
        lantern.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Thêm hiệu ứng hover
        lantern.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.5)';
            this.style.transform = 'scale(1.1)';
        });

        lantern.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
            this.style.transform = 'scale(1)';
        });
    });

    // Hiệu ứng cho cây quất
    const kumquatTrees = document.querySelectorAll('.kumquat-tree');
    kumquatTrees.forEach((tree, index) => {
        // Thêm quả quất vàng
        for (let i = 0; i < 5; i++) {
            const fruit = document.createElement('div');
            fruit.style.position = 'absolute';
            fruit.style.width = '8px';
            fruit.style.height = '8px';
            fruit.style.background = '#ffd700';
            fruit.style.borderRadius = '50%';
            fruit.style.top = (20 + Math.random() * 40) + 'px';
            fruit.style.left = (20 + Math.random() * 40) + 'px';
            fruit.style.boxShadow = '0 0 5px rgba(255, 215, 0, 0.8)';
            fruit.style.animation = 'twinkle 2s ease-in-out infinite';
            fruit.style.animationDelay = Math.random() * 2 + 's';
            tree.appendChild(fruit);
        }
    });

    // Hiệu ứng parallax mở rộng cho các vector
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax cho đèn lồng bay
        floatingLanterns.forEach((lantern, index) => {
            const speed = 0.3 + (index * 0.1);
            lantern.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax cho bánh Trung Thu
        mooncakes.forEach((mooncake, index) => {
            const speed = 0.2 + (index * 0.05);
            mooncake.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax cho cây quất
        kumquatTrees.forEach((tree, index) => {
            const speed = 0.1 + (index * 0.05);
            tree.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Tạo hiệu ứng pháo hoa ngẫu nhiên
    function createRandomFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.top = Math.random() * 50 + '%';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.animationDelay = '0s';
        
        const colors = ['#ffd700', '#ff69b4', '#00ff00', '#ff4500', '#1e90ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        firework.style.background = randomColor;
        
        document.querySelector('.fireworks').appendChild(firework);
        
        // Xóa pháo hoa sau khi animation kết thúc
        setTimeout(() => {
            firework.remove();
        }, 3000);
    }

    // Tạo pháo hoa ngẫu nhiên mỗi 5 giây
    setInterval(createRandomFirework, 5000);

    // Xóa nút điều khiển opacity vì không còn video-background
    const opacityToggle = document.getElementById('toggleOpacity');
    if (opacityToggle) {
        opacityToggle.style.display = 'none';
    }

    // Hiệu ứng click cho toàn bộ trang
    document.addEventListener('click', function(e) {
        // Tạo hiệu ứng ripple tại vị trí click
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 215, 0, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = e.clientX - 10 + 'px';
        ripple.style.top = e.clientY - 10 + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'fireworkExplode 1s ease-out';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });

    // Hiệu ứng chữ Nhật bay lên trời sao (4 chữ)
    const japaneseTexts = document.querySelectorAll('.japanese-text');

    // Hàm để random thời gian xuất hiện và vị trí (4 chữ)
    function randomizeTextAnimation() {
        japaneseTexts.forEach((text, index) => {
            // Random delay từ 0-8s
            const randomDelay = Math.random() * 8;
            // Random animation duration từ 9-13s
            const randomDuration = 9 + Math.random() * 4;
            // Random vị trí bottom theo index để tránh chồng chéo (cách nhau 20%)
            const randomBottom = 12 + (index * 20) + (Math.random() * 8 - 4);
            // Luân phiên left/right theo index
            const randomSide = index % 2 === 0 ? 'left' : 'right';
            const randomPosition = 1 + Math.random() * 3;
            
            text.style.animationDelay = randomDelay + 's';
            text.style.animationDuration = randomDuration + 's';
            text.style.bottom = Math.max(10, Math.min(80, randomBottom)) + '%';
            text.style[randomSide] = randomPosition + '%';
            
            // Thêm animation randomFloat thay vì flyUpToStars
            text.style.animationName = 'randomFloat';
        });
    }

    // Chạy random lần đầu
    randomizeTextAnimation();

    // Random lại mỗi 12 giây để tạo sự đa dạng
    setInterval(randomizeTextAnimation, 12000);
});