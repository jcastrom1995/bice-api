import express from 'express'
import * as indicatorsController from '../controllers/indicators'

const router = new express.Router()

router.get('/', indicatorsController.indicators)
router.get('/:key', indicatorsController.indicator)

export default router
