function relogio() {
    function getSeconds(seconds) {
        const date = new Date(seconds * 1000);
        return date.toLocaleTimeString("pt-BR", {
            hour12: false,
            timeZone: "UTC",
        })
    }

    const relogio = document.querySelector('.relogio');
    let seconds = 0;
    let timer;

    function startTimer() {
        timer = setInterval(function ()  {
            seconds++;
            relogio.innerHTML = getSeconds(seconds);
        }, 1000)
    }

    document.addEventListener('click', function (event) {
        const element = event.target;

        if (element.classList.contains('iniciar')) {
            relogio.classList.remove('pausado');
            clearInterval(timer);
            startTimer();
        }

        if (element.classList.contains('pausar')) {
            clearInterval(timer);
            relogio.classList.add('pausado');
        }

        if (element.classList.contains('reiniciar')) {
            clearInterval(timer);
            relogio.innerHTML = '00:00:00';
            seconds = 0;
            relogio.classList.remove('pausado');
        }
    })
}
relogio();

