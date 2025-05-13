
var API_URL = 'http://127.0.0.1:5050/api/users';
var token = sessionStorage.getItem('authToken');

if (!token) {
    window.location.href = 'project.html';
}

async function getUsers() {
    try {
        var response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            },
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message == 'you are not admin') {
                    alert('User not allowed');
                    window.location.href = 'project.html';
                    return;
                } else {
                    alert('User logged in successfully');
                }
                var tbody = document.getElementById('tbody');
                tbody.innerHTML = '';
                data.map(user => {
                    console.log(user);
                    var tr = document.createElement('tr');
                    
                    var td1 = document.createElement('td');
                    td1.innerHTML = user.email;
                    tr.appendChild(td1);

                    var td2 = document.createElement('td');
                    td2.innerHTML = user.subject;
                    tr.appendChild(td2);

                    var td3 = document.createElement('td');
                    td3.innerHTML = user.problem;
                    tr.appendChild(td3);

                    tbody.appendChild(tr);
                });
            });
    } catch (error) {
        console.log(error);
        alert('User not found');
        window.location.href = 'project.html';
    }
}

getUsers();