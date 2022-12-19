// The types of articles to categorize.
var Type = {
    AD: "Hirdetés",
    RECOMMENDATION: "Neked javasoltak",
    REGULAR: "Nem hirdetés",
    OTHER: "Nem bejegyzés"
}

// Every second run the following review:
setInterval(() => {
    // Iterate over the articles of the article feed
    for (article of feed()) {
        // To achieve a better performance every article is given with a custom HTML attribute 'reviewed' that
        // is set to "true". Any article that has this attribute is skipped, so they only categroized once.
        if (article.getAttribute('reviewed')) continue
        article.setAttribute('reviewed', true)
        
        // In case, the article is categorized as AD or RECOMMENDATION,
        // the "display" style attribute is set to "none"
        switch (typeOf(article)) {
            case Type.AD:
            case Type.RECOMMENDATION:
                article.style.display = "none"
        }
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
        var walk_in_11 = article
            .children[0].children[0].children[0].children[0]
            .children[0].children[0].children[0].children[0]
            .children[0].children[0].children[0].children

        // Then we still need to find the meaningful part at this level.
        var header_section
        for (div of walk_in_11) {
            // A div node might be empty
            if (div.children.length == 0) continue

            // If the first grand child of the div node has 4 children, the meaningful part starts there.
            if (div.children[0].children[0].children.length == 4) {

                var meaningful_part = div.children[0].children[0]

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
        var useSvgElement = ad_link.getElementsByTagName("use")[0]
        if (useSvgElement) {
            var contentId = useSvgElement.href.baseVal.substring(1)
            var svgText = document.getElementById(contentId)
            if (svgText.innerHTML == Type.AD) {
                return Type.AD
            }
        }

    } catch (error) {
        // Any error may occur in cases where the article structure dosen't much the checked ones.
        // These are friend recommendations, etc.
        return Type.OTHER
    }

    // Every other article is regular article.
    return Type.REGULAR
}
