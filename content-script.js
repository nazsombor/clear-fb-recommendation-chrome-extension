function getArticles() {
    for (const h3 of document.getElementsByTagName("h3")) {
        if (h3.innerHTML === "Hírfolyambejegyzések") {
            return h3.nextSibling.children
        }
    }
}

var types = {
    hirdetes: "hirdetés",
    neked_javasoltak: "neked javasoltak",
    nem_hirdetes: "nem hirdetés"
}

function getArticleType(article) {
    var walk_in_11
    try {
        walk_in_11 = article.children[0].children[0].children[0]
            .children[0].children[0].children[0].children[0].children[0]
            .children[0].children[0].children[0]


        var header_section
        for (div of walk_in_11.children) {
            if (div.children.length == 0) continue

            if (div.innerHTML.includes("Neked javasoltak")) {
                return types.neked_javasoltak
            }

            if (div.children[0].children.length == 4) {
                header_section = div.children[0].children[1].children[0]
                break
            }
        }

        var title_and_type = header_section.children[1].children[0]
        var type_root = title_and_type.children[1]

        if (type_root.innerHTML.includes("Hirdetés")) {
            return types.hirdetes
        }

        for (ad of type_root.getElementsByTagName("a")) {
            if (ad.href == "https://www.facebook.com/#") {
                var svgContent = ad.getElementsByTagName("use")[0]
                if (svgContent) {
                    var svgText = document.getElementById(svgContent.href.baseVal.substring(1))
                    if (svgText.innerHTML == "Hirdetés") {
                        return types.hirdetes
                    }
                }
            }
        }

        return types.nem_hirdetes

    } catch (error) {
        //is not an article or unchecked case
        return
    }

}

setInterval(() => {
    for (article of getArticles()) {

        if (article.getAttribute('reviewed')) continue

        switch (getArticleType(article)) {
            case types.hirdetes:
            case types.neked_javasoltak:
                article.style.display = "none"
                break
        }
        article.setAttribute('reviewed', true)
    }
}, 1000)
