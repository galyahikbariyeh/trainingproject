
/*var API_URL = 'http://127.0.0.1:5050/api/users';
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

getUsers();*/

var dataTable=document.getElementById('dataTable')


// JavaScript for admin support page to display tickets
document.addEventListener('DOMContentLoaded', async function() {
    // Check if user is logged in and is an admin
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        // Redirect to login page if not logged in
        window.location.href = '/html/login.html';
        return;
    }
    
    // Get tickets from the server
    try {
        const response = await fetch('/api/tickets', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            // Unauthorized or forbidden, redirect to login
            alert('يجب تسجيل الدخول كمسؤول للوصول إلى هذه الصفحة');
            window.location.href = '/html/login.html';
            return;
        }
        
        if (!response.ok) {
            throw new Error('Failed to fetch tickets');
        }
        
        const tickets = await response.json();
        
        // Display tickets in the table
        const tbody = document.getElementById('tbody');
        
        if (tickets.length === 0) {
            // No tickets to display
            tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">لا توجد تذاكر دعم حالياً</td></tr>';
        } else {
            // Create table rows for each ticket
            tbody.innerHTML = tickets.map(ticket => `
                <tr>
                    <td>${ticket.email}</td>
                    <td>${ticket.subject}</td>
                    <td>${ticket.problem}</td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ في جلب بيانات التذاكر');
    }
});