import Kitsu from 'kitsu'
import axios from 'axios'
import parseArgs from 'minimist'
import { existsSync } from 'fs'

const LIMIT = 20
const processedData = []
const api = new Kitsu()
const args = parseArgs(process.argv, {
  string: 'subtype',
  boolean: 'onlyNSFW',
  alias: {
    s: 'subtype',
    o: 'onlyNSFW'
  }
})

const getAiring = async (offset, subtype) => await api.get('anime', {
  filter: { status: 'current', subtype },
  fields: { anime: 'canonicalTitle,endDate,episodeLength,episodeCount,nsfw' },
  page: { offset, limit: LIMIT },
  sort: 'createdAt'
})

const getAllPages = async (offset, subtype = 'tv,ona,ova,movie,music,special', onlyNSFW) => {
  const { data, links } = await getAiring(offset, subtype)
  const noEndDatesOnly = data.filter(({ endDate, nsfw }) => {
    if (onlyNSFW && (false === nsfw)) return false
    if (null === endDate) return true
  })

  console.log(`Found ${noEndDatesOnly.length} entries on page ${(offset + LIMIT) / LIMIT}`)

  processedData.push(...noEndDatesOnly)

  if (links && links.next) {
    await getAllPages(offset + LIMIT, subtype, onlyNSFW)
  }
}

const logProcessedData = async => {
  console.log('')
  processedData.forEach(entry => {
    const title = entry.canonicalTitle
    const URL = `https://kitsu.io/anime/${entry.id}`
    const epCount = entry.episodeCount ? 'Y' : 'N'
    const epLength = entry.episodeLength ? 'Y' : 'N'
    const nsfw = entry.nsfw ? '　　　　　　NSFW' : ''
    console.log(`${title}　　${URL}　　${epCount}　　${epLength}${nsfw}`)
  })

  console.log(`\nTotal ${processedData.length} entries\n\nGoogle Sheets -> Data -> Split text to columns -> Custom selector \'　　\'\n`)
}

const run = async args => {
  // Login to Kitsu so the API returns NSFW entries (optional)
  if (existsSync('./env.mjs')) {
    const { USERNAME, PASSWORD } = (await import('./env.mjs')).default

    if (USERNAME && PASSWORD) {
      await axios.post('https://kitsu.io/api/oauth/token', {
        grant_type: 'password',
        username: USERNAME,
        password: PASSWORD
      }).then(({ data }) => {
        api.headers.Authorization = `Bearer ${data.access_token}`
      }).catch(error => {
        throw error
      })
    }
  }

  await getAllPages(0, args.subtype, args.onlyNSFW)
  await logProcessedData()
}

/* --- */

run(args)
