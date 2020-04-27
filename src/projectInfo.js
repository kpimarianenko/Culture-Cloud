const project = {
    name: "Culture Cloud",
    email: "culture.cloud@gmail.com",
    phone: "+38(050)6231231",
    skype: "CultureCloud",
    twitter: "https://twitter.com/culture-cloud",
    address: "Peremohy Ave, 37, Kyiv, 03056",
    price: 9.99,

    dev: {
        hostname: process.env["HOSTNAME"] || "http://localhost:4000"
    }
}

export default project;