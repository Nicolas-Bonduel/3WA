let add_title, add_desc, add_date, add_priority, add_btn;


// well, we should start from somewhere ~~
onload();

// Fires on load
function onload() {

    // gets add section references (for later usage) & checks integrity
    // '_- I was too lazy to add sanity checks for other references, so enjoy this one!
    add_title = document.querySelector("#todolist > .add > .header > .title");
    if (!add_title) {
        alert("err. could not find add title");
        return;
    }
    add_desc = document.querySelector("#todolist > .add > .header > .desc");
    if (!add_desc) {
        alert("err. could not find add desc");
        return;
    }
    add_date = document.querySelector("#todolist > .add > .date-wrapper > .date");
    if (!add_date) {
        alert("err. could not find add date");
        return;
    }
    add_priority = document.querySelector("#todolist > .add > .priority-wrapper > select");
    if (!add_priority) {
        alert("err. could not find add priority");
        return;
    }
    add_btn = document.querySelector("#todolist > .add > .add-btn > img");
    if (!add_btn) {
        alert("err. could not find add button");
        return;
    }

    // loads history (local storage)
    let todolist = JSON.parse(localStorage.getItem('todolist'));
    if (todolist) {
        todolist.forEach((el) => add_row(el, true));
    }

    // add button event listener
    add_btn.addEventListener('click', (e) => {
        const add_request = get_request();
        let validator = validate(add_request);

        if (validator != "") {
            alert(validator);
            return;
        }

        add_row(add_request);

    });

    // header sorting event listeners (I know this is dirty, leave me alone!!)
    let header = document.querySelector("#todolist > .header");
    header.querySelector('.check > img.arrow-down').addEventListener("click", (e) => sortby('check', 'descending'));
    header.querySelector('.check > img.arrow-up').addEventListener("click", (e) => sortby('check', 'ascending'));
    header.querySelector('.title-desc > img.arrow-down').addEventListener("click", (e) => sortby('title', 'descending'));
    header.querySelector('.title-desc > img.arrow-up').addEventListener("click", (e) => sortby('title', 'ascending'));
    header.querySelector('.date > img.arrow-down').addEventListener("click", (e) => sortby('date', 'descending'));
    header.querySelector('.date > img.arrow-up').addEventListener("click", (e) => sortby('date', 'ascending'));
    header.querySelector('.priority > img.arrow-down').addEventListener("click", (e) => sortby('priority', 'descending'));
    header.querySelector('.priority > img.arrow-up').addEventListener("click", (e) => sortby('priority', 'ascending'));

    // done for onload, further logic is managed from event listeners
}

// Just returns a structure containing add button inputs (not exactly the most useful since it's only used once, but meh)
// This is used by the add button event listener
function get_request() {
    return {
        title: add_title.value,
        desc: add_desc.value,
        date: add_date.value,
        priority: add_priority.value,
    };
}


// Validates that the add button inputs are sane (yeah I only check existence, complain as much as you want ^^)
// Returns a string containing the error message, if any
// Returns an empty string if no error was raised
// This is used in the add button event listener
function validate(add_request) {
    // ko cases
    if (!add_request.title)
        return "missing title";
    if (!add_request.desc)
        return "missing desc";
    if (!add_request.date)
        return "missing date";
    if (!add_request.priority)
        return "missing priority";

    // ok
    return "";
}

// Adds a row in the todolist & stores it (local storage)
// Data is a struct containing row items data
// In case 'bypass_save' is set to true, bypasses the storage part (this is useful on load since we don't want to create duplicates)
// This is used on load (with 'bypass_save' set to true) to load stored todos, and when clicking the add row button (listener set on load as well)
function add_row(add_request, bypass_save = false) {
    // inserts row
    document.querySelector("#todolist > .header").insertAdjacentHTML('afterend', `
    <div class="row">
        <div class="check">
            <input type="checkbox"/>
        </div>
        <div class="header">
            <div class="title">
                <p>${add_request.title}</p>
                <img class="edit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png">
                <img style="display: none" class="save" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAAD4+Pjv7+8aGhoTExOYmJiTk5P09PQICAiQkJD6+vp/f39WVlbGxsaurq5ubm6FhYUnJye8vLwfHx9oaGjR0dHq6urg4OB1dXWkpKS2trY0NDQpKSlNTU1fX19H7sBTAAADJUlEQVR4nO3d224iMRBFUbo7QLhDrkwyM/n/vxwhTR5AUDbUsV1Ee78iFSw5pIliN6MRERERERERERERERERxWvRn29xy7CTGVc9WqR+vVu9dOeb3jLwZMYx4vHk0YnEYNVPni7o6gi7uYRxuWeDpxHOEsLbniO7pQ2sIixK3CaAdYQFiakVrCUsRky8BysKC/266dPAasIyqziNJCyxir11HawvLLCK6wxgTaF+FXfRhPJVXIUTildxcenDdkOhdhVzrhXVhdJVjClUEoMKhcSoQh0xrFBGjCtUEQMLRReNyELNKoYWSoixhQpicKGAGF3oJ4YXuonxhd6Lxh0Inat4D0LfKt6FsPP88w0hQoQIf5Aw9V/uexTOp0cd7+f4EUIzhAjzQ4jw1hDWFur3D0QT/pLJvnsPJny4aYOp1UcwYfcpo/0vZ49LVaHrOc40vwpYRfh7kOlG1/6M1hF240/Ze3Gf3O3ZRNh1f17nE0HLv9f6qgkbhhBh/BAijB9ChPFDiDB+CBHGDyHC+CFEGD+ECOOHEGH8ECKMH0KE8UOIMH5VhF+bN+mWmtHwtvmKIxxPtbrvhsk4hnBbxndoyNo9VFq4kXnOtWkvfJZhzpdxv7iywrIreCi9ikWFWxnkcsn3YlFhjbvDFn0RqeHl7w17aNJQ+ChTWKV27hcUvsoQdq/NhB8yg11iW3RB4V5msNs3E77LDHaJAyblhLNyH0iPG1oJx9WE9t8YCK0Qygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxPC/VCnfSth91Ar+2V4hHnf6dy4F9ctjLO+l7txKw8w77vVG7dzCdetX35Ga5ewv+7+7y16cp7bmbYGJPOe2wl/EnjmXMKs839NE5x/XLY2mC39wIzzfw0TnX+Me1GUrOCh51lryvmEZ5D7Sbzr4tNUe4C1X+9WcT6Gv6x26xIHdBd9lORfTkRERERERERERERERESC/gF2IVePB+evpwAAAABJRU5ErkJggg==">
            </div>
            <div class="desc">
                <p>${add_request.desc}</p>
                <img class="edit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png">
                <img style="display: none" class="save" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAAD4+Pjv7+8aGhoTExOYmJiTk5P09PQICAiQkJD6+vp/f39WVlbGxsaurq5ubm6FhYUnJye8vLwfHx9oaGjR0dHq6urg4OB1dXWkpKS2trY0NDQpKSlNTU1fX19H7sBTAAADJUlEQVR4nO3d224iMRBFUbo7QLhDrkwyM/n/vxwhTR5AUDbUsV1Ee78iFSw5pIliN6MRERERERERERERERERxWvRn29xy7CTGVc9WqR+vVu9dOeb3jLwZMYx4vHk0YnEYNVPni7o6gi7uYRxuWeDpxHOEsLbniO7pQ2sIixK3CaAdYQFiakVrCUsRky8BysKC/266dPAasIyqziNJCyxir11HawvLLCK6wxgTaF+FXfRhPJVXIUTildxcenDdkOhdhVzrhXVhdJVjClUEoMKhcSoQh0xrFBGjCtUEQMLRReNyELNKoYWSoixhQpicKGAGF3oJ4YXuonxhd6Lxh0Inat4D0LfKt6FsPP88w0hQoQIf5Aw9V/uexTOp0cd7+f4EUIzhAjzQ4jw1hDWFur3D0QT/pLJvnsPJny4aYOp1UcwYfcpo/0vZ49LVaHrOc40vwpYRfh7kOlG1/6M1hF240/Ze3Gf3O3ZRNh1f17nE0HLv9f6qgkbhhBh/BAijB9ChPFDiDB+CBHGDyHC+CFEGD+ECOOHEGH8ECKMH0KE8UOIMH5VhF+bN+mWmtHwtvmKIxxPtbrvhsk4hnBbxndoyNo9VFq4kXnOtWkvfJZhzpdxv7iywrIreCi9ikWFWxnkcsn3YlFhjbvDFn0RqeHl7w17aNJQ+ChTWKV27hcUvsoQdq/NhB8yg11iW3RB4V5msNs3E77LDHaJAyblhLNyH0iPG1oJx9WE9t8YCK0Qygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxPC/VCnfSth91Ar+2V4hHnf6dy4F9ctjLO+l7txKw8w77vVG7dzCdetX35Ga5ewv+7+7y16cp7bmbYGJPOe2wl/EnjmXMKs839NE5x/XLY2mC39wIzzfw0TnX+Me1GUrOCh51lryvmEZ5D7Sbzr4tNUe4C1X+9WcT6Gv6x26xIHdBd9lORfTkRERERERERERERERESC/gF2IVePB+evpwAAAABJRU5ErkJggg==">
            </div>
        </div>
        <div class="date">
            <p>${add_request.date}</p>
            <img class="edit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png">
            <img style="display: none" class="save" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAAD4+Pjv7+8aGhoTExOYmJiTk5P09PQICAiQkJD6+vp/f39WVlbGxsaurq5ubm6FhYUnJye8vLwfHx9oaGjR0dHq6urg4OB1dXWkpKS2trY0NDQpKSlNTU1fX19H7sBTAAADJUlEQVR4nO3d224iMRBFUbo7QLhDrkwyM/n/vxwhTR5AUDbUsV1Ee78iFSw5pIliN6MRERERERERERERERERxWvRn29xy7CTGVc9WqR+vVu9dOeb3jLwZMYx4vHk0YnEYNVPni7o6gi7uYRxuWeDpxHOEsLbniO7pQ2sIixK3CaAdYQFiakVrCUsRky8BysKC/266dPAasIyqziNJCyxir11HawvLLCK6wxgTaF+FXfRhPJVXIUTildxcenDdkOhdhVzrhXVhdJVjClUEoMKhcSoQh0xrFBGjCtUEQMLRReNyELNKoYWSoixhQpicKGAGF3oJ4YXuonxhd6Lxh0Inat4D0LfKt6FsPP88w0hQoQIf5Aw9V/uexTOp0cd7+f4EUIzhAjzQ4jw1hDWFur3D0QT/pLJvnsPJny4aYOp1UcwYfcpo/0vZ49LVaHrOc40vwpYRfh7kOlG1/6M1hF240/Ze3Gf3O3ZRNh1f17nE0HLv9f6qgkbhhBh/BAijB9ChPFDiDB+CBHGDyHC+CFEGD+ECOOHEGH8ECKMH0KE8UOIMH5VhF+bN+mWmtHwtvmKIxxPtbrvhsk4hnBbxndoyNo9VFq4kXnOtWkvfJZhzpdxv7iywrIreCi9ikWFWxnkcsn3YlFhjbvDFn0RqeHl7w17aNJQ+ChTWKV27hcUvsoQdq/NhB8yg11iW3RB4V5msNs3E77LDHaJAyblhLNyH0iPG1oJx9WE9t8YCK0Qygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxPC/VCnfSth91Ar+2V4hHnf6dy4F9ctjLO+l7txKw8w77vVG7dzCdetX35Ga5ewv+7+7y16cp7bmbYGJPOe2wl/EnjmXMKs839NE5x/XLY2mC39wIzzfw0TnX+Me1GUrOCh51lryvmEZ5D7Sbzr4tNUe4C1X+9WcT6Gv6x26xIHdBd9lORfTkRERERERERERERERESC/gF2IVePB+evpwAAAABJRU5ErkJggg==">
        </div>
        <div class="priority">
            <p>${add_request.priority}</p>
            <img class="edit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png">
            <img style="display: none" class="save" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAAD4+Pjv7+8aGhoTExOYmJiTk5P09PQICAiQkJD6+vp/f39WVlbGxsaurq5ubm6FhYUnJye8vLwfHx9oaGjR0dHq6urg4OB1dXWkpKS2trY0NDQpKSlNTU1fX19H7sBTAAADJUlEQVR4nO3d224iMRBFUbo7QLhDrkwyM/n/vxwhTR5AUDbUsV1Ee78iFSw5pIliN6MRERERERERERERERERxWvRn29xy7CTGVc9WqR+vVu9dOeb3jLwZMYx4vHk0YnEYNVPni7o6gi7uYRxuWeDpxHOEsLbniO7pQ2sIixK3CaAdYQFiakVrCUsRky8BysKC/266dPAasIyqziNJCyxir11HawvLLCK6wxgTaF+FXfRhPJVXIUTildxcenDdkOhdhVzrhXVhdJVjClUEoMKhcSoQh0xrFBGjCtUEQMLRReNyELNKoYWSoixhQpicKGAGF3oJ4YXuonxhd6Lxh0Inat4D0LfKt6FsPP88w0hQoQIf5Aw9V/uexTOp0cd7+f4EUIzhAjzQ4jw1hDWFur3D0QT/pLJvnsPJny4aYOp1UcwYfcpo/0vZ49LVaHrOc40vwpYRfh7kOlG1/6M1hF240/Ze3Gf3O3ZRNh1f17nE0HLv9f6qgkbhhBh/BAijB9ChPFDiDB+CBHGDyHC+CFEGD+ECOOHEGH8ECKMH0KE8UOIMH5VhF+bN+mWmtHwtvmKIxxPtbrvhsk4hnBbxndoyNo9VFq4kXnOtWkvfJZhzpdxv7iywrIreCi9ikWFWxnkcsn3YlFhjbvDFn0RqeHl7w17aNJQ+ChTWKV27hcUvsoQdq/NhB8yg11iW3RB4V5msNs3E77LDHaJAyblhLNyH0iPG1oJx9WE9t8YCK0Qygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxHKDHYIHaMRygx2CB2jEcoMdggdoxPC/VCnfSth91Ar+2V4hHnf6dy4F9ctjLO+l7txKw8w77vVG7dzCdetX35Ga5ewv+7+7y16cp7bmbYGJPOe2wl/EnjmXMKs839NE5x/XLY2mC39wIzzfw0TnX+Me1GUrOCh51lryvmEZ5D7Sbzr4tNUe4C1X+9WcT6Gv6x26xIHdBd9lORfTkRERERERERERERERESC/gF2IVePB+evpwAAAABJRU5ErkJggg==">
        </div>
        <div class="delete">
            <img src="https://cdn.icon-icons.com/icons2/935/PNG/512/recycling-bin_icon-icons.com_73179.png">
        </div>
    </div>
    `);

    // if row is checked (meaning task completed), ''barre'' (no idea what's the translation for that, bear with it) row data
    // (nth-child is 2 because the first child is the header)
    if (add_request.checked) {
        document.querySelector("#todolist > .row:nth-child(2) > .check > input").checked = true;
        document.querySelector("#todolist > .row:nth-child(2) > .header > .title > p").style.textDecoration = "line-through";
        document.querySelector("#todolist > .row:nth-child(2) > .header > .desc > p").style.textDecoration = "line-through";
        document.querySelector("#todolist > .row:nth-child(2) > .date > p").style.textDecoration = "line-through";
        document.querySelector("#todolist > .row:nth-child(2) > .priority > p").style.textDecoration = "line-through";
    }

    // binds check & delete event listeners
    document.querySelector("#todolist > .row:nth-child(2) > .check > input").addEventListener("click", toggle_row);
    document.querySelector("#todolist > .row:nth-child(2) > .delete > img").addEventListener("click", delete_row);

    // binds edit event listeners
    document.querySelector("#todolist > .row:nth-child(2) > .header > .title > img.edit").addEventListener("click", edit_row);
    document.querySelector("#todolist > .row:nth-child(2) > .header > .desc > img.edit").addEventListener("click", edit_row);
    document.querySelector("#todolist > .row:nth-child(2) > .date > img.edit").addEventListener("click", edit_row);
    document.querySelector("#todolist > .row:nth-child(2) > .priority > img.edit").addEventListener("click", edit_row);

    // unless 'bypass_save' is specified to true
    if (!bypass_save) {
        // stores added row data (local storage)
        let todolist = JSON.parse(localStorage.getItem('todolist'));
        if (!todolist)
            todolist = [];
        add_request['checked'] = false;
        todolist.push(add_request);
        localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
        localStorage.setItem('todolist', JSON.stringify(todolist));
    }
}

// Toggles the row checked state
// Current row is assessed from event target, which in this case is the row check checkbox
// This is used in event listener, defined in 'add_row()' (when the row is created)
function toggle_row(event) {
    // ref
    let row = event.target.parentNode.parentNode;
    let check = row.querySelector(".check > input").checked;
    let title = row.querySelector(".header > .title > p");
    let desc = row.querySelector(".header > .desc > p");
    let date = row.querySelector(".date > p");
    let priority = row.querySelector(".priority > p");

    // ''barre'' (no idea what's the translation for that, bear with it) row data if todo is checked, opposite otherwise
    if (check) {
        title.style.textDecoration = "line-through";
        desc.style.textDecoration = "line-through";
        date.style.textDecoration = "line-through";
        priority.style.textDecoration = "line-through";
    }
    else {
        title.style.textDecoration = "none";
        desc.style.textDecoration = "none";
        date.style.textDecoration = "none";
        priority.style.textDecoration = "none";
    }

    // updates storage (yeah there's no checking wether any data was actually updated, just trust me -_^)
    let todolist = JSON.parse(localStorage.getItem('todolist'));
    todolist.forEach((el, idx, obj) => {
        if (el.title == title.innerHTML && el.desc == desc.innerHTML && el.date == date.innerHTML && el.priority == priority.innerHTML)
            obj[idx].checked = check;
            
    });
    localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
    localStorage.setItem('todolist', JSON.stringify(todolist));
}

// Deletes a row
// Current row is assessed from event target, which in this case is the row delete button
// This is used in event listener, defined in 'add_row()' (when the row is created)
function delete_row(event) {
    // ref
    let row = event.target.parentNode.parentNode;
    let checked = row.querySelector(".check > input").checked;
    let title = row.querySelector(".header > .title > p").innerHTML;
    let desc = row.querySelector(".header > .desc > p").innerHTML;
    let date = row.querySelector(".date > p").innerHTML;
    let priority = row.querySelector(".priority > p").innerHTML;

    // updates storage (yeah there's no checking wether any data was actually deleted, just trust me -_^)
    let todolist = JSON.parse(localStorage.getItem('todolist'));
    todolist.forEach((el, idx, obj) => {
        if (el.checked == checked && el.title == title && el.desc == desc && el.date == date && el.priority == priority)
            obj.splice(idx, 1);
    });
    localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
    localStorage.setItem('todolist', JSON.stringify(todolist));

    // removes row from DOM
    row.remove();
}

// Allows edition of a row field
// Current row field is assessed from event target, which in this case is the row field edit button
// This is used in event listener, defined in 'add_row()' (when the row is created) and in 'save_edit()' (when the row is edited)
function edit_row(event) {
    // ref
    let field = event.target.parentNode;
    let field_type = field.getAttribute("class");

    let prev_val;
    switch (field_type) {
        // sanity check
        default:
            console.log("edit field type '" + field_type + "' is not known");
            return;
        // edit title field
        case "title":
            // keeps a trace of previous value before edit
            prev_val = field.querySelector("p").innerHTML;

            // replace static field by input
            field.querySelector("p").remove();
            field.insertAdjacentHTML('afterbegin', `
                <input type="text" placeholder="title">
            `)

            // toggle edit/save buttons
            field.querySelector("img.edit").style.display = "none";
            field.querySelector("img.save").style.display = "block";

            // add save button event listener
            field.querySelector("img.save").addEventListener("click", (e) => save_edit(e, prev_val));
            break;
        // edit desc field
        case "desc":
            // keeps a trace of previous value before edit
            prev_val = field.querySelector("p").innerHTML;

            // replace static field by input
            field.querySelector("p").remove();
            field.insertAdjacentHTML('afterbegin', `
                <input type="text" placeholder="desc">
            `)

            // toggle edit/save buttons
            field.querySelector("img.edit").style.display = "none";
            field.querySelector("img.save").style.display = "block";

            // add save button event listener
            field.querySelector("img.save").addEventListener("click", (e) => save_edit(e, prev_val));
            break;
        // edit date field
        case "date":
            // keeps a trace of previous value before edit
            prev_val = field.querySelector("p").innerHTML;

            // replace static field by input
            field.querySelector("p").remove();
            field.insertAdjacentHTML('afterbegin', `
                <input type="date">
            `)

            // toggle edit/save buttons
            field.querySelector("img.edit").style.display = "none";
            field.querySelector("img.save").style.display = "block";

            // add save button event listener
            field.querySelector("img.save").addEventListener("click", (e) => save_edit(e, prev_val));
            break;
        // edit priority field
        case "priority":
            // keeps a trace of previous value before edit
            prev_val = field.querySelector("p").innerHTML;

            // replace static field by input
            field.querySelector("p").remove();
            field.insertAdjacentHTML('afterbegin', `
                <select class="priority">
                    <option default value="" disabled selected hidden>priority</option>
                    <option value="not urgent">not urgent</option>
                    <option value="normal">normal</option>
                    <option value="urgent">urgent</option>
                </select>
            `)

            // toggle edit/save buttons
            field.querySelector("img.edit").style.display = "none";
            field.querySelector("img.save").style.display = "block";

            // add save button event listener
            field.querySelector("img.save").addEventListener("click", (e) => save_edit(e, prev_val));
            break;
    }
}

// Saves an edited row field
// Current row field is assessed from event target, which in this case is the row field save button
// 'prev_val' is used as a mean to find the original todo in storage (I know this is ugly, get on with it ><)
// This is used in event listener, defined in 'edit_row()' (when the row is edited)
// OMG this is ugly as hell! No, don't look!
function save_edit(event, prev_val) {
    // ref
    let field = event.target.parentNode;
    let field_type = field.getAttribute("class");
    let row = field.parentNode;
    // title & desc fields are 1 layer deeper than other fields in dom
    if (field_type == "title" || field_type == "desc")
        row = row.parentNode;
    let checked = row.querySelector(".check > input").checked;
    // only there if not editing title field
    let title;
    if (field_type != "title")
        title = row.querySelector(".header > .title > p").innerHTML;
    // only there if not editing desc field
    let desc;
    if (field_type != "desc")
        desc = row.querySelector(".header > .desc > p").innerHTML;
    // only there if not editing date field
    let date;
    if (field_type != "date")
        date = row.querySelector(".date > p").innerHTML;
    // only there if not editing priority field
    let priority;
    if (field_type != "priority")
        priority = row.querySelector(".priority > p").innerHTML;

    // formats data integrity check
    const request =  {
        title: field_type != "title" ? title : "",
        desc: field_type != "desc" ? desc : "",
        date: field_type != "date" ? date : "",
        priority: field_type != "priority" ? priority : "",
    };
    let validator;


    let todolist = JSON.parse(localStorage.getItem('todolist'));
    let val;
    switch (field_type) {
        // sanity check
        default:
            console.log("save field type '" + field_type + "' is not known");
            return;
        // save title field edit
        case "title":
            // integrity check
            val = field.querySelector("input").value;
            request.title = val;
            validator = validate(request);
            if (validator != "") {
                alert(validator);
                return;
            }

            // replace input by static field
            field.querySelector("input").remove();
            field.insertAdjacentHTML('afterbegin', `
                <p>${val}</p>
            `)

            // toggle edit/save button
            field.querySelector("img.save").style.display = "none";
            field.querySelector("img.edit").style.display = "block";

            // store changes (local storage)
            todolist.forEach((el, idx, obj) => {
                if (el.checked == checked && el.title == prev_val && el.desc == desc && el.date == date && el.priority == priority)
                    obj[idx].title = val;
            });
            localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
            localStorage.setItem('todolist', JSON.stringify(todolist));
            break;
        // save desc field edit
        case "desc":
            // integrity check
            val = field.querySelector("input").value;
            request.desc = val;
            validator = validate(request);
            if (validator != "") {
                alert(validator);
                return;
            }

            // replace input by static field
            field.querySelector("input").remove();
            field.insertAdjacentHTML('afterbegin', `
                <p>${val}</p>
            `)

            // toggle edit/save button
            field.querySelector("img.save").style.display = "none";
            field.querySelector("img.edit").style.display = "block";

            // store changes (local storage)
            todolist.forEach((el, idx, obj) => {
                if (el.checked == checked && el.title == title && el.desc == prev_val && el.date == date && el.priority == priority)
                    obj[idx].desc = val;
            });
            localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
            localStorage.setItem('todolist', JSON.stringify(todolist));
            break;
        // save date field edit
        case "date":
            // integrity check
            val = field.querySelector("input").value;
            request.date = val;
            validator = validate(request);
            if (validator != "") {
                alert(validator);
                return;
            }

            // replace input by static field
            field.querySelector("input").remove();
            field.insertAdjacentHTML('afterbegin', `
                <p>${val}</p>
            `)

            // toggle edit/save button
            field.querySelector("img.save").style.display = "none";
            field.querySelector("img.edit").style.display = "block";

            // store changes (local storage)
            todolist.forEach((el, idx, obj) => {
                if (el.checked == checked && el.title == title && el.desc == desc && el.date == prev_val && el.priority == priority)
                    obj[idx].date = val;
            });
            localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
            localStorage.setItem('todolist', JSON.stringify(todolist));
            break;
        // save priority field edit
        case "priority":
            // integrity check
            val = field.querySelector("select").value;
            request.priority = val;
            validator = validate(request);
            if (validator != "") {
                alert(validator);
                return;
            }

            // replace input by static field
            field.querySelector("select").remove();
            field.insertAdjacentHTML('afterbegin', `
                <p>${val}</p>
            `)

            // toggle edit/save button
            field.querySelector("img.save").style.display = "none";
            field.querySelector("img.edit").style.display = "block";

            // store changes (local storage)
            todolist.forEach((el, idx, obj) => {
                if (el.checked == checked && el.title == title && el.desc == desc && el.date == date && el.priority == prev_val)
                    obj[idx].priority = val;
            });
            localStorage.removeItem('todolist'); // useful? I have no idea wether 'setItem()' overrides so just in case
            localStorage.setItem('todolist', JSON.stringify(todolist));
            break;
    }
}

// Sorts rows based on given parameters
// Available params:
//  - option: "check" | "title" | "date" | "priority"
//  - order: "ascending" | "descending"
// This is used in event listener, defined on load (since there are attached to the header row, which is always present)
function sortby(option, order) {
    // sanity check
    if (order != "ascending" && order != "descending") {
        console.log("order '" + order + "' is not known");
        return;
    }

    // ref
    let rows = document.querySelectorAll("#todolist > .row");
    let rows_length = document.querySelectorAll("#todolist > .row").length;
    let parentNode_ = rows[0].parentNode;
    let order_= order == "ascending";

    let i, node_i, node_i_plus, eval_;
    switch(option) {
        // sanity check
        default:
            console.log("option '" + option + "' is not known");
            return;
        // sort by checked state
        case "check":
            // for each pair of rows
            for (i = 0; i < (rows_length - 1); i++) {
                node_i = document.querySelector("#todolist > .row:nth-child(" + (i+2) + ")");
                node_i_plus = document.querySelector("#todolist > .row:nth-child(" + (i+3) + ")");
                // should rows be swaped? (according to descending order)
                eval_ = !node_i.querySelector(".check > input").checked && node_i_plus.querySelector(".check > input").checked;
                if (eval_) {
                    // swap pair of rows
                    node_i.parentNode.insertBefore(node_i_plus, node_i);
                    // restart from the beginning ('i' will be incremented in next iteration, bringin it back to 0)
                    i = -1;
                }
                // toggles sorting arrow state (well, hide one and diplay the other)
                parentNode_.querySelector(".header > .check > img.arrow-down").style.display = order_ ? "block" : "none";
                parentNode_.querySelector(".header > .check > img.arrow-up").style.display = order_ ? "none" : "block";
            }
            break;
        // sort by title (alphanumerical)
        case "title":
            // for each pair of rows
            for (i = 0; i < (rows_length - 1); i++) {
                node_i = document.querySelector("#todolist > .row:nth-child(" + (i+2) + ")");
                node_i_plus = document.querySelector("#todolist > .row:nth-child(" + (i+3) + ")");
                // should rows be swaped? (according to descending order)
                eval_ = node_i.querySelector(".header > .title > p").innerHTML > node_i_plus.querySelector(".header > .title > p").innerHTML;
                if (eval_) {
                    // swap pair of rows
                    node_i.parentNode.insertBefore(node_i_plus, node_i);
                    // restart from the beginning ('i' will be incremented in next iteration, bringin it back to 0)
                    i = -1;
                }
                // toggles sorting arrow state (well, hide one and diplay the other)
                parentNode_.querySelector(".header > .title-desc > img.arrow-down").style.display = order_ ? "block" : "none";
                parentNode_.querySelector(".header > .title-desc > img.arrow-up").style.display = order_ ? "none" : "block";
            }
            break;
        // sort by date (alphanumerical)
        case "date":
            // for each pair of rows
            for (i = 0; i < (rows_length - 1); i++) {
                node_i = document.querySelector("#todolist > .row:nth-child(" + (i+2) + ")");
                node_i_plus = document.querySelector("#todolist > .row:nth-child(" + (i+3) + ")");
                // should rows be swaped? (according to descending order)
                eval_ = node_i.querySelector(".date > p").innerHTML > node_i_plus.querySelector(".date > p").innerHTML;
                if (eval_) {
                    // swap pair of rows
                    node_i.parentNode.insertBefore(node_i_plus, node_i);
                    // restart from the beginning ('i' will be incremented in next iteration, bringin it back to 0)
                    i = -1;
                }
                // toggles sorting arrow state (well, hide one and diplay the other)
                parentNode_.querySelector(".header > .date > img.arrow-down").style.display = order_ ? "block" : "none";
                parentNode_.querySelector(".header > .date> img.arrow-up").style.display = order_ ? "none" : "block";
            }
            break;
        // sort by priority (alphanumerical)
        case "priority":
            // for each pair of rows
            for (i = 0; i < (rows_length - 1); i++) {
                node_i = document.querySelector("#todolist > .row:nth-child(" + (i+2) + ")");
                node_i_plus = document.querySelector("#todolist > .row:nth-child(" + (i+3) + ")");
                // should rows be swaped? (according to descending order)
                eval_ = node_i.querySelector(".priority > p").innerHTML > node_i_plus.querySelector(".priority > p").innerHTML;
                if (eval_) {
                    // swap pair of rows
                    node_i.parentNode.insertBefore(node_i_plus, node_i);
                    // restart from the beginning ('i' will be incremented in next iteration, bringin it back to 0)
                    i = -1;
                }
                // toggles sorting arrow state (well, hide one and diplay the other)
                parentNode_.querySelector(".header > .priority > img.arrow-down").style.display = order_ ? "block" : "none";
                parentNode_.querySelector(".header > .priority> img.arrow-up").style.display = order_ ? "none" : "block";
            }
            break;
    }

    rows = document.querySelectorAll("#todolist > .row");

    // At this point, we sorted in descending order without a care in the world ~~, so reverse results if they should be in ascending order
    if (order_) {
        // REMOVE THEM ALL! HAHAHAHAHAH!!!
        parentNode_.querySelectorAll("#todolist > .row").forEach((e) => e.remove());
        // REPLACE THEM ALL! HAHAHAHAHA!!! (damn that list of nodes don't have more methods!)
        parentNode_.querySelector(".header").after(...Array.from(rows).reverse());
    }
    
}