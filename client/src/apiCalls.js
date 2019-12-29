// This will upload the file after having read it
export const upload = file => {
  const formData = new FormData();
  formData.append('file', file);
  return fetch('/api/v1/uploadData', {
    // Your POST endpoint
    method: 'POST',
    body: formData // This is your file object
  })
    .then(
      response => response.json() // if the response is a JSON object
    )
    .then(
      success => console.log(success) // Handle the success response object
    )
    .catch(
      error => console.log(error) // Handle the error response object
    );
};
