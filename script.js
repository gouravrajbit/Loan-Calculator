const amountInput = document.querySelector('#loan-amount');
const interestInput = document.querySelector('#loan-interest');
const tenureInput = document.querySelector('#loan-tenure');
const calculateBtn = document.querySelector('input[type="submit"]');
const mainArea = document.querySelector('#main-area');



let emi, totalAmount, totalInterest;



calculateBtn.addEventListener('click', (e) => {
    //stop default action
    e.preventDefault();

    //remove div.remove-div if present
    const div = document.querySelector('.remove-div');
    if (div)
        mainArea.removeChild(div);

    const p = amountInput.value;
    const r = (interestInput.value / 12) / 100;
    const t = tenureInput.value;
    const x = Math.pow(1 + r, t);
    console.log(p, r, t, x);
    emi = ((p * r * x) / (x - 1)).toFixed(2);
    totalAmount = (emi * t).toFixed(2);
    totalInterest = (totalAmount - p).toFixed(2);

    // console.log('EMI:', emi);
    // console.log('Total Amount:', totalAmount);
    // console.log('Total Interest:', totalInterest);

    if (isFinite(emi))
        showResult();
    else
        showError();
});


const showError = () => {
    mainArea.style.height = '400px';
    const ele = document.querySelector('.error');
    ele.style.display = 'block';
    setTimeout(() => {
        ele.style.display = 'none';
        mainArea.style.height = '350px';
    }, 3000);
}



const showResult = () => {

    const div = document.createElement('div');
    div.classList.add('remove-div');


    //
    const result = document.createElement('h2');
    result.innerText = 'Result';
    result.style.paddingTop = '20px';
    result.classList.add('heading');
    div.appendChild(result);



    // emi
    const p1 = document.createElement('p');
    p1.innerHTML = `<span style="color:#1B2021;">Monthly EMI:</span> <i class="fa-solid fa-indian-rupee-sign "> </i> ${emi}`;
    div.appendChild(p1);

    //totalAmount
    const p2 = document.createElement('p');
    p2.innerHTML = `<span style="color:#1B2021;">Total Amount:</span> <i class="fa-solid fa-indian-rupee-sign "> </i> ${totalAmount}`;
    div.appendChild(p2);


    //totalInterest
    const p3 = document.createElement('p');
    p3.innerHTML = `<span style="color:#1B2021;">Total Interest:</span> <i class="fa-solid fa-indian-rupee-sign "> </i> ${totalInterest}`;
    div.appendChild(p3);


    mainArea.style.height = '550px';
    mainArea.appendChild(div);
}

