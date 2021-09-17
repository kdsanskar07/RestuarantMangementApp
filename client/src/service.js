const fetchRequest = async (requesturl, requestBody, sendToken, isPost) => {
  const authToken = localStorage.getItem('token');
  if (sendToken & authToken == null) {
    throw Error("Try login again");
  }
  const response = await fetch("http://localhost:5000/" + requesturl, {
    method: isPost ? 'POST' : 'GET',
    body: isPost ? JSON.stringify(requestBody) : null,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sendToken ? authToken : ''
    }
  });
  return response.json();
}

module.exports.fetchRequest = fetchRequest;