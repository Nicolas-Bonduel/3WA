
class Base64Encoder {

    static encode(msg) {
        return btoa(msg);
    }

    static decode(msg) {
        return atob(msg);
    }

}

document.addEventListener('DOMContentLoaded', function() {
    // References & Sanity check
    const create_section = document.querySelector('#create-msg');
    if (!create_section) {
        alert("Oops, didn't find the create section in DOM..");
        return;
    }
    const inner_create_section = document.querySelector('#create-msg .create');
    if (!inner_create_section) {
        alert("Oops, didn't find the inner create section in DOM..");
        return;
    }
    const view_section = document.querySelector('#view-msg');
    if (!view_section) {
        alert("Oops, didn't find the view section in DOM..");
        return;
    }
    const secret_msg = document.querySelector('#msg');
    if (!secret_msg) {
        alert("Oops, didn't find the secret message input in DOM..");
        return;
    }
    const form = document.querySelector("form.create");
    if (!form) {
        alert("Oops, didn't find the form in DOM..");
        return;
    }
    const share_section = document.querySelector('#create-msg .share');
    if (!share_section) {
        alert("Oops, didn't find the share section in DOM..");
        return;
    }
    const secret_msg_link = document.querySelector('#create-msg .share .link');
    if (!secret_msg_link) {
        alert("Oops, didn't find the secret message link in DOM..");
        return;
    }
    const secret_msg_copy_link = document.querySelector('#create-msg .share .copy-link');
    if (!secret_msg_copy_link) {
        alert("Oops, didn't find the secret message copy link in DOM..");
        return;
    }
    const copy_link_notifier = document.querySelector('#create-msg .share .notifier');
    if (!copy_link_notifier) {
        alert("Oops, didn't find the copy link notifier in DOM..");
        return;
    }
    const secret_msg_follow_link = document.querySelector('#create-msg .share .follow-link');
    if (!secret_msg_follow_link) {
        alert("Oops, didn't find the secret message follow link in DOM..");
        return;
    }
    const secret_msg_decoded = document.querySelector('#view-msg .msg-decoded');
    if (!secret_msg_decoded) {
        alert("Oops, didn't find the decoded message in DOM..");
        return;
    }
    const back_link = document.querySelector('#view-msg a');
    if (!back_link) {
        alert("Oops, didn't find the back link in DOM..");
        return;
    }

    // Create Section
    if (window.location.hash == '') {
        create_section.style.display = "block";
        view_section.style.display = "none";

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //let msg = secret_msg.value;
            let msg = new FormData(form).get("msg");
            if (!msg)
                return;
    
            let msg_encoded = Base64Encoder.encode(msg);
    
            secret_msg_link.innerHTML = window.location.origin + "/index.html#" + msg_encoded;
            inner_create_section.style.display = "none";
            share_section.style.display = "flex";
        });

        secret_msg_copy_link.addEventListener('click', (e) => {
            navigator.clipboard.writeText(secret_msg_link.innerHTML);
            copy_link_notifier.style.display = "block";
        });

        secret_msg_follow_link.addEventListener('click', (e) => {
            window.location.href = secret_msg_link.innerHTML;
            window.location.reload();
        });
    }
    // View Section
    else {
        create_section.style.display = "none";
        view_section.style.display = "block";

        let hash = window.location.hash.slice(1);
        let msg_decoded = Base64Encoder.decode(hash);

        secret_msg_decoded.innerHTML = msg_decoded;

        back_link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = window.location.origin + "/index.html";
        })
    }

});