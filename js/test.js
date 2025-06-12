class XYPlotter{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        // ^^ 캔버스에 2d컨텍스를 가져와서 그리기 작업에 사용
        this.ctx = this.canvas.getContext("2d");
        this.xMin = 0;
        this.yMin = 0;
        // ^^ 좌표계의 최대·최소값
        this.xMax = this.canvas.width;
        this.yMax = this.canvas.height;
        // ^^ 좌표계의 최대·최소값은 폭과 높이로 설정됨
    };

    transformXY(){
        // ^^ 좌표계를 상단 기준에서 하단 기준으로 뒤집기 위한 설정
        this.ctx.setTransform(1,0,0,-1,0, this.canvas.height);
    };

    plotPoint(x, y, color = "black", size = 3){
        // ^^ 주어진 좌표에 xy점을 그림
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        // ^^ 아크메소드로 원을 그리고 색을 칠해줌
        this.ctx.fill();
    };

    plotLine(x1, y1, x2, y2, color="black"){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1); // << 시작점
        this.ctx.lineTo(x2, y2); // << 끝점
        this.ctx.stroke(); // << 선을 그림
    }
}


// vv 초기값
const numPoints = 500;
const learningRate = 0.00001;

// vv 플로터 만들기
const plotter = new XYPlotter("p_test");
plotter.transformXY();
const xMax = plotter.xMax;
const yMax = plotter.yMax;
const xMin = plotter.xMin;
const yMin = plotter.yMin;

// vv 랜덤한 XY포인트 생성
const xPoints = [];
const yPoints = [];

for (let i=0; i < numPoints; i++){
    xPoints[i] = Math.random() * xMax;
    yPoints[i] = Math.random() * yMax;
}

// vv 아래에 수식에 맞게 점들을 위(1) 또는 아래(0)으로 분류
function f(x) {
    return x * 1.2 + 50;
}

// vv 선 그리기 : 함수 f(x)에 의해 정의된 선을 (xMin, f(xMin))에서 (xMax, f(xMax))까지 그려줌
plotter.plotLine(xMin, f(xMin), xMax, f(xMax), "green");

// vv 목표값 설정 : 학습 데이터가 함수 f(x) 위보다 높으면 1, 낮으면 0으로 설정
const desired = [];
for (let i =0; i < numPoints; i++){
    desired[i] = 0;
    if (yPoints[i] > f(xPoints[i])) {desired[i] = 1;}
}

// vv 퍼셉트론 생성 : 입력 2개 (x,y)를 받아들이는 퍼셉트론 객체 생성
// vv learningRate : 학습속도 하이퍼파라미터(최적의 훈련 모델을 구현하기 위해 모델에 설정하는 변수)
const ptron = new Perceptron(2, learningRate)

// vv training
for (let j=0; j <= 10000; j++){
    // ^^ 0부터 시작했기 때문에 10,001번
    for (let i=0; i < numPoints; i++){
        ptron.train([xPoints[i], yPoints[i]], desired[i]);
    //각 점에 대해서 ptron.train()으로 학습
    }
}

// 퍼셉트론 테스트
const counter = 1000;
let errors = 0;
for (let i=0; i < counter; i++){
    let x = Math.random() * xMax;
    let y = Math.random() * yMax;
    let guess = ptron.activate([x,y, ptron.bias]);
    //ptron.acivate 통해 추론한 guess값을 기준으로 시각화(블루,블랙)
    let color = ((guess == 0) ? "blue":"black");
    plotter.plotPoint(x, y, color);

    if((y > f(x) && guess == 0) || (y < f(x) && guess == 1)) {errors++} 
}
document.getElementById("demo").innerHTML = errors + " Errors out " + counter;

/*
const plotter = new XYPlotter("myCanvas");
plotter.transformXY();
const xMax = plotter.xMax;
const yMax = plotter.yMax;
const xMin = plotter.xMin;
const yMin = plotter.yMin;

// vv 무작위 XY포인트 생성 : 원하는 만큼 XY점을 만들고 플로터에 포인트를 표시
const numPoints = 500;
const xPoints = [];
const yPoints = [];

for(let i =0; i < numPoints; i++){
    xPoints[i] = Math.random() * xMax;
    yPoints[i] = Math.random() * yMax;
}

// vv 라인함수 생성 : 플로터의 선을 표시
function f(x){
    return x * 1.2 + 50;
}

// vv 직선
plotter.plotLine(xMin, f(xMin), xMax, f(xMax), "black");

// vv 정답 계산 : 직선함수를 기반으로 정답을 계산
let desired = [];
for (let i=0; i < numPoints; i++){
    desired[i] = 0;
    if(yPoints[i] > f(xPoints[i])){desired[i] = 1;}
    // ^^ y가 선 위에 있으면 원하는 답은 1, y가 선 아래에 있으면 0
    //    원하는 답변을 배열(desired[])에 저장
}

// vv 화면에 표시
for (let i =0; i < numPoints; i++){
    let color = "blue";
    if(desired[i]) color = "red";
    plotter.plotPoint(xPoints[i],yPoints[i],color);
    // ^^ desired[i] == 1이면 빨간색, 그렇지 않으면 파란색
}
*/