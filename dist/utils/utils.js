import dayjs from 'dayjs';
export const calculateLanguagesPercents = (allRepos) => {
    const languagesUsed = {};
    allRepos.map((repo) => {
        const repoLang = repo.language;
        repoLang !== null ? (languagesUsed[repoLang] ? languagesUsed[repoLang]++ : (languagesUsed[repoLang] = 1))
            : (languagesUsed['Others'] ? languagesUsed['Others']++ : (languagesUsed['Others'] = 1));
    });
    let sum = 0;
    for (let i in languagesUsed) {
        sum += languagesUsed[i];
    }
    const languagesPercent = {};
    for (let i in languagesUsed) {
        languagesPercent[i] = Math.round(((languagesUsed[i] / sum) * 10000)) / 100;
    }
    return languagesPercent;
};
export const renderLanguages = (languages) => {
    let languagesArray = [];
    for (let i in languages) {
        let percentSquares = Math.ceil(languages[i] / 5);
        let squares = '';
        for (let j = 0; j < 20; j++) {
            const whiteSquare = '▮';
            const blackSquare = '▯';
            percentSquares > Number(j) ? squares += `<tspan class="colored-text">${whiteSquare}</tspan>` : squares += `<tspan>${blackSquare}</tspan>`;
        }
        languagesArray.push(`<tspan x="4" dy="4">${i.length > 9 ? i : i + '\xa0'.repeat(10 - i.length)}: ${squares} ${languages[i]}%</tspan>`);
    }
    languagesArray.sort((a, b) => {
        const A = a.match(/\d+(\.\d+)?%/);
        const B = b.match(/\d+(\.\d+)?%/);
        return (Number(A[0].replace('%', '')) > Number(B[0].replace('%', '')) ? -1 : 1);
    });
    return languagesArray.reduce((acc, curr) => acc + curr, '');
};
export const codingFor = (date) => {
    const codingSince = dayjs(date);
    const now = dayjs();
    const years = now.diff(codingSince, 'year');
    const months = now.diff(codingSince, 'month') - years * 12;
    const days = now.diff(codingSince, 'day') - months * 30 - years * 365;
    return `${years} years, ${months} months, ${days} days`;
};
//# sourceMappingURL=utils.js.map