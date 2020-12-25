import * as indicatorModel from '../models/indicators'

export const indicator = (req, res, next) => {
  indicatorModel
    .getIndicators(req.params.key, req.body.year)
    .then((data) => {
      res.json({
        status: 200,
        data
      })
    })
    .catch((err) => next(err))
}
