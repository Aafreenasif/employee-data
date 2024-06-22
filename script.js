document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/users';
    let employees = [];

    // Fetch employee data from the API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            employees = data;
            displayEmployees(employees);
            console.log('Employee data fetched:', employees);
        })
        .catch(error => console.error('Error fetching employee data:', error));

    const searchForm = document.getElementById('searchForm');
    const searchResult = document.getElementById('searchResult');
    const employeeList = document.getElementById('employeeList');
    const addEmployeeForm = document.getElementById('addEmployeeForm');

    // Function to display all employees
    function displayEmployees(employeeData) {
        employeeList.innerHTML = '<ul>' + employeeData.map(emp => `
            <li>
                <strong>Name:</strong> ${emp.name}, 
                <strong>Username:</strong> ${emp.username}, 
                <strong>Email:</strong> ${emp.email}, 
                <strong>Phone:</strong> ${emp.phone}, 
                <strong>Company:</strong> ${emp.company.name}
            </li>
        `).join('') + '</ul>';
    }

    // Search form submission
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const searchName = document.getElementById('searchName').value;
        const employee = employees.find(emp => emp.name.toLowerCase().includes(searchName.toLowerCase()));

        if (employee) {
            searchResult.innerHTML = `
                <h3>Employee Details</h3>
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Username:</strong> ${employee.username}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Address:</strong> ${employee.address.street}, ${employee.address.city}</p>
                <p><strong>Phone:</strong> ${employee.phone}</p>
                <p><strong>Company:</strong> ${employee.company.name}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>Employee not found!</p>';
        }
    });

    // Add employee form submission
    addEmployeeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newEmployee = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: { name: document.getElementById('company').value }
        };

        // Post new employee data to the API (mock)
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
        .then(response => response.json())
        .then(data => {
            employees.push(data);
            displayEmployees(employees);
            addEmployeeForm.reset();
            console.log('New employee added:', data);
        })
        .catch(error => console.error('Error adding employee:', error));
    });
});
