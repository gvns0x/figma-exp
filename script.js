var body = document.getElementsByTagName("body")[0];

/* function will create a new img element and add it to the DOM */
function imgToDom(name, link) {
    var name = document.createElement("img");
    name.setAttribute("class", name);
    name.setAttribute("src", link);
    body.appendChild(name);
}

var imgLink = "";

$.ajax({
    beforeSend: function (request) {
        request.setRequestHeader("X-FIGMA-TOKEN", "1303-43c30425-aa53-427b-a2d1-fcf8ac80fbd1");
    },
    dataType: "json",
    url: "https://api.figma.com/v1/files/aV2lZRMuhz2BaVcF0cyWku2K",
    success: function (data) {
        console.log(data)

        var grabWidth = 375; /* iPhone X width */

        /* pageContent's children are all the frames inside of the artboard */
        var pageContent = data["document"]["children"]["0"]["children"];
        
        /* For each frame in the artboard, */
        for (i = 0; i < pageContent.length; i++) {
            var frameID = "";

            /* if the width of a frame is the one on grabWidth, */
            if (pageContent[i]["absoluteBoundingBox"]["width"] === grabWidth) {

                /* get its ID in frameID */
                frameID = pageContent[i]["id"];
                console.log(frameID);

                /* - and print the image of that frame */
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("X-FIGMA-TOKEN", "1329-8c621800-6d71-4682-8017-fb77055cd0df");
                    },
                    dataType: "json",
                    url: "https://api.figma.com/v1/images/aV2lZRMuhz2BaVcF0cyWku2K?ids=" + frameID,

                    success: function (data) {
                        console.log(data)

                        imgLink = data["images"][frameID];

                        imgToDom("frame" + frameID, imgLink);

                    }
                });
            }
        }

        console.log(pageContent);
        console.log(frameID)

    }
});