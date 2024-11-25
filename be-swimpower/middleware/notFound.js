const notFound = (req, res, next) => {
    res
        .status(404)
        .send({ message: "Oops! Value not found" });
};

module.exports = notFound;