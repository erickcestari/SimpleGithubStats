import fetchData from "./fetchData.js";
import { renderCard } from "../scripts/drawCard/card.js";
export default async (req, res) => {
    const { user, date } = req.query;
    let userInfo = undefined;
    user && (userInfo = await fetchData(user, date));
    if (userInfo) {
        res.setHeader("Content-Type", "image/svg+xml");
        res.send(renderCard(userInfo));
    }
    else {
        res.send({ message: 'Put a valid user in the query string' });
    }
};
//# sourceMappingURL=info.js.map