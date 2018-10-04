const ls = [
    ['absztyfikant', 'konkurent do panny'],
    ['ancug', 'garnitur'],
    ['apasz', 'bandyta, chuligan'],
    ['badylarz', 'podmiejski hodowca kwiatów i warzyw'],
    ['bandzioch', 'brzuch'],
    ['bezportkowiec', 'biedak'],
    ['bransoletki', 'kajdanki'],
    ['chawira', 'mieszkanie'],
    ['cierpiarz', 'taksówkarz'],
    ['cyferblat', 'twarz'],
    ['cykoria', 'strach'],
    ['ćma', 'prostytutka'],
    ['doliniarz', 'kieszonkowiec'],
    ['drynda', 'dorożka'],
    ['dymać', 'uciekać, biec'],
    ['dzyndzaj', 'tramwaj'],
    ['farmazon', 'oszustwo'],
    ['fioraja', 'kwiaciarka'],
    ['flota', 'pieniądze'],
    ['frajer', 'ktoś niedoświadczony o małym obyciu'],
    ['gablota', 'samochód'],
    ['granda', 'awantura, zabawa'],
    ['grabie', 'ręce'],
    ['klajniak', 'dziecko'],
    ['landszaft', 'kiczowaty obrazek z widoczkiem'],
    ['lipkarz', 'złodziej włamujący się przez okno'],
    ['majcher', 'nóż do rozboju'],
    ['makówka', 'głowa'],
    ['mortus', 'bieda, brak pieniędzy'],
    ['opylić', 'sprzedać'],
    ['pacykarz', 'malarz, fotograf'],
    ['parzygnat', 'kucharz'],
    ['patrzałki', 'okulary'],
    ['piter', 'portfel'],
    ['rozpiska', 'lista np. zakupów'],
    ['sikor', 'zegarek na rękę'],
    ['sosnowa jesionka', 'trumna'],
    ['szuwaks', 'pasta do butów'],
    ['trajtek', 'trolejbus'],
    ['trefny', 'kradziony'],
    ['winkiel', 'róg budynku'],
    ['zdrefić', 'bać się'],
    ['zerkadło', 'lusterko'],
];
const lsElementsAsString = ls.map((x) => `${x[0]} ${x[1]}`);
const keys = ls.map((x) => x[0]);
const values = ls.map((x) => x[1]);
const $readyKeys = $('#ready-keys');
const $readyValues = $('#ready-values');


function createElement(text) {
    let el = document.createElement('li');
    el.innerText = text;
    return el
}


function shuffle() {
    let sortedList = values.slice();
    sortedList.sort(function() {
        return .5 - Math.random()
    });
    return sortedList
}


function check() {
    let score = 0;
    const readyKeys = $readyKeys.find('li');
    const readyValues = $readyValues.find('li');
    for (let i=0; i < readyKeys.length; i++) {
        if (lsElementsAsString.includes(`${readyKeys[i].innerText} ${readyValues[i].innerText}`)) {
            $(readyValues[i]).css('backgroundColor', 'rgb(255, 255, 0)');
            score++;
        } else {
            $(readyValues[i]).css('backgroundColor', 'rgb(255, 0, 0)').css('color', 'rgb(255, 255, 255)');
        }
    }
    $('#score').html(`Wynik: ${score}`);
}


function bind() {
    $('button').on('click', () => {
        check();
    });

    $('#values li').on('contextmenu', function (ev) {
        ev.preventDefault();
        const $el = $(this);
        const $keyEl = $($('#keys li')[$('#values li').index($el)]);
        $keyEl.appendTo($readyKeys);
        $el.appendTo($readyValues);
    });
}


function run() {
    const $keysContainer = $('#keys');
    const $valuesContainer = $('#values');
    for (const k of keys) {
        $keysContainer.append(createElement(k));
    }
    for (const v of shuffle()) {
        $valuesContainer.append(createElement(v));
    }

    bind()
}


$('#values').sortable();


run();
