export default function calcTimmer() {

    const timmerObject = {
        ...setPowerBall(),
        ...setWorldBetting5(),
        ...setWorldBetting3(),
        ...setZombieDrop(),
        ...setZombieBreak(),
        ...setRsp(),
        nextTick: 1000 - Date.now() % 1000
    };

    return timmerObject;
}

// 5분 게임 + 2
function setPowerBall() {
    const remainTime = 300000 - (Date.now() + 120000) % 300000;

    return {
        powerBall: Math.floor(remainTime / 1000)
    };
}

// 5분 게임
function setWorldBetting5() {
    const remainTime = 300000 - Date.now() % 300000;

    return {
        worldBall5: Math.floor(remainTime / 1000)
    };
}

// 3분 게임
function setWorldBetting3() {
    const remainTime = 180000 - Date.now() % 180000;

    return {
        worldBall3: Math.floor(remainTime / 1000)
    };
}

// 3분 게임
function setZombieDrop() {
    const remainTime = 180000 - Date.now() % 180000;

    return {
        zombieDrop: Math.floor(remainTime / 1000)
    };
}

// 3분 게임 + 1
function setZombieBreak() {
    const remainTime = 180000 - (Date.now() - 60000) % 180000;

    return {
        zombieBreak: Math.floor(remainTime / 1000)
    };
}

// 2분 게임
function setRsp() {
    const remainTime = 120000 - Date.now() % 120000;

    return {
        rps: Math.floor(remainTime / 1000)
    };
}