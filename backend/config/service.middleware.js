const UserRepository = require('../repositories/UserRepository');
const BlacklistRepository = require('../repositories/BlacklistRepository');
const ChatRepository = require('../repositories/ChatRepository');
const MatchesRepository = require('../repositories/MatchesRepository');
const ImagesRepository = require('../repositories/ImagesRepository');
const InterestsRepository = require('../repositories/InterestsRepository');
const AuthService = require('../services/auth.service');
const RegistrationService = require('../services/registration.service');
const UserService = require('../services/user.service');
const ImageService = require('../services/image.service');
const BlacklistService = require('../services/blacklist.service');
const MatchingService = require('../services/matching.service');
const ChatService = require('../services/chat.service');
const InterestsService = require('../services/interests.service');

module.exports = function (connection) {
    const userRepository = new UserRepository(connection);
    const blacklistRepository = new BlacklistRepository(connection);
    const chatRepository = new ChatRepository(connection);
    const matchesRepository = new MatchesRepository(connection);
    const imagesRepository = new ImagesRepository(connection);
    const interestsRepository = new InterestsRepository(connection);

    // inject required repositories into services
    const authService = new AuthService({ userRepository });
    const registrationService = new RegistrationService({ userRepository });
    const userService = new UserService({ userRepository, interestsRepository });
    const imageService = new ImageService({ userRepository, imagesRepository });
    const blacklistService = new BlacklistService({ userRepository, blacklistRepository });
    const matchingService = new MatchingService({ userRepository, matchesRepository });
    const chatService = new ChatService({ userRepository, matchesRepository, chatRepository });
    const interestsService = new InterestsService({ interestsRepository });

    return (req, res, next) => {
        // add each service onto request
        req.services = {};
        req.services.authService = authService;
        req.services.registrationService = registrationService;
        req.services.userService = userService;
        req.services.imageService = imageService;
        req.services.blacklistService = blacklistService;
        req.services.matchingService = matchingService;
        req.services.chatService = chatService;
        req.services.interestsService = interestsService;

        next();
    }
};
