const baseUrl = 'https://localhost:44322/api/tsops';

function readDescriptor() {
    const tag = document.getElementById('readTagName').value;

    fetch(`${baseUrl}/read/${tag}`)
        .then(res => {
            if (!res.ok) {
                return res.json().then(errData => {
                    // If the error response is JSON, show its Message
                    throw new Error(errData.Message || `HTTP ${res.status} - ${res.statusText}`);
                });
            }
            return res.json();
        })
        .then(data => {
            document.getElementById('readStatusValue').textContent = data.Status;
            document.getElementById('readValueValue').textContent = data.Value;
        })
        .catch (err => {
            document.getElementById('readStatusValue').textContent = 'Error';
            document.getElementById('readValueValue').textContent = err.message;
        });
}

function renamePoint() {
    const oldName = document.getElementById('oldName').value;
    const newName = document.getElementById('newName').value;

    fetch(`${baseUrl}/rename`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldName, newName })
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(errData => {
                    // If the error response is JSON, show its Message
                    throw new Error(errData.Message || `HTTP ${res.status} - ${res.statusText}`);
                });
            }
            return res.json();
        })
        .then(data => {
            document.getElementById('renameStatusValue').textContent = data.Status;
            document.getElementById('renameValueValue').textContent = data.Value;
        })
        .catch (err => {
            document.getElementById('renameStatusValue').textContent = 'Error';
            document.getElementById('renameValueValue').textContent = err.message;
        });
}