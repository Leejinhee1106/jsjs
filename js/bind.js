const person = {
    firstName:"윤지",
    lastName:"오",
    
    //메서드 생성
    fullName :  function () {
        return "😈" + this.lastName + this.firstName + "😈";
    }
}

const member = {
    firstName:"진희",
    lastName:"이",
}

let fullName = person.fullName.bind(member);
//해석 : person에 fullName 메서드를 bind할게 member에!! 
document.getElementById("demo").innerHTML = fullName();