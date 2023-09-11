import { codingFor, renderLanguages } from "../../utils/utils.js";

export const renderCard = (info : any) => {
  const linesCount = Object.keys(info.languagesPercents).length + Object.keys(info).length  + 2
  const verticalOffset = 3;
  const lineHeight = 4;

  const height = linesCount * lineHeight + verticalOffset * 2;

  return `
  <svg viewBox="0 0 200 ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .container{
        fill: #161b22;
      }

      .text {
        font: 2.8px monospace;
        font-family: Consolas, monospace, Arial, sans-serif;
        fill: #fff;
      }

      .colored-text{
        fill: #a5d6ff;
      }
    </style>

    <rect class="container" x="0" width="100%" height="100%" rx="2px" ry="2px" stroke-linejoin="round" />
    
    <text x="4" y="6" class="text">My Github Profile Stats:
  
      <tspan x="4" dy="6">Number of Repositories<tspan class="colored-text">: ${info.repos}</tspan>;</tspan>
      <tspan x="4" dy="4">Number of Prs<tspan class="colored-text">: ${info.prs}</tspan>;</tspan>
      <tspan x="4" dy="4">Number of Stars<tspan class="colored-text">: ${info.stars}</tspan>;</tspan>
      <tspan x="4" dy="4">Number of Followers<tspan class="colored-text">: ${info.followers}</tspan>;</tspan>
      
      <tspan x="4" dy="6" class="colored-text">// Most Used Languages</tspan>
      ${renderLanguages(info.languagesPercents)}
      
      <tspan x="4" dy="8">I'm coding for <tspan class="colored-text">${info.date ? codingFor(info.date) : codingFor(info.codingSince)}</tspan>;</tspan>
    </text>
  </svg>`;
};
