
function checkErrorType(err, res) {
    switch (err.type) {
        case 'BadRequestException':
            return res.status(400).json({
                error: err.msg
            });
        case 'UnauthorizedException':
            return res.status(401).json({
                error: err.msg
            });
        case 'ForbiddenException':
            return res.status(403).json({
                error: err.msg
            });
        case 'NotFoundException':
            return res.status(404).json({
                error: err.msg
            });
        default:
            return res.status(500).json({
                error: err.msg || err.stack
            });
    };
}

module.exports = {
    checkErrorType
}
