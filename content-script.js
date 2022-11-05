// This function finds the list of HTML nodes that are in the article feed at facebook.com.
// Any other facebook page, eg. the user page gives an empty list, so no action is taken.
// I only let this script to be initialized on other facebook pages too, as there is no real
// redirection between facebook pages, just the url changes which doesn't trigger the browser
// to initialize the script on the home page when it was navigated from other facebook pages.
function getArticles() {
    for (h3 of document.getElementsByTagName("h3")) {
        if (h3.innerHTML === "Hírfolyambejegyzések") {
            return h3.nextSibling.children
        }
    }
    return []
}

// The types of aticles to categorize.
var Type = {
    AD: "Hirdetés",
    RECOMMENDATION: "Neked javasoltak",
    REGULAR: "Nem hirdetés"
}

function getArticleType(article) {
    try {
        // The interesting part of the article starts quite deep in the node tree.
        var walk_in_11
        walk_in_11 = article.children[0].children[0].children[0]
            .children[0].children[0].children[0].children[0].children[0]
            .children[0].children[0].children[0]

        // The article consists of a header, a body and a footer.
        // This "for" loop gets the header and stops before checking the body.
        var header_section
        for (div of walk_in_11.children) {
            if (div.children.length == 0) continue

            // If the header includes the "Neked javasoltak" text, it can be already categorized as RECOMMENDATION
            if (div.innerHTML.includes(Type.RECOMMENDATION)) {
                return Type.RECOMMENDATION
            }

            if (div.children[0].children.length == 4) {
                header_section = div.children[0].children[1].children[0]
                break
            }
        }

        // If in the header under the title there is "Hirdetes" text instead of a date it is an AD.
        var title_and_date_or_ad_label = header_section.children[1].children[0]
        var date_or_ad_label = title_and_date_or_ad_label.children[1]
        if (date_or_ad_label.innerHTML.includes(Type.AD)) {
            return Type.AD
        }

        // This is a trick by FB. The ad's link is pointing to facebook.com until the mouse is hovered over,
        // but we need to locate it before that can happen. the other trick is that the ad label is not
        // constructed at its location, but somewere else, so we need to look it up by its ID.
        var ad_link = date_or_ad_label.getElementsByTagName("a")[0]
        var svgContent = ad_link.getElementsByTagName("use")[0]
        if (svgContent) {
            var svgText = document.getElementById(svgContent.href.baseVal.substring(1))
            if (svgText.innerHTML == Type.AD) {
                return Type.AD
            }
        }

    } catch (error) {
        // Any error may occur in cases where the article structure dosen't much the normal ones.
        // We can assume they are not even articles but friend recommendations, etc.
        return
    }

    // Every other article is regular article.
    return Type.REGULAR

}

setInterval(() => {
    for (article of getArticles()) {
        // To achieve a better performance every article is given with a custom HTML attribute 'reviewed' that
        // is set to true. Any article that has this attribute is skipped, so they only categroized once.
        if (article.getAttribute('reviewed')) continue

        switch (getArticleType(article)) {
            // In case, the article is categorized as AD or RECOMMENDATION,
            // the "display" style attribute is set to none
            case Type.AD:
            case Type.RECOMMENDATION:
                article.style.display = "none"
        }

        article.setAttribute('reviewed', true)
    }
}, 1000)