document.addEventListener("DOMContentLoaded", function () {
    const HOURS = [
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "17:00 - 18:00",
        "18:00 - 19:00"
    ];

    const DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const BACKGROUNDS = [
        "#FFAC00",
        "#ABFF9C",
        "#FF632E",
        "#FF3DA9",
        "#AA49FF",
        "#41FFAC",
        "#0028B2",
        "#FFFFFF",
        "#AAB291",
        "#FFD619"
    ];

    let BG_USED = new Array(10);
    for(let i=0; i<BG_USED.length; i++)
        BG_USED[i] = 0;

    const BG_OPACITY = 60;

    let timetable = document.getElementById("timetable");
    let arr = new Array(12);
    for (let i=0; i<arr.length; i++) {
        arr[i] = new Array(8);
    }
    for(let i=0; i<12; i++) {
        let div = document.createElement("div");
        div.classList.add("row");
        for(let j=0; j<8; j++) {
            if(i==0) {
                if(j==0) {
                    div.innerHTML += `<span class="cell highlight">Days &rarr;<br>Time &darr;</span>`;
                } else {
                    div.innerHTML += `<span class="cell highlight">${DAYS[j-1]}</span>`;
                }
            } else if (j==0) {
                div.innerHTML += `<span class="cell highlight">${i}: ${HOURS[i-1]}</span>`;
            } else {
                div.innerHTML += `<span class="cell"></span>`;
            }
        }
        timetable.appendChild(div);
    }

    let cells = document.getElementsByClassName("cell");
    let addBtn = document.getElementById("add-btn");

    addBtn.addEventListener("click", function () {
        document.getElementById("error").style.display = 'none';
        let title = document.getElementById("course-title").value;
        let classroom = document.getElementById("classroom").value;
        let days = $("#days").select2('val');
        let hours = $("#hours").select2('val');

        if(title && days && hours) {
            let random = Math.floor(Math.random() * (BACKGROUNDS.length));
            while(BG_USED[random]) {
                random = Math.floor(Math.random() * (BACKGROUNDS.length));
            }
            BG_USED[random] = 1;

            for(let j=0; j<hours.length; j++) {
                for(let i=0; i<days.length; i++) {
                    let day = Number(days[i]);
                    let hour = Number(hours[j]);
                    
                    cells[hour*8 + day].innerHTML = `${title}<br>${classroom}`;
                    cells[hour*8 + day].style.background = BACKGROUNDS[random] + BG_OPACITY.toString();
                }
            }

            document.getElementById("course-title").value = '';
            document.getElementById("classroom").value = '';
            $("#days").val('').trigger('change');
            $("#hours").val('').trigger('change');
        } else {
            document.getElementById("error").innerHTML = 'One or more fields missing!';
            document.getElementById("error").style.display = 'flex';
        }
    });
});

$(document).ready(function() {
    $('#days').select2();
    $('#hours').select2();
});