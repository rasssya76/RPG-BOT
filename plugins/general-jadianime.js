import axios from 'axios'
import clph from 'caliph-api'
import fetch from "node-fetch"

import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
	let media = await q.download()
	if (isTele && media.length < 5242880) {
		let data = await uploadImage(media)
		let reos = `https://api.caliph.biz.id/api/animeai?img=${data}&apikey=caliphkey`
		conn.sendFile(m.chat, reos, 'bot.jpg', `kawai :v`, m, false)
	} else if (/image|video|audio|sticker|document/.test(mime)) {
		let data = await clph.tools.uploadFile(media),
			shorten = await shortUrl(data.result.url)
		let res = `https://api.caliph.biz.id/api/animeai?img=${shorten}&apikey=caliphkey`
		conn.sendFile(m.chat, res, 'bot.jpg', `kawai :v`, m, false)
	} else throw 'No media found'
}
handler.help = ['jadianime']
handler.tags = ['general']
handler.command = /^(toanime|jadianime)$/i

export default handler

async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}