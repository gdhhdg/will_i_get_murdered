/**
 * Created by gunnerhatmaker on 7/19/18.
 */
$(document).ready(function() {
    let pageid;
    let pagename;

    function sortImages(data) {

    }

    function getPageID() {
        $.ajax('https://en.wikipedia.org/w/api.php', {
            data: {
                action: 'query',
                srsearch: locName,
                prop: 'images',
                list: 'search',
                generator: 'images',
                format: 'json',
                formatversion: 2,

            },
            "headers": {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },

            error: function () {
                $('#info').html('<p>An error has occurred</p>');
            },
            dataType: 'jsonp',
            success: function (data) {
                pageid = encodeURI(data.query.search["0"].pageid);
                pagename = data.query.search["0"].title.replace(/\s/g, '_');
                getImgURL();
            },
            type: 'GET'
        });
    }

    function getImgURL() {
        $.ajax('https://en.wikipedia.org/w/api.php', {
            data: {
                action: 'query',
                pageids: pageid,
                generator: 'images',
                format: 'json',
                prop: 'imageinfo',
                iiprop: 'url',
                formatversion: 2

            },
            "headers": {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },

            error: function () {
                $('#info').html('<p>An error has occurred</p>');
            },
            dataType: 'jsonp',
            success: function (data) {
                let wikiURL = String(data.query.pages["0"].imageinfo["0"].url);
                let wikiArray = [];
                for (i = 0; i < data.query.pages.length; i++){
                    wikiArray.push(String(data.query.pages[''+String(i)+''].imageinfo["0"].url));
                };
                //let picID = String(data.query.pages["0"].title);
                //picID = picID.replace(/\s/g, '_');
               // picID = picID.replace('File:', '');
                //$('#resultpic').attr('src','https://commons.wikimedia.org/wiki/File:Map_of_Massachusetts_highlighting_Plymouth_County.svg#/media/File:Map_of_Massachusetts_highlighting_Plymouth_County.svg');
                for (i = 0; i < wikiURL.length && i < 5; i++){
                    $('.slider ul.slides').append('<li> <img src=\"' + wikiArray[i] + '"></li>');
                }

                //$('#resultpic').attr('src',wikiURL);
                //$('.materialboxed').materialbox();
                $('.slider').slider();
                $('.slider').fadeIn();



            },
            type: 'GET'
        });

    }

    getPageID();

});