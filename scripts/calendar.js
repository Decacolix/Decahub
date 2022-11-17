const arrowLeftElement = document.querySelector('.date-arrow-left')
const arrowRightElement = document.querySelector('.date-arrow-right')
const dateMonthYearElement = document.querySelector('.date-month-year')
const calendarDaysElement = document.querySelector('.calendar-days')
const calendarMonthsElement = document.querySelector('.calendar-months')
const calendarYearsElement = document.querySelector('.calendar-years')
const currentDate = new Date()

let displayedYear = currentDate.getFullYear()
let displayedMonth = currentDate.getMonth()

const monthNames = ['LEDEN', 'ÚNOR', 'BŘEZEN', 'DUBEN', 'KVĚTEN', 'ČERVEN', 'ČERVENEC', 'SRPEN', 'ZÁŘÍ', 'ŘÍJEN', 'LISTOPAD', 'PROSINEC']
const dayCells = document.querySelectorAll('.day-cell')
const monthCells = document.querySelectorAll('.month-cell')
const yearCells = document.querySelectorAll('.year-cell')

let daysView = true
let monthsView = false
let yearsView = false

let allYears = {}
let year = 1900
let yearsKey = 0

//Fill object with years 1900 – 2259 divided into groups by 12.
for (let i = 0; i < 30; i++) {
    allYears[i] = []
    for (let j = 0; j < 12; j++) {
        allYears[i].push(year++)
    }
}

//Get total number of days in a month.
function getNumberOfDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

//Get number of the first weekday (0 - Sunday, 6 - Saturday) in a month.
function getFirstMonthWeekday(year, month) {
    return new Date(year, month, 1).getDay()
}

function renderCalendar(year, month) {
    let firstWeekday = getFirstMonthWeekday(year, month)
    const numberOfDaysInMonth = getNumberOfDaysInMonth(year, month)
    const numberOfDaysInPreviousMonth = getNumberOfDaysInMonth(year, month - 1)

    //Show month name and year.
    dateMonthYearElement.innerText = `${monthNames[month]} ${year}`

    //Adjust weekday number.
    firstWeekday = firstWeekday == 0 ? firstWeekday + 5 : firstWeekday - 2

    //Remove classes.
    for (let i = 0; i < dayCells.length; i++) {
        dayCells[i].classList.remove('previous-month-day', 'next-month-day', 'current-date');
    }

    //Fill calendar with current month.
    for (let i = 1; i <= numberOfDaysInMonth; i++) {
        dayCells[i + firstWeekday].innerText = i

        if (i == currentDate.getDate() && displayedMonth == currentDate.getMonth() && displayedYear == currentDate.getFullYear()) {
            dayCells[i + firstWeekday].classList.add('current-date')
        }
    }

    //Fill calendar with days from previous month.
    for (let i = 0; i <= firstWeekday; i++) {
        dayCells[i].innerText = (numberOfDaysInPreviousMonth - firstWeekday) + i
        dayCells[i].classList.add('previous-month-day')
    }

    //Fill calendar with days from next month.
    for (let i = firstWeekday + numberOfDaysInMonth + 1, j = 1; i < dayCells.length; i++, j++) {
        dayCells[i].innerText = j
        dayCells[i].classList.add('next-month-day')
    }
}

function next() {
    
    //Show next month if days are displayed.
    if (daysView) {
        if (displayedMonth == 11 && displayedYear == 2259) {
            return
        }
    
        if (displayedMonth++ >= 11) {
            displayedMonth = 0
            displayedYear++
        }
    
        renderCalendar(displayedYear, displayedMonth)
    }

    //Show next year if months are displayed.
    if (monthsView) {
        if (displayedYear == 2259) {
            return
        }

        displayedYear++
        dateMonthYearElement.innerText = displayedYear
    }

    //Show next 12 years.
    if (yearsView) {
        if (yearsKey === 29) {
            return
        }

        yearsKey++

        for (let i = 0; i < 12; i++) {
            yearCells[i].innerText = allYears[yearsKey][i]
            dateMonthYearElement.innerText = `${allYears[yearsKey][0]} – ${allYears[yearsKey][11]}`
        }
    }
}

function previous() {

    //Show previous month if days are displayed.
    if (daysView) {
        if (displayedMonth == 0 && displayedYear == 1900) {
            return
        }

        if (displayedMonth-- <= 0) {
            displayedMonth = 11
            displayedYear--
        }

        renderCalendar(displayedYear, displayedMonth)
    }

    //Show previous year if days are displayed.
    if (monthsView) {
        if (displayedYear == 1900) {
            return
        }

        displayedYear--
        dateMonthYearElement.innerText = displayedYear
    }

    //Show previews 12 years.
    if (yearsView) {
        if (yearsKey === 0) {
            return
        }

        yearsKey--

        for (let i = 0; i < 12; i++) {
            yearCells[i].innerText = allYears[yearsKey][i]
            dateMonthYearElement.innerText = `${allYears[yearsKey][0]} – ${allYears[yearsKey][11]}`
        }
    }
}

function changeView() {

    //Show years.
    if (monthsView) {
        monthsView = false
        daysView = false
        yearsView = true

        calendarMonthsElement.style.display = 'none'
        calendarYearsElement.style.display = 'block'

        //Get key of array with displayed year.
        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 12; j++) {
                if (allYears[i][j] == displayedYear) {
                    yearsKey = i
                    break
                }
            }
        }

        //Display 12 years from the array.
        for (let i = 0; i < 12; i++) {
            yearCells[i].innerText = allYears[yearsKey][i]
        }

        dateMonthYearElement.innerText = `${allYears[yearsKey][0]} – ${allYears[yearsKey][11]}`

        //Add click event for every year to display months of the year.
        for (let i = 0; i < 12; i++) {
            yearCells[i].addEventListener('click', (e) => {
                monthsView = true
                daysView = false
                yearsView = false

                displayedYear = e.target.innerText
                dateMonthYearElement.innerText = displayedYear
    
                calendarMonthsElement.style.display = 'block'
                calendarYearsElement.style.display = 'none'
            })
        }
    }

    //Show months.
    if (daysView) {
        monthsView = true
        daysView = false
        yearsView = false
    
        calendarDaysElement.style.display = 'none'
        calendarMonthsElement.style.display = 'block'
    
        dateMonthYearElement.innerText = displayedYear

        //Add click event for every month to display days of the month.
        for (let i = 0; i < 12; i++) {
            monthCells[i].addEventListener('click', () => {
                monthsView = false
                daysView = true
                yearsView = false
    
                displayedMonth = i
    
                renderCalendar(displayedYear, displayedMonth)
    
                calendarDaysElement.style.display = 'block'
                calendarMonthsElement.style.display = 'none'
            })
        }
    }
}

arrowRightElement.addEventListener('click', next)
arrowLeftElement.addEventListener('click', previous)
dateMonthYearElement.addEventListener('click', changeView)
window.addEventListener('onload', renderCalendar(displayedYear, displayedMonth))