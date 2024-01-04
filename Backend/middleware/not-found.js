const notFoundMiddleWare = (req, res) => {
   res.status(404).send("Routes does not exits")
}

export default notFoundMiddleWare
