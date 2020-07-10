class ChatRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    send(user, to, message) {
	    let at = Date.toString();
	    const query = "INSERT INTO chat(chat.User, chat.To, chat.Message, chat.At) VALUES (?, ?, ?, ?)";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [user, to, message, at], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }

    //message deletion is a thing
    deleteMessage(message) {
        const query = "DELETE FROM chat WHERE chat.Id = ?";

	return new Promise((resolve, reject) => {
            this.connection.query(query, [message], (err, results) => {
                if (err) {
                    reject(err);
		} else {
                    resolve(results);
		}
	    })
	})
    }

    //Update should just say that a message was read
    read(message) {
	const query = "UPDATE chat SET chat.Read = 1 WHERE chat.Id = ?"

	return new Promise((resolve, reject) => {
	    this.connection.query(query, [message], (err, results) => {
	        if (err) {
	            reject(err);
	        } else {
		    resolve(results);
	        }
	    })
	})
    }

    //get all messages sent by and to the user
    get(user) {
        const query = "SELECT * FROM chat WHERE chat.User = ? OR chat.To = ?";
	//currently gets all but limit and offset can be used to make it load data dynamically
	return new Promise((resolve, reject) => {
            this.connection.query(query, [user, user], (err, results) => {
                if (err) {
		    reject(err);
		} else {
		    resolve(results);
		}
	    })
	})
    }

    unread(user) {
        const query = "SELECT * FROM chat WHERE chat.To = ? AND chat.Read = 0";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [user], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }

}

module.exports = ChatRepository;
