module.exports = (roles) => { // Wrap a function inside another to pass role as a parameter
    return (request, response, next) => {
        if (request.user) {
            const roleMatches = roles.find(role => role === request.user.role)

            if (roleMatches) {
                next()
            } else {
                return response.status(403).json({
                    message: 'Forbidden access'
                })
            }
        } else {
            return response.status(401).json({
                message: 'Invalid credentials'
            })
        }
    }
}