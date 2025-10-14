// middleware 
import { mockusers } from './constants.mjs';

export const resolveindexUserById = (request, response, next) => {
    const {  
                        params: { id},
                        } = request;
                        const parsedId = parseInt(id);
                        if (isNaN(parsedId)) return response.sendStatus(400);

                        const findUserIndex = mockusers.findIndex(
                            (user) => user.id === parsedId
                            );

                            if (findUserIndex === -1) return response.sendStatus(404);

                            request.findUserIndex = findUserIndex;
                            next();
                        };
