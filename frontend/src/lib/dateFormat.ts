export const dateFormat = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const monthString = month < 10 ? `0${month}` : month
  const day = date.getDate()
  const dayString = day < 10 ? `0${day}` : day

  return `${year}-${monthString}-${dayString}`
}

export const dateTimeFormat = (date: Date) => {
  const dateString = dateFormat(date)
  const hour = date.getHours()
  const hourString = hour < 10 ? `0${hour}` : hour
  const minute = date.getMinutes()
  const minuteString = minute < 10 ? `0${minute}` : minute
  return `${dateString} - ${hourString}:${minuteString}`
}
