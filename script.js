let balance = document.querySelector('#money');
let money = balance.innerText.substring(1);
money = parseFloat(money);
let hempClick = document.querySelector('.click');
let profit = 0.06;
let clickRate = document.querySelector('#clickRate span')
let perSec = 0;
let perSecRate = document.querySelector('#perSecRate span');
let alertMsg = document.querySelector('#alert');
let alertOverlay = document.querySelector('#alertOverlay');
let closeAlert = document.querySelector('#closeAlert');

//  Not Enough Money Alert
function alertFun() {
    alertMsg.removeAttribute('hidden');
    alertOverlay.removeAttribute('hidden');
    //  Click on Overlay Close
    alertOverlay.addEventListener('click', () => {
        alertMsg.setAttribute('hidden', '');
        alertOverlay.setAttribute('hidden', '');
    })
    //  Close Alert Button
    closeAlert.addEventListener('click', () => {
        alertMsg.setAttribute('hidden', '');
        alertOverlay.setAttribute('hidden', '');
    })
    //  ESC on Keyboard to Close
    window.addEventListener('keydown', esc => {
        if (esc.key === 'Escape') {
            alertMsg.setAttribute('hidden', '');
            alertOverlay.setAttribute('hidden', '');
        }
    })
};


//  Money Number Transformator

function moneyRemoveBuy(operandum) {
    switch (true) {
        case (money>=1000000000000000):
            balance.innerText = `$${((operandum)/1000000000000000).toFixed(1)}Qa`;
            break;
        case (money>=1000000000000):
            balance.innerText = `$${((operandum)/1000000000000).toFixed(1)}T`;
            break;
        case (money>=1000000000):
            balance.innerText = `$${((operandum)/1000000000).toFixed(1)}B`;
            break;
        case (money>=1000000):
            balance.innerText = `$${((operandum)/1000000).toFixed(1)}M`;
            break;
        case (money>=1000):
            balance.innerText = `$${((operandum)/1000).toFixed(1)}K`;
            break;
        case (money<1000):
            balance.innerText = `$${(operandum).toFixed(2)}`;
            break;
    }
}

// Add Money per Second

const buyFarm = (el) => {
    let itemSec = el.closest('.col2');
    let itemPrice = itemSec.querySelector('.priceItem');
    let itemMoney = 0;
    if(itemPrice.innerText.includes('K')) {
        let lenghtOfPrice = itemPrice.lenght;
        itemMoney = parseFloat(itemPrice.innerText.substring(1, lenghtOfPrice));
        itemMoney = itemMoney * 1000;
    } else if(!itemPrice.innerText.includes('K')) {
        itemMoney = parseFloat(itemPrice.innerText.substring(1));
    }
    console.log(itemMoney);
    let lvl = itemSec.querySelector('h4 span');
    let lvlNum = parseInt(lvl.innerText);
    operation = money - itemMoney;
    if(money >= itemMoney) {
        moneyRemoveBuy(operation);
        lvlNum += 1;
        lvl.innerText = lvlNum;
       money = money - itemMoney;
       percentOfItem = itemMoney/400;
       perSec = perSec + percentOfItem;
       perSecRate.innerText = `$${perSec.toFixed(2)}`;
       itemMoney = itemMoney + (40/100)*itemMoney;
       if(itemMoney >= 1000) {
        itemPrice.innerText = `$${(itemMoney/1000).toFixed(1)}K`;
       } else if (itemMoney <= 1000) {
        itemPrice.innerText = `$${itemMoney.toFixed(2)}`;
       }
       setInterval(() => {
            money += perSec;
            moneyRemoveBuy(money);
       }, 1000);
    } else {
        alertFun();
    }
};

//  Money Add by Click

hempClick.style.width = '360px'

const addBalance = () => {
    money = money + profit
    moneyRemoveBuy(money);
    
    let clicked = setTimeout (() => {
        hempClick.style.width = '360px'
    }, 50)
    hempClick.style.width = '350px'
};

hempClick.addEventListener('click', addBalance);

//  More Money on Click in Store

const buy = (el) => {
    let itemSec = el.closest('.col2');
    let itemPrice = itemSec.querySelector('.priceItem');
    let itemMoney = 0;
    if(itemPrice.innerText.includes('K')) {
        let lenghtOfPrice = itemPrice.lenght;
        itemMoney = parseFloat(itemPrice.innerText.substring(1, lenghtOfPrice));
        itemMoney = itemMoney * 1000;
    } else if(!itemPrice.innerText.includes('K')) {
        itemMoney = parseFloat(itemPrice.innerText.substring(1));
    }
    let lvl = itemSec.querySelector('h4 span');
    let lvlNum = parseInt(lvl.innerText);
    operation = money - itemMoney;
        if(money >= itemMoney) {
        moneyRemoveBuy(operation);
        money = money - itemMoney;
        profit += (20/100)*profit;
        itemMoney = itemMoney + (35/100)*itemMoney;
        if(itemMoney >= 1000) {
            itemPrice.innerText = `$${(itemMoney/1000).toFixed(1)}K`;
           } else if (itemMoney <= 1000) {
            itemPrice.innerText = `$${itemMoney.toFixed(2)}`;
           }
        clickRate.innerText = `$${profit.toFixed(2)}`;
        lvlNum += 1;
        lvl.innerText = lvlNum;
    } else {
        alertFun();
    }
};