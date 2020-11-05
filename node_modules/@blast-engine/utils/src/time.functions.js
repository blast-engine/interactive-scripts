
export function howLongAgo(previous, current = Date.now()) {

  var msPerSecond = 1000;
  var msPerMinute = 60 * msPerSecond;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerSecond * 10) {
    return 'just now'
  }

  if (elapsed < msPerMinute) {
    let seconds = Math.round(elapsed / msPerSecond);
    return seconds + ' second' + ( seconds > 1 ? 's' : '') + ' ago';
  }

  else if (elapsed < msPerHour) {
    let minutes = Math.round(elapsed / msPerMinute);
    return minutes + ' minute' + ( minutes > 1 ? 's' : '') + ' ago';
  }

  else if (elapsed < msPerDay) {
    let hours = Math.round(elapsed / msPerHour);
    return hours + ' hour' + ( hours > 1 ? 's' : '') + ' ago';
  }

  else if (elapsed < msPerMonth) {
    let days = Math.round(elapsed / msPerDay);
    return days + ' day' + ( days > 1 ? 's' : '') + ' ago';
  }

  else if (elapsed < msPerYear) {
    let months = Math.round(elapsed / msPerMonth);
    return months + ' month' + ( months > 1 ? 's' : '') + ' ago';
  }

  else {
    let years = Math.round(elapsed / msPerYear);
    return years + ' year' + ( years > 1 ? 's' : '') + ' ago';
  }
}

export function howLongFromNow(then, now) {

  var msPerSecond = 1000;
  var msPerMinute = 60 * msPerSecond;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  
  var remaining = then - now;

  let eventDate = new Date(then)

  if (remaining < msPerSecond * 10) {
    return 'In a moment'
  }

  if (remaining < msPerMinute) {
    let seconds = Math.floor(remaining / msPerSecond);
    return `In ${seconds} seconds`    
  }

  else if (remaining < msPerHour) {
    let minutes = Math.floor(remaining / msPerMinute);
    let seconds = Math.floor(remaining / msPerSecond) % 60;

    return `In ${minutes} minutes and ${seconds} seconds`
  }

  else if (remaining < msPerDay) {
    let hours = Math.floor(remaining / msPerHour)
    return `In ${hours} hours at ${eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
  }

  else if (remaining < msPerMonth) {
    let days = Math.floor(remaining / msPerDay)

    if(days > 7){
      return `In ${days} days:
      ${eventDate.toLocaleDateString('en-US',{weekday: 'short', month: 'short', day: 'numeric'})} 
      at ${eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }else if(days > 1){
      return `On ${eventDate.toLocaleDateString('en-US', {weekday: 'long'})},
      ${eventDate.toLocaleDateString('en-US',{month: 'short', day: 'numeric'})} 
      at ${eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }else{
      return `Tomorrow at ${eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }
  }

  else if (remaining < msPerYear) {
    let months = Math.floor(remaining / msPerMonth);
    if(months > 1){
      return `In ${months} months: 
        ${eventDate.toLocaleDateString('en-US',{month: 'short', day: 'numeric'})} 
        at ${eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }else{
      return `Next month: 
      ${eventDate.toLocaleDateString('en-US',{weekday: 'short', month: 'short', day: 'numeric'})} 
      at ${eventDate.toLocaleTimeString({hour: 'numeric', minute: 'numeric'})}`
    }
  }

  else {
    let years = Math.floor(remaining / msPerYear);
    return `In ${years} years: 
     ${eventDate.toLocaleDateString('en-US',{year: 'numeric', month: 'short', day: 'numeric'})}`
  }
}

export const isToday = (date, today) => {
  return today.getFullYear() === date.getFullYear()
  && today.getMonth() === date.getMonth()
  && today.getDate() === date.getDate()
}

export const isThisYear = (date, today) => {
  return today.getFullYear() === date.getFullYear()
}