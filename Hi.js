javascript
const axios = require('axios');
const cheerio = require('cheerio');

const axiosWithCache = axios.create({
  cache: {
    max: 100,
    maxAge: 60 * 60 * 1000,  // 60 minutes
  },
});

async function scrape(url) {
  try {
    const response = await axiosWithCache.get(url);
    const $ = cheerio.load(response.data);
    const videos = [];
    $('#mozaik .video-container').each((i, el) => {
      const title = $(el).find('h2 a').text();
      const thumbnail = $(el).find('img').attr('data-src');
      const videoUrl = $(el).find('a').attr('href');
      videos.push({
        title,
        thumbnail,
        videoUrl,
      });
    });
    return videos;
  } catch (error) {
    console.error('Error scraping website:', error);
    return [];
  }
}

scrape('https://www.xnxx.com/videos/latest/').then(videos => {
  console.log(videos);
});
