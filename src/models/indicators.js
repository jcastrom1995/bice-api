import axios from 'axios'
import config from '../config/config'
import getMaxValuesPerYear from '../lib/max-values-year'

export const getIndicators = (indicator, year) => {
  return axios.get(`${config.urlApi}/values/${indicator}`)
    .then(({ data }) => {
      const information = getMaxValuesPerYear(year, data.values)
      return {
        name: data.name,
        unit: data.unit,
        information
      }
    })
    .catch(err => console.error(err))
}