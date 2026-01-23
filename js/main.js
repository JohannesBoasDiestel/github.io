document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');

    if (nav) {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="index.html#showcase">Projects</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        `;
    }
});