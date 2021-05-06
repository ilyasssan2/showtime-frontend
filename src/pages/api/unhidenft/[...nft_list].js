import Iron from '@hapi/iron'
import CookieService from '@/lib/cookie'
import handler from '@/lib/api-handler'
import backend from '@/lib/backend'

export default handler().post(async ({ cookies, query: { nft_list }, body: { showDuplicates } }, res) => {
	const [nft_id, list_id] = nft_list

	const user = await Iron.unseal(CookieService.getAuthToken(cookies), process.env.ENCRYPTION_SECRET_V2, Iron.defaults)

	await backend.post(
		`/v1/unhide_nft/${nft_id}/${list_id}`,
		{ showDuplicates },
		{
			headers: {
				'X-Authenticated-User': user.publicAddress,
				'X-API-Key': process.env.SHOWTIME_FRONTEND_API_KEY_V2,
			},
		}
	)

	res.status(200).end()
})