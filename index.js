'use strict'

const weeks = ['日', '月', '火', '水', '木', '金', '土'];

const date = new Date();
var year = date.getFullYear(); //現在の年
var month = date.getMonth() + 1;//現在の月
var config = 3;

function showCalendar(year, month) {
    for (var i = 0; i < config; i++) {
        const calendarHtml = createCalendar(year, month);
        const sec = document.createElement('section');
        sec.innerHTML = calendarHtml;
        document.querySelector('#calendar').appendChild(sec);

        month++;
        if (month > 12) {
            year++;
            month = 1;
        }
    }
}


function createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1);//月の最初の日付
    const endDate = new Date(year, month, 0);//月の最後の日付

    //new Date(年　、　月　、数字)
    //数字を０にすれば最後のその月の最後の日付、１なら最初の日付

    const endDayCount = endDate.getDate()//月の末日
    const startDay = startDate.getDay();//月の最初の曜日を取得 数字で表示 0:日,1:月、２：火

    let dayCount = 1;//日にちのカウント
    let calendarHtml = '';//htmlを組み立てする変数

    const lastMonthEndDate = new Date(year, month - 1, 0);//先月の最後の日付
    const lastMonthEndDateCount = lastMonthEndDate.getDate()//先月の末日

    calendarHtml += '<h1>' + year + '/' + month + '</h1>';
    calendarHtml += '<table>';

    //曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>';
    }

    for (let w = 0; w < 5; w++) {//１ヶ月4週分回す
        calendarHtml += '<tr>';
        for (let d = 0; d < 7; d++) { //1週間分を回す
            if (w == 0 && d < startDay) {
                //1行目で1日の曜日の前 1日の曜日になるまでは空欄
                let num = lastMonthEndDateCount - startDay + d + 1;
                calendarHtml += '<td class="is-disabled">' + num + '</td>';
            } else if (dayCount > endDayCount) {
                //末日の日数を超えた場合
                let num = dayCount - endDayCount;
                calendarHtml += '<td class="is-disabled">' + num + '</td>';
                dayCount++
            } else {
                calendarHtml += '<td>' + dayCount + '</td>';
                dayCount++;
            }
        }
        calendarHtml += '</tr>';
    }

    calendarHtml += '</table>';
    return calendarHtml;
}



function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = '';
    if (e.target.id === 'prev') {

        if (month < 1) {
            year--;
            month = 12;
        }
        month--;
    }

    if (e.target.id === 'next') {

        if (month > 12) {
            year++;
            month = 1;
        }
        month++;
    }
    showCalendar(year, month);
}

document.querySelector('#prev').addEventListener('click', moveCalendar);
document.querySelector('#next').addEventListener('click', moveCalendar);

showCalendar(year, month);