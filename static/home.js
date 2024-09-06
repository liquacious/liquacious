
//on hover
document.getElementById('projects-link-bounce').onmouseover = event => bounce()
document.getElementById('projects-link-dis').onmouseover = event => dis()

//detect press p
ppress = false
lpress = false
document.addEventListener('keydown', event => {
    if (event.key === 'p') {
        document.getElementById('projects-link-bounce').onmouseover = undefined
        document.getElementById('projects-link-bounce').href = '/projects'
        document.getElementById('projects-link-runaway').href = '/projects'
        document.getElementById('projects-link-runaway').onmouseover = undefined
        document.getElementById('projects-link-dis').href = '/projects'
        ppress = true
    }
    if (ppress) {
        if (event.key === 'l') {
            window.location.href = '/projects'
            lpress = true
        }
    }
})


async function dis() {
    document.getElementById('projects-link-dis').style.display = 'none'
}

async function bounce () {
    //go in a random direction
    document.getElementById('projects-link-runaway').style.display = 'inline-block'
    window.setTimeout(() => {
        document.getElementById('projects-link-runaway').onmouseover = event => runaway(document.getElementById('projects-link-runaway').getBoundingClientRect())
    }, 1000)
    document.getElementById('projects-link-bounce').onmouseover = undefined
    let direction = random(0, 360)
    //direction is up
    //let direction = Math.PI * 1.5
    //move
    var bouncer = document.getElementById('projects-link-bounce')
    bouncer.style.position = 'absolute'
    var bouncerx = 0
    var bouncery = 0
    var rect = bouncer.getBoundingClientRect();
    var speed = 0.1
    var acc = 1
    var friction = 0.8
    var lostspeed = 0.5
    var collision = false
    var gravity = 1
    while (true) {
        speed += acc
        speed *= friction
        bouncerx +=  Math.round(Math.cos(direction) * speed)
        bouncery += Math.round(Math.sin(direction) * speed)
        if (collision) {
            speed *= lostspeed
            collision = false
        }
        if (bouncerx + rect.left > window.innerWidth - rect.width) {
            collision = true
            direction = Math.PI - direction
        }
        else if (bouncery + rect.top > window.innerHeight - rect.height) {
            collision = true
            direction = Math.PI * 2 - direction
        }
        else if (bouncerx + rect.left < 0) {
            collision = true
            direction = Math.PI - direction
        }
        else if (bouncery + rect.top < 74) {
            collision = true
            direction = Math.PI * 2 - direction
        }
        bouncer.style.transform = `translate(${bouncerx}px, ${bouncery}px)`;
        await sleep(1)
    }
}

const random = (min, max) => Math.round(Math.random() * (max - min) + min)

async function runaway (runrect) {
    document.getElementById('projects-link-invis').style.display = 'inline-block'
    document.getElementById('projects-link-invis').style.opacity = '0'
    window.setTimeout(() => {
        document.getElementById('projects-link-invis').href = '/projects'
        document.getElementById('projects-link-invis').style.opacity = ''
    }, 2000)
    runlink = document.getElementById('projects-link-runaway')
    runlink.style.position = 'absolute'
    runx = random(-runrect.left, window.innerWidth - runrect.left - runrect.width)
    runy = random(-runrect.top + 74, window.innerHeight - runrect.top - runrect.height - 74)
    runlink.style.transform = `translate(${runx}px, ${runy}px)`
    document.getElementById('projects-link-runaway').onmouseover = event => runaway(runrect)
}