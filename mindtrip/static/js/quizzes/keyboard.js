let pattern = 'Jeżeli zastanowimy się głębiej bo płytki sąd w danym wypadku mógłby ' +
       'źle świadczyć o intencjach, bądź co bądź zasadniczych i wpływających ' +
       'znacznie na opinię zainteresowanych, którzy bez wątpienia odezwą się ' +
       'na wołanie i przysporzą nam materiału, tak niezbędnego w warunkach ' +
       'wymagających skupienia, a rozproszonych w zagadnieniach obecnych i ' +
       'dawnych, o których, jak słusznie ktoś zauważył, ktoś zresztą stojący ' +
       'poza ruchem, nie można mówić bez wyraźnego poglądu, w warunkach, ' +
       'powtarzam, jakie stworzył stosunek bliższy do sprawy już ' +
       'przesądzonej, a jeszcze nieuświadomionej, choć tylekroć wbijanej w ' +
       'głowę naszym czynnikom decydującym, a w każdym razie nadającym ' +
       'kierunek prądom, nurtującym umysły, w warunkach, powtarzam po raz ' +
       'drugi, stworzonych przez związek, celowy wprawdzie, lecz jakże mimo ' +
       'to daleki od celu, przyświecającego poczynaniom, mogącym stanowić o ' +
       'rezultacie zgodnie z tradycją ojców naszych i dziadów, a dla ' +
       'przeciwdziałania niekulturalnym przejawom życia duchowego, dziś, gdy ' +
       'panoszy się dookoła tandeta moralna i umysłowa, będąca istną plagą ' +
       'nowoczesnych społeczeństw, ale już jarzą się świeczniki nowego ' +
       'kandelabru uniesionego ręką drżącą nieco ze wzruszenia pierwotnych ' +
       'momentów związanej nagłości uśmiechów przerażonej koncepcji, która ' +
       'wykręca się przed każdym silnym i męskim ujęciem samego rdzenia ' +
       'korpusu głównego i głównej cechy rzucającej się w oczy już przy ' +
       'pierwszym uroczym, uroczym spotkaniu, owianym, jak zwykle, wonią ' +
       'czarodziejskich uśmiechów, niestety zaznaczyć to musimy, wbrew ' +
       'wszelkim panoszącym się u nas erotomaniom i namiętnemu penetrowaniu ' +
       'po kościach już dawno przodków naszych wrogów i przyjaciół, przy ' +
       'dzikiej po prostu chęci narzucenia przemijającego swego zdania ' +
       'trwałym i niezmiennym, jak posąg wyżej już wymienionej swobody, ' +
       'pogląd mas, a nie pojedynczych ludzi, którzy z natury nazwy swej ' +
       'łudzą się co do dobrej woli sfer miarodajnych, węszących w tej ' +
       'aferze jeszcze jeden pretekst do rozpuszczenia sfery płatnych ' +
       'ajentów, utrzymywanych na żołdzie niedostatecznie wysokim, aby ' +
       'zapewnić głębokie oddanie się miłości osobistej w oczach ludzkich, ' +
       'co tak pięknie określił Szmund w swoim dziele trzydziestotomowym, ' +
       'opartym na jego prywatnym stosunku i obserwacji, nabytej przy ' +
       'załatwianiu spraw pobocznych wyżej wspomnianych ajentów, którzy ' +
       'dziś tak gorzko odpłacają się za macierzyński stosunek, który nie ' +
       'ma w sobie przecież nic z trudów i zawodów stosunków seksualnych';

pattern = pattern.toLowerCase().replace(/,/g, '').split(/ +/);


class Keyboard {

    constructor() {
        this.$keyboard = document.getElementById('keyboard');
        this.$result = document.getElementById('result');
        this.$checkButton = document.getElementById('check');

        this.backspaceCounter = 0;
        this.$keyboard.value = '';

        this.bind();
    }

    bind() {
        this.$keyboard.addEventListener('keydown', (ev) => {
            console.log(ev);
            switch (ev.key) {
                case 'Backspace':
                    this.backspaceCounter++;
                    return;
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowUp':
                case 'Enter':
                    ev.preventDefault();
                    return;
                default:
                    return;
            }
        });
        this.$keyboard.addEventListener('select', (ev) => {
            let val = this.$keyboard.value;
            this.$keyboard.value = '';
            this.$keyboard.value = val;
        });
        this.$checkButton.addEventListener('click', (ev) => {
            let text = this.$keyboard.value;
            this.checkText(text);
        });
    }

    checkText(text) {
        let correctWordCounter = 0;
        let i = 0;
        let newText = '';
        for (let w of text.split(/ +/)) {
            if (w.toLowerCase() === pattern[i]) {
                correctWordCounter++;
                newText += `<span style="background-color: yellow;">${w}</span> `;
            } else {
                newText += `${w} `;
            }
            i++;
        }
        this.$keyboard.style.display = 'none';
        this.$result.innerHTML = newText;
        this.$result.style.display = 'block';
        this.$checkButton.style.display = 'none';

        let p = document.createElement('div');
        p.innerHTML = `Wynik: ${correctWordCounter * 5 - this.backspaceCounter * 2} (dobre słowa: ${correctWordCounter}, użycia klawisza backspace: ${this.backspaceCounter})`;
        document.getElementById('quiz').appendChild(p);
    }
 }

new Keyboard();
