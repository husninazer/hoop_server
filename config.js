var config = {}

config.mongoUri = 'mongodb://localhost:27017/hoop'

config.jwtSecret = "LaZyP1lLs"
config.jwtSession = {
    session: false
}


module.exports = config