const exchangeLeftValueElements = document.querySelectorAll('.exchange-left-value')
const exchangeRightValueElements = document.querySelectorAll('.exchange-right-value')
const exchangeLeftArrowElements = document.querySelectorAll('.exchange-left-arrow')
const exchangeRightArrowElements = document.querySelectorAll('.exchange-right-arrow')
const exchangeDateElement = document.querySelector('.exchange-date')

function fetchExchangeData() {
    const requestURL = 'https://api.exchangerate.host/latest?base=CZK'

    //Fetch data from API.
    fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('exchange', JSON.stringify(data))

        const exchangeData = JSON.parse(localStorage.getItem('exchange'))
        const exchangeCodes = Object.keys(exchangeData.rates)

        exchangeDateElement.innerText = 'Data aktuální k ' + exchangeData.date

        //Fill local storage with default values.
        for (let i = 0; i < 6; i++) {
            if (!localStorage.getItem(`exchange-${i}`)) {
                switch(i) {
                    case 0: localStorage.setItem('exchange-0', 'EUR'); break;
                    case 1: localStorage.setItem('exchange-1', 'USD'); break;
                    case 2: localStorage.setItem('exchange-2', 'GBP'); break;
                    case 3: localStorage.setItem('exchange-3', 'PLN'); break;
                    case 4: localStorage.setItem('exchange-4', 'HRK'); break;
                    case 5: localStorage.setItem('exchange-5', 'HUF'); break;
                }
            }

            //Display values in elements.
            exchangeLeftValueElements[i].innerText = localStorage.getItem(`exchange-${i}`)
            exchangeRightValueElements[i].innerText = (1 / exchangeData.rates[localStorage.getItem(`exchange-${i}`)]).toFixed(2) + ' CZK'
        }

        previousExchange(exchangeData, exchangeCodes)
        nextExchange(exchangeData, exchangeCodes)
    });
}

//Switch to previous exchange.
function previousExchange(exchangeData, exchangeCodes) {
    for (let i = 0; i < 6; i++) {
        exchangeLeftArrowElements[i].addEventListener('click', () => {
            let index = exchangeCodes.indexOf(exchangeLeftValueElements[i].innerText) > 0 ? exchangeCodes.indexOf(exchangeLeftValueElements[i].innerText) : exchangeCodes.length

            index--
            exchangeLeftValueElements[i].innerText = exchangeCodes[index]
            exchangeRightValueElements[i].innerText = (1 / exchangeData.rates[exchangeCodes[index]]).toFixed(2) + ' CZK'

            //Store current selection to local storage.
            localStorage.setItem(`exchange-${i}`, exchangeCodes[index])
        })
    }
}

//Switch to next exchange.
function nextExchange(exchangeData, exchangeCodes) {
    for (let i = 0; i < 6; i++) {
        exchangeRightArrowElements[i].addEventListener('click', () => {
            let index = exchangeCodes.indexOf(exchangeLeftValueElements[i].innerText) < exchangeCodes.length - 1 ? exchangeCodes.indexOf(exchangeLeftValueElements[i].innerText) : -1

            index++
            exchangeLeftValueElements[i].innerText = exchangeCodes[index]
            exchangeRightValueElements[i].innerText = (1 / exchangeData.rates[exchangeCodes[index]]).toFixed(2) + ' CZK'
            
            //Store current selection to local storage.
            localStorage.setItem(`exchange-${i}`, exchangeCodes[index])
        })
    }
}

window.addEventListener('onload', fetchExchangeData())