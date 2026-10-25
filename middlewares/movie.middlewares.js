
const validateMovieCreateRequest = (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            message: "Movie name is required"
        });
    }

    if (!req.body.description) {
        return res.status(400).json({
            success: false,
            message: "Movie description is required"
        });
    }

    if (!req.body.director) {
        return res.status(400).json({
            success: false,
            message: "Movie director is required"
        });
    }

    if (!req.body.trailerUrl) {
        return res.status(400).json({
            success: false,
            message: "Trailer URL is required"
        });
    }

    if (!req.body.releaseDate) {
        return res.status(400).json({
            success: false,
            message: "Release date is required"
        });
    }

    next();
};

module.exports = {
    validateMovieCreateRequest
};


