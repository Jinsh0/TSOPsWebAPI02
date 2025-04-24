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
            document.getElementById('readResult').innerHTML = `
                <p><strong>Status:</strong> ${data.Status}</p>
                <p><strong>Value:</strong> ${data.Value}</p>`;
        })
        .catch (err => {
            document.getElementById('readResult').innerHTML = `
                <p><strong>Status:</strong> Error</p>
                <p><strong>Value:</strong> ${err.message}</p>`;
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
            document.getElementById('renameResult').innerHTML = `
                <p><strong>Status:</strong> ${data.Status}</p>
                <p><strong>Value:</strong> ${data.Value}</p>`;
        })
        .catch (err => {
            document.getElementById('renameResult').innerHTML = `
                <p><strong>Status:</strong> Error</p>
                <p><strong>Value:</strong> ${err.message}</p>`;
            });
}