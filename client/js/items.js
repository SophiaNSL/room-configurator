
$(document).ready(function() {
  var items = [
   {
      "name" : "Closed Door",
      "image" : "models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.04.12_PM.png",
      "model" : "models/js/closed-door28x80_baked.js",
      "type" : "7",
      "price": '10',
      "partNumber": "111",
      "description": "Closed Door - Lorem ipsum dolor",
      "dimensions": "400x600",
      "weight": "10kg",
      "fabric": "Synthetic111",
      "legs": "Wooden111"
      
    }, 
    {
      "name" : "Open Door",
      "image" : "models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.22.46_PM.png",
      "model" : "models/js/open_door.js",
      "type" : "7",
      "price": "20",
      "partNumber": "112",
      "description": "Open Door - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "20kg",
      "fabric": "Synthetic112",
      "legs": "Wooden112"
    }, 
    {
      "name" : "Window",
      "image" : "models/thumbnails/thumbnail_window.png",
      "model" : "models/js/whitewindow.js",
      "type" : "3",
      "price": "30",
      "partNumber": "113",
      "description": "Window - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "30kg",
      "fabric": "Synthetic113",
      "legs": "Wooden113"
      
    }, 
    {
      "name" : "Chair",
      "image" : "models/thumbnails/thumbnail_Church-Chair-oak-white_1024x1024.jpg",
      "model" : "models/js/gus-churchchair-whiteoak.js",

      "type" : "1",
      "price": "40",
      "partNumber": "114",
      "description": "Chair - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "40kg",
      "fabric": "Synthetic114",
      "legs": "Wooden114"
    }, 
    {
      "name" : "Red Chair",
      "image" : "models/thumbnails/thumbnail_tn-orange.png",
      "model" : "models/js/ik-ekero-orange_baked.js",
      "type" : "1",
      "price": "50",
      "partNumber": "115",
      "description": "Red Chair - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "50kg",
      "fabric": "Synthetic115",
      "legs": "Wooden115"
    },
    {
      "name" : "Blue Chair",
      "image" : "models/thumbnails/thumbnail_ekero-blue3.png",
      "model" : "models/js/ik-ekero-blue_baked.js",
      "type" : "1",
      "price": "60",
      "partNumber": "116",
      "description": "Blue Chair - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "10kg",
      "fabric": "Synthetic116",
      "legs": "Wooden116"
    },
    {
      "name" : "Dresser - Dark Wood",
      "image" : "models/thumbnails/thumbnail_matera_dresser_5.png",
      "model" : "models/js/DWR_MATERA_DRESSER2.js",
      "type" : "1",
      "price": "70",
      "partNumber": "117",
      "description": "Dresser - Dark Wood - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "20kg",
      "fabric": "Synthetic117",
      "legs": "Wooden117"
    }, 
    {
      "name" : "Dresser - White",
      "image" : "models/thumbnails/thumbnail_img25o.jpg",
      "model" : "models/js/we-narrow6white_baked.js",
      "type" : "1",
      "price": "80",
      "partNumber": "118",
      "description": "Dresser - White - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "30kg",
      "fabric": "Synthetic118",
      "legs": "Wooden118"
    },  
    {
      "name" : "Bedside table - Shale",
      "image" : "models/thumbnails/thumbnail_Blu-Dot-Shale-Bedside-Table.jpg",
      "model" : "models/js/bd-shalebedside-smoke_baked.js",
      "type" : "1",
      "price": "90",
      "partNumber": "119",
      "description": "Bedside table - Shale - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "40kg",
      "fabric": "Synthetic119",
      "legs": "Wooden119"
    }, 
    {
      "name" : "Bedside table - White",
      "image" : "models/thumbnails/thumbnail_arch-white-oval-nightstand.jpg",
      "model" : "models/js/cb-archnight-white_baked.js",
      "type" : "1",
      "price": "100",
      "partNumber": "120",
      "description": "Bedside table - White - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "50kg",
      "fabric": "Synthetic120",
      "legs": "Wooden120"
    }, 
    {
      "name" : "Wardrobe - White",
      "image" : "models/thumbnails/thumbnail_TN-ikea-kvikine.png",
      "model" : "models/js/ik-kivine_baked.js",
      "type" : "1",
      "price": "10",
      "partNumber": "121",
      "description": "Wardrobe - White - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "10kg",
      "fabric": "Synthetic121",
      "legs": "Wooden121"
    }, 
    {
      "name" : "Full Bed",
      "image" : "models/thumbnails/thumbnail_nordli-bed-frame__0159270_PE315708_S4.JPG",
      "model" : "models/js/ik_nordli_full.js",
      "type" : "1",
      "price": "20",
      "partNumber": "122",
      "description": "Full Bed - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "20kg",
      "fabric": "Synthetic122",
      "legs": "Wooden122"
    }, 
    {
      "name" : "Bookshelf",
      "image" : "models/thumbnails/thumbnail_kendall-walnut-bookcase.jpg",
      "model" : "models/js/cb-kendallbookcasewalnut_baked.js",
      "type" : "1",
      "price": "30",
      "partNumber": "123",
      "description": "Bookshelf - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "30kg",
      "fabric": "Synthetic123",
      "legs": "Wooden123"
    }, 
        {
      "name" : "Media Console - White",
      "image" : "models/thumbnails/thumbnail_clapboard-white-60-media-console-1.jpg",
      "model" : "models/js/cb-clapboard_baked.js",
      "type" : "1",
      "price": "40",
      "partNumber": "124",
      "description": "Media Console - White - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "40kg",
      "fabric": "Synthetic124",
      "legs": "Wooden124"
    }, 
        {
      "name" : "Media Console - Black",
      "image" : "models/thumbnails/thumbnail_moore-60-media-console-1.jpg",
      "model" : "models/js/cb-moore_baked.js",
      "type" : "1",
      "price": "50",
      "partNumber": "125",
      "description": "Media Console - Black - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "50kg",
      "fabric": "Synthetic125",
      "legs": "Wooden125"
    }, 
       {
      "name" : "Sectional - Olive",
      "image" : "models/thumbnails/thumbnail_img21o.jpg",
      "model" : "models/js/we-crosby2piece-greenbaked.js",
      "type" : "1",
      "price": "60",
      "partNumber": "126",
      "description": "Sectional - Olive - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "10kg",
      "fabric": "Synthetic126",
      "legs": "Wooden126"
    }, 
    {
      "name" : "Sofa - Grey",
      "image" : "models/thumbnails/thumbnail_rochelle-sofa-3.jpg",
      "model" : "models/js/cb-rochelle-gray_baked.js",
      "type" : "1",
      "price": "70",
      "partNumber": "127",
      "description": "Sofa - Grey - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "20kg",
      "fabric": "Synthetic127",
      "legs": "Wooden127"
    }, 
        {
      "name" : "Wooden Trunk",
      "image" : "models/thumbnails/thumbnail_teca-storage-trunk.jpg",
      "model" : "models/js/cb-tecs_baked.js",
      "type" : "1",
      "price": "80",
      "partNumber": "128",
      "description": "Wooden Trunk - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "30kg",
      "fabric": "Synthetic128",
      "legs": "Wooden128"
    }, 
        {
      "name" : "Floor Lamp",
      "image" : "models/thumbnails/thumbnail_ore-white.png",
      "model" : "models/js/ore-3legged-white_baked.js",
      "type" : "1",
      "price": "90",
      "partNumber": "129",
      "description": "Floor Lamp - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "40kg",
      "fabric": "Synthetic129",
      "legs": "Wooden129"
    },
    {
      "name" : "Coffee Table - Wood",
      "image" : "models/thumbnails/thumbnail_stockholm-coffee-table__0181245_PE332924_S4.JPG",
      "model" : "models/js/ik-stockholmcoffee-brown.js",
      "type" : "1",
      "price": "100",
      "partNumber": "130",
      "description": "Coffee Table - Wood - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "50kg",
      "fabric": "Synthetic130",
      "legs": "Wooden130"
    }, 
    {
      "name" : "Side Table",
      "image" : "models/thumbnails/thumbnail_Screen_Shot_2014-02-21_at_1.24.58_PM.png",
      "model" : "models/js/GUSossingtonendtable.js",
      "type" : "1",
      "price": "10",
      "partNumber": "131",
      "description": "Side Table - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "10kg",
      "fabric": "Synthetic131",
      "legs": "Wooden131"
    }, 
    {
      "name" : "Dining Table",
      "image" : "models/thumbnails/thumbnail_scholar-dining-table.jpg",
      "model" : "models/js/cb-scholartable_baked.js",
      "type" : "1",
      "price": "20",
      "partNumber": "132",
      "description": "Dining Table - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "20kg",
      "fabric": "Synthetic132",
      "legs": "Wooden132"
    }, 
    {
      "name" : "Dining table",
      "image" : "models/thumbnails/thumbnail_Screen_Shot_2014-01-28_at_6.49.33_PM.png",
      "model" : "models/js/BlakeAvenuejoshuatreecheftable.js",
      "type" : "1",
      "price": "30",
      "partNumber": "133",
      "description": "Dining table - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "30kg",
      "fabric": "Synthetic133",
      "legs": "Wooden133"
    },
    {
      "name" : "Blue Rug",
      "image" : "models/thumbnails/thumbnail_cb-blue-block60x96.png",
      "model" : "models/js/cb-blue-block-60x96.js",
      "type" : "8",
      "price": "40",
      "partNumber": "134",
      "description": "Blue Rug - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "40kg",
      "fabric": "Synthetic134",
      "legs": "Wooden134"
    },
    {
      "name" : "NYC Poster",
      "image" : "models/thumbnails/thumbnail_nyc2.jpg",
      "model" : "models/js/nyc-poster2.js",
      "type" : "2",
      "price": "50",
      "partNumber": "135",
      "description": "NYC Poster - Lorem ipsum dolor sit",
      "dimensions": "400x600",
      "weight": "50kg",
      "fabric": "Synthetic135",
      "legs": "Wooden135"
    }

  ]


  var itemsDiv = $("#items-wrapper")
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var html = '<div class="col-sm-4">' +
                '<a class="thumbnail add-item" model-name="' + 
                item.name + 
                '" model-url="' +
                item.model +
                '" model-type="' +
                item.type + 
                '" model-price="' +
                item.price + 
                '" model-partNumber="' +
                item.partNumber + 
                '" model-description="' +
                item.description + 
                '" model-dimensions="' +
                item.dimensions + 
                '" model-weight="' +
                item.weight + 
                '" model-fabric="' +
                item.fabric + 
                '" model-legs="' +
                item.legs + 
                '"><img src="' +
                item.image + 
                '" alt="Add Item"> '+
                item.name + 
                '<p>$' +
                item.price +
                '</p>'
                '</a></div>';
    itemsDiv.append(html);
  }
});