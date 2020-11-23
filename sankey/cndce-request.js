function request(url, {
	method = 'GET',
	body = {},
	headers = {}
}={}){


	const buildQuery = (json) => {
		return Object.keys(json)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
			.join('&')
	}


	return new Promise(async (resolve, reject)=>{
		// Instantiate
		let xhttp = new XMLHttpRequest();

		
		// Define handlers
		xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		    resolve(xhttp);
		  }
		};

		xhttp.onerror = function(err){
			reject(err);
		}


		// Open connection
		xhttp.open(method, url + (method == 'GET' ? '?' + buildQuery(body) : '' ), true);


		// Add headers
		Object.keys(headers)
			.map(headerKey => {
				xhttp.setRequestHeader(headerKey, headers[headerKey]);
			})


		// Send 
		xhttp.send(method == 'POST' && buildQuery(body));
	})

}

function requestJSON(url, {
	method = 'GET',
	body = {},
	headers = {}
}={}){
	return request(url, {method, body, headers})
		.then((response)=>{
			return JSON.parse(response.responseText)
		})
}












