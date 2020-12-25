import moment from 'moment'

const spanishMonths = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

/**
 * Return a max values per year.
 * @param {number} year - The year of the period
 * @param {object} object - The values per indicators.
 * @return {{months: String[], values: Number[]}}
 */
export default function getMaxValuesPerYear(year, object) {
  const months = []
  const valuePerMonths = []
  let index = 0
  for (const property in object) {
    if (year !== getYear(property)) {
      continue
    }
    if (!months.length && !valuePerMonths.length) {
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
    months: months.map((month, index) => spanishMonths[index]),
    values: valuePerMonths
  }
}

/**
 * Return the month by unix.
 * @param {number} unix - The date in unix format
 */
function getMonth(unix) {
  return Number(moment.unix(unix).format('M'))
}

/**
 * Return the year by unix.
 * @param {number} unix - The date in unix format
 */
function getYear(unix) {
  return Number(moment.unix(unix).format('yyyy'))
}
