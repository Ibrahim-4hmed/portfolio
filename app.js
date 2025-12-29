//variables
const icon = document.getElementById("icon");
const borgar = document.querySelector(".borgar");
const ulNav = document.getElementById("small-screen");
const links = document.querySelectorAll(".nav-links a");
const root = document.documentElement;
const colorDiv = document.querySelectorAll(".colors span");
const sections = document.querySelectorAll("main > section")

//////////////////// light/dark theme ///////////////////
if (localStorage.getItem("theme") == null ) {
    localStorage.setItem("theme","light");// first time will be light
}

let localData = localStorage.getItem("theme")

if (localData == "light") {
    icon.src = "./images/moon.png";
    document.body.classList.remove("dark-mode");
} else if (localData == "dark") {
    icon.src = "./images/sun.png";
    document.body.classList.add("dark-mode");
}

icon.onclick = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        icon.src = "images/sun.png";
        localStorage.setItem("theme","dark");
    } else {
        icon.src = "images/moon.png";
        localStorage.setItem("theme","light");
    }
}

//////////// Borgar Menu /////////////

document.body.addEventListener("click", (e) => {
    if (e.target.className === "borgar"){
        ulNav.classList.toggle("sm-sc")
    } else {
        if (ulNav.classList.contains("sm-sc"))
            ulNav.classList.toggle("sm-sc")
    }
})


links.forEach(link => {
    link.addEventListener("click", (e) => {
        links.forEach(li => {
            li.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})

///////// colors //////////
function setColor(color, secColor) {
    //change the colors in root element
    root.style.setProperty("--main-color",color)
    root.style.setProperty("--scond-color",secColor)

    // Add the colors to local storage
    localStorage.setItem("selectedColor",color)
    localStorage.setItem("selectedSecColor",secColor)
}

// on load
window.addEventListener("load", () => {
    const savedColor = localStorage.getItem("selectedColor");
    const saveSecdColor = localStorage.getItem("selectedSecColor");

    if(savedColor && saveSecdColor) {
        root.style.setProperty("--main-color",savedColor)
        root.style.setProperty("--scond-color",saveSecdColor)
    }
})

document.getElementById("betrroly").onclick = () => {
    setColor("#007b83","#007b98")
}

document.getElementById("red").onclick = () => {
    setColor("#ef5350","#ef5380");
}

document.getElementById("green").onclick = () => {
    setColor("#66bb6a","#66bb7a");
}

document.getElementById("blue").onclick = () => {
    setColor("#42a5f5","#42afff");
}

///////// scrolling ////////////
const options = {
    threshold:0.3, //// 30% of section
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            links.forEach(link => link.classList.remove("active"))

            const id = entry.target.getAttribute("id");

            const activeLink = document.querySelector(`nav a[href="#${id}"]`);

            if(activeLink){
                activeLink.classList.add("active");
            }
        }
    });
}, options)

sections.forEach(section => observer.observe(section));


//form
const myForm = document.getElementById('my-form');

//popup
const popup = document.getElementById('sent')

myForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Stop page from refreshing
    
    // 1. Capture the data from the form
    const formData = new FormData(this);

    // 2. Send the data to Formspree using fetch
    try {
        const response = await fetch("https://formspree.io/f/xaqylwag", {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // 3. Success! Reset the form
            alert("Thanks for your message!");
            myForm.reset();
        } else {
            // Handle server-side errors (e.g., validation issues)
            alert("Oops! There was a problem submitting your form");
        }
    } catch (error) {
        // Handle network errors
        alert("Error: Could not connect to the server.");
    }
});