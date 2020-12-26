import * as indicatorModel from '../models/indicators'

export const indicator = (req, res, next) => {
  indicatorModel
    .getIndicators(req.params.key, Number(req.query.year))
    .then((data) => {
      res.json({
        status: 200,
        data
      })
    })
    .catch((err) => next(err))
}
