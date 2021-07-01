import moment from "moment"

export const formatDate = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM Do YYYY")
}

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatPrice = (amount) => {
  const dollars = amount * 0.01
  return `$${formatter.format(dollars)}`
}

export const formatDateLabel = (date) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2);
    var mm = String(today.getMonth() + 1).padStart(2); //January is 0!
    dd = Number(dd)
    mm = Number(mm)
    mm = mm -1
    var yyyy = today.getFullYear();

    date = new Date(date.replace(' ', 'T'));
    var a = date
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var currentMonth = months[mm]
    date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var hours = ((hour + 11) % 12) + 1;
    var amPm = hour > 11 ? 'pm' : 'am';
    var time = date + ' ' + month + ' ' + year + ' ' + hours + ':' + min + amPm;
    if(min<10){min = "0" + min} //adding 00-09
    
    if(year === yyyy && dd === date && currentMonth === month) { time = "Today at " + hours + ':' + min + amPm;}
    if(year === yyyy && dd-1 === date && currentMonth === month) { time = "Yesterday at " + hours + ':' + min + amPm;}
    
    return time;

}

export const formatDateLabelNoTime = (date) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2);
  var mm = String(today.getMonth() + 1).padStart(2); //January is 0!
  dd = Number(dd)
  mm = Number(mm)
  mm = mm -1
  var yyyy = today.getFullYear();

  date = new Date(date.replace(' ', 'T'));
  var a = date
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var currentMonth = months[mm]
  date = a.getDate();
  var min = a.getMinutes();
  var time = month + ' ' + date + ', ' + year ;
  if(min<10){min = "0" + min} //adding 00-09
  
  if(year === yyyy && dd === date && currentMonth === month) { time = "Today"}
  if(year === yyyy && dd-1 === date && currentMonth === month) { time = "Yesterday"}
  
  return time;

}

export const formatDateLabelOnlyTime = (date) => {
  date = new Date(date.replace(' ', 'T'));
  var a = date
 
  date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var hours = ((hour + 11) % 12) + 1;
  var amPm = hour > 11 ? 'pm' : 'am';
  if(min<10){min = "0" + min} //adding 00-09
  var time = hours + ':' + min + amPm;
  
  
  return time;

}

const round = (number, decimalPlaces) => {
  const factorOfTen = Math.pow(10, decimalPlaces)
  return Math.round(number * factorOfTen) / factorOfTen
}

export const getTimeFromDates = (start, end) => {
  let date1 = new Date(start.replace(' ', 'T'));
  let date2 = new Date(end.replace(' ', 'T'));
  let hours = Math.abs(date1 - date2) / 36e5;
  hours= round(hours,2)

  return (hours);

}