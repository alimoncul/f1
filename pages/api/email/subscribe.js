import axios from 'axios';

export default async (req, res) => {
	if (!req.body.email) {
		return res.status(400).json({
			success: false,
			message: "No email defined."
		});
	}
	
	const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	
	let email = req.body.email;
	
	// TODO: Validate the email...
	
	const token = `${process.env.NEXT_PUBLIC_LISTMONK_USERNAME}:${process.env.NEXT_PUBLIC_LISTMONK_PASSWORD}`;
	const encodedToken = Buffer.from(token).toString('base64');
	
	let listID = parseInt(process.env.NEXT_PUBLIC_LISTMONK_LIST_ID);
	
	let data = {
		name: 'a',
		email: email,
		status: 'enabled',
		lists: [listID]
	};
	
	console.log(data);
	
	return axios.post(`${process.env.NEXT_PUBLIC_LISTMONK_URL}/api/subscribers`, data, {
		headers: {
			'Content-Type':'application/json',
			Authorization: 'Basic ' + encodedToken,
		}
	})
	.then(async (response) => {
		console.log('Success: ' + response);
		return res.json({success:true});
	})
	.catch(async function (error) {
		console.log('Error: ' + JSON.stringify(error));
		return res.status(400).json({success:false});
	});
	
}