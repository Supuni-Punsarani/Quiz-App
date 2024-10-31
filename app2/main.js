let level = 1
let sec = 0;
let min = 0;
let interval = null;
let operators = ['+', '-', '*', '/', '%'];
let fNumber;
let lnumber;
let selectedOperator;
let anwserData = [];

const selectElement = document.getElementById("select");
const minElement = document.getElementById("min");
const secElement = document.getElementById("sec");
const fNumElement = document.getElementById("f-num");
const lNumElement = document.getElementById("l-num");
const opElement = document.getElementById("op");
const anwserElement = document.getElementById("anwser");

selectElement.addEventListener("change", function ()
{
    level = parseInt(selectElement.value);
});

// --------------
const start = () =>
{
    manageTime();
}


const manageTime = () =>
{
    min = 0;
    sec = 0;
    minElement.textContent = '00';
    secElement.textContent = '00';
    generateQuestion(level);
    clearInterval(interval);
    interval = setInterval(() =>
    {
        console.log(new Date().toISOString().split('T')[1]);

        sec++;
        if (sec < 10)
        {
            secElement.textContent = '0' + sec;
        }
        else
        {
            secElement.textContent = sec + '';
        }
        if (sec == 60)
        {
            sec = 0;
            min++;
            minElement.textContent = '0' + min;
        }
        if (min == 3)
        {
            min = 0;
        }
    }, 1000);
}

const generateQuestion = (selectedlevel) =>
{
    let maxNumber = 10;

    if (selectedlevel == 2)
    {
        maxNumber = 50;
    }
    else if (selectedlevel == 3)
    {
        maxNumber = 100;
    }
    fNumber = Math.floor(Math.random() * maxNumber) + 1;
    lnumber = Math.floor(Math.random() * maxNumber) + 1;
    fNumElement.textContent = fNumber;
    lNumElement.textContent = lnumber;


    selectedOperator = operators[Math.floor(Math.random() * 5)];
    opElement.textContent = selectedOperator;
}

const submitData = () =>
{
    let insertedAnwser = parseInt(anwserElement.value);
    let correctAnwser;

    if (fNumber && lnumber && selectedOperator && insertedAnwser)
    {
        switch (selectedOperato)
        {
            case '+': correctAnwser = fNumber + lnumber; break;
            case '-': correctAnwser = fNumber - lnumber; break;
            case '*': correctAnwser = fNumber * lnumber; break;
            case '/': correctAnwser = fNumber / lnumber; break;
            case '%': correctAnwser = fNumber % lnumber; break;
            default: alert("Something went wrong"); return;
        }
        if (insertedAnwser == correctAnwser)
        {
            let obj = {
                'q Number': 1,
                'Time': min + ':' + sec,
                'correctAnwser': correctAnwser,
                'userAnwser': insertedAnwser,
                'operator': selectedOperator,
                'firstNumber': fNumber,
                'lastNumber': lnumber,
                'iscorrect': true

            }
            anwserData.push(obj);
        }
        else
        {
            let obj = {
                'q Number': 1,
                'Time': min + ':' + sec,
                'correctAnwser': correctAnwser,
                'userAnwser': insertedAnwser,
                'operator': selectedOperator,
                'firstNumber': fNumber,
                'lastNumber': lnumber,
                'iscorrect': false

            }
            anwserData.push(obj);
        }
        manageTime();
    }
    else
    {
        alert("Try Again");
    }
}
