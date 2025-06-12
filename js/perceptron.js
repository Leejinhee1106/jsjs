class Perceptron{
    constructor(n, learningRate){ //n 입력의 수, 학습률(가중치 조절 속도)
        this.weights = new Array(n).fill().map(()=> Math.random() * 2 -1)
        this.learningRate = learningRate;
        this.bias = Math.random() * 2 -1;
    }
    /*
    weights : 각 입력마다 하나의 가중치를 생성 -1 에서 1 사이 랜덤값으로 초기화
    bias : 입력값과 무관하게 출력에 영향을 주는 상수향(-1 에서 1 사이 랜덤값으로 초기화)
    learningRate : 오류를 기반으로 가중치를 얼마나 수정할 지를 결정하는 하이퍼파라미터
    */

    //출력 계산 함수
    activate(inputs){
        let sum = this.bias;
        for (let i=0; i < this.weights.length; i++){
            sum += this.weights[i] * inputs[i];
        }
        return sum > 0 ? 1 : 0; //출력값이 0 또는 1
    }

    //학습 함수 train (inputs, target)
    train (inputs, target) {
        const guess = this.activate(inputs); //예측값
        const error = target - guess; //오차 계산
        for (let i=0; i < this.weights.length; i++){
            this.weights[i] += error * inputs[i] * this.learningRate;
        }
        this.bias += error * this.learningRate;
    }
}