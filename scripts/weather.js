const cities = {
    'BENEŠOV' : ['benesov', '49d7814d69'],
    'BEROUN' : ['beroun', '49d9714d09'],
    'BLANSKO' : ['blansko', '49d3616d65'],
    'BRNO' : ['brno', '49d2016d61'],
    'BRUNTÁL' : ['bruntal', '49d9917d46'],
    'BŘECLAV' : ['breclav', '48d7516d88'],
    'ČESKÁ LÍPA' : ['ceska-lipa', '50d6814d54'],
    'ČESKÉ BUDĚJOVICE' : ['ceske-budejovice', '48d9814d48'],
    'ČESKÝ KRUMLOV' : ['cesky-krumlov', '48d8114d32'],
    'DĚČÍN' : ['decin', '50d7714d21'],
    'DOMAŽLICE' : ['domazlice', '49d4412d93'],
    'FRÝDEK-MÍSTEK' : ['frydek-mistek', '49d6818d37'],
    'HAVLÍČKŮV BROD' : ['havlickuv-brod', '49d6015d58'],
    'HODONÍN' : ['hodonin', '48d8517d13'],
    'HRADEC KRÁLOVÉ' : ['hradec-kralove', '50d2115d83'],
    'CHEB' : ['cheb', '50d0812d37'],
    'CHOMUTOV' : ['chomutov', '50d4613d41'],
    'CHRUDIM' : ['chrudim', '49d9515d80'],
    'JABLONEC NAD NISOU' : ['jablonec-nad-nisou', '50d7215d17'],
    'JESENÍK' : ['jesenik', '50d2217d20'],
    'JIČÍN' : ['jicin', '50d4415d36'],
    'JIHLAVA' : ['jihlava', '49d4015d59'],
    'JINDŘICHŮV HRADEC' : ['jindrichuv-hradec', '49d1415d01'],
    'KARLOVY VARY' : ['karlovy-vary', '50d2312d87'],
    'KARVINÁ' : ['karvina', '49d8618d54'],
    'KLADNO' : ['kladno', '50d1414d11'],
    'KLATOVY' : ['klatovy', '49d4013d30'],
    'KOLÍN' : ['kolin', '50d0315d20'],
    'KROMĚŘÍŽ' : ['kromeriz', '49d2917d40'],
    'KUTNÁ HORA' : ['kutna-hora', '49d9515d27'],
    'LIBEREC' : ['liberec', '50d7715d05'],
    'LITOMĚŘICE' : ['litomerice', '50d5414d13'],
    'LOUNY' : ['louny', '50d3513d80'],
    'MĚLNÍK' : ['melnik', '50d3514d48'],
    'MLADÁ BOLESLAV' : ['mlada-boleslav', '50d4114d91'],
    'MOST' : ['most', '50d5013d63'],
    'NÁCHOD' : ['nachod', '50d4116d17'],
    'NOVÝ JIČÍN' : ['novy-jicin', '49d5918d01'],
    'NYMBURK' : ['nymburk', '50d1915d04'],
    'OLOMOUC' : ['olomouc', '49d5917d25'],
    'OPAVA' : ['opava', '49d9417d89'],
    'OSTRAVA' : ['ostrava', '49d8218d26'],
    'PARDUBICE' : ['pardubice', '50d0315d78'],
    'PELHŘIMOV' : ['pelhrimov', '49d4315d22'],
    'PÍSEK' : ['pisek', '49d3014d16'],
    'PLZEŇ' : ['pilsen', '49d7413d37'],
    'PRAHA' : ['prague', '50d0814d44'],
    'PRACHATICE' : ['prachatice', '49d0114d00'],
    'PROSTĚJOV' : ['prostejov', '49d4717d11'],
    'PŘEROV' : ['prerov', '49d4617d45'],
    'PŘÍBRAM' : ['pribram', '49d6914d00'],
    'RAKOVNÍK' : ['rakovnik', '50d1113d74'],
    'ROKYCANY' : ['rokycany', '49d7413d59'],
    'RYCHNOV NAD KNĚŽNOU' : ['rychnov-nad-kneznou', '50d1716d28'],
    'SEMILY' : ['semily', '50d6115d33'],
    'SOKOLOV' : ['sokolov', '50d1712d66'],
    'STRAKONICE' : ['strakonice', '49d2613d91'],
    'SVITAVY' : ['svitavy', '49d7616d47'],
    'ŠUMPERK' : ['sumperk', '49d9816d97'],
    'TÁBOR' : ['tabor', '49d4114d68'],
    'TACHOV' : ['tachov', '49d8012d64'],
    'TEPLICE' : ['teplice', '50d6413d84'],
    'TRUTNOV' : ['trutnov', '50d5715d91'],
    'TŘEBÍČ' : ['trebic', '49d2115d88'],
    'UHERSKÉ HRADIŠTĚ' : ['uherske-hradiste', '49d0617d50'],
    'ÚSTÍ NAD LABEM' : ['usti-nad-labem', '50d6614d05'],
    'ÚSTÍ NAD ORLICÍ' : ['usti-nad-orlici', '49d9716d40'],
    'VSETÍN' : ['vsetin', '49d3417d99'],
    'VYŠKOV' : ['vyskov', '49d2817d00'],
    'ZLÍN' : ['zlin', '49d2217d66'],
    'ZNOJMO' : ['znojmo', '48d8616d05'],
    'ŽĎÁR NAD SÁZAVOU' : ['zdar-nad-sazavou', '49d5615d94']
}

const cityKeys = Object.keys(cities)
const modalBodyElement = document.querySelector('.modal-body')
const weatherLinkElement = document.querySelector('.weatherwidget-io')

//Fill modal with cities from the list.
function fillModalWithCities() {
    for (let i = 0; i < cityKeys.length; i++) {
        const cityElement = document.createElement('div')
        
        //Create class and attribute for every city.
        cityElement.classList.add('weather-select-city')
        cityElement.setAttribute('id', cityKeys[i])
        cityElement.innerText = cityKeys[i]

        //Create click event listener for every city.
        cityElement.addEventListener('click', (e) => {
            setWeather(e.target.id)
        })

        modalBodyElement.appendChild(cityElement)
    }
}

//Set selected city to local storage.
function setWeather(location) {
    localStorage.setItem('weather-city', JSON.stringify({location: location, city: cities[location][0], code: [cities[location][1]]}))

    loadWeather()
    window.location.reload()
}

//Load weather to the page.
function loadWeather() {
    if (!localStorage.getItem('weather-city')) {
        const location = 'PRAHA'
        localStorage.setItem('weather-city', JSON.stringify({location: location, city: cities[location][0], code: [cities[location][1]]}))
    }

    const location = JSON.parse(localStorage.getItem('weather-city')).location
    const city = JSON.parse(localStorage.getItem('weather-city')).city
    const code = JSON.parse(localStorage.getItem('weather-city')).code

    weatherLinkElement.setAttribute('href', `https://forecast7.com/cs/${code}/${city}/`)
    weatherLinkElement.setAttribute('data-label_1', location)
}

window.addEventListener('onload', fillModalWithCities())
window.addEventListener('onload', loadWeather())