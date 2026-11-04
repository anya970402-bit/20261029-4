// 宣告角色精靈圖變數，供預載、動畫與繪製函式共用。
let flySheet;
// 宣告角色目前在畫布上的水平位置。
let characterX;
// 宣告角色在畫布上的垂直位置。
let characterY;
// 宣告角色目前播放的精靈影格編號。
let currentFrame = 0;
// 設定精靈圖中的影格總數。
const FRAME_COUNT = 9;
// 設定角色每次移動的水平速度。
const MOVE_SPEED = 4;
// 設定每隔幾個繪圖影格切換一次角色動畫。
const ANIMATION_INTERVAL = 8;

// 預先載入角色精靈圖，讓圖片完成載入後才執行 setup。
function preload() {
  // 從指定路徑載入橫向飛行精靈圖。
  flySheet = loadImage('1/fly/fly.png');
}

// 初始化全螢幕畫布與角色起始位置。
function setup() {
  // 建立符合瀏覽器視窗大小的畫布。
  createCanvas(windowWidth, windowHeight);
  // 將角色的水平起始位置設在畫布中央。
  characterX = width / 2;
  // 將角色的垂直位置設在畫布中央。
  characterY = height / 2;
  // 設定影像以指定位置為中心點繪製。
  imageMode(CENTER);
}

// 每一繪圖影格更新背景、動畫影格與角色位置。
function draw() {
  // 使用指定的淡黃色填滿畫布背景。
  background('#fefae0');
  // 宣告角色朝向右方的狀態。
  let facingLeft = false;

  // 檢查鍵盤右方向鍵是否正被按住。
  if (keyIsDown(RIGHT_ARROW)) {
    // 將角色水平位置向右增加指定速度。
    characterX += MOVE_SPEED;
  // 若右方向鍵未按住，接著檢查左方向鍵是否正被按住。
  } else if (keyIsDown(LEFT_ARROW)) {
    // 將角色水平位置向左減少指定速度。
    characterX -= MOVE_SPEED;
    // 設定角色面朝左方。
    facingLeft = true;
  }

  // 根據目前畫面影格計算要顯示的精靈影格。
  currentFrame = floor(frameCount / ANIMATION_INTERVAL) % FRAME_COUNT;
  // 計算目前影格在精靈圖上的左側像素位置。
  let sourceX = floor(currentFrame * flySheet.width / FRAME_COUNT);
  // 計算下一影格在精靈圖上的左側像素位置。
  let sourceRight = floor((currentFrame + 1) * flySheet.width / FRAME_COUNT);
  // 計算目前影格實際寬度，以涵蓋無法整除時的像素差異。
  let sourceWidth = sourceRight - sourceX;

  // 儲存目前畫布的轉換狀態，避免翻轉影響其他繪製內容。
  push();
  // 將繪製原點移至角色所在位置。
  translate(characterX, characterY);
  // 角色面朝左方時，將繪製座標水平翻轉。
  if (facingLeft) {
    // 以角色中心為基準，反轉精靈圖的水平方向。
    scale(-1, 1);
  }
  // 從精靈圖裁切目前影格並繪製在角色中心。
  image(flySheet, 0, 0, sourceWidth, flySheet.height, sourceX, 0, sourceWidth, flySheet.height);
  // 還原畫布轉換狀態。
  pop();
}

// 視窗尺寸改變時同步調整畫布與角色垂直位置。
function windowResized() {
  // 將畫布調整為最新的瀏覽器視窗大小。
  resizeCanvas(windowWidth, windowHeight);
  // 讓角色在視窗寬度改變後仍維持水平置中。
  characterX = width / 2;
  // 讓角色在視窗高度改變後仍維持垂直置中。
  characterY = height / 2;
}

// 按方向鍵時阻止瀏覽器捲動畫面。
function keyPressed() {
  // 判斷按下的按鍵是否為左右方向鍵。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    // 回傳 false 以取消瀏覽器對方向鍵的預設捲動行為。
    return false;
  }
}
