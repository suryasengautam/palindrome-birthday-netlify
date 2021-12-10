
function ispalindrome(str) {
    var reverse = reverseStr(str);
    return reverse === str;
}

function reverseStr(str) {
    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr ;
    // return str.split("").reverse().join("")


}

function convertDateToStr(date) {
    var dateStr = {
        day:"",
        month:"",
        year:""
    }
    if (date.day <10){
        dateStr.day = "0" + date.day;


    }
    else{
        dateStr.day =  date.day.toString();

    }
    if (date.month <10){
        dateStr.month = "0" + date.month;


    }
    else{
        dateStr.month =  date.month.toString();

    }
    if (date.year <10){
        dateStr.year = "0" + date.year;


    }
    else{
        dateStr.year=  date.year.toString();

    }
    // console.log(dateStr)
    return dateStr
}


function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1){
        ctr ++;
        var isPalindrome = checkPlindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;

        }
        nextDate = getNextDate(nextDate)
    }
    return [ctr,nextDate]
}
function getAllDateFormates(date){
    dateStr = convertDateToStr(date)
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month+ dateStr.day + dateStr.year;
    var yyyyddmm = dateStr.year+ dateStr.day + dateStr.month;

    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var ddyymm = dateStr.day + dateStr.year.slice(-2) + dateStr.month;
    var mmddyy  = dateStr.day + dateStr.year.slice(-2) + dateStr.month;
    return [ddmmyyyy,mmddyyyy,yyyyddmm,ddmmyy,ddyymm,mmddyy]
}


function checkPlindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormates(date);
    var flag = false;
    for (var i = 0;i < listOfPalindromes.length;i++){
        if (ispalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}


function isLeapYear(year){
    if (year%400===0){
        return true;
    }
    if (year%100===0){
        return false;
    }
    if (year%4===0){
        return true;
    }
    return false;
     
}


////////////////////////////////
//nextday program

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (month === 2){
        if (isLeapYear(year)){
            if ( day >29){
                day = 1;
                month++
            }

        }
        else{
            if (day >28){
                day =1;
                month++
            }

        }
    }
    else{
        if (day > daysInMonth[month-1]){
            day = 1;
            month++
        }
    }
    if(month>12){
        month = 1;
        year ++
    }
    return {
        day : day,
        month:month,
        year: year
    }

}
var date = {
    day :9,
    month:1,
    year:2022
};
console.log(getNextPalindromeDate(date));





function clickHandler(e){
    var bdayStr = dateInputRef.value;

    if (bdayStr !== ""){
        var listOfDtae = bdayStr.split("-");
        var date = {
            day :Number(listOfDtae[2]),
            month :Number(listOfDtae[1]),
            year : Number(listOfDtae[0])
        }
        var isPalindrome = checkPlindromeForAllDateFormats(date);
        if (isPalindrome ){;
            resultRef.innerText = "yay! your biirtgdzy is palindrome."
        }
        else{
            var [ctr,nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `the next palindrome date is ${nextDate.day} -${nextDate.month}-${nextDate.year}  . you have missed it by ${ctr} `


        }
    }
}
var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result")

showBtnRef.addEventListener("click",clickHandler);