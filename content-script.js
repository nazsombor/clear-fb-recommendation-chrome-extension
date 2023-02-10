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
        // To achieve a better performance every article is given with a custom HTML attribute 'reviewed' that is set to "true".
        // Any article that has this attribute is skipped, so they only categroized once.
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
        // More steps are required to find the root of content.
        var root_1 = get_to_the_bottom(article)
        var root_2 = find_div_without_class_but_having_children(root_1)
        var root_3 = get_to_the_bottom(root_2)

        var note_section = get_to_the_bottom(root_3.children[0])
        var title_section = get_to_the_bottom(root_3.children[1])

        if (is_note_section_recommendation(note_section))
            return Type.RECOMMENDATION
        
        if (is_title_section_ad(title_section))
            return Type.AD
        
        // Every other article is regular article.
        return Type.REGULAR
        
    } catch (error) {
        // These are friend recommendations, etc.
        return Type.OTHER
    }
}

// If div has more than one children, return div otherwise check the same with the only child of div.
// This means it goes recursivly down of the child chain until it finds more than one children.
// It is necessary as FB has many divs inside divs and sometimes they just add one more div layer.
function get_to_the_bottom(div) {
    if (div.children.length > 1) return div
    return get_to_the_bottom(div.children[0])
}

// A specific query that I hope will be stable even if FB changes something in the structure.
function find_div_without_class_but_having_children(div) {
    for (child of div.children){
        if (child.classList.length == 0 && child.children.length > 0) return child
    }
}

// This checks if the very top section of the article contains "Neked Javasoltak" text.
function is_note_section_recommendation(note_section) {
    return note_section.innerHTML.includes(Type.RECOMMENDATION)
}

// This checks if in the title section instead of the date there is a "Hirdetés" text.
function is_title_section_ad(title_section) {
    var title_and_date_or_ad_label = title_section.children[1].children[0]
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
}
