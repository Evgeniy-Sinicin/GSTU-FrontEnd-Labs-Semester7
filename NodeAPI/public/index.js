document.forms['employeeForm'].addEventListener('submit', e => {
    e.preventDefault()
    const form = document.forms['employeeForm']
    const id = form.elements['id'].value
    const fullName = form.elements['fullName'].value
    const email = form.elements['email'].value
    const phone = form.elements['phone'].value
    const city = form.elements['city'].value
    if (id == 0) {
        addEmployee(fullName, email, phone, city)
    } else {
        editEmployee(id, fullName, email, phone, city)
    }
})

document.getElementById('reset').addEventListener('click', (e) => {
    e.preventDefault()
    reset()
})

getEmployees()

async function getEmployees() {
    const res = await fetch('/employees', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    if (res.ok === true) {
        const empls = await res.json()
        let rows = document.querySelector('tbody')
        empls.forEach(empl => {
            rows.append(row(empl))
        })
    }
}

async function getEmployee(id) {
    const res = await fetch('/employees/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    if (res.ok === true) {
        const empl = await res.json()
        const form = document.forms['employeeForm']
        form.elements['id'].value = empl.id
        form.elements['fullName'].value = empl.fullName
        form.elements['email'].value = empl.email
        form.elements['phone'].value = empl.phone
        form.elements['city'].value = empl.city
    }
}

async function addEmployee(fullName, email, phone, city) {
    const res = await fetch('/employees', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            phone: phone,
            city: city
        })
    })
    if (res.ok === true) {
        const empl = await res.json()
        reset()
        document.querySelector('tbody').append(row(empl))
    }
}

async function deleteEmployee(id) {
    const res = await fetch('/employees/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
    if (res.ok === true) {
        const empl = await res.json()
        document.querySelector("tr[data-rowid='" + empl.id + "']").remove()
    }
}

async function editEmployee(id, fullName, email, phone, city) {
    const res = await fetch('/employees', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            fullName: fullName,
            email: email,
            phone: phone,
            city: city
        })
    })
    if (res.ok === true) {
        const empl = await res.json()
        reset()
        document.querySelector("tr[data-rowid='" + empl.id + "']").replaceWith(row(empl))
    }
}

function reset() {
    const form = document.forms['employeeForm']
    form.reset()
    form.elements['id'].value = 0
}

function row(empl) {
    const tr = document.createElement('tr')
    tr.setAttribute('data-rowid', empl.id)

    const tdId = document.createElement('td')
    tdId.append(empl.id)
    tr.append(tdId)

    const tdFullName = document.createElement('td')
    tdFullName.append(empl.fullName)
    tr.append(tdFullName)

    const tdEmail = document.createElement('td')
    tdEmail.append(empl.email)
    tr.append(tdEmail)

    const tdPhone = document.createElement('td')
    tdPhone.append(empl.phone)
    tr.append(tdPhone)

    const tdCity = document.createElement('td')
    tdCity.append(empl.city)
    tr.append(tdCity)

    const tdLinks = document.createElement('td')

    const aEditLink = document.createElement('a')
    aEditLink.setAttribute('data-id', empl.id)
    aEditLink.setAttribute('style', 'cursor:pointer;padding:15px;')
    aEditLink.append('Edit')
    aEditLink.addEventListener('click', e => {
        e.preventDefault()
        getEmployee(empl.id)
    })
    tdLinks.append(aEditLink)

    const aDeleteLink = document.createElement('a')
    aDeleteLink.setAttribute('data-id', empl.id)
    aDeleteLink.setAttribute('style', 'cursor:pointer;padding:15px;')
    aDeleteLink.append('Delete')
    aDeleteLink.addEventListener('click', e => {
        e.preventDefault()
        deleteEmployee(empl.id)
    })
    tdLinks.append(aDeleteLink)

    tr.appendChild(tdLinks)

    return tr
}