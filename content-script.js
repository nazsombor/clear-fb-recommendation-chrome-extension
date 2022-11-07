// The types of articles to categorize.
var Type = {
    AD: "Hirdetés",
    RECOMMENDATION: "Neked javasoltak",
    REGULAR: "Nem hirdetés"
}

// Every second run the following review:
setInterval(() => {
    for (article of feed()) {
        
        // To achieve a better performance every article is given with a custom HTML attribute 'reviewed' that
        // is set to "true". Any article that has this attribute is skipped, so they only categroized once.
        if (article.getAttribute('reviewed')) continue

        switch (typeOf(article)) {
            // In case, the article is categorized as AD or RECOMMENDATION,
            // the "display" style attribute is set to "none"
            case Type.AD:
            case Type.RECOMMENDATION:
                article.style.display = "none"
        }

        article.setAttribute('reviewed', true)
    }
}, 1000)


// This function finds the list of article HTML nodes that are in the feed at facebook.com.
function feed() {
    for (h3 of document.getElementsByTagName("h3")) {
        if (h3.innerHTML === "Hírfolyambejegyzések") {
            return h3.nextSibling.children
        }
    }
    return []
}

function typeOf(article) {
    try {
        // The interesting part of the article starts quite deep in the node tree.
        var walk_in_11 = article.children[0].children[0].children[0]
            .children[0].children[0].children[0].children[0].children[0]
            .children[0].children[0].children[0]


        // Then we still need to find the meaningful part at this level.
        var header_section
        for (div of walk_in_11.children) {
            // A div node might be empty
            if (div.children.length == 0) continue


            // If the first child of the div node has 4 children, the is the meaningful part starts there.
            if (div.children[0].children.length == 4) {

                var meaningful_part = div.children[0]

                // The first part is only visible when it contains the "Neked javasoltak" text.
                // If it so, then we can already categorize the article as RECOMMENDATION.
                if (meaningful_part.children[0].innerHTML.includes(Type.RECOMMENDATION)) {
                    return Type.RECOMMENDATION
                }

                // Otherwise we found the header in the second child.
                // (The body would be the third, and the footer the fourth.)
                header_section = meaningful_part.children[1].children[0]
                break
            }
        }

        // If in the header under the title there is "Hirdetes" text instead of a date it is an AD.
        var title_and_date_or_ad_label = header_section.children[1].children[0]
        var date_or_ad_label = title_and_date_or_ad_label.children[1]
        if (date_or_ad_label.innerHTML.includes(Type.AD)) {
            return Type.AD
        }

        // Some ad's link is tricky, the ad label is not constructed at its location,
        // but somewere else, so we need to look it up by its ID.
        var ad_link = date_or_ad_label.getElementsByTagName("a")[0]
        var svgContent = ad_link.getElementsByTagName("use")[0]
        if (svgContent) {
            var svgText = document.getElementById(svgContent.href.baseVal.substring(1))
            if (svgText.innerHTML == Type.AD) {
                return Type.AD
            }
        }

    } catch (error) {
        // Any error may occur in cases where the article structure dosen't much the checked ones.
        // These are friend recommendations, etc.
        return
    }

    // Every other article is regular article.
    return Type.REGULAR

}


