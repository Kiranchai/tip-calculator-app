const billPrice = document.getElementById('bill-price-input');
const customTipPercentage = document.querySelector('.different-percentage-input');
const peopleAmount = document.getElementById('bill-people-amount');
const percentageButtons = document.querySelectorAll('.tip-percentage-btn');
const tipAmountDisplay = document.getElementById('amount-value');
const totalDisplay = document.getElementById('total-value');
const resetBtn = document.querySelector('.reset-btn');
const errorPopup = document.getElementById('error-popup');

let selectedBtn;


function emptyRequiredFields(){
    if (billPrice.value.length === 0){
        return true;
    }else if (selectedBtn === undefined){
        return true;
    } else if (peopleAmount.value.length === 0 || peopleAmount.value === '0'){
        return true;
    } else{
        return false;
    }
}

function calculateTips(){
    if (emptyRequiredFields()){
        tipAmountDisplay.innerText = '$0.00';
        totalDisplay.innerText = '$0.00';
    } else{
        let tipAmount = billPrice.value * (selectedBtn.innerText || selectedBtn.value) / peopleAmount.value / 100;
        tipAmountDisplay.innerText = '$' + tipAmount.toFixed(2);
        let totalAmount = billPrice.value / peopleAmount.value + tipAmount;
        totalDisplay.innerText = '$' + totalAmount.toFixed(2);
    }
}


percentageButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (selectedBtn !== undefined){
            selectedBtn.classList.remove('selected');
        }

        
        button.classList.add('selected');
        selectedBtn = button;
        calculateTips();
    })
})


customTipPercentage.addEventListener('focus', e => {
    if (selectedBtn){
        selectedBtn.classList.remove('selected');
    }

    customTipPercentage.classList.add('selected');
    selectedBtn = customTipPercentage;
    calculateTips();
})

customTipPercentage.addEventListener('focusout', e => {
    if (customTipPercentage.value.length === 0){
        selectedBtn.classList.remove('selected');
        selectedBtn = undefined;
    }
    calculateTips();
})

billPrice.addEventListener('focusout', e => {
    calculateTips();
})

peopleAmount.addEventListener('focusout', e => {
    
    if (peopleAmount.value === '0'){
        errorPopup.style.display='block';
        peopleAmount.classList.add('error');
    }else{
        if (peopleAmount.classList.contains('error')){
            errorPopup.style.display='none';
            peopleAmount.classList.remove('error');
        }
        calculateTips();
    }
})

resetBtn.addEventListener('click', e => {
    billPrice.value = '';
    if(selectedBtn){
        selectedBtn.value = '';
        selectedBtn.classList.remove('selected');
        selectedBtn = undefined;
    }
    errorPopup.style.display = 'none';
    peopleAmount.classList.remove('error');
    peopleAmount.value = '';
    calculateTips();
})

