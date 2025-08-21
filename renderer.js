const { ipcRenderer } =  require("electron");
const Timer = require("timer.js");

function startWork () {
    let workTimer = new Timer({
        ontick:(ms) => {
            updateTime(ms);
        },
        onend: () => {
            notification()
            workTimer.stop()
        }
    })
    workTimer.start(10);
}

function updateTime(ms) {
    let timerContainer = document.getElementById("timer-container");
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    timerContainer.innerText = `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
}

async function notification() {
    let res = await ipcRenderer.invoke("work-notification");
    if(res === "rest") {
        setTimeout(() => {
            alert("休息");
        }, 5*1000);
    } else if(res === "work") {
        startWork()
    }
}

startWork()