const templates = require("./templates")

module.exports = {
    activities: [
        templates.commentAdded({
            commentText: "I've done some research into <a href='#'>this legislation</a> but it doesn't seem to apply here.",
            author: "Tim Harwood",
            date: "16/10/2018"
        }),
        {
            title: "Red Zulu",
            action: "Business added",
            html: `
            <p class="govuk-body">Role: <span class="govuk-!-font-weight-bold">Manufacturer</span></p>
            <a href="./business" class="mspsds-block-link">View business details</a>`
        },
        {
            title: "Red Zulu - Slap Wrap",
            action: "Product added",
            html: `
                <a href="./product-1" class="mspsds-block-link">View product details</a>`
        },
        {
            action: "Question created"
        }
    ]
}   