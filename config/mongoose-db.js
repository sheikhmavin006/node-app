const mongoose = require('mongoose');

module.exports.connect = function () {
    return new Promise(async (resolve, reject) => {
        try {
            //create cluster in mongodb atlas https//cloud.mongodb.com
            mongoose.connection.on("connected", function (ref) {
                resolve(mongoose.connection)
            });


            // If the connection throws an error
            mongoose.connection.on("error", function (err) {
                reject(err)
            });

            process.on('SIGINT', function () {
                mongoose.connection.close(function () {
                    console.log("Mongoose default connection is disconnected due to application termination");
                    process.exit(0);
                });
            });

            // When the connection is disconnected
            // mongoose.connection.on('disconnected', function () {
            //     console.log('Mongoose default connection to DB  disconnected');
            // });

            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                family: 4

            })
        }
        catch (err) {
            reject(err)
        }

    })


}