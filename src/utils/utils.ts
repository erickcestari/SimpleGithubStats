import axios from 'axios'
import dayjs from 'dayjs'
import twemoji from 'twemoji'
const token = process.env.GITHUB_TOKEN

export const calculateLanguagesPercents =(allRepos: any[]) => {
  const languagesUsed :any = {}
  
  allRepos.map((repo) => {
    const repoLang = repo.language
    repoLang !== null && (
      languagesUsed[repoLang] ? languagesUsed[repoLang]++ : (languagesUsed[repoLang] = 1)
      );
  })
  let sum = 0
  for(let i in languagesUsed) {
    sum += languagesUsed[i]
  }

  const languagesPercent: any = {}
  for(let i in languagesUsed) {
    languagesPercent[i] = Math.round(((languagesUsed[i] / sum) * 10000)) / 100
  }

  return languagesPercent
}

export const renderLanguages = (languages : any) => {
  let languagesArray = []
  for(let i in languages) {
    let percentSquares = Math.ceil(languages[i] / 10)
    let squares = ''
    for (let j = 0; j < 10; j++) {
      const blackSquare = twemoji.parse('⬛')
      const whiteSquare = twemoji.parse('⬜')
      console.log(blackSquare, whiteSquare)
      percentSquares > Number(j) ? squares += `${whiteSquare}` : squares+=`${blackSquare}`
    }
    languagesArray.push(`<tspan x="4" dy="4">${i.length > 9 ? i : i + '\xa0'.repeat(10 - i.length)}: ${squares} ${languages[i]}%</tspan>`) 
  }

  languagesArray.sort((a, b) => {
    const A = a.match(/\d+(\.\d+)?%/) as any
    const B = b.match(/\d+(\.\d+)?%/) as any
    return (Number(A[0].replace('%', '')) > Number(B[0].replace('%', '')) ? -1 : 1)
  })

  return languagesArray.reduce((acc, curr) => acc + curr, '')
}

export const codingFor = (date : string) => {
  const codingSince = dayjs(date)
  const now = dayjs()
  const years = now.diff(codingSince, 'year')
  const months = now.diff(codingSince, 'month') - years * 12
  const days = now.diff(codingSince, 'day') - months * 30 - years * 365

  return `${years} years, ${months} months, ${days} days`
}