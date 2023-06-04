import axios from 'axios';
import { calculateLanguagesPercents } from '../utils/utils.js';
const token = process.env.GITHUB_TOKEN;
export default async (user, date) => {
    // Get the data from the Github API
    const data = (await axios.get(`https://api.github.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } })).data;
    const stars = (await axios.get(`https://api.github.com/users/${user}/starred`, { headers: { Authorization: `Bearer ${token}` } })).data;
    const allRepos = (await axios.get(`https://api.github.com/users/${user}/repos`, { headers: { Authorization: `Bearer ${token}` } })).data;
    const pulls = (await axios.get(`https://api.github.com/search/issues?q=author:${user}%20type:pr%20is:merged`, { headers: { Authorization: `Bearer ${token}` } })).data;
    console.log(data.created_at);
    const languagesPercents = calculateLanguagesPercents(allRepos);
    const info = {
        repos: data.public_repos,
        stars: stars.length,
        prs: pulls["total_count"],
        followers: data.followers,
        codingSince: data.created_at,
        languagesPercents,
        date: date || data.created_at,
    };
    return info;
};
//# sourceMappingURL=fetchData.js.map