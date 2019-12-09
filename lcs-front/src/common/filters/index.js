export function dateReformat (unformatedDate) {
  let reformat = new Date(unformatedDate)

  // Create an array with the current month, day and time
  let date = [reformat.getDate(), reformat.getMonth() + 1, reformat.getFullYear()]

  // Create an array with the current hour, minute and second
  let time = [reformat.getHours(), (reformat.getMinutes() < 10 ? '0' + reformat.getMinutes() : reformat.getMinutes()), (reformat.getSeconds() < 10 ? '0' + reformat.getSeconds() : reformat.getSeconds())]

  return date.join('/') + ' ' + time.join(':')
}
