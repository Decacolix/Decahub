const clockElement = document.querySelector('.clock')
const dateInfoElement = document.querySelector('.date-info')
const stopwatchButtonElement = document.querySelector('.stopwatch-button')
const stopwatchElement = document. querySelector('.stopwatch')

function getWeekNumber(date) {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
    const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7)

    return week;
}

function showDateInfo() {
    const namedays = [
        ['Nový rok, Den obnovy samostatného českého státu', 'Karina', 'Radmila', 'Diana', 'Dalimil', 'Tři králové', 'Vilma', 'Čestmír', 'Vladan', 'Břetislav', 'Bohdana', 'Pravoslav', 'Edita', 'Radovan', 'Alice', 'Ctirad', 'Drahoslav', 'Vladislav', 'Doubravka', 'Ilona', 'Běla', 'Slavomír', 'Zdeněk', 'Milena', 'Miloš', 'Zora', 'Ingrid', 'Otýlie', 'Zdislava', 'Robin', 'Marika'],
        ['Hynek', 'Nela', 'Blažej', 'Jarmila', 'Dobromila', 'Vanda', 'Veronika', 'Milada', 'Apolena', 'Mojmír', 'Božena', 'Slavěna', 'Věnceslav', 'Valentýn', 'Jiřina', 'Ljuba', 'Miloslava', 'Gizela', 'Patrik', 'Oldřich', 'Lenka', 'Petr', 'Svatopluk', 'Matěj', 'Liliana', 'Dorota', 'Alexandr', 'Lumír', 'Horymír'],
        ['Bedřich', 'Anežka', 'Kamil', 'Stela', 'Kazimír', 'Miroslav', 'Tomáš', 'Gabriela', 'Františka', 'Viktorie', 'Anděla', 'Řehoř', 'Růžena', 'Rút, Matylda', 'Ida', 'Elena, Herbert', 'Vlastimil', 'Eduard', 'Josef', 'Světlana', 'Radek', 'Leona', 'Ivona', 'Gabriel', 'Marián', 'Emanuel', 'Dita', 'Soňa', 'Taťána', 'Arnošt', 'Kvido'],
        ['Hugo', 'Erika', 'Richard', 'Ivana', 'Miroslava', 'Vendula', 'Heřman, Hermína', 'Ema', 'Dušan', 'Darja', 'Izabela', 'Julius', 'Aleš', 'Vincenc', 'Anastázie', 'Irena', 'Rudolf', 'Valérie', 'Rostislav', 'Marcela', 'Alexandra', 'Evženie', 'Vojtěch', 'Jiří', 'Marek', 'Oto', 'Jaroslav', 'Vlastislav', 'Robert', 'Blahoslav'],
        ['Svátek práce', 'Zikmund', 'Alexej', 'Květoslav', 'Klaudie', 'Radoslav', 'Stanislav', 'Den vítězství', 'Ctibor', 'Blažena', 'Svatava', 'Pankrác', 'Servác', 'Bonifác', 'Žofie', 'Přemysl', 'Aneta', 'Nataša', 'Ivo', 'Zbyšek', 'Monika', 'Emil', 'Vladimír', 'Jana', 'Viola', 'Filip', 'Valdemar', 'Vilém', 'Maxmilián', 'Ferdinand', 'Kamila'],
        ['Laura', 'Jarmil', 'Tamara', 'Dalibor', 'Dobroslav', 'Norbert', 'Iveta, Slavoj', 'Medard', 'Stanislava', 'Gita', 'Bruno', 'Antonie', 'Antonín', 'Roland', 'Vít', 'Zbyněk', 'Adolf', 'Milan', 'Leoš', 'Květa', 'Alois', 'Pavla', 'Zdeňka', 'Jan', 'Ivan', 'Adriana', 'Ladislav', 'Lubomír', 'Petr a Pavel', 'Šárka'],
        ['Jaroslava', 'Patricie', 'Radomír', 'Prokop', 'Cyril, Metoděj', 'Den upálení mistra Jana Husa', 'Bohuslava', 'Nora', 'Drahoslava', 'Libuše, Amálie', 'Olga', 'Bořek', 'Markéta', 'Karolína', 'Jindřich', 'Luboš', 'Martina', 'Drahomíra', 'Čeněk', 'Ilja', 'Vítězslav', 'Magdaléna', 'Libor', 'Kristýna', 'Jakub', 'Anna', 'Věroslav', 'Viktor', 'Marta', 'Bořivoj', 'Ignác'],
        ['Oskar', 'Gustav', 'Miluše', 'Dominik', 'Kristián', 'Oldřiška', 'Lada', 'Soběslav', 'Roman', 'Vavřinec', 'Zuzana', 'Klára', 'Alena', 'Alan', 'Hana', 'Jáchym', 'Petra', 'Helena', 'Ludvík', 'Bernard', 'Johana', 'Bohuslav', 'Sandra', 'Bartoloměj', 'Radim', 'Luděk', 'Otakar', 'Augustýn', 'Evelína', 'Vladěna', 'Pavlína'],
        ['Linda, Samuel', 'Adéla', 'Bronislav', 'Jindřiška', 'Boris', 'Boleslav', 'Regína', 'Mariana', 'Daniela', 'Irma', 'Denisa', 'Marie', 'Lubor', 'Radka', 'Jolana', 'Ludmila', 'Naděžda', 'Kryštof', 'Zita', 'Oleg', 'Matouš', 'Darina', 'Berta', 'Jaromír', 'Zlata', 'Andrea', 'Jonáš', 'Václav, Den české státnosti', 'Michal', 'Jeroným'],
        ['Igor', 'Olivie, Oliver', 'Bohumil', 'František', 'Eliška', 'Hanuš', 'Justýna', 'Věra', 'Štefan, Sára', 'Marina', 'Andrej', 'Marcel', 'Renáta', 'Agáta', 'Tereza', 'Havel', 'Hedvika', 'Lukáš', 'Michaela', 'Vendelín', 'Brigita', 'Sabina', 'Teodor', 'Nina', 'Beáta', 'Erik', 'Šarlota, Zoe', 'Den vzniku samostatného československého státu', 'Silvie', 'Tadeáš', 'Štěpánka'],
        ['Felix', 'Památka zesnulých', 'Hubert', 'Karel', 'Miriam', 'Liběna', 'Saskie', 'Bohumír', 'Bohdan', 'Evžen', 'Martin', 'Benedikt', 'Tibor', 'Sáva', 'Leopold', 'Otmar', 'Mahulena, Den boje za svobodu a demokracii', 'Romana', 'Alžběta', 'Nikola', 'Albert', 'Cecílie', 'Klement', 'Emílie', 'Kateřina', 'Artur', 'Xenie', 'René', 'Zina', 'Ondřej'],
        ['Iva', 'Blanka', 'Svatoslav', 'Barbora', 'Jitka', 'Mikuláš', 'Benjamín', 'Květoslava', 'Vratislav', 'Julie', 'Dana', 'Simona', 'Lucie', 'Lýdie', 'Radana', 'Albína', 'Daniel', 'Miloslav', 'Ester', 'Dagmar', 'Natálie', 'Šimon', 'Vlasta', 'Adam, Eva, Štědrý den', '1. svátek vánoční', 'Štěpán, 2. svátek vánoční', 'Žaneta', 'Bohumila', 'Judita', 'David', 'Silvestr']
    ]

    let time = new Date()
    weekNumber = getWeekNumber(time)

    dateInfoElement.innerText = `${weekNumber}. týden | ${namedays[time.getMonth()][time.getDate() - 1]}`
}
//Add zero to display '00' instead of '0'.
function addZero(value) {
    return (value < 10 ? '0' : '') + value;
}
//Display current time with continuous update.
function showClock() {
    let time = new Date()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    clockElement.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`

    showDateInfo()

    if (hours === '00' && minutes === '00' && seconds === '00') {
        window.location.reload()
    }

    setTimeout(showClock, 500)
}

let interval
let stopwatchRunning = false
let stopwatchToReset = false

//Switch stopwatch between running state, stop state and hidden state.
function toggleStopwatch() {

    //Show and start stopwatch if they are not displayed.
    if (!stopwatchRunning && !stopwatchToReset) {
        stopwatchRunning = true
        stopwatchElement.style.display = 'block'

        let milliseconds = 0
        let seconds = 0
        let minutes = 0

        interval = setInterval(() => {
            milliseconds++

            if (milliseconds >= 100) {
                milliseconds = 0
                seconds++
            }

            if (seconds >= 60) {
                seconds = 0
                minutes++
            }

            if (minutes > 99) {
                milliseconds = 0
                seconds = 0
                minutes = 0
            }

            stopwatchElement.innerText = `${addZero(minutes)}:${addZero(seconds)}.${addZero(milliseconds)}`
        }, 10)
    }

    //Stop stopwatch when running.
    else if (stopwatchRunning && !stopwatchToReset) {
        stopwatchRunning = false
        stopwatchToReset = true
        clearInterval(interval)
    }

    //Hide stopwatch when stopped and reset them.
    else {
        stopwatchRunning = false
        stopwatchToReset = false
        
        stopwatchElement.style.display = 'none'
    }
}

window.addEventListener('onload', showClock())
stopwatchButtonElement.addEventListener('click', toggleStopwatch)