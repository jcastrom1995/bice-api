import axios from 'axios'
import config from '../config'
import getMaxValuesPerYear from '../lib/max-values-year'

/**
 * Get indicator.
 * @param {string} indicator - The indicator i want show.
 * @param {number} year - The year who i want show.
 * @return {{name: String, unit: String, information: {months: String[], values: Number[]}}}
 */
export const getIndicators = (indicator, year) => {
  return axios
    .get(`${config.urlApi}/values/${indicator}`)
    .then(({ data }) => {
      const information = getMaxValuesPerYear(year, data.values)
      return {
        name: data.name,
        unit: data.unit,
        year,
        information
      }
    })
    .catch((err) => console.error(err))
}
