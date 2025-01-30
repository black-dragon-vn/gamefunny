const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const jumpSound = new Audio('./music/jump-up-245782.mp3');
const gameOverSound = new Audio('./music/game-over-2-sound-effect-230463.mp3');
const winSound = new Audio('./music/applause-small-audience-97257.mp3');
const backgroundMusic = new Audio('./music/pixel-fight-8-bit-arcade-music-background-music-for-video-208775.mp3');
backgroundMusic.loop = false;
backgroundMusic.volume = 0.5;
document.addEventListener('click',() =>{
    backgroundMusic.loop = true;
    backgroundMusic.play();

})

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;
// Tạo hình nền
const background = new Image();
background.src = './image/background-dep-4k.jpg'; 
// Phông nền thứ hai (ví dụ: đồi hoặc cảnh vật phía sau)
const hills = new Image();
hills.src = './image/hills.png';

// Tải các hình ảnh nhân vật
const spriteStandRight = new Image();
spriteStandRight.src = './image/spriteStandRight.png';
const spriteRunRight = new Image();
spriteRunRight.src = './image/spriteRunRight.png';
const spriteRunLeft = new Image();
spriteRunLeft.src ='./image/spriteRunLeft.png';
const spriteStandLeft = new Image();
spriteStandLeft.src ='./image/spriteStandLeft.png';
let currentKey
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.width = 66;
        this.height = 150;
        this.image = new Image();
        this.image.src = spriteStandRight;
        this.frames = 0;
        this.sprites = {
            stand: {
                right:spriteStandRight,
                left:spriteStandLeft,
                cropWidth:177,
                width:66
            },
            run:{
                right:spriteRunRight,
                left:spriteRunLeft,
                cropWidth:340,
                width:128
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    
    draw() {
        // Vẽ nhân vật bằng hình ảnh
        c.drawImage(
            this.currentSprite, 
            this.currentCropWidth * this.frames, 
            0, 
            this.currentCropWidth, 
            400, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update() {
        this.frames++
        if (this.frames > 59&& (this.currentSprite ===this.sprites.stand.right
            ||this.currentSprite ===this.sprites.stand.left
        ))
             this.frames = 0
        else if (this.frames >29 &&(this.currentSprite ===this.sprites.run.right
            ||this.currentSprite === this.sprites.run.left))
            this.frames = 0
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Apply gravity
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0; // Stop falling when hitting the ground
        }
    }

    // Phương thức reset game
    reset() {
        this.position = { x: 100, y: 100 };  // Đặt lại vị trí nhân vật
        this.velocity = { x: 0, y: 0 };  // Đặt lại vận tốc
    }
}
class Platform {
    constructor({ x, y, imageSrc }) {
        this.position = { x, y };
        this.width = 550;
        this.height = 100;
        this.image = new Image();
        this.image.src = imageSrc;
        this.initialX = x;  // Lưu vị trí ban đầu
    }

    draw() {
        // Nếu hình ảnh chưa tải xong, không vẽ
        if (!this.image.complete) return;

        // Vẽ hình ảnh thay cho hình chữ nhật
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
class GenericObject {
    constructor({ x, y, imageSrc }) {
        this.position = { x, y };
        this.width = 4000;
        this.height = 500;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        // Nếu hình ảnh chưa tải xong, không vẽ
        if (!this.image.complete) return;

        // Vẽ hình ảnh thay cho hình chữ nhật
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

// Tạo các nền với hình ảnh
const platforms = [
  
    new Platform({ x: -1, y:480, imageSrc: './image/platform.png' }),
    new Platform({ x: 550-3, y: 480, imageSrc: './image/platform.png' }),
    new Platform({ x: 1200, y: 400, imageSrc: './image/platform.png' }),
    new Platform({ x: 1690, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 2060, y: 550, imageSrc: './image/platform.png' }),
    new Platform({ x: 2520, y: 400, imageSrc: './image/platform.png' }),
    new Platform({ x: 2860, y: 300, imageSrc: './image/platformSmallTall.png' }),
    new Platform({ x: 3320, y: 450, imageSrc: './image/platform.png' }),
    new Platform({ x: 4000, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 4500, y: 440, imageSrc: './image/platform.png' }),
    new Platform({ x: 5000, y: 550, imageSrc: './image/platform.png' }),
    new Platform({ x: 5500, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 6000, y: 500, imageSrc: './image/platform.png' }),
    new Platform({ x: 6500, y: 500, imageSrc: './image/platformSmallTall.png' }),
    new Platform({ x: 7000, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 7500, y: 400, imageSrc: './image/platformSmallTall.png' }),
    new Platform({ x: 7880, y: 400, imageSrc: './image/platformSmallTall.png' }),
    new Platform({ x: 8000, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 8550, y: 440, imageSrc: './image/platform.png' }),
    new Platform({ x: 9000, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 10000, y: 300, imageSrc: './image/platform.png' }),
    new Platform({ x: 10500, y: 550, imageSrc: './image/platform.png' }),
    new Platform({ x: 11000, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 11800, y: 550, imageSrc: './image/platform.png' }),
    new Platform({ x: 12500, y: 400, imageSrc: './image/platform.png' }),
    new Platform({ x: 13000, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 13400, y: 500, imageSrc: './image/platform.png' }),
    new Platform({ x: 14000, y: 400, imageSrc: './image/platform.png' }),
    new Platform({ x: 14300, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 14800, y: 400, imageSrc: './image/platform.png' }),
    new Platform({ x: 15050, y: 200, imageSrc: './image/platform.png' }),
    new Platform({ x: 16050, y: 200, imageSrc: './image/platform.png' }),
];
const hillsBackgrounds = [
   new GenericObject ({ x: -1, y: 100, imageSrc: './image/hills.png' })
];


const player = new Player();
const keys = {
    right: { pressed: false },
    left: { pressed: false },
    up: { pressed: false },
    down: { pressed: false },
};
let scroll0ffset = 0;
let gameOver = false;
function animate() {
    if (gameOver) {
        // Nếu game over, dừng lại và hiển thị thông báo
        c.fillStyle = 'black';
        c.globalAlpha = 0.7;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.globalAlpha = 1;
        c.fillStyle = 'white';
        c.font = '48px Arial';
        c.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2);
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Đặt nhạc nền về đầu
        gameOverSound.play();
        return; // Dừng game
    }
    requestAnimationFrame(animate);
   // Vẽ hình nền
   c.drawImage(background, 0, 0, canvas.width, canvas.height); // Vẽ hình nền kín canvas
     // Vẽ phông nền hills
     hillsBackgrounds.forEach(hill => {
        hill.draw()
    });
        // Kiểm tra nếu nhân vật rơi ra ngoài màn hình (game over)
        if (player.position.y > canvas.height) {
            gameOver = true; // Kích hoạt game over
            gameOverSound.play();
        }

    platforms.forEach(platform => {
        platform.draw()
    })
    player.update();


    // Horizontal movement
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if ((keys.left.pressed && player.position.x > 100)
         ||keys.left.pressed && scroll0ffset === 0 && player.position.x >0) {
        player.velocity.x = -5;
    } 
    else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scroll0ffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })

        } else if (keys.left.pressed && scroll0ffset > 0) {
            scroll0ffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }    

        // Jumping logic

        let onGround = false;
        // Kiểm tra va chạm với nền
        platforms.forEach(platform => {
            if (
                player.position.y + player.height <= platform.position.y && // Đang ở phía trên nền
                player.position.y + player.height + player.velocity.y >= platform.position.y && // Chạm vào nền
                player.position.x + player.width >= platform.position.x && // Cạnh phải nhân vật chạm cạnh trái nền
                player.position.x <= platform.position.x + platform.width // Cạnh trái nhân vật chạm cạnh phải nền
            ) {
                player.velocity.y = 0; // Dừng rơi
                onGround = true; // Đang chạm nền
            }
        })
    if (keys.right.pressed&& currentKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if (keys.left.pressed&& currentKey ==='left' &&player.currentSprite !==player.sprites.run.left){
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if (!keys.left.pressed&& currentKey ==='left' &&player.currentSprite !==player.sprites.stand.left){
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    else if (!keys.right.pressed&& currentKey ==='right' &&player.currentSprite !==player.sprites.stand.right){
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
         // Nếu không chạm nền, nhân vật sẽ rơi và game over
    if (!onGround && player.position.y + player.height >= canvas.height) {
        gameOver = true; // Nếu không có nền dưới, game over
        gameOverSound.play();
    }
     if (scroll0ffset > 18000){
        c.fillStyle = 'black';
        c.globalAlpha = 0.7;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.globalAlpha = 1;
        c.fillStyle = 'yellow';
        c.font = '48px Arial';
        c.fillText('You Win', canvas.width / 2 - 150, canvas.height / 2);
        winSound.play();
        backgroundMusic.floor = false;
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; 
        return; 
     }   
    
}
    animate();

    const jumpSensitivity = 30; // Độ nhạy nhảy, có thể điều chỉnh

    // Khi nhấn phím
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowRight':
                keys.right.pressed = true;
                currentKey ='right'
                break;
            case 'ArrowLeft':
                keys.left.pressed = true;
                currentKey ='left'
                break;
            case 'ArrowUp':
                if (player.velocity.y === 0) {  // Chỉ nhảy khi đang trên mặt đất
                    keys.up.pressed = true;
                    player.velocity.y -= jumpSensitivity; // Điều chỉnh độ nhạy nhảy
                    jumpSound.play();
                }
                break;
            case 'ArrowDown':
                keys.down.pressed = true;
                break;
        }
    });
    
    // Khi thả phím
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'ArrowRight':
                keys.right.pressed = false;
                break;
            case 'ArrowLeft':
                keys.left.pressed = false;
                break;
            case 'ArrowUp':
                keys.up.pressed = false;
                break;
            case 'ArrowDown':
                keys.down.pressed = false;
                break;
        }
    });
    // Xử lý nút Restart
    document.getElementById('restartButton').addEventListener('click', () => {
        gameOver = false;
        player.reset(); // Reset lại nhân vật
        keys.right.pressed = false; // Reset trạng thái phím phải
        keys.left.pressed = false;  // Reset trạng thái phím trái
        keys.up.pressed = false;    // Reset trạng thái phím lên
        keys.down.pressed = false;  // Reset trạng thái phím xuống
    
        platforms.forEach(platform => {
            platform.position.x = platform.initialX;  // Đảm bảo nền quay lại vị trí ban đầu
        });
        
        animate(); // Bắt đầu lại game
    });
    
    