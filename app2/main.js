let level = 1
let sec = 0;
let min = 0;
let interval = null;
let operators = ['+', '-', '*', '/', '%'];
let fNumber;
let lnumber;
let selectedOperator;
let anwserData = [];
let correctAnwser;
let insertedAnwser;
let qNumber = 0;

const selectElement = document.getElementById("select");
const minElement = document.getElementById("min");
const secElement = document.getElementById("sec");
const fNumElement = document.getElementById("f-num");
const lNumElement = document.getElementById("l-num");
const opElement = document.getElementById("op");
const anwserElement = document.getElementById("anwser");
const qNumberElement = document.getElementById("qNumber");
const cElement = document.getElementById("c");
const wElement = document.getElementById("w");
const sElement = document.getElementById("s");
const btnStartElement = document.getElementById("btn-start");
const tbodyElement = document.getElementById("anwser-body");

selectElement.addEventListener("change", function ()
{
    level = parseInt(selectElement.value);
});

// --------------
const start = () =>
{
    btnStartElement.disabled = true;
    manageTime();

}


const manageTime = () =>
{
    qNumber++;
    if (qNumber > 10)
    {
        finalize();
        return;
    }
    else
    {
        qNumberElement.textContent = qNumber;
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
                skipQuiz();
            }
        }, 1000);
    }

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
    insertedAnwser = parseInt(anwserElement.value);

    if (fNumber && lnumber && selectedOperator && insertedAnwser)
    {
        switch (selectedOperator)
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
                'qNumber': 1,
                'Time': min + ':' + sec,
                'correctAnwser': correctAnwser,
                'userAnwser': insertedAnwser,
                'operator': selectedOperator,
                'firstNumber': fNumber,
                'lastNumber': lnumber,
                'iscorrect': true,
                'isskipped': false

            }
            anwserData.push(obj);
        }
        else
        {
            let obj = {
                'qNumber': 1,
                'Time': min + ':' + sec,
                'correctAnwser': correctAnwser,
                'userAnwser': insertedAnwser,
                'operator': selectedOperator,
                'firstNumber': fNumber,
                'lastNumber': lnumber,
                'iscorrect': false,
                'isskipped': false

            }
            anwserData.push(obj);
        }
        anwserElement.value = ''
        manageTime();
        setStatisticsForLables();
    }
    else
    {
        alert("Try Again");
    }
}
const skipQuiz = () =>
{
    if (qNumber > 10)
    {
        finalize();
        return;
    }
    else
    {
        let obj = {
            'qNumber': 1,
            'Time': min + ':' + sec,
            'correctAnwser': correctAnwser,
            'userAnwser': insertedAnwser,
            'operator': selectedOperator,
            'firstNumber': fNumber,
            'lastNumber': lnumber,
            'iscorrect': false,
            'isskipped': true

        }
        anwserData.push(obj);
        manageTime();

        setStatisticsForLables();
    }


}

const setStatisticsForLables = () =>
{
    let c = 0;
    let w = 0;
    let s = 0;

    for (let x = 0; x < anwserData.length; x++)
    {
        let temp = anwserData[x];
        if (temp.iscorrect)
        {
            c++;
        }
        else
        {
            w++;
        }
        if (temp.isskipped)
        {
            s++;
        }
    }
    cElement.textContent = c;
    wElement.textContent = w;
    sElement.textContent = s;
}

const reset = () =>
{
    btnStartElement.disabled = false;  // Re-enable the start button
    qNumber = 0;  // Reset question number
    qNumberElement.textContent = qNumber;  // Update the question number display
    anwserData = [];  // Clear the answer data array
    setStatisticsForLables();  // Reset the labels for correct, wrong, and skipped counts
    selectedOperator = undefined;  // Clear the selected operator
    clearInterval(interval);  // Clear the timer interval

    // Reset the timer display to 00:00
    min = 0;
    sec = 0;
    minElement.textContent = '00';
    secElement.textContent = '00';

    // Reset the question display to initial state
    opElement.textContent = '?';
    fNumElement.textContent = '?';
    lNumElement.textContent = '?';
    anwserElement.value = '';  // Clear the answer input field

    // Clear the answer table
    while (tbodyElement.firstChild)
    {
        tbodyElement.removeChild(tbodyElement.firstChild);
    }

    // Reset counters in the statistics labels
    cElement.textContent = '0';
    wElement.textContent = '0';
    sElement.textContent = '0';
}

const finalize = () =>
{
    anwserData.forEach(data =>
    {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        cell1.textContent = data.firstNumber;
        row.appendChild(cell1);
        const cell2 = document.createElement("td");
        cell2.textContent = data.lastNumber;
        row.appendChild(cell2);
        const cell3 = document.createElement("td");
        cell3.textContent = data.operator;
        row.appendChild(cell3);
        const cell4 = document.createElement("td");
        cell4.textContent = data.correctAnwser;
        row.appendChild(cell4);
        const cell5 = document.createElement("td");
        cell5.textContent = data.userAnwser;
        row.appendChild(cell5);
        const cell6 = document.createElement("td");
        cell6.textContent = data.iscorrect;
        row.appendChild(cell6);
        const cell7 = document.createElement("td");
        cell7.textContent = data.isskipped;
        row.appendChild(cell7);
        const cell8 = document.createElement("td");
        cell8.textContent = data.Time;
        row.appendChild(cell8);

        tbodyElement.appendChild(row);
    });
}