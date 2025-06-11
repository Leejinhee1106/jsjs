class XYPlotter{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        //캔버스의 2d콘텐츠를 가져와서 그리기 작업에 사용
        this.ctx = this.canvas.getContext('2d');
        this.xMin = 0;
        this.yMin = 0;
        this.xMax = this.canvas.width;
        this.yMax = this.canvas.height;
    }

    transformXY(){
        this.ctx.setTransform(1,0,0,-1,0, this.canvas.height);
    }

    plotPoint(x, y, color = "black", size =3){ //주어진 좌표에 xy점을 그림
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        //메서드로 원을 그리고 색을 칠함니다
        this.ctx.fill();
    }

    plotLine(x1, y1, x2, y2, color="black"){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1); // 시작점
        this.ctx.lineTo(x2, y2); // 끝점
        this.ctx.stroke(); //  선을 그려줌
    }
}


const plotter = new XYPlotter("myCanvas");
plotter.transformXY();
const xMax = plotter.xMax;
const yMax = plotter.yMax;
const xMin = plotter.xMin;
const yMin = plotter.yMin;
// 무작위 XY포인트 생성 원하는 만큼 xy점을 만듭니다, 플로터에 포인트를 표시합니다
const numPoints = 500;
const xPoints = [];
const yPoints = [];
for(let i =0; i < numPoints; i++){
    xPoints[i] = Math.random() * xMax;
    yPoints[i] = Math.random() * yMax;
}
//라인 함수 생성 플로터에 선을 표시
function f(x) {
    return x * 1.2 + 50;
}
//Plot the Line
plotter.plotLine(xMin, f(xMin), xMax, f(xMax), "black");
//정답계산 직선함수를 기반으로 정답을 계산합니다
//y가 선위에 있으면 원하는 답은 1이고 y가 선아래 있으면 0입니다
//원하는 답변을 배열(desired[])에 저장합니다
let desired = [];
for (let i=0; i < numPoints; i++){
    desired[i] = 0;
if(yPoints[i] > f(xPoints[i])) {desired[i] = 1;}
}
//화면에 표시 desired[i] == 1이면 검정색 그렇지 않으면 파란색
for (let i =0; i < numPoints; i++){
    let color = "blue";
    if(desired[i]) color = "black";
    plotter.plotPoint(xPoints[i],yPoints[i],color);
}