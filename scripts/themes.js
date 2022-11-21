const themes = {
    default: ['#2c1c49', '#1d0e36', '#ffffff'],
    dark: ['#000000', '#3d3d3d', '#ffffff'],
    light: ['#ffffff', '#adadad', '#000000'],
    blue: ['#8D9eff', '#7978ff', '#000000'],
    red: ['#c02739', '#84142d', '#ffffff'],
    pink: ['#f06292', '#d23369', '#000000']
}

const themeSelectButtons = document.querySelectorAll('.theme-select-button')
const weatherWidgetElement = document.querySelector('.weatherwidget-io')
const stopwatchImageElement = document.querySelector('.image-stopwatch')
const arrowImageElements = document.querySelectorAll('.image-arrow')
const plusImageElement = document.querySelector('.add-task-plus-img')

function loadTheme() {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', themes.default)
    }

    const root = document.querySelector(':root')
    root.style.setProperty('--primary-color', localStorage.getItem('theme').split(',')[0])
    root.style.setProperty('--secondary-color', localStorage.getItem('theme').split(',')[1])
    root.style.setProperty('--tertiary-color', localStorage.getItem('theme').split(',')[2])

    weatherWidgetElement.setAttribute('data-textcolor', localStorage.getItem('theme').split(',')[2])

    if (localStorage.getItem('theme') == themes.default || localStorage.getItem('theme') == themes.dark || localStorage.getItem('theme') == themes.red) {
        for (let i = 0; i < arrowImageElements.length; i++) {
            arrowImageElements[i].setAttribute('src', 'images/arrow-white.svg')
        }

        stopwatchImageElement.setAttribute('src', 'images/stopwatch-white.svg')
        plusImageElement.setAttribute('src', 'images/plus-white.svg')
    }

    if (localStorage.getItem('theme') == themes.light || localStorage.getItem('theme') == themes.blue || localStorage.getItem('theme') == themes.pink) {
        for (let i = 0; i < arrowImageElements.length; i++) {
            arrowImageElements[i].setAttribute('src', 'images/arrow-black.svg')
        }

        stopwatchImageElement.setAttribute('src', 'images/stopwatch-black.svg')
        plusImageElement.setAttribute('src', 'images/plus-black.svg')
    }
}

function addListenersToButtons() {
    for (let i = 0; i < themeSelectButtons.length; i++) {
        themeSelectButtons[i].addEventListener('click', (e) => {
            switch (e.target.classList[2]) {
                case
                    'theme-select-default': localStorage.setItem('theme', themes.default)
                    break
                case 
                    'theme-select-dark': localStorage.setItem('theme', themes.dark)
                    break
                case 
                    'theme-select-light': localStorage.setItem('theme', themes.light)
                    break
                case 
                    'theme-select-blue': localStorage.setItem('theme', themes.blue)
                    break
                case 
                    'theme-select-red': localStorage.setItem('theme', themes.red)
                    break
                case 
                    'theme-select-pink': localStorage.setItem('theme', themes.pink)
                    break
                default:
                    break
            }

            loadTheme()
            window.location.reload()
        })
    }
}

window.addEventListener('onload', loadTheme())
window.addEventListener('onload', addListenersToButtons())