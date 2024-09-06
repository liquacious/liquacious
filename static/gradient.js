const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function gradient() {
    while (true) {
    for (let i = 0; i < 360; i++) {
        document.getElementById('banner').style.background = `linear-gradient(${i}deg, rgb(0, 0, 0), rgb(255, 255, 255))`
        await sleep(30)
    }
}
}

gradient()