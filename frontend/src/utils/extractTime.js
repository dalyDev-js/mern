export function extractTime(dataString){
    const data = new Date(dataString)
    const hours = data.getHours();
    const minutes = data.getMinutes();
    return `${hours}:${minutes}`
}


function padZero(num) {
    return num.toString().padStart(2, '0');
  }