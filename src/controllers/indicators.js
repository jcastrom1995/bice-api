import * as indicatorModel from '../models/indicators'

export const indicator = (req, res, next) => {
  console.log(req.params)
  indicatorModel.getIndicators(req.params.key)
    .then(data => {
      console.log(data)
    })
    .catch(err => next(err))
}