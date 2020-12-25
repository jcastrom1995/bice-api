import moment from 'moment'

export default function getMaxValuesPerYear(year, object) {
  const months = []
  const valuePerMonths = []
  let index = 0
  for (const property in object) {
    if (year !== getYear(property)) {
      continue
    }
    if (!months.length  && !valuePerMonths.length) {
      months.push(getMonth(property))
      valuePerMonths.push(object[property])
    }
    if (valuePerMonths[index] < object[property]) {
      valuePerMonths[index] = object[property]
    }
    if (months[index] !== getMonth(property)) {
      months.push(getMonth(property))
      valuePerMonths.push(object[property])
      index = index + 1
    }
  }
  return {
    months,
    values: valuePerMonths
  }
}

function getMonth(unix) {
  return Number(moment.unix(unix).format('M'))
}

function getYear(unix) {
  return Number(moment.unix(unix).format('yyyy'))
}