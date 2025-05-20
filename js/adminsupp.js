
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

/*var dataTable=document.getElementById('dataTable')


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
*/
/*var userAPI_URL = 'http://127.0.0.1:5050/api/users';
var token = sessionStorage.getItem('authToken');
async function getUsers(){
   
    try {
        var response = await fetch(userAPI_URL,{
            headers:{
                'Content-Type':'application/json',
                'Auth': token
            },
            method:'GET',
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.message =='you are not admin'){
                
                alert('User not allowed')

               window.location.href='login.html'
               return
           }
           else{
               alert('User logged in successfully')
           }
            
         
        })
    } 
    catch (error) {
        console.log(error)
        alert('User not found')
        window.location.href='login.html'
    }
  
}

getUsers()

async function getTickets() {
    try {
        const response = await fetch(`${API_URL}/tickets/admin`, {
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            },
            method: 'GET',
        });

        const data = await response.json();

        if (data.message === 'you are not admin') {
            alert('غير مصرح لك بالوصول إلى هذه الصفحة');
            window.location.href = 'project.html';
            return;
        }

        if (data.message === 'No tickets found') {
            alert('لا توجد مشكلات مسجلة حالياً');
            return;
        }

        const tbody = document.getElementById('tickets-body');
        tbody.innerHTML = '';

        data.tickets.forEach(ticket => {
            const tr = document.createElement('tr');
            
            // اسم المستخدم
            const tdUser = document.createElement('td');
            tdUser.innerHTML = ticket.user.name;
            tr.appendChild(tdUser);

            // البريد الإلكتروني
            const tdEmail = document.createElement('td');
            tdEmail.innerHTML = ticket.user.email;
            tr.appendChild(tdEmail);

            // عنوان المشكلة
            const tdSubject = document.createElement('td');
            tdSubject.innerHTML = ticket.subject;
            tr.appendChild(tdSubject);

            // وصف المشكلة
            const tdDescription = document.createElement('td');
            tdDescription.innerHTML = ticket.description;
            tr.appendChild(tdDescription);

            // حالة المشكلة
            const tdStatus = document.createElement('td');
            const statusBadge = document.createElement('span');
            statusBadge.className = `badge ${getStatusClass(ticket.status)}`;
            statusBadge.innerHTML = ticket.status;
            tdStatus.appendChild(statusBadge);
            tr.appendChild(tdStatus);

            // تاريخ الإرسال
            const tdDate = document.createElement('td');
            tdDate.innerHTML = new Date(ticket.createdAt).toLocaleString();
            tr.appendChild(tdDate);

            // أزرار الإجراءات
            const tdActions = document.createElement('td');
            
            // زر تحديث الحالة
            const updateBtn = document.createElement('button');
            updateBtn.className = 'btn btn-primary btn-sm me-2';
            updateBtn.innerHTML = 'تحديث';
            updateBtn.setAttribute('data-bs-toggle', 'modal');
            updateBtn.setAttribute('data-bs-target', '#updateTicketModal');
            updateBtn.onclick = () => prepareUpdateModal(ticket._id);
            tdActions.appendChild(updateBtn);

            // زر حذف
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.innerHTML = 'حذف';
            deleteBtn.onclick = () => deleteTicket(ticket._id);
            tdActions.appendChild(deleteBtn);

            tr.appendChild(tdActions);
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء جلب المشكلات');
        window.location.href = 'project.html';
    }
}

// دالة مساعدة لتحديد كلاس الحالة
function getStatusClass(status) {
    switch(status) {
        case 'open': return 'bg-warning';
        case 'in_progress': return 'bg-info';
        case 'closed': return 'bg-success';
        default: return 'bg-secondary';
    }
}

// دالة لإعداد نموذج التحديث
function prepareUpdateModal(ticketId) {
    document.getElementById('updateTicketId').value = ticketId;
    // يمكنك هنا جلب بيانات التذكرة لملء النموذج
}

// دالة لحذف التذكرة
async function deleteTicket(ticketId) {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه التذكرة؟')) return;
    
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        if (response.ok) {
            alert('تم حذف التذكرة بنجاح');
            getTickets(); // إعادة تحميل القائمة
        } else {
            alert(result.message || 'فشل في حذف التذكرة');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء حذف التذكرة');
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', getTickets);*/

// تعريف المتغيرات
const API_URL = 'http://127.0.0.1:5050/api';
const token = sessionStorage.getItem('authToken');

// التحقق من وجود التوكن قبل الدخول للصفحة
if (!token) {
    window.location.href = 'login.html';
}

// التحقق من صلاحيات المستخدم كمسؤول
async function checkAdminAccess() {
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            },
            method: 'GET',
        });
        
        const data = await response.json();
        
        if (data.message === 'you are not admin') {
            alert('غير مصرح لك بالوصول إلى هذه الصفحة');
            window.location.href = 'project.html';
            return false;
        }
        
        console.log('تم التحقق من صلاحيات المسؤول بنجاح');
        return true;
    } catch (error) {
        console.error('خطأ في التحقق من صلاحيات المستخدم:', error);
        alert('حدث خطأ أثناء التحقق من صلاحيات المستخدم');
        window.location.href = 'login.html';
        return false;
    }
}

// جلب جميع التذاكر (المشاكل)
async function getTickets() {
    try {
        // التحقق أولاً من صلاحيات المسؤول
        const isAdmin = await checkAdminAccess();
        if (!isAdmin) return;
        
        const response = await fetch(`${API_URL}/tickets/admin`, {
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            },
            method: 'GET',
        });

        const data = await response.json();

        if (data.message === 'No tickets found') {
            console.log('لا توجد تذاكر');
            document.getElementById('tickets-body').innerHTML = '<tr><td colspan="7" class="text-center">لا توجد مشكلات مسجلة حالياً</td></tr>';
            return;
        }

        // عرض التذاكر في الجدول
        displayTickets(data.tickets || data);
    } catch (error) {
        console.error('خطأ في جلب التذاكر:', error);
        alert('حدث خطأ أثناء جلب المشكلات');
    }
}

// عرض التذاكر في الجدول
function displayTickets(tickets) {
    const tbody = document.getElementById('tickets-body');
    tbody.innerHTML = '';

    tickets.forEach(ticket => {
        const tr = document.createElement('tr');
        
        // اسم المستخدم
        const tdUser = document.createElement('td');
        tdUser.textContent = ticket.user?.name || 'غير متوفر';
        tr.appendChild(tdUser);

        // البريد الإلكتروني
        const tdEmail = document.createElement('td');
        tdEmail.textContent = ticket.user?.email || ticket.email || 'غير متوفر';
        tr.appendChild(tdEmail);

        // عنوان المشكلة
        const tdSubject = document.createElement('td');
        tdSubject.textContent = ticket.subject || 'بدون عنوان';
        tr.appendChild(tdSubject);

        // وصف المشكلة
        const tdDescription = document.createElement('td');
        tdDescription.textContent = ticket.description || ticket.problem || 'بدون وصف';
        tr.appendChild(tdDescription);

        // حالة المشكلة
        const tdStatus = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = `badge ${getStatusClass(ticket.status || 'open')}`;
        statusBadge.textContent = ticket.status || 'open';
        tdStatus.appendChild(statusBadge);
        tr.appendChild(tdStatus);

        // تاريخ الإرسال
        const tdDate = document.createElement('td');
        tdDate.textContent = ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : 'غير متوفر';
        tr.appendChild(tdDate);

        // أزرار الإجراءات
        const tdActions = document.createElement('td');
        
        // زر تحديث الحالة
        const updateBtn = document.createElement('button');
        updateBtn.className = 'btn btn-primary btn-sm me-2';
        updateBtn.textContent = 'تحديث';
        updateBtn.setAttribute('data-bs-toggle', 'modal');
        updateBtn.setAttribute('data-bs-target', '#updateTicketModal');
        updateBtn.onclick = () => prepareUpdateModal(ticket._id);
        tdActions.appendChild(updateBtn);

        // زر حذف
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'حذف';
        deleteBtn.onclick = () => deleteTicket(ticket._id);
        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    });
}

// دالة مساعدة لتحديد كلاس الحالة
function getStatusClass(status) {
    switch(status) {
        case 'open': return 'bg-warning';
        case 'in_progress': return 'bg-info';
        case 'closed': return 'bg-success';
        default: return 'bg-secondary';
    }
}

// دالة لإعداد نموذج التحديث
function prepareUpdateModal(ticketId) {
    document.getElementById('updateTicketId').value = ticketId;
    // يمكنك هنا جلب بيانات التذكرة لملء النموذج
}

// دالة لتحديث حالة التذكرة
async function updateTicket(event) {
    event.preventDefault();
    
    const ticketId = document.getElementById('updateTicketId').value;
    const status = document.getElementById('ticketStatus').value;
    
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            },
            body: JSON.stringify({ status })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('تم تحديث حالة التذكرة بنجاح');
            // إغلاق الـ modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('updateTicketModal'));
            modal.hide();
            // إعادة تحميل التذاكر
            getTickets();
        } else {
            alert(result.message || 'فشل في تحديث حالة التذكرة');
        }
    } catch (error) {
        console.error('خطأ في تحديث التذكرة:', error);
        alert('حدث خطأ أثناء تحديث التذكرة');
    }
}

// دالة لحذف التذكرة
async function deleteTicket(ticketId) {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه التذكرة؟')) return;
    
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Auth': token
            }
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('تم حذف التذكرة بنجاح');
            getTickets(); // إعادة تحميل القائمة
        } else {
            alert(result.message || 'فشل في حذف التذكرة');
        }
    } catch (error) {
        console.error('خطأ في حذف التذكرة:', error);
        alert('حدث خطأ أثناء حذف التذكرة');
    }
}

// إضافة مستمع الحدث لنموذج تحديث التذكرة
document.addEventListener('DOMContentLoaded', function() {
    const updateForm = document.getElementById('updateTicketForm');
    if (updateForm) {
        updateForm.addEventListener('submit', updateTicket);
    }
    
    // بدء جلب التذاكر بعد تحميل الصفحة
    getTickets();
});
