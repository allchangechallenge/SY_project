let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   // 1315, 898
let loadPage = document.getElementById( 'load' ) ;

let homeModel = document.getElementById( 'homeModel' ) ;
let scene_360 = document.getElementById( '360Scene' ) ;
let tags = document.getElementById( 'tags' ) ;

let bCube = document.getElementById( 'b_cube' ) ;
let gCube = document.getElementById( 'g_cube') ; 
let yCube = document.getElementById( 'y_cube') ; 
let oCube = document.getElementById( 'o_cube') ;
let rCube = document.getElementById( 'r_cube') ; 
let pCube = document.getElementById( 'p_cube') ;
let cube_obj = [ bCube, gCube, yCube, oCube, rCube, pCube ] ;

// VR Object on the landscape model 
// Object for 360 views has its own class now !!
let g_info = { 'vr_pos' : gCube.object3D.position,
               'vr_dir' : new THREE.Vector3( 0, 3, 0 ) } ;
let o_info = { 'vr_pos' : oCube.object3D.position,
               'vr_dir' : new THREE.Vector3( 0, 3, 0 ) } ;

let vrInfo = {'g' : g_info, 'o' : o_info } ;

let homePage = document.getElementById( 'homePage' ) ;
let SY_icon = document.getElementById( 'SY_icon' ) ;
let SY_icon_360 = document.getElementById( 'SY_icon_360' ) ;
let icon_bottom = document.getElementById( 'icon_bottom' ) ;
let home_menu = document.getElementById( 'home_menu' ) ;
let middle_bottom = document.getElementById( 'middle_bottom' ) ;
let icon = document.getElementById( 'icon' ) ;

let templateVR = document.getElementById( 'template_vr' ) ;

let template360 = document.getElementById( 'template_360' ) ;
let scroll_menu = document.getElementById( 'menu' ) ;
let scroll_menu_back = document.getElementById( 'menu_back' ) ;
let scroll_menu_icon = document.getElementById( 'menu_icon' ) ;
let scroll_bar = document.getElementById( 'scroll_bar' ) ;
let icon_360 = document.getElementById( 'icon_360' ) ;
let mapPage = document.getElementById( 'mapPage' ) ;

let down_right = document.getElementById( 'down_right_360' ) ;

let map = document.getElementById( 'map' ) ;
let map_area = document.getElementById( 'map_area' ) ;
let loc_icon = document.getElementById( 'loc_icon' ) ;
let help_icon = document.getElementById( 'help_icon' ) ;

var cam = document.getElementById( 'cam' ) ;
var cam_360 = document.getElementById( '360_cam' ) ;

var cam_obj = document.getElementById( 'cam_obj' ) ;
var pers = document.getElementById( 'pers' ) ;

let vr = 0 ;   // Determine whether it's a VR mode
var tag = 0 ;   // Determine what kind of tags need to be display

var distance = {
                ratio : 0
               } ;
var duration = 1000 ;

let d_180 = THREE.Math.degToRad( 180 ) ;
let d_360 = THREE.Math.degToRad( 360 ) ;

// These 3D land scape models have the same order as ids in 'makarScenes' array
let id_to_scene = { 'b_tag' : 'b5e7eeb146954a73af7a9248cff19543',    // 導覽頁
                    'y_tag' : 'a344d7bf16d140879724eb2e62a440aa',   // 閱樂書店
                    'r_tag' : '18522ccb12004b1f8b8f3961858c4465',    // 生態景觀池
                    'p_tag' : '673149e6f1b24354a949ff60415c5481' }   // 琉璃工坊-1

let scene_in_menu = {
                    '松山菸廠歷史回顧' : 'd8d672ddb5894b9a92480fcf4649dfc4', 
                    '製菸工廠' : 'f7878d4894d946ffba58b453e8a13929',
                    '理葉工廠' : '94d7b04abd6e470ea1d289cb004b3a3c',
                    '雪茄工廠' : '8469b106c80446988d71204a04713fc5',
                    '切葉工廠' : 'bdc6eda7c23743e8ad5d6d242cf46bc9',
                    '醫護室' : 'c0b4f403106442f2a83295a4cb5542b6',
                    '巴洛克花園' : '3a11c445debc47939074a0c3297694df',
                    '澡堂' : '99808d3c19b14b3cab81b6821dab447d',
                    '多功能展演廳' : '15fd655f039d4da3a546ae174333de2f',
                    '松菸口' : 'b5e7eeb146954a73af7a9248cff19543',
                    '辦公廳舍與正門' : 'e6a9716f79fb4dce8fb27136340cba09',
                    '1-5號倉庫' : '8ed7325295d6420b85f9d796508cacaa',
                    '2號倉庫與輸送帶' : 'c7827db770f24a4e908cb81a91021f02',
                    '鍋爐房' : 'faaca8c43d854f1d8c5bf80a612dc8b0',
                    '機器修理廠' : 'fb1c680e707e4126901d4c6837c94c64',
                    '生態景觀池' : '18522ccb12004b1f8b8f3961858c4465',
                    '育嬰室' : 'c9d3fda09cf444aa8e1e90798e92997f' }

function toVR( s ) {
    if ( vr != 1 ) {
        // --- UI ---
        homePage.style.display = 'none' ;
        templateVR.style.display = 'block' ;

        // --- Into VR camera ---
        cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
        cam.object3D.children[0].rotation.reorder( 'YXZ' ) ;  
        // console.log( vrInfo[ s ][ 'vr_pos' ].x, vrInfo[ s ][ 'vr_pos' ].y, vrInfo[ s ][ 'vr_pos' ].z ) ;
        var persCam = {
            target : new THREE.Vector3( vrInfo[ s ][ 'vr_pos' ].x, vrInfo[ s ][ 'vr_pos' ].y, vrInfo[ s ][ 'vr_pos' ].z ),
            origin : new THREE.Vector3( cam.object3D.children[0].position.x, 
                                        cam.object3D.children[0].position.y, 
                                        cam.object3D.children[0].position.z,  ),

            rot_t : new THREE.Vector3( vrInfo[ s ][ 'vr_dir' ].x, vrInfo[ s ][ 'vr_dir' ].y, vrInfo[ s ][ 'vr_dir' ].z ),
            rot_o : new THREE.Vector3( cam.object3D.children[0].rotation.x, 
                                       cam.object3D.children[0].rotation.y, 
                                       cam.object3D.children[0].rotation.z,  ),
        } ;
        // console.log( persCam.target ) ;

        if ( ( persCam.rot_t.x - persCam.rot_o.x ) > d_180 ) persCam.rot_t.x -= d_360 ;
        if ( ( persCam.rot_t.x - persCam.rot_o.x ) < -1 * d_180 ) persCam.rot_t.x += d_360 ;
        if ( ( persCam.rot_t.y - persCam.rot_o.y ) > d_180 ) persCam.rot_t.y -= d_360 ;
        if ( ( persCam.rot_t.y - persCam.rot_o.y ) < -1 * d_180 ) persCam.rot_t.y += d_360 ;
        if ( ( persCam.rot_t.z - persCam.rot_o.z ) > d_180 ) persCam.rot_t.z -= d_360 ;
        if ( ( persCam.rot_t.z - persCam.rot_o.z ) < -1 * d_180 ) persCam.rot_t.z += d_360 ;

        var direction = {
            pers_pos : persCam.target.clone().add( persCam.origin.clone().multiplyScalar( -1 ) ), 
            pers_rot : persCam.rot_t.clone().add( persCam.rot_o.clone().multiplyScalar( -1 ) ), 
        } ;
        
        distance.ratio = 0 ;

        let vrCam = anime( {
            targets : distance,
            duration : duration,
            easing : 'linear',
            round : 1,
            ratio : 1000,
            update : function() {
                let persPos = new THREE.Vector3( persCam.origin.x + direction.pers_pos.x * distance.ratio / 1000,
                                                    persCam.origin.y + direction.pers_pos.y * distance.ratio / 1000,
                                                    persCam.origin.z + direction.pers_pos.z * distance.ratio / 1000 )
                let persRot = new THREE.Vector3( ( persCam.rot_o.x + direction.pers_rot.x * distance.ratio / 1000 ) ,
                                                    ( persCam.rot_o.y + direction.pers_rot.y * distance.ratio / 1000 ) ,
                                                    ( persCam.rot_o.z + direction.pers_rot.z * distance.ratio / 1000 ) )
                // console.log( persPos, persRot ) ;
                
                cam.object3D.children[0].position.x = persPos.x ;
                cam.object3D.children[0].position.y = persPos.y ;
                cam.object3D.children[0].position.z = persPos.z ;

                cam.object3D.children[0].rotation.x = persRot.x ;
                cam.object3D.children[0].rotation.y = persRot.y ;
                cam.object3D.children[0].rotation.z = persRot.z ;
            },

            complete : function() {
                cam.setAttribute( 'look-controls', 'enabled : true' ) ;

                cam.object3D.position.x = cam.object3D.children[0].position.x ;
                cam.object3D.position.y = cam.object3D.children[0].position.y ;
                cam.object3D.position.z = cam.object3D.children[0].position.z ;

                let temp = cam.object3D.children[0].rotation.clone() ;
                cam.components[ 'look-controls' ].pitchObject.rotation.x = temp.x ;
                cam.components[ 'look-controls' ].yawObject.rotation.y = temp.y ;

                cam.object3D.children[0].position.x = 0 ;
                cam.object3D.children[0].position.y = 0 ;
                cam.object3D.children[0].position.z = 0 ;

                cam.object3D.children[0].rotation.x = 0 ;
                cam.object3D.children[0].rotation.y = 0 ;
                cam.object3D.children[0].rotation.z = 0 ;
            }
        } ) ;

        for ( var i = 0 ; i < tag_obj.length ; i ++ ) tag_obj[ i ].style.visibility = "hidden" ;

        vr = 1 ;
        start_tick = 0 ;
    } 

}

// Different Spots on SongYan Map 
let SY_map = { 'b' : 'source/map/map6.png', 
               'y' : 'source/map/map3.png',
               'r' : 'source/map/map5.png',
               'p' : 'source/map/map8.png' }


// Get Makar data
let makarData = new Promise( ( resolve, reject ) => {
    let url = "https://ssl-api-makar-v3-apps.miflyservice.com/Makar/" ;
    let specUrl = url + "get_vr_proj_scene" ;
    let data = {
        "user_id": '1626f751-f2d6-4416-8e54-a1cb6b32f870',
        "proj_id": '1e8509d05668ca1945f2a39b6be9167a'
    } ;
    let request = {
        'ver' : '3.0.0',
        'cid' : 5,
        'data' : data 
    } ;

    let xhr = new XMLHttpRequest ;
    let jsonRequest = JSON.stringify( request ) ;

    xhr.open( 'POST', specUrl, true ) ;
    xhr.setRequestHeader( 'Content-Type', 'application/Json' ) ;
    xhr.responseType = 'json' ;
    xhr.onload = function ( e ) {
        resolve( xhr.response.data.scenes ) ;
    }
    xhr.send( jsonRequest ) ;        
} ) ;

let makarScenes = [] ;
makarData.then( function( resolvedData ) {
    makarScenes = resolvedData.map( ( x ) => x ) ;
    createScene( resolvedData ) ; 
    map_jump() ;
} ) ;

let sceneIdArr = [] ;   // Storing scene ids

// Prepare for scene
function createScene( makarScenes ) {  
    let sceneObjs = document.createElement( 'a-entity' ) ;
    sceneObjs.setAttribute( 'id', 'sceneObjs' ) ;
    scene_360.appendChild( sceneObjs ) ;

    let p_arr = [] ;     // Collecting object loading promises from everything needs loading
    let syModelLoadPromise = new Promise ( ( resolve, reject ) => {
        document.getElementById( 'homeModel' ).addEventListener( 'model-loaded', ( evt ) => {
            console.log( "model-loaded" ) ;
            resolve() ;
        } ) ; 
    } ) ;
    p_arr.push( syModelLoadPromise ) ;     

    // create all scene elements but oonly create the scenes on menu
    let allSceneObjLoaded = new Promise( ( resolve, reject ) => {
        for ( var i = 0 ; i < makarScenes.length ; i++ ) {
            if ( i > 5 ) break ; 
            let sceneObj = document.createElement( 'a-entity' ) ;
    
            sceneObj.setAttribute( 'id', makarScenes[ i ].scene_id ) ;
            sceneObjs.appendChild( sceneObj ) ;

            sceneIdArr.push( makarScenes[ i ].scene_id ) ;
    
            let asky = document.createElement( 'a-sky' ) ;
            asky.setAttribute( 'id', makarScenes[ i ].scene_id + '_sky' ) ;
            asky.setAttribute( 'material', { 'src' : makarScenes[ i ].scene_skybox_url } ) ;
            sceneObj.appendChild( asky ) ;
            // asky.addEventListener( 'loaded', ( e ) => { resolve( true ) } ) ;
    
            for ( var j = 0 ; j < makarScenes[ i ].objs.length ; j ++ ) {
                let obj = makarScenes[ i ].objs[ j ] ;
    
                let position = new THREE.Vector3().fromArray( obj.transform[ 0 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
                let rotation = new THREE.Vector3().fromArray( obj.transform[ 1 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
                let scale = new THREE.Vector3().fromArray( obj.transform[ 2 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
    
                switch( obj.main_type ) {
                    case 'image' :
                        let imgReturn = loadImage( obj, sceneObj, position, rotation, scale ) ; 
                        p_arr.push( imgReturn ) ;
                        break ;
                    case 'text' :
                        loadChinese( obj, sceneObj, position, rotation, scale ) ;
                        break ;
                }  
              
            }
            if ( i == ( makarScenes.length - 1 ) ) resolve() ;
        } 
    } ) ;
    // allSceneObjLoaded.then( () => { console.log( 'true' ) ; loadPage.style.visibility = 'hidden' } ) ;
    Promise.all( p_arr ).then( () => {
        console.log( 'sceneObjs promise resolved' ) ; loadPage.style.visibility = 'hidden' ;
    } ) ;
}

function setTransform( obj, position, rotation, scale ) {
    let pos = position.clone() ;
    pos.multiply( new THREE.Vector3( -1, 1, 1 ) ) ;

    let rot = rotation.clone() ;
    rot.multiply( new THREE.Vector3( 1, -1, -1 ) ) ;

    obj.setAttribute( 'position', pos ) ;
    obj.setAttribute( 'rotation', rot ) ;
    obj.setAttribute( 'scale', scale ) ;
}

function loadImage( obj, sceneObj, position, rotation, scale ) {
    
    this.loadPromise = function ( texture ) {
        var texture = new THREE.TextureLoader().load( obj.res_url ) ;
        // console.log( texture ) ;
        
        let url_split_length = obj.res_url.split( '.' ).length ;
        let img_form = obj.res_url.split( '.' )[ url_split_length - 1 ].toLowerCase() ;
        let oneLoadPromise = new Promise( ( resolve, reject ) => {
            let plane ;
            if ( img_form == 'jpg' || img_form == 'jpeg' || img_form == 'png' ) {
                        
                plane = document.createElement( 'a-plane' ) ;
                plane.setAttribute( 'src', obj.res_url ) ;
                plane.setAttribute( 'id', obj.obj_id ) ;
                plane.setAttribute( 'material', 'shader : flat ; side : double ; opacity : 1.0 ; transparent : true ; depthTest : true ; depthWrite : true' ) ;
    
                plane.addEventListener( 'loaded', function( evt ) {
                    // console.log( texture ) ; 
                    if ( evt.target == evt.currentTarget ) {
                        if ( texture.image ) {
                            plane.object3D.children[0].scale.set( texture.image.width * 1.2, texture.image.height * 1.2, 1 ) ;
                        }
                        
                        plane.object3D.children[0].rotation.set( 0, Math.PI, 0 ) ;
                    }
                } ) ;
    
                setTransform( plane, position, rotation, scale ) ;
                
                sceneObj.appendChild( plane ) ; 
                // console.log( 'append a-plane' ) ;
                resolve() ;
            }    
        } ) ; 
        return oneLoadPromise ;
    }

    return loadPromise() ;
}

// Time to load some Chinese text
function loadChinese( obj, sceneObj, position, rotation, scale ) {
    let anchor = document.createElement( 'a-entity' ) ;
    setTransform( anchor, position, rotation, scale ) ;
    anchor.setAttribute( 'id', obj.obj_id ) ;

    let text = document.createElement( 'a-text' ) ;
    textList = obj.content ;
    const chinese_regex = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    const isChinese = ( str ) => chinese_regex.test( str ) ;

    let str_len = 0 ;
    for ( var i = 0 ; i < textList.length ; i ++ ) {
        let c = textList[ i ] ;
        if ( isChinese( c ) ) str_len += 1.6 ;
        else if ( c == c.toUpperCase() && c != c.toLowerCase() ) str_len += 1 ;
        else if ( c == c.toLowerCase() && c != c.toUpperCase() ) str_len += 1 ;
        else str_len += 1.25 ;
    }

    text.setAttribute( 'value', obj.content ) ;
    text.setAttribute( 'width', str_len ) ;
    text.setAttribute( 'anchor', 'center' ) ;
    text.setAttribute( 'back-color', obj.back_color ) ;
    text.setAttribute( 'side', 'double' ) ;
    
    var fontUrl = "https://s3-ap-northeast-1.amazonaws.com/makar.webar.defaultobject/resource/fonts/" ;
    fonts = [ fontUrl + "1-msdf.json", fontUrl + "2-msdf.json", fontUrl + "3-msdf.json", fontUrl + "4-msdf.json", 
              fontUrl + "5-msdf.json", fontUrl + "6-msdf.json", fontUrl + "7-msdf.json", fontUrl + "8-msdf.json", 
              fontUrl + "9-msdf.json", fontUrl + "10-msdf.json", fontUrl + "11-msdf.json", fontUrl + "12-msdf.json" ] ;
    text.setAttribute( 'font', fonts ) ; 
    text.setAttribute( "negate", "false" ) ;
    text.setAttribute( 'crossorigin', 'anonymous' ) ;

    let rgb = obj.color.split( ',' ) ;
    let color = new THREE.Color( parseFloat( rgb[ 0 ] ), parseFloat( rgb[ 1 ] ), parseFloat( [ 2 ] ) ) ;
    text.setAttribute( 'color', '#' + color.getHexString() ) ;

    text.addEventListener( 'loaded', function( evt ) {
        if ( evt.target == evt.currentTarget ) {
            let r = new THREE.Vector3() ;
            r.set( 0, Math.PI, 0 ) ;
            text.object3D.rotation.setFromVector3( r ) ;
        }
    } ) ;

    anchor.appendChild( text ) ;

    if ( obj.obj_parent_id ) {
        let timeout = setInterval( function() {
            let parent = document.getElementById( obj.obj_parent_id ) ;
            if ( parent ) {
                if ( parent.object3D.children.length > 0 ) {
                    parent.appendChild( anchor ) ;
                    window.clearInterval( timeout ) ;
                }
            }
        }, 1 ) ;
    }
    else sceneObj.appendChild( anchor ) ;
}

// ----- Some flows that needs to go through once the web page is opened -----
function main() {
    sizing() ;
    buttonActive() ;
    tagAppear() ;
}

window.onresize = sizing ;

let down_right_h ;   // Initially equals to 0
let down_right_w ;
let dots = document.getElementById( 'dots' ) ;

function sizing() {
    // left corner font-size adjusting
    // console.log( 'sizing' ) ;

    let cur_down_right_h = down_right.clientHeight ;
    let cur_down_right_w = down_right.clientWidth ;

    let circle = document.getElementById( 'circle' ) ;
    circle.style.width = down_right.clientHeight * 0.0963 + 'px' ;
    circle.style.height = down_right.clientHeight * 0.0963 + 'px' ;

    // Adjusting by determing which scale is being changed the most 
    if ( Math.abs( cur_down_right_w - down_right_w ) > Math.abs( cur_down_right_h - down_right_h ) ) {
        map_area.style.width = down_right.clientWidth * 0.84 + 'px' ;
        map_area.style.height = map_area.clientWidth / 16 * 9 + 'px' ;           
    }
    else {
        map_area.style.height = down_right.clientHeight + 'px' ;
        map_area.style.width = map_area.clientHeight / 9 * 16 + 'px' ;          
    }

    down_right_h = down_right.clientHeight ;
    down_right_w = down_right.clientWidth ;

    dots.style.width = map_area.style.width ;
    dots.style.height = map_area.style.height ;

    scroll_bar.style.fontSize = scroll_bar.offsetHeight / 20 + 'px' ;

    // home_menu.style.fontSize = home_menu.offsetWidth / 6 + 'px' ;

}

function to360( scene_id ) {
    homeModel.setAttribute( 'visible', 'false' ) ;
    scene_360.setAttribute( 'visible', 'true' ) ;

    sizing() ;   
    // console.log( 'Inside 360 scene' ) ;

    // Set all 360 scenes to false
    // Get the camera rotation
    let cam_rot = new THREE.Vector3() ;
    makarScenes.forEach( s => {
        if ( document.getElementById( s.scene_id ) ) {
            document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
            if ( s.scene_id == scene_id ) {
                cam_rot.x = s.camera_rotation.split( ',' )[ 0 ] * ( -1 ) * Math.PI / 180 ;
                cam_rot.y = ( s.camera_rotation.split( ',' )[ 1 ] * ( - 1 ) + 180 ) * Math.PI / 180 ;
                cam_rot.z = s.camera_rotation.split( ',' )[ 2 ] * Math.PI / 180 ;
                // console.log( cam_rot ) ;
            }
        }
    } ) ;

    // --- UI ---
    homePage.style.display = 'none' ;
    templateVR.style.display = 'none' ;
    template360.style.display = 'block' ;
    SY_icon_360.style.visibility = 'visible' ;
    icon_bottom_360.style.visibility = 'visible' ;
    tags.style.display = 'none' ;

    scroll_menu.style.visibility = 'visible' ;
    scroll_menu_icon.style.visibility = 'visible' ;

    cam.setAttribute( 'camera', 'active', false ) ;
    cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
    
    cam_360.setAttribute( 'camera', 'active', true ) ;
    cam_360.object3D.position.y = 2 ;

    // console.log( 'cam_rot : ', cam_rot ) ;
    cam_360.components['look-controls'].pitchObject.rotation.x = cam_rot.x ;
    cam_360.components['look-controls'].yawObject.rotation.y = cam_rot.y ;

    // Active the right scene
    // Use an array to keep scene ids
    Object.values( sceneIdArr ).forEach( v => {
        if ( scene_id == v ) document.getElementById( scene_id ).setAttribute( 'visible', 'true' ) ;
    } ) ;

    // Attach raycaster on all the objects 
    makarScenes.forEach( m => { 
        if ( m.scene_id == scene_id ) {
            theRaycaster( m.objs ) ;
        }
    } ) ;

    // Move the yellow current point on the map
    if ( map_dot_pos[ scene_id ] ) {
        let current_point = new map_dot( scene_id, map_dot_pos[ scene_id ][ 0 ], map_dot_pos[ scene_id ][ 1 ] ) ;
        current_point.current_pos() ;
    }


    vr = 1 ;
    start_tick = 0 ;
}

function toOrbit() {
    homeModel.setAttribute( 'visible', 'true' ) ;
    scene_360.setAttribute( 'visible', 'false' ) ;

    makarScenes.forEach( s => {
        if ( document.getElementById( s.scene_id ) ) document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
    } ) ;

    template360.style.display = 'none' ;
    templateVR.style.display = 'none' ;
    homePage.style.display = 'block' ;
    
    home_menu.style.display = 'block' ; 
    home_menu.style.visibility = 'visible' ;

    // Closing each items which its visibility is independent from template360
    menu_on = 0 ;   // Back to initial state
    scroll_menu.style.visibility = 'hidden' ;
    scroll_bar.style.visibility = 'hidden' ;
    scroll_menu_icon.style.visibility = 'hidden' ;
    scroll_menu_back.style.visibility = 'hidden' ;

    cam.setAttribute( 'camera', 'active', true ) ;
    cam_360.setAttribute( 'camera', 'active', false ) ;
   
    if ( vr != 0 ) {
        cam.setAttribute( 'look-controls', 'enabled : false' ) ;
 
        let sceneCamRec = cam.object3D.position.clone() ;
        cam.object3D.children[0].position.x = sceneCamRec.x ;
        cam.object3D.children[0].position.y = sceneCamRec.y ;
        cam.object3D.children[0].position.z = sceneCamRec.z ;
        // console.log( cam.object3D.children[0].position.x, cam.object3D.children[0].position.y, cam.object3D.children[0].position.z ) ;

        let rotRec = { 'x' : cam.components[ 'look-controls' ].pitchObject.rotation.x, 
                       'y' : cam.components[ 'look-controls' ].yawObject.rotation.y, 'z' : 0 } ;

        cam.object3D.children[0].rotation.reorder( 'YXZ' ) ;
        cam.object3D.children[0].rotation.x = rotRec.x ;
        cam.object3D.children[0].rotation.y = rotRec.y ;
        cam.object3D.children[0].rotation.z = rotRec.z ;

        cam.object3D.position.x = 0 ;
        cam.object3D.position.y = 0 ;
        cam.object3D.position.z = 0 ;

        cam.components[ 'look-controls' ].yawObject.rotation.y = 0 ;
        cam.components[ 'look-controls' ].pitchObject.rotation.x = 0 ;
        cam.object3D.rotation.x = 0 ;
        cam.object3D.rotation.y = 0 ;
        cam.object3D.rotation.z = 0 ;

        let target_pos = new THREE.Vector3( -18, 7, 6 ) ;

        // use lookat to determine the position to turn to 
        let a = cam.object3D.children[0].clone()
        a.rotation.reorder( 'YXZ' ) ;
        a.position.x = target_pos.x ;
        a.position.y = target_pos.y ;
        a.position.z = target_pos.z ;
        a.lookAt( new THREE.Vector3( 0, 0, 0 ) ) ;
        
        distance.ratio = 0 ;

        var persCam = {
            target : new THREE.Vector3( target_pos.x, target_pos.y, target_pos.z ),
            origin : new THREE.Vector3( cam.object3D.children[0].position.x, 
                                        cam.object3D.children[0].position.y, 
                                        cam.object3D.children[0].position.z,  ),

            rot_t : new THREE.Vector3( a.rotation.x, a.rotation.y, a.rotation.z ),
            rot_o : new THREE.Vector3( rotRec.x, 
                                       rotRec.y, 
                                       rotRec.z,  ),
        } ;
        // console.log( persCam.target ) ;

        if ( ( persCam.rot_t.x - persCam.rot_o.x ) > d_180 ) persCam.rot_t.x -= d_360 ;
        if ( ( persCam.rot_t.x - persCam.rot_o.x ) < -1 * d_180 ) persCam.rot_t.x += d_360 ;
        if ( ( persCam.rot_t.y - persCam.rot_o.y ) > d_180 ) persCam.rot_t.y -= d_360 ;
        if ( ( persCam.rot_t.y - persCam.rot_o.y ) < -1 * d_180 ) persCam.rot_t.y += d_360 ;
        if ( ( persCam.rot_t.z - persCam.rot_o.z ) > d_180 ) persCam.rot_t.z -= d_360 ;
        if ( ( persCam.rot_t.z - persCam.rot_o.z ) < -1 * d_180 ) persCam.rot_t.z += d_360 ;
        // console.log( persCam.rot_o, persCam.rot_t ) ;

        var direction = {
            pers_pos : persCam.target.clone().sub( persCam.origin.clone() ), 
            pers_rot : persCam.rot_t.clone().sub( persCam.rot_o.clone() ), 
        } ;
        // console.log( direction.pers_rot ) ;

        let orbitCam = anime( {
                targets : distance,
                duration : duration,
                easing : 'linear',
                round : 1,
                ratio : 1000,
                update : function() {
                    let persPos = new THREE.Vector3( persCam.origin.x + direction.pers_pos.x * distance.ratio / 1000,
                                                    persCam.origin.y + direction.pers_pos.y * distance.ratio / 1000,
                                                    persCam.origin.z + direction.pers_pos.z * distance.ratio / 1000 )
                    let persRot = new THREE.Vector3( persCam.rot_o.x + direction.pers_rot.x * distance.ratio / 1000,
                                                    persCam.rot_o.y + direction.pers_rot.y * distance.ratio / 1000,
                                                    persCam.rot_o.z + direction.pers_rot.z * distance.ratio / 1000 )
 
                    cam.object3D.children[0].position.x = persPos.x ;
                    cam.object3D.children[0].position.y = persPos.y ;
                    cam.object3D.children[0].position.z = persPos.z ;

                    cam.object3D.children[0].rotation.x = persRot.x ;
                    cam.object3D.children[0].rotation.y = persRot.y ;
                    cam.object3D.children[0].rotation.z = persRot.z ;

                    // console.log( cam.object3D.children[0].rotation ) ;                                      
                },
                
                complete : function() {
                    cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
                }
        } ) ;

        vr = 0 ;
        
    } 
    tag = 0 ;
}

function tag_appear( s ) {
    // console.log( "TAG APPEAR FUNC", document.getElementById( 'button2-1' ).style.display ) ;
    start_tick = 1 ;
    tags.style.display = 'inline' ;
    if ( s == 'm' ) {
        tag = 1 ;
    }
    else {
        tag = 2 ;  
    }
}

// ----- 360 map function -----
class menu { 
    constructor( element, start, end ) {
        this.el = element ;
        this.start = start ;
        this.end = end ;
    }
    hit_menu() {
        let tline = gsap.timeline() ;
        if ( gsap.getProperty( this.el, 'visibility' ) == 'hidden' ) {
            tline.set( this.el, { 'visibility' : 'visible', scale : 1 } ) ;
            tline.from( this.el, { duration : 0.5, scale : 0, transformOrigin : this.start + " " + this.end } ) ;
        }
        else {
            tline.to( this.el, { duration : 0.2, scale : 0, transformOrigin : this.start + " " + this.end } ) ;
            tline.set( this.el, { visibility : 'hidden', scale : 1 } ) ;
        }      
    }
}

let menu_on = 0 ;
function click_menu() {
    const scroll_menu_ins = new menu( scroll_bar, '0%', '0%' ) ;
    scroll_menu_ins.hit_menu() ;
    
    if ( menu_on == 0 ) {
        scroll_menu_back.style.visibility = 'visible' ;
        icon_bottom_360.style.visibility = 'hidden' ;
    } else {
        scroll_menu_back.style.visibility = 'hidden' ;
        icon_bottom_360.style.visibility = 'visible' ;
    }

    menu_on = ( menu_on == 0 ) ? 1 : 0 ;
}

function map_func() {
    const map_ins = new menu( map_area, '100%', '100%' ) ;
    map_ins.hit_menu() ;
    sizing() ;
}

// Dots information for down right map
let map_dot_pos = {
    'b5e7eeb146954a73af7a9248cff19543' : [ 44, 43 ],
    'a344d7bf16d140879724eb2e62a440aa' : [ 57, 43 ],
    '18522ccb12004b1f8b8f3961858c4465' : [ 64, 79 ],
    '673149e6f1b24354a949ff60415c5481' : [ 33, 54 ]
}

class map_dot {
    constructor( scene_id, x, y ) {   // start from the up left corner of the map
        this.sceneId = scene_id ;
        this.x = x.toString() + '%' ;
        this.y = y.toString() + '%' ;
    }
    create_dot( tag ) {
        let div = document.createElement( 'div' ) ;
        div.classList.add( 'points' ) ;
        div.style.top = this.y ;
        div.style.left = this.x ;

        div.addEventListener( 'click', function() {
            to360( id_to_scene[ tag ] ) ;
        })

        dots.appendChild( div ) ;
    }
    current_pos() {
        let current = document.getElementById( 'circle' ) ;
        current.style.top = map_dot_pos[ this.sceneId ][ 1 ].toString() + '%' ;
        current.style.left = map_dot_pos[ this.sceneId ][ 0 ].toString() + '%' ;
        // console.log( map_dot_pos[ this.sceneId ][ 0 ], map_dot_pos[ this.sceneId ][ 1 ])
    }
}

// --- Openning Map Page ---
let mapPageOn = 0 ;
function openMapPage() {
    if ( mapPageOn == 0 ) mapPage.style.visibility = 'visible' ;
    else mapPage.style.visibility = 'hidden' ;
    mapPageOn = ( mapPageOn == 0 ) ? 1 : 0 ;
}

function map_jump() {
    const blue_dot = new map_dot( makarScenes[ 0 ].scene_id, map_dot_pos[ makarScenes[ 0 ].scene_id ][ 0 ], map_dot_pos[ makarScenes[ 0 ].scene_id ][ 1 ] ) ;
    blue_dot.create_dot( 'b_tag' ) ;

    const yellow_dot = new map_dot( makarScenes[ 1 ].scene_id, map_dot_pos[ makarScenes[ 1 ].scene_id ][ 0 ], map_dot_pos[ makarScenes[ 1 ].scene_id ][ 1 ] ) ;
    yellow_dot.create_dot( 'y_tag' ) ;
    
    const red_dot = new map_dot( makarScenes[ 2 ].scene_id, map_dot_pos[ makarScenes[ 2 ].scene_id ][ 0 ], map_dot_pos[ makarScenes[ 2 ].scene_id ][ 1 ] ) ;
    red_dot.create_dot( 'r_tag' ) ;

    const purple_dot = new map_dot( makarScenes[ 3 ].scene_id, map_dot_pos[ makarScenes[ 3 ].scene_id ][ 0 ], map_dot_pos[ makarScenes[ 3 ].scene_id ][ 1 ] ) ;
    purple_dot.create_dot( 'p_tag' ) ;
}

// --- Raycaster API ---
function theRaycaster( sceneObjs ) {
    let mouse = new THREE.Vector2() ;
    let raycaster = new THREE.Raycaster() ;
    
    aScene.canvas.addEventListener( 'mouseup', function( event ){
        if ( event.changedTouches ) {
            x = event.changedTouches[ 0 ].pageX ;
            y = event.changedTouches[ 0 ].pageY ;
        } else {
            x = event.clientX ;
            y = event.clientY ;
        }
        mouse.x = ( x / aScene.canvas.clientWidth ) * 2 - 1 ;
        mouse.y = - ( y / aScene.canvas.clientHeight ) * 2 + 1 ;

        raycaster.setFromCamera( mouse, aScene.camera ) ;
        let intersects = raycaster.intersectObject( aScene.object3D, true ) ;
        console.log( "Intersects : ", intersects ) ;
        console.log( 'First Intersect : ', intersects[ 0 ].object.el ) ;
        console.log( '\n' ) ;

        sceneObjs.forEach( obj => { 
            if ( intersects[ 0 ].object.el ) {
                if ( obj.obj_id == intersects[ 0 ].object.el.id ) {
                    if ( obj.behav ) {
                        obj.behav.forEach( b => { if ( b.simple_behav == 'SceneChange' ) { 
                            console.log( 'hit ' + b.scene_id ) ;
                            if ( document.getElementById( b.scene_id ) != undefined ) {
                                // console.log( 'hit ' + b.scene_id ) ;
                                to360( b.scene_id ) ; 
                            }
                            else {
                                document.getElementById( 'undef' ).style.visibility = 'visible' ;
                                setTimeout( function(){
                                    document.getElementById( 'undef' ).style.visibility = 'hidden' ;
                                }, 2000 ) ;
                            }
                                                                                            
                        } 
                        } )
                    }
                } 
            }

        } ) ;
    } ) ;
}

// Create a button object to do the control things
const buttonController = {

    buttonSelect : {
        "button1-1-hover" : 0 ,
        "button1-2-hover" : 0 ,
        "button1-6-hover" : 0 ,
    
        "button2-1-hover" : 0 ,
        "button2-2-hover" : 0 ,
    },

    buttonObj : {
        "button1-1" : document.getElementById( "button1-1" ),
        "button1-2" : document.getElementById( "button1-2" ),
        "button1-6" : document.getElementById( "button1-6" ),

        "button2-1" : document.getElementById( "button2-1" ),
        "button2-2" : document.getElementById( "button2-2" ),
    },

    buttonObj_hover : {
        "button1-1-hover" : document.getElementById( "button1-1-hover" ),
        "button1-2-hover" : document.getElementById( "button1-2-hover" ),
        "button1-6-hover" : document.getElementById( "button1-6-hover" ),

        "button2-1-hover" : document.getElementById( "button2-1-hover" ),
        "button2-2-hover" : document.getElementById( "button2-2-hover" ),
    },

    buttonObj_click : {
        "button1-1-click" : document.getElementById( "button1-1-click" ),
        "button1-2-click" : document.getElementById( "button1-2-click" ),
        "button1-6-click" : document.getElementById( "button1-6-click" ),

        "button2-1-click" : document.getElementById( "button2-1-click" ),
        "button2-2-click" : document.getElementById( "button2-2-click" ),
    },

    buttonChange : {
        'button1-1' : 'button1-1-hover',
        'button1-2' : 'button1-2-hover',
        'button1-6' : 'button1-6-hover',
        'button2-1' : 'button2-1-hover',
        'button2-2' : 'button2-2-hover',
        
        'button1-1-hover' : [ 'button1-1', 'button1-1-click' ], 
        'button1-2-hover' : [ 'button1-2', 'button1-2-click' ], 
        'button1-6-hover' : [ 'button1-6', 'button1-6-click' ], 
        'button2-1-hover' : [ 'button2-1', 'button2-1-click' ], 
        'button2-2-hover' : [ 'button2-2', 'button2-2-click' ], 

        'button1-1-click' : 'button1-1', 
        'button1-2-click' : 'button1-2', 
        'button1-6-click' : 'button1-6', 
        'button2-1-click' : 'button2-1', 
        'button2-2-click' : 'button2-2', 
    },

    allUnselect : function( clickBtn ) {
        if ( clickBtn == 'button2-1-click' || clickBtn == 'button2-2-click' ) {   // The small two buttons can set all buttons to normal
            Object.keys( this.buttonObj_click ).forEach( b => {
                if ( b != clickBtn ) {
                    this.buttonObj_click[ b ].style.visibility = 'hidden' ;
                    this.buttonObj[ this.buttonChange[ b ] ].style.visibility = 'visible' ;
                    this.buttonSelect[ b ] = 0 ;
                }
            } ) ;
        } else {
            Object.keys( this.buttonObj_click ).forEach( b => {   // Big three buttons should remove the small two buttons 
                if ( b != clickBtn ) {
                    this.buttonObj_click[ b ].style.visibility = 'hidden' ;
                    if ( b != 'button2-1-click' && b != 'button2-2-click' ) this.buttonObj[ this.buttonChange[ b ] ].style.visibility = 'visible' ;
                    this.buttonSelect[ b ] = 0 ;
                }
            } ) ;
        }

    }, 

    // --- Add hover event to normal button ---
    addEventToNormal : function() {
        Object.values( this.buttonObj ).forEach( btnEle => {
            btnEle.addEventListener( 'mouseover', function( event ) {
                btnEle.style.visibility = 'hidden' ;
                let ctrl = buttonController ;
                ctrl.buttonObj_hover[ ctrl.buttonChange[ btnEle.id ] ].style.visibility = 'visible' ;

                event.stopPropagation() ;
            } ) ;
        } ) ;
    }, 

    // --- Add mouseout & click event to hover button ---
    addEventToHover : function() {
        let ctrl = buttonController ;
        Object.values( this.buttonObj_hover ).forEach( btnEle => {
            btnEle.addEventListener( 'mouseout', function( event ) {      
                if ( ctrl.buttonSelect[ btnEle.id ] == 0 ) {
                    btnEle.style.visibility = 'hidden' ;
                    ctrl.buttonObj[ ctrl.buttonChange[ btnEle.id ][ 0 ] ].style.visibility = 'visible' ;
                    console.log( 'MOUSE OUT', event ) ;
                }  
                event.stopPropagation() ;
            } ) ;

            btnEle.addEventListener( 'click', function( event ) {
                ctrl.buttonSelect[ btnEle.id ] = 1 ;
                ctrl.allUnselect( ctrl.buttonChange[ btnEle.id ][ 1 ] ) ;
                btnEle.style.visibility = 'hidden' ;
                ctrl.buttonObj_click[ ctrl.buttonChange[ btnEle.id ][ 1 ] ].style.visibility = 'visible' ;
                
                event.stopPropagation() ;
            } ) ;
        } ) ;
    }, 

    // --- Add click event to selected button ---
    addEventToSelect : function() {
        Object.values( this.buttonObj_click ).forEach( btnEle => {
            btnEle.addEventListener( 'click', function( event ) {
                btnEle.style.visibility = 'hidden' ;
                let ctrl = buttonController ;
                ctrl.allUnselect( ctrl.buttonChange[ btnEle.id ][ 1 ]  ) ;
                ctrl.buttonObj[ ctrl.buttonChange[ btnEle.id ] ].style.visibility = 'visible' ;
                
                event.stopPropagation() ;
            } ) ;
        } ) ;
    }, 

} ; 

function showModelControl( n ) {   // n == 1 => SongYan Travel
    let b = buttonController ;
    let enter360 = [ b.buttonObj[ 'button2-1' ], b.buttonObj_hover[ 'button2-1-hover' ], b.buttonObj_click[ 'button2-1-click' ] ] ;
    let enterModel = [ b.buttonObj[ 'button2-2' ], b.buttonObj_hover[ 'button2-2-hover' ], b.buttonObj_click[ 'button2-2-click' ] ] ;

    if ( enter360[ 0 ].style.visibility == 'visible' || enterModel[ 0 ].style.visibility == 'visible' || n == 0 ) {
        enter360.forEach( ele => { ele.style.visibility = 'hidden' } ) ;
        enterModel.forEach( ele => { ele.style.visibility = 'hidden' } ) ;
        tags.style.display = 'none' ;
    } else {
        enter360[ 0 ].style.visibility = 'visible' ;
        enterModel[ 0 ].style.visibility = 'visible' ;
    }

    if ( n == 1 ) toOrbit() ;
 
}

// Use for activating button events in onload function
function buttonActive() {
    buttonController.addEventToNormal() ;
    buttonController.addEventToHover() ;
    buttonController.addEventToSelect() ;
}

// --- Attach tag_appearing function to button2-1 and button2-2
function tagAppear() {
    // console.log( btnController.buttonObj[ 'button2-1' ] ) ;
    let tagControll = [ buttonController.buttonObj_hover[ 'button2-1-hover' ], buttonController.buttonObj_hover[ 'button2-2-hover' ] ] ;
    tagControll.forEach( t => {
        t.addEventListener( 'click', function( event ) {
            // console.log( "222", tag ) ;
            if ( t.id == 'button2-1-hover' ) tag = 2 ;
            else tag = 1 ;

            start_tick = 1 ;
            tags.style.display = 'inline' ;
            event.stopPropagation() ;

            buttonController.buttonSelect[ t.id ] = 1 ;
        } ) ;
    } ) ;
}

// Full screen function
let screenExit = 0 ;
function fullScreen() {
    let elem = document.body ;

    if ( screenExit == 0 ) {
        if ( elem.requestFullscreen ) {
            elem.requestFullscreen() ;
            // console.log( elem.requestFullscreen ) ;
        } else if ( elem.webkitRequestFullscreen ) {
            elem.webkitRequestFullscreen() ;
        } else if ( elem.msRequestFullscreen ) {
            elem.msRequestFullscreen() ;
        }
    } else {
        // console.log( screenExit ) ;
        if ( document.exitFullscreen ) {
            document.exitFullscreen() ;
        } else if ( document.webkitExitFullscreen ) {
            document.webkitExitFullscreen() ;
        } else if ( document.msExitFullscreen ) {
            document.msExitFullscreen() ;
        }
    }

    screenExit = ( screenExit == 0 ) ? 1 : 0 ;
}

function goShop() {
    console.log( 'INSEDE GOSHOP' ) ;
    showModelControl( 0 ) ;
}

function goGame() {
    console.log( 'INSEDE GOGAME' ) ;
    showModelControl( 0 ) ;
}


