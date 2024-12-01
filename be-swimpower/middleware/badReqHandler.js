const badReqHandler = (err, req, res, next) => {

    if (err.statusCode === 400) {
        res
            .status(400)
            .send({
                message: err.message,
                errors: err.errorsList.map(e => e.msg)
            })
    } else {
        next(err)
    }
}

module.exports = badReqHandler