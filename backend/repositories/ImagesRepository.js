class ImagesRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    save(id, imageNumber, path) {
        const query = "INSERT INTO images(User, ImageNumber, ImagePath) VALUES (?, ?, ?)";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id, imageNumber, path], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })

    }

    delete(id, imageNumber) {
        const query = "DELETE FROM images WHERE User = ? AND ImageNumber = ?";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id, imageNumber], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }

    get(id, imageNumber) {

        if (!imageNumber) {
            const query = "SELECT * FROM images WHERE User = ?";

            return new Promise((resolve, reject) => {
                this.connection.query(query, [id], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            })

        } else {
            const query = "SELECT * FROM images WHERE User = ? AND ImageNumber = ?";

            return new Promise((resolve, reject) => {
                this.connection.query(query, [id, imageNumber], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            })
        }


    }
}

module.exports = ImagesRepository;