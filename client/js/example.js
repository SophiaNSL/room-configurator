/*
 * Camera Buttons
 */

/* import * as lShapeRoom from './LShape.json'; */
import lShapeRoom from './LShape.json' assert {type: 'json'};
import SqureShapeRoom from './SquareShape.json' assert {type: 'json'};

let lShape = JSON.stringify(lShapeRoom);
let SqureShape = JSON.stringify(SqureShapeRoom);

var CameraButtons = function(blueprint3d) {
  var orbitControls = blueprint3d.three.controls;
  var three = blueprint3d.three;
  var panSpeed = 30;
  var directions = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
  }

  function init() {
    // Camera controls
    $("#zoom-in").click(zoomIn);
    $("#zoom-out").click(zoomOut);  
    $("#zoom-in").dblclick(preventDefault);
    $("#zoom-out").dblclick(preventDefault);
    $("#2DButton").click(three.twoDCamera);
    $("#middleViewButton").click(three.middleCamera);
    $("#3DButton").click(three.threeDCamera);
    $(document).on('mouseup touchend', function(event) {
      var offCanvas = $('.off-canvas')
      if (!offCanvas.is(event.target) && offCanvas.has(event.target).length === 0) {
        $('body').removeClass('off-canvas-active')
      }
    });
    $("#reset-view").click(three.centerCamera)
    $("#move-left").click(function(){
      pan(directions.LEFT)
    })
    $("#move-right").click(function(){
      pan(directions.RIGHT)
    })
    $("#move-up").click(function(){
      pan(directions.UP)
    })
    $("#move-down").click(function(){
      pan(directions.DOWN)
    })

    $("#move-left").dblclick(preventDefault);
    $("#move-right").dblclick(preventDefault);
    $("#move-up").dblclick(preventDefault);
    $("#move-down").dblclick(preventDefault);
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function pan(direction) {
    switch (direction) {
      case directions.UP:
        orbitControls.panXY(0, panSpeed);
        break;
      case directions.DOWN:
        orbitControls.panXY(0, -panSpeed);
        break;
      case directions.LEFT:
        orbitControls.panXY(panSpeed, 0);
        break;
      case directions.RIGHT:
        orbitControls.panXY(-panSpeed, 0);
        break;
    }
  }

  function zoomIn(e) {
    e.preventDefault();
    orbitControls.dollyIn(1.1);
    orbitControls.update();
  }

  function zoomOut(e) {
    e.preventDefault();
    orbitControls.dollyOut(1.1);
    orbitControls.update();
  }

  init();
}

/*
 * Context menu for selected item
 */ 
var ContextMenu = function(blueprint3d) { 

  var scope = this;
  var selectedItem;
  var three = blueprint3d.three;

  function init() {
    $("#context-menu-delete").click(function(event) {
        selectedItem.remove();
        var itemsAdded = blueprint3d.model.scene.getItems();
        calculatePrice(itemsAdded);
        html(itemsAdded);
    });

    three.itemSelectedCallbacks.add(itemSelected);
    three.itemUnselectedCallbacks.add(itemUnselected);

    initResize();


    $("#fixed").click(function() {
        var checked = $(this).prop('checked');
        selectedItem.setFixed(checked);
    });
  }

  function cmToIn(cm) {
    return cm / 2.54;
  }

  function inToCm(inches) {
    return inches * 2.54;
  }


  function itemSelected(item) {
    selectedItem = item;
    $("#context-menu-name").text(item.metadata.itemName);
    $("#itemPrice").text(item.metadata.itemPrice);
    var itemsAdded = blueprint3d.model.scene.getItems();

    calculatePrice(itemsAdded);

    // room tab part list table
    html(itemsAdded);
    
    // right-side Buttons
    // generate pdf metadata, should refactor this to the summary buttons gourp

    var generateData = function(itemsAdded) {
      let resultData = [];
      for(let i = 0; i < itemsAdded.length; i++){
        resultData.push({
         id: (i+1),
         partNumber: itemsAdded[i].metadata.itemPartNumber,
         name: itemsAdded[i].metadata.itemName,
         price: itemsAdded[i].metadata.itemPrice,
         description: itemsAdded[i].metadata.itemDescription,
         dimensions: itemsAdded[i].metadata.itemDimensions,
         weight: itemsAdded[i].metadata.itemWeight,
         fabric: itemsAdded[i].metadata.itemFabric,
         legs: itemsAdded[i].metadata.itemLegs,
        });
     
    };
     return resultData;
  }

    $("#rs-quote-btn").off().on('click',
            function(){

              var itemsAdded = blueprint3d.model.scene.getItems();
              let itemsData = generateData(itemsAdded);
              let info = [];
                itemsData.forEach( item => {
                  info.push([item.id, item.partNumber, item.name, item.price, item.description, item.dimensions, item.weight, item.fabric, item.legs]);
                });

              let doc = new jsPDF();
              doc.autoTable({
                head:[['ID','Part No.','Name','Price','Description','Dimensions','Weight','Fabric','Legs']],
                body: info
              });
              doc.save('metadata.pdf');
            }  
          );


    // technical data table
    $("#itemDimensions").text(item.metadata.itemDimensions);
    $("#itemWeight").text(item.metadata.itemWeight);
    $("#itemFabric").text(item.metadata.itemFabric);
    $("#itemLegs").text(item.metadata.itemLegs);


    $("#item-width").val(cmToIn(selectedItem.getWidth()).toFixed(0));
    $("#item-height").val(cmToIn(selectedItem.getHeight()).toFixed(0));
    $("#item-depth").val(cmToIn(selectedItem.getDepth()).toFixed(0));

    $("#context-menu").show();

    $("#fixed").prop('checked', item.fixed);
  }
// Calculate total price
  function calculatePrice (itemsAdded) {
    var totalPrice = itemsAdded.reduce( (acc, item) => acc + item.metadata.itemPrice, 0 );
    $("#totalPrice").text('Total: $'+ totalPrice);
  }
  //HTML template
  function html (itemsAdded) {
    var roomTableBody = $("#romm-table-tbody");
    roomTableBody.empty();

    for(var i = 0; i < itemsAdded.length; i++){
      
      var item = itemsAdded[i];
      var htmlTemplate = '<tr><td>' + item.metadata.itemPartNumber + '</td>'+
                         '<td>' + item.metadata.itemDescription + '</td>'+
                         '<td>' + item.metadata.itemPrice + '</td></tr>';
      roomTableBody.append(htmlTemplate);
 
    }
  }

  function resize() {
    selectedItem.resize(
      inToCm($("#item-height").val()),
      inToCm($("#item-width").val()),
      inToCm($("#item-depth").val())
    );
  }

  function initResize() {
    $("#item-height").change(resize);
    $("#item-width").change(resize);
    $("#item-depth").change(resize);
  }

  function itemUnselected() {
    selectedItem = null;
    $("#context-menu").hide();
  }

  init();
}

/*
 * Loading modal for items
 */
var ModalEffects = function(blueprint3d) {

  var scope = this;
  var blueprint3d = blueprint3d;
  var itemsLoading = 0;

  this.setActiveItem = function(active) {
    itemSelected = active;
    update();
  }

  function update() {
    if (itemsLoading > 0) {
      $("#loading-modal").show();
    } else {
      $("#loading-modal").hide();
    }
  }

  function init() {
    blueprint3d.model.scene.itemLoadingCallbacks.add(function() {
      itemsLoading += 1;
      update();
    });

     blueprint3d.model.scene.itemLoadedCallbacks.add(function() {
      itemsLoading -= 1;
      update();
    });   

    update();
  }

  init();
}

/*
 * Side menu
 */
var SideMenu = function(blueprint3d, floorplanControls, modalEffects) {
  var blueprint3d = blueprint3d;
  var floorplanControls = floorplanControls;
  var modalEffects = modalEffects;
  var ACTIVE_CLASS = "active";

  var tabs = {
    "FLOORPLAN" : $("#floorplan_tab"), 
    "SHOP" : $("#items_tab"),
    "DESIGN" : $("#design_tab")
  }

  var scope = this;
  this.stateChangeCallbacks = $.Callbacks();
  this.states = {
    "DEFAULT" : {
      "div" : $("#viewer"),
      "tab" : tabs.DESIGN
    },
    "FLOORPLAN" : {
      "div" : $("#floorplanner"),
      "tab" : tabs.FLOORPLAN
    },
    "SHOP" : {
      "div" : $("#add-items"),
      "tab" : tabs.SHOP
    }
  }

  // sidebar state
  var currentState = scope.states.FLOORPLAN;

  function init() {
    for (var tab in tabs) {
      var elem = tabs[tab];
      elem.click(tabClicked(elem));
    }

    $("#update-floorplan").click(floorplanUpdate);

    initLeftMenu();

    blueprint3d.three.updateWindowSize();
    handleWindowResize();

    initItems();

    setCurrentState(scope.states.DEFAULT);
  }

  function floorplanUpdate() {
    setCurrentState(scope.states.DEFAULT);
  }

  function tabClicked(tab) {
    return function() {
      // Stop three from spinning
      blueprint3d.three.stopSpin();

      // Selected a new tab
      for (var key in scope.states) {
        var state = scope.states[key];
        if (state.tab == tab) {
          setCurrentState(state);
          break;
        }
      }
    }
  }
  
  function setCurrentState(newState) {

    if (currentState == newState) {
      return;
    }

    if (currentState.tab !== newState.tab) {
      if (currentState.tab != null) {
        currentState.tab.removeClass(ACTIVE_CLASS);          
      }
      if (newState.tab != null) {
        newState.tab.addClass(ACTIVE_CLASS);
      }
    }

    // set item unselected
    blueprint3d.three.getController().setSelectedObject(null);
    currentState.div.hide()
    newState.div.show()

    // custom actions
    if (newState == scope.states.FLOORPLAN) {
      floorplanControls.updateFloorplanView();
      floorplanControls.handleWindowResize();
    } 

    if (currentState == scope.states.FLOORPLAN) {
      blueprint3d.model.floorplan.update();
    }

    if (newState == scope.states.DEFAULT) {
      blueprint3d.three.updateWindowSize();
    }
 
    // set new state
    handleWindowResize();    
    currentState = newState;

    scope.stateChangeCallbacks.fire(newState);
  }

  function initLeftMenu() {
    $( window ).resize( handleWindowResize );
    handleWindowResize();
  }

  function handleWindowResize() {
    $(".sidebar").height(window.innerHeight);
    $("#add-items").height(window.innerHeight);

  };

  // TODO: this doesn't really belong here
  function initItems() {
    $("#add-items").find(".add-item").mousedown(function(e) {
      var modelUrl = $(this).attr("model-url");
      var itemType = parseInt($(this).attr("model-type"));
      var itemPrice = parseInt($(this).attr("model-price"));
      var itemPartNumber = parseInt($(this).attr("model-partNumber"));
      var itemDescription = $(this).attr("model-description");
      var itemDimensions= $(this).attr("model-dimensions");
      var itemWeight = $(this).attr("model-weight");
      var itemFabric = $(this).attr("model-fabric");
      var itemLegs = $(this).attr("model-legs");


      var metadata = {
        itemName: $(this).attr("model-name"),
        resizable: true,
        modelUrl: modelUrl,
        itemType: itemType,
        itemPrice: itemPrice,
        itemPartNumber: itemPartNumber,
        itemDescription: itemDescription,
        itemDimensions: itemDimensions,
        itemWeight: itemWeight,
        itemFabric: itemFabric,
        itemLegs: itemLegs
      }

      blueprint3d.model.scene.addItem(itemType, modelUrl, metadata); 

      setCurrentState(scope.states.DEFAULT);
    });

    
  }
 
  init();

}

/*
 * Change floor and wall textures
 */
var TextureSelector = function (blueprint3d, sideMenu) {

  var scope = this;
  var three = blueprint3d.three;
  var isAdmin = isAdmin;

  var currentTarget = null;

  function initTextureSelectors() {
    $(".texture-select-thumbnail").click(function(e) {
      var textureUrl = $(this).attr("texture-url");
      var textureStretch = ($(this).attr("texture-stretch") == "true");
      var textureScale = parseInt($(this).attr("texture-scale"));
      currentTarget.setTexture(textureUrl, textureStretch, textureScale);

      e.preventDefault();
    });
  }

  function init() {
    three.wallClicked.add(wallClicked);
    three.floorClicked.add(floorClicked);
    three.itemSelectedCallbacks.add(reset);
    three.nothingClicked.add(reset);
    sideMenu.stateChangeCallbacks.add(reset);
    initTextureSelectors();
  }

  function wallClicked(halfEdge) {
    currentTarget = halfEdge;
    $("#floorTexturesDiv").hide();  
    $("#wallTextures").show();  
  }

  function floorClicked(room) {
    currentTarget = room;
    $("#wallTextures").hide();  
    $("#floorTexturesDiv").show();  
  }

  function reset() {
    $("#wallTextures").hide();  
    $("#floorTexturesDiv").hide();  
  }

  init();
}

/*
 * Floorplanner controls
 */
// ViewerFloorplanner是一个class
var ViewerFloorplanner = function(blueprint3d) {

  var canvasWrapper = '#floorplanner';

  // buttons
  var move = '#move';
  var remove = '#delete';
  var draw = '#draw';

  var activeStlye = 'btn-primary disabled';

  this.floorplanner = blueprint3d.floorplanner;

  var scope = this;

  function init() {

    $( window ).resize( scope.handleWindowResize );
    scope.handleWindowResize();

    // mode buttons
    scope.floorplanner.modeResetCallbacks.add(function(mode) {
      $(draw).removeClass(activeStlye);
      $(remove).removeClass(activeStlye);
      $(move).removeClass(activeStlye);
      if (mode == BP3D.Floorplanner.floorplannerModes.MOVE) {
          $(move).addClass(activeStlye);
      } else if (mode == BP3D.Floorplanner.floorplannerModes.DRAW) {
          $(draw).addClass(activeStlye);
      } else if (mode == BP3D.Floorplanner.floorplannerModes.DELETE) {
          $(remove).addClass(activeStlye);
      }

      if (mode == BP3D.Floorplanner.floorplannerModes.DRAW) {
        $("#draw-walls-hint").show();
        scope.handleWindowResize();
      } else {
        $("#draw-walls-hint").hide();
      }
    });

    $(move).click(function(){
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.MOVE);
    });

    $(draw).click(function(){
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.DRAW);
    });

    $(remove).click(function(){
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.DELETE);
    });
  }

  this.updateFloorplanView = function() {
    scope.floorplanner.reset();
  }

  this.handleWindowResize = function() {
    $(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
    scope.floorplanner.resizeView();
  };

  init();
}; 

// new plan save plan load plan
var mainControls= function(blueprint3d) {
  var blueprint3d = blueprint3d;

  function newDesign() {
    blueprint3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
  }

  function loadDesign() {
    files = $("#loadFile").get(0).files;
    var reader  = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result;
        blueprint3d.model.loadSerialized(data);
    }
    reader.readAsText(files[0]);
  }

  function saveDesign() {
    var data = blueprint3d.model.exportSerialized();
    var a = window.document.createElement('a');
    var blob = new Blob([data], {type : 'text'});
    a.href = window.URL.createObjectURL(blob);
    a.download = 'design.blueprint3d';
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }

  function LShapeDesign () {
    blueprint3d.model.loadSerialized(lShape);
  }
  function SquareShapeDesign () {
    blueprint3d.model.loadSerialized(SqureShape);
  }

  function init() {
    $("#new").click(newDesign);
    $("#loadFile").change(loadDesign);
    $("#saveFile").click(saveDesign);
    $("#LShapeRoom").click(LShapeDesign);
    $("#SquareShapeRoom").click(SquareShapeDesign);
  }

  init();
}

//email link with the saved plan
var emailLink = function(blueprint3d) {
  var blueprint3d = blueprint3d;

  function saveDesign() {
    var data = blueprint3d.model.exportSerialized();
    // data is JSON format
    let queryString = data;
    console.log(queryString);
    
    let url = location.pathname;

    url = `${url}?${encodeURIComponent(queryString)}`;
    console.log(url);
    return url;
    }

    function getEmail() {
      $.getScript("https://unpkg.com/sweetalert/dist/sweetalert.min.js", function () {
          $(document).ready(function () {
              swal({
                  title: "Enter Email",
                  content: "input",
                  buttons: true,
              })
                  .then((entered) => {
  
                      if (entered) {
                          sendEmail(entered)
                      }
                  });
          });
          
      });
  }
  
  function sendEmail(email) {
      $.getScript("https://unpkg.com/sweetalert/dist/sweetalert.min.js", function () {
         
          let design = saveDesign();
          let url = window.location.origin + design;
          let templateParams = {
              name: email.split('@')[0],
              message: url,
              email: email
          };
  
          emailjs.send('service_yrtfh2f', 'template_2mh6xto', templateParams)
              .then(function (response) {
  
                  $(document).ready(function () {
                      swal({
                          title: "Email Sent",
                          text: "Email has successfully sent",
                          icon: "success",
                      })
  
                  });
  
              }, function (error) {
  
                  $(document).ready(function () {
                      swal({
                          title: "Email Failed",
                          text: "Check email is correct and try again",
                          icon: "error",
                      })
  
                  });
  
              });
      });
  }


//  payment gateway
function payment(){
      let itemsAll = blueprint3d.model.scene.getItems();
      // console.log(itemsAdded);
      let itemsAdded = [];
      for(let item of itemsAll){
        itemsAdded.push(item.metadata);
      }

      console.log(itemsAdded);

      let itemPay = {};

      for(let item of itemsAdded){
        if(itemPay[item.itemPartNumber] === undefined){
          itemPay[item.itemPartNumber] = 1;
        }else{
          itemPay[item.itemPartNumber] ++;
        }
      }

      console.log(itemPay);
      
      let data = [];
      for( let key in itemPay){
        let obj = {};
        obj.id = Number(key);
        obj.quantity = itemPay[key];
        data.push(obj);
      }

      console.log(data);

      fetch('http://localhost:3000/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              items: data,
          }),
      }).then(res => {
          if(res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
      })
      .then( ({url}) => {
          window.location = url;
          // console.log(url);
      })
      .catch(e => {
          console.error(e.error);
      });
}

  function init() {
    
    $("#rs-save-btn").click(getEmail);
    $("#rs-order-btn").click(payment);
   
  }

  init();
}



// Right side bar
$("#room_tab").click(
  function(){
    $("#room-tab-content").show();
    $("#objects-tab-content").hide();
  }  
);

$("#objects_tab").click(
  function(){
    $("#room-tab-content").hide();
    $("#objects-tab-content").show();
  }  
);


$(".side-panel-toggle").click(
  function(){
    $(".popout-sidebar-wrapper").toggleClass("side-panel-open");
    

  }
);



/*
 * Initialize!
 */

$(document).ready(function() {

  // main setup
  var opts = {
    floorplannerElement: 'floorplanner-canvas',
    threeElement: '#viewer',
    threeCanvasElement: 'three-canvas',
    textureDir: "models/textures/",
    widget: false
  }
  var blueprint3d = new BP3D.Blueprint3d(opts);

  var modalEffects = new ModalEffects(blueprint3d);
  var viewerFloorplanner = new ViewerFloorplanner(blueprint3d);
  var contextMenu = new ContextMenu(blueprint3d);
  var sideMenu = new SideMenu(blueprint3d, viewerFloorplanner, modalEffects);
  var textureSelector = new TextureSelector(blueprint3d, sideMenu);        
  var cameraButtons = new CameraButtons(blueprint3d);
  mainControls(blueprint3d);
  // emailLink function
  emailLink(blueprint3d);

  // This serialization format needs work
  // Load a simple rectangle room if the location.search = ''

  if(location.search){
    let qs = decodeURIComponent(location.search.substring(1));
    console.log(qs);
    blueprint3d.model.loadSerialized(qs);
  }else {
    blueprint3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
  }
  
});
