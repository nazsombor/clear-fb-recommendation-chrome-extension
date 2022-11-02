setInterval(
    () => {
        for (span of document.getElementsByTagName("span"))
            if(span.innerHTML.includes("Neked javasoltak")){
                console.log(span.parentNode.parentNode.parentNode
                    .parentNode.parentNode.parentNode
                    .parentNode.parentNode.parentNode)
                span.parentNode.parentNode.parentNode
                .parentNode.parentNode.parentNode
                .parentNode.parentNode.parentNode
                .style = "display: none"
            }
                
    },
    1000)