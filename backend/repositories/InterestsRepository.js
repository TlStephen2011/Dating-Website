class InterestsRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    junctionTableInsert(id, interests) {

        let getInterestsQuery = "SELECT Id from interests WHERE interest IN (";

        interests.forEach(el => {
            getInterestsQuery += "?,";
        })

        getInterestsQuery = getInterestsQuery.slice(0, getInterestsQuery.length - 1);
        getInterestsQuery += ")";

        return new Promise((resolve, reject) => {
            this.connection.query(getInterestsQuery, interests, (err, res) => {
                if (err)
                    reject(err);
                else {

                    // remove duplicate junction entries
                    this.connection.query(`SELECT * FROM user_interest WHERE UserId = ?`, [id], (err, r) => {
                        if (r && r.length !== 0)
                            r.forEach(record => {
                                res = res.filter(i => record.InterestId !== i.Id);
                            });

                        let insertJunctionTableQuery = 'INSERT INTO user_interest(UserId, InterestId) VALUES ';
                        res.forEach(el => {
                            insertJunctionTableQuery += `(${id}, ${el.Id}),`;
                        })
                        insertJunctionTableQuery = insertJunctionTableQuery.slice(0, insertJunctionTableQuery.length - 1);
                        this.connection.query(insertJunctionTableQuery, (err, results) => {
                            if (err)
                                reject(err);
                            else
                                resolve(results);
                        })
                    })

                }
            })
        })
    }

    save(id, interests) {

        const getInterestsQuery = 'SELECT * FROM interests';
        let uniqueInterests = [...interests];

        return new Promise((resolve, reject) => {
            this.connection.query(getInterestsQuery, async (err, results) => {
                // build unique interests                
                results.forEach(row => {
                    uniqueInterests = uniqueInterests.filter(e => e !== row.Interest);
                });

                if (uniqueInterests.length !== 0) {
                    let insertUniqueInterestsQuery = "INSERT INTO interests(interest) VALUES ";

                    uniqueInterests.forEach(el => {
                        insertUniqueInterestsQuery += "(?),";
                    })

                    insertUniqueInterestsQuery = insertUniqueInterestsQuery.slice(0, insertUniqueInterestsQuery.length - 1);

                    this.connection.query(insertUniqueInterestsQuery, uniqueInterests, async (err, results) => {
                        try {
                            const junctionInsert = await this.junctionTableInsert(id, interests);
                            resolve(junctionInsert);
                        } catch (error) {
                            reject(error);
                        }
                        return;
                    });
                } else {
                    try {
                        const junctionInsert = await this.junctionTableInsert(id, interests);
                        resolve(junctionInsert);
                    } catch (error) {
                        reject(error);
                    }
                    return;
                }
            });
        })
    }

    delete(id, interests) {
        let deleteInterestQuery = `DELETE FROM user_interest WHERE `;

        return new Promise(async (resolve, reject) => {
            try {
                const interestsFromDb = await this.get(null, interests);

                if (interestsFromDb.length !== 0) {
                    const vals = [];
                    interestsFromDb.forEach(interest => {
                        deleteInterestQuery += `(UserId = ${id} AND InterestId = ?) OR`;
                        vals.push(interest.Id);
                    })

                    deleteInterestQuery = deleteInterestQuery.slice(0, deleteInterestQuery.length - 3);

                    this.connection.query(deleteInterestQuery, vals, (err, res) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(res);
                    })
                } else {
                    reject('Interest to be deleted not found');
                }

            } catch (error) {
                reject(error);
            }
        });
    }

    update() {
        // not needed because save and delete essentially function as update
    }

    get(id, interests) {
        return new Promise(async (resolve, reject) => {
            if (interests && !id) {
                let queryByInterests = "SELECT * FROM interests WHERE ";

                interests.forEach(interest => {
                    queryByInterests += "(Interest = ?) OR";
                })

                queryByInterests = queryByInterests.slice(0, queryByInterests.length - 3);

                this.connection.query(queryByInterests, interests, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });

            } else if (id && !interests) {
                const query = `SELECT * FROM user_interest WHERE UserId = ${id}`;

                this.connection.query(query, (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (res.length === 0) {
                        resolve([]);
                    } else {
                        let queryForInterests = "SELECT interest from interests WHERE ";

                        res.forEach(record => {
                            queryForInterests += `(Id = ${record.InterestId}) OR`;
                        })

                        queryForInterests = queryForInterests.slice(0, queryForInterests.length - 3);

                        this.connection.query(queryForInterests, (err, results) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            results = results.map(el => el.interest);

                            resolve(results);
                        })
                    }
                })

            }

        })
    }

}
module.exports = InterestsRepository;