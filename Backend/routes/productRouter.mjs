import express from "express"
const router = express.Router()
import {CreateProduct, getProduct} from "../controller/ProductController.mjs"


router.route("/addproduct").post(CreateProduct)
router.route("/getproduct").post(getProduct)

export default router

