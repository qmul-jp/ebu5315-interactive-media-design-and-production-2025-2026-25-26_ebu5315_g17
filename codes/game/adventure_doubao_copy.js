// ==================== 全局配置 ====================
const game = {
    lang: "cn",
    warriorHp: 3,
    warriorAtk: 5,
    enemyHp: 10,
    currentQuestionIndex: 0,
    canvas: null,
    ctx: null,
    draggingPoint: null,
    isWin: false,
    isSoundOn: true
};

// 音效配置
const sounds = {
    warriorAttack: new Audio('sound/warrior_attack.mp3'),
    warriorHurt: new Audio('sound/warrior_hurt.mp3'),
    bgm: new Audio('sound/background_music.mp3')
};
sounds.bgm.loop = true;
sounds.bgm.volume = 0.2;
sounds.bgm.muted = false;

// 全局中英文语言包（新增导航悬浮提示）
const langData = {
    cn: {
        newGame: "新游戏",
        continue: "继续游戏",
        back: "返回主界面",
        ready: "准备挑战！",
        correct: "回答正确！",
        question1: "问题1：请你操作交互圆1上的点，使得角ABC变为直角",
        question2: "问题2：请你移动交互圆2上的点A和点B，使得弦AB垂直平分黑色实线弦MN",
        question3: "问题3：请你移动点A和点B，使得劣弧AB等于劣弧CD",
        question4: "问题4",
        finalChallenge: "准备最终挑战！",
        confirm: "确认答案",
        warriorHp: "❤️ 生命：",
        warriorAtk: " | ⚔️ 攻击：",
        enemyHp: "💀 生命：",
        win: "敌怪被击败！是否进行下一关？",
        winFinal: "敌怪被击败！是否进行下一关？",
        lose: "💀 你失败了！重新开始吧！",
        restart: "重新开始",
        nextLevel: "下一关",
        lang: "English",
        home: "返回主页",
        quiz: "返回测验",
        gameCenter: "返回游戏中心"
    },
    en: {
        newGame: "New Game",
        continue: "Continue",
        back: "Back to Menu",
        ready: "Ready to Challenge!",
        correct: "Correct!",
        question1: "Question 1: Drag points on Circle 1 to make ∠ABC a right angle",
        question2: "Question 2: Move A/B on Circle 2 to make chord AB perpendicularly bisect MN",
        question3: "Question 3: Move A and B so that minor arc AB equals minor arc CD",
        question4: "Question 4",
        finalChallenge: "Prepare for the Final Challenge!",
        confirm: "Confirm",
        warriorHp: "❤️ HP: ",
        warriorAtk: " | ⚔️ ATK: ",
        enemyHp: "💀 HP: ",
        win: "Enemy defeated! Go to next level?",
        winFinal: "Enemy defeated! Go to next level?",
        lose: "💀 You Lose! Try Again!",
        restart: "Restart",
        nextLevel: "Next Level",
        lang: "中文",
        home: "Back to Homepage",
        quiz: "Back to Quiz",
        gameCenter: "Back to Game Center"
    }
};

// 题目库
const questions = [
    { id: 1, canvasFunc: drawCircle1, checkFunc: checkRightAngleABC },
    { id: 2, canvasFunc: drawCircle2, checkFunc: checkVerticalBisectMN },
    { id: 3, canvasFunc: drawCircle3, checkFunc: checkCircle3 },
    { id: 4, canvasFunc: drawCircle4, checkFunc: checkCircle4 }
];

// DOM元素
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const newGameBtn = document.getElementById("new-game-btn");
const continueBtn = document.getElementById("continue-btn");
const backBtn = document.getElementById("back-btn");
const soundBtnMain = document.getElementById("sound-btn-main");
const soundBtnGame = document.getElementById("sound-btn");
const langBtns = document.querySelectorAll('.lang-btn');
const questionText = document.getElementById("question-text");
const confirmBtn = document.getElementById("confirm-btn");
const warriorStatus = document.getElementById("warrior-status");
const enemyStatus = document.getElementById("enemy-status");
const resultModal = document.getElementById("result-modal");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const warriorImg = document.querySelector(".warrior img");
const enemyImg = document.querySelector(".enemy img");
const navBtns = document.querySelectorAll('.nav-btn');

// ==================== 存档功能 ====================
function saveGame() {
    const saveData = {
        warriorHp: game.warriorHp,
        enemyHp: game.enemyHp,
        currentQuestionIndex: game.currentQuestionIndex
    };
    localStorage.setItem("gameSave", JSON.stringify(saveData));
    checkContinueBtn();
}
function loadGame() {
    const save = JSON.parse(localStorage.getItem("gameSave"));
    if (save) {
        game.warriorHp = save.warriorHp;
        game.enemyHp = save.enemyHp;
        game.currentQuestionIndex = save.currentQuestionIndex
    }
}
function clearSave() {
    localStorage.removeItem("gameSave");
    checkContinueBtn();
}
function checkContinueBtn() {
    const hasSave = localStorage.getItem("gameSave") !== null;
    if (hasSave) {
        continueBtn.classList.remove("disabled");
        continueBtn.disabled = false;
    } else {
        continueBtn.classList.add("disabled");
        continueBtn.disabled = true;
    }
}

// ==================== 初始化Canvas ====================
function initCanvas() {
    game.canvas = document.getElementById("gameCanvas");
    game.ctx = game.canvas.getContext("2d");
    game.canvas.width = 308;
    game.canvas.height = 308;
    game.canvas.addEventListener("mousedown", startDrag);
    game.canvas.addEventListener("mousemove", drag);
    game.canvas.addEventListener("mouseup", stopDrag);
    game.canvas.style.cursor = "default";
}

// ==================== 交互圆配置 ====================
let circlePoints = {
    O: { x: 154, y: 154 },
    A: { x: 0, y: 0 }, B: { x: 0, y: 0 }, C: { x: 0, y: 0 },
    radius: 130, adsorbDistance: 8, pointSize: 5
};
let circle2Points = {
    O: { x: 154, y: 154 },
    A: { x: 0, y: 0 }, B: { x: 0, y: 0 },
    M: { x: 0, y: 0 }, N: { x: 0, y: 0 },
    P: { x: 0, y: 0 }, Q: { x: 0, y: 0 },
    radius: 130, adsorbDistance: 6, pointSize: 5,
    minDistance: 40
};
let circle3Points = {
    O: { x: 154, y: 154 },
    A: { x: 0, y: 0 }, B: { x: 0, y: 0 },
    C: { x: 0, y: 0 }, D: { x: 0, y: 0 },
    A1: { x: 0, y: 0 }, A2: { x: 0, y: 0 },
    B1: { x: 0, y: 0 }, B2: { x: 0, y: 0 },
    radius: 130, adsorbDistance: 10, pointSize: 5
};

function randomCirclePoint(cfg) {
    const angle = Math.random() * Math.PI * 2;
    return { x: cfg.O.x + cfg.radius * Math.cos(angle), y: cfg.O.y + cfg.radius * Math.sin(angle) };
}
function randomUniquePoints(cfg, count) {
    let points = [];
    let attempts = 0;
    while (points.length < count && attempts < 100) {
        attempts++;
        const p = randomCirclePoint(cfg);
        let valid = true;
        for(let exist of points){
            if(Math.hypot(p.x-exist.x, p.y-exist.y) < 40){
                valid = false;
                break;
            }
        }
        if(valid) points.push(p);
    }
    return points;
}
function calcBisectPQ(M, N, O, r) {
    const midX = (M.x + N.x)/2;
    const midY = (M.y + N.y)/2;
    const dx = N.x - M.x;
    const dy = N.y - M.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = -dy/len; const uy = dx/len;
    return {
        P: { x: O.x + ux*r, y: O.y + uy*r },
        Q: { x: O.x - ux*r, y: O.y - uy*r }
    };
}
function lockToCircle(point, cfg) {
    const dx = point.x - cfg.O.x; const dy = point.y - cfg.O.y;
    const dist = Math.hypot(dx, dy) || 1;
    point.x = cfg.O.x + (dx/dist)*cfg.radius;
    point.y = cfg.O.y + (dy/dist)*cfg.radius;
}
function adsorbToPoints(point, targets, range) {
    for(let t of targets) {
        if (Math.hypot(point.x-t.x, point.y-t.y) < range) {
            point.x = t.x; point.y = t.y; break;
        }
    }
}

// 角度工具
function calcAngle(O, p1, p2) {
    const v1x = p1.x - O.x;
    const v1y = p1.y - O.y;
    const v2x = p2.x - O.x;
    const v2y = p2.y - O.y;
    const dot = v1x*v2x + v1y*v2y;
    const det = v1x*v2y - v1y*v2x;
    let angle = Math.atan2(det, dot) * 180 / Math.PI;
    angle = Math.abs(angle);
    return Math.round(angle);
}
function calcSymPoint(O, p, targetAngle, radius) {
    const baseAngle = Math.atan2(p.y - O.y, p.x - O.x);
    const rad = targetAngle * Math.PI / 180;
    const p1 = {
        x: O.x + radius * Math.cos(baseAngle + rad),
        y: O.y + radius * Math.sin(baseAngle + rad)
    };
    const p2 = {
        x: O.x + radius * Math.cos(baseAngle - rad),
        y: O.y + radius * Math.sin(baseAngle - rad)
    };
    return [p1, p2];
}

// 绘制
function drawCircle1() {
    const ctx = game.ctx; ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
    const { O, A, B, C, radius } = circlePoints;
    ctx.beginPath(); ctx.arc(O.x,O.y,radius,0,Math.PI*2); ctx.strokeStyle="#000"; ctx.lineWidth=2; ctx.stroke();
    ctx.setLineDash([5,5]); ctx.beginPath(); ctx.moveTo(O.x-radius,O.y); ctx.lineTo(O.x+radius,O.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(O.x,O.y-radius); ctx.lineTo(O.x,O.y+radius); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(B.x,B.y); ctx.lineTo(C.x,C.y); ctx.stroke();
    drawPoint(O, "O", "#000", circlePoints.pointSize);
    drawPoint(A, "A", "#000", circlePoints.pointSize);
    drawPoint(B, "B", "#000", circlePoints.pointSize);
    drawPoint(C, "C", "#000", circlePoints.pointSize);
}
function drawCircle2() {
    const ctx = game.ctx; ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
    const { O, A, B, M, N, radius } = circle2Points;
    ctx.beginPath(); ctx.arc(O.x,O.y,radius,0,Math.PI*2); ctx.strokeStyle="#000"; ctx.lineWidth=2; ctx.stroke();
    ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(M.x,M.y); ctx.lineTo(N.x,N.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.stroke();
    drawPoint(O, "O", "#000", circle2Points.pointSize);
    drawPoint(A, "A", "#000", circle2Points.pointSize);
    drawPoint(B, "B", "#000", circle2Points.pointSize);
    drawPoint(M, "M", "#000", circle2Points.pointSize);
    drawPoint(N, "N", "#000", circle2Points.pointSize);
}
function drawCircle3() {
    const ctx = game.ctx;
    ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
    const { O, A, B, C, D, radius } = circle3Points;
    ctx.beginPath(); ctx.arc(O.x,O.y,radius,0,Math.PI*2); ctx.strokeStyle="#000"; ctx.lineWidth=2; ctx.stroke();
    ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(O.x,O.y); ctx.lineTo(A.x,A.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(O.x,O.y); ctx.lineTo(B.x,B.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(O.x,O.y); ctx.lineTo(C.x,C.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(O.x,O.y); ctx.lineTo(D.x,D.y); ctx.stroke();
    drawPoint(O, "O", "#000", circle3Points.pointSize);
    drawPoint(A, "A", "#000", circle3Points.pointSize);
    drawPoint(B, "B", "#000", circle3Points.pointSize);
    drawPoint(C, "C", "#000", circle3Points.pointSize);
    drawPoint(D, "D", "#000", circle3Points.pointSize);
}
function drawCircle4() {
    const ctx = game.ctx;
    ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
}
function checkCircle4() {
    return false;
}
function drawPoint(point, label, color, size) {
    const ctx = game.ctx;
    ctx.beginPath(); ctx.arc(point.x, point.y, size, 0, Math.PI*2);
    ctx.fillStyle = color; ctx.fill();
    ctx.fillStyle = "#000"; ctx.font = "16px Arial";
    if(label) ctx.fillText(label, point.x+10, point.y-10);
}

// 判定
function checkRightAngleABC() {
    const A = circlePoints.A, B = circlePoints.B, C = circlePoints.C;
    const dot = (A.x-B.x)*(C.x-B.x) + (A.y-B.y)*(C.y-B.y);
    return Math.abs(dot) < 50;
}
function checkVerticalBisectMN() {
    const { A, B, P, Q } = circle2Points;
    const aToP = Math.abs(A.x - P.x) < 10 && Math.abs(A.y - P.y) < 10;
    const aToQ = Math.abs(A.x - Q.x) < 10 && Math.abs(A.y - Q.y) < 10;
    const bToP = Math.abs(B.x - P.x) < 10 && Math.abs(B.y - P.y) < 10;
    const bToQ = Math.abs(B.x - Q.x) < 10 && Math.abs(B.y - Q.y) < 10;
    return (aToP && bToQ) || (aToQ && bToP);
}
function checkCircle3() {
    const angleAOB = calcAngle(circle3Points.O, circle3Points.A, circle3Points.B);
    const angleCOD = calcAngle(circle3Points.O, circle3Points.C, circle3Points.D);
    return angleAOB === angleCOD;
}

// 鼠标
function getMousePos(e) {
    const rect = game.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}
function isPointClicked(mouse, point) {
    return Math.hypot(mouse.x - point.x, mouse.y - point.y) < 10;
}
function startDragCircle1(mouse) {
    if (isPointClicked(mouse, circlePoints.A)) game.draggingPoint = circlePoints.A;
    if (isPointClicked(mouse, circlePoints.B)) game.draggingPoint = circlePoints.B;
    if (isPointClicked(mouse, circlePoints.C)) game.draggingPoint = circlePoints.C;
}
function startDragCircle2(mouse) {
    if (isPointClicked(mouse, circle2Points.A)) game.draggingPoint = circle2Points.A;
    if (isPointClicked(mouse, circle2Points.B)) game.draggingPoint = circle2Points.B;
}
function startDragCircle3(mouse) {
    if (isPointClicked(mouse, circle3Points.A)) game.draggingPoint = circle3Points.A;
    if (isPointClicked(mouse, circle3Points.B)) game.draggingPoint = circle3Points.B;
}
function startDrag(e) {
    const mouse = getMousePos(e);
    game.canvas.style.cursor = "grab";
    if(game.currentQuestionIndex === 0) startDragCircle1(mouse);
    if(game.currentQuestionIndex === 1) startDragCircle2(mouse);
    if(game.currentQuestionIndex === 2) startDragCircle3(mouse);
}
function drag(e) {
    if (!game.draggingPoint) return;
    const mouse = getMousePos(e);
    game.draggingPoint.x = mouse.x;
    game.draggingPoint.y = mouse.y;
    if (game.currentQuestionIndex === 0) {
        lockToCircle(game.draggingPoint, circlePoints);
        adsorbPoint(game.draggingPoint);
        drawCircle1();
    }
    if (game.currentQuestionIndex === 1) {
        lockToCircle(game.draggingPoint, circle2Points);
        adsorbToPoints(game.draggingPoint, [circle2Points.P, circle2Points.Q], circle2Points.adsorbDistance);
        drawCircle2();
    }
    if (game.currentQuestionIndex === 2) {
        lockToCircle(game.draggingPoint, circle3Points);
        const codAngle = calcAngle(circle3Points.O, circle3Points.C, circle3Points.D);
        if (game.draggingPoint === circle3Points.A) {
            const [b1, b2] = calcSymPoint(circle3Points.O, circle3Points.B, codAngle, circle3Points.radius);
            circle3Points.B1 = b1; circle3Points.B2 = b2;
            adsorbToPoints(game.draggingPoint, [b1, b2], circle3Points.adsorbDistance);
        }
        if (game.draggingPoint === circle3Points.B) {
            const [a1, a2] = calcSymPoint(circle3Points.O, circle3Points.A, codAngle, circle3Points.radius);
            circle3Points.A1 = a1; circle3Points.A2 = a2;
            adsorbToPoints(game.draggingPoint, [a1, a2], circle3Points.adsorbDistance);
        }
        drawCircle3();
    }
}
function stopDrag() {
    game.draggingPoint = null;
    game.canvas.style.cursor = "default";
    if(game.currentQuestionIndex === 2){
        circle3Points.A1 = {x:0,y:0};
        circle3Points.A2 = {x:0,y:0};
        circle3Points.B1 = {x:0,y:0};
        circle3Points.B2 = {x:0,y:0};
    }
}
function adsorbPoint(point) {
    const { O, radius, adsorbDistance } = circlePoints;
    const targets = [{x:O.x-radius,y:O.y},{x:O.x+radius,y:O.y},{x:O.x,y:O.y-radius},{x:O.x,y:O.y+radius}];
    for(let t of targets){ if(Math.hypot(point.x-t.x, point.y-t.y) < adsorbDistance){ point.x = t.x; point.y = t.y; break; } }
}

// 静音
function toggleSound() {
    game.isSoundOn = !game.isSoundOn;
    const icon = game.isSoundOn ? "🔊" : "🔇";
    soundBtnMain.textContent = icon;
    soundBtnGame.textContent = icon;
    sounds.bgm.muted = !game.isSoundOn;
    sounds.warriorAttack.muted = !game.isSoundOn;
    sounds.warriorHurt.muted = !game.isSoundOn;
}

// 语言更新（包含双按钮同步 + 导航按钮悬浮tip）
function updateLanguageUI() {
    // 双语言按钮同步文字
    langBtns.forEach(btn => {
        btn.textContent = langData[game.lang].lang;
    });

    newGameBtn.textContent = langData[game.lang].newGame;
    continueBtn.textContent = langData[game.lang].continue;
    backBtn.textContent = langData[game.lang].back;
    confirmBtn.textContent = langData[game.lang].confirm;
    restartBtn.textContent = game.isWin ? langData[game.lang].nextLevel : langData[game.lang].restart;
    updateStatus();

    // 动态更新导航按钮悬浮文字
    navBtns.forEach(btn => {
        const key = btn.dataset.tipKey;
        btn.title = langData[game.lang][key];
    });
}

// 双按钮绑定语言切换点击
langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        game.lang = game.lang === "cn" ? "en" : "cn";
        updateLanguageUI();
    });
});

// 音效按钮
soundBtnMain.addEventListener("click", toggleSound);
soundBtnGame.addEventListener("click", toggleSound);

// 新游戏
newGameBtn.addEventListener("click", () => {
    clearSave();
    gameScreen.style.backgroundImage = "url('graph/background1.gif')";
    enemyImg.src = "graph/enemy-skeleton.png";
    game.warriorHp = 3;
    game.enemyHp = 10;
    game.currentQuestionIndex = 0;
    game.isWin = false;
    const points = randomUniquePoints(circlePoints, 3);
    circlePoints.A = points[0];
    circlePoints.B = points[1];
    circlePoints.C = points[2];
    startGame();
});

// 继续游戏
continueBtn.addEventListener("click", () => {
    loadGame();
    if(game.currentQuestionIndex === 1) initCircle2();
    if(game.currentQuestionIndex === 2){
        gameScreen.style.backgroundImage = "url('graph/background2.png')";
        enemyImg.src = "graph/enemy-magicman.png";
        game.enemyHp = 5;
        initCircle3();
    }
    if(game.currentQuestionIndex === 3){
        gameScreen.style.backgroundImage = "url('graph/background3.png')";
        enemyImg.src = "graph/enemy-wolf.png";
        game.enemyHp = 15;
    }
    startGame();
});

// 返回主页
backBtn.addEventListener("click", () => { 
    saveGame(); 
    gameScreen.classList.add("hidden"); 
    startScreen.classList.remove("hidden"); 
});

// 重新开始/下一关
restartBtn.addEventListener("click", () => {
    if(game.isWin){ nextLevel(); }
    else{ clearSave(); gameScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); }
});

confirmBtn.addEventListener("click", checkAnswer);

// 初始化圆
function initCircle2() {
    const points = randomUniquePoints(circle2Points, 4);
    circle2Points.M = points[0];
    circle2Points.N = points[1];
    circle2Points.A = points[2];
    circle2Points.B = points[3];
    const {P,Q} = calcBisectPQ(circle2Points.M, circle2Points.N, circle2Points.O, circle2Points.radius);
    circle2Points.P = P;
    circle2Points.Q = Q;
}
function initCircle3() {
    const points = randomUniquePoints(circle3Points, 4);
    circle3Points.A = points[0];
    circle3Points.B = points[1];
    circle3Points.C = points[2];
    circle3Points.D = points[3];
}

// 下一关
function nextLevel(){
    game.isWin = false;
    resultModal.classList.add("hidden");
    if(game.currentQuestionIndex === 2){
        gameScreen.style.backgroundImage = "url('graph/background2.png')";
        game.warriorHp = 3;
        game.warriorAtk = 5;
        game.enemyHp = 5;
        enemyImg.src = "graph/enemy-magicman.png";
        game.currentQuestionIndex = 2;
        initCircle3();
        clearSave();
        startGame();
    }
    if(game.currentQuestionIndex === 3){
        gameScreen.style.backgroundImage = "url('graph/background3.png')";
        enemyImg.src = "graph/enemy-wolf.png";
        game.warriorHp = 3;
        game.warriorAtk = 5;
        game.enemyHp = 15;
        game.currentQuestionIndex = 3;
        clearSave();
        startGame();
    }
}

function startGame() {
    updateStatus();
    initCanvas();
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    resultModal.classList.add("hidden");
    confirmBtn.classList.remove("hidden");
    questionText.style.color = "";
    questionText.style.fontSize = "";
    if(game.currentQuestionIndex === 3){
        questionText.style.color = "red";
        questionText.style.fontSize = "28px";
        questionText.textContent = langData[game.lang].finalChallenge;
        setTimeout(() => {
            questionText.style.color = "";
            questionText.style.fontSize = "";
            questionText.textContent = langData[game.lang].question4;
            questions[game.currentQuestionIndex].canvasFunc();
        }, 2000);
    } else {
        questionText.textContent = langData[game.lang].ready;
        setTimeout(() => {
            questionText.textContent = langData[game.lang][`question${game.currentQuestionIndex+1}`];
            questions[game.currentQuestionIndex].canvasFunc();
        }, 1000);
    }
}

// 答题判定
function checkAnswer() {
    const currentQ = questions[game.currentQuestionIndex];
    const isCorrect = currentQ.checkFunc();
    if (isCorrect) {
        playerAttack();
        questionText.textContent = langData[game.lang].correct;
        confirmBtn.classList.add("hidden");
        setTimeout(() => {
            if(game.currentQuestionIndex < 3){
                game.currentQuestionIndex++;
            }
            saveGame();
            if (game.currentQuestionIndex < questions.length) {
                if(game.currentQuestionIndex === 1) initCircle2();
                if(game.currentQuestionIndex === 2) initCircle3();
                questionText.textContent = langData[game.lang][`question${game.currentQuestionIndex+1}`];
                confirmBtn.classList.remove("hidden");
                questions[game.currentQuestionIndex].canvasFunc();
            }
            checkGameOver();
        }, 1000);
    } else {
        enemyAttack();
        saveGame();
        updateStatus();
        checkGameOver();
    }
}

// 攻击
function playerAttack() {
    if (game.isSoundOn) {
        sounds.warriorAttack.currentTime = 0;
        sounds.warriorAttack.play().catch(err => console.log('攻击音效播放失败', err));
    }
    warriorImg.classList.add("attack-effect");
    enemyImg.classList.add("hurt-effect");
    game.enemyHp -= game.warriorAtk;
    setTimeout(() => {
        warriorImg.classList.remove("attack-effect");
        enemyImg.classList.remove("hurt-effect");
        updateStatus();
    }, 500);
}
function enemyAttack() {
    if (game.isSoundOn) {
        sounds.warriorHurt.currentTime = 0;
        sounds.warriorHurt.play().catch(err => console.log('受击音效播放失败', err));
    }
    enemyImg.classList.add("attack-effect");
    warriorImg.classList.add("hurt-effect");
    game.warriorHp -= 1;
    setTimeout(() => {
        enemyImg.classList.remove("attack-effect");
        warriorImg.classList.remove("hurt-effect");
        updateStatus();
    }, 500);
}

function updateStatus() {
    warriorStatus.textContent = `${langData[game.lang].warriorHp}${game.warriorHp}${langData[game.lang].warriorAtk}${game.warriorAtk}`;
    enemyStatus.textContent = `${langData[game.lang].enemyHp}${game.enemyHp}`;
}

// 胜负判定
function checkGameOver() {
    if (game.enemyHp <= 0 && game.currentQuestionIndex === 2) { 
        game.isWin = true;
        confirmBtn.classList.add("hidden");
        resultText.textContent = langData[game.lang].win; 
        resultModal.classList.remove("hidden"); 
        updateLanguageUI();
    }
    if (game.enemyHp <= 0 && game.currentQuestionIndex === 3) { 
        game.isWin = true;
        confirmBtn.classList.add("hidden"); 
        resultText.textContent = langData[game.lang].winFinal; 
        resultModal.classList.remove("hidden"); 
        updateLanguageUI();
    }
    if (game.warriorHp <= 0) { 
        game.isWin = false;
        confirmBtn.classList.add("hidden"); 
        resultText.textContent = langData[game.lang].lose; 
        resultModal.classList.remove("hidden"); 
        updateLanguageUI();
        clearSave(); 
    }
}

// 页面载入
window.addEventListener('load', () => {
    document.addEventListener('click', () => {
        sounds.bgm.play();
    }, { once: true });
    checkContinueBtn();
    updateLanguageUI();
});