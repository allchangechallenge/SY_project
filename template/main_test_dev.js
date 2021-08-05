let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   // 1315, 898
let homePage = document.getElementById( 'homePage' ) ;
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

let SY_img = document.getElementById( 'SY_img' ) ;
let home_menu = document.getElementById( 'home_menu' ) ;
let scroll_menu = document.getElementById( 'menu' ) ;
let scroll_menu_icon = document.getElementById( 'menu_icon' ) ;
let scroll_bar = document.getElementById( 'scroll_bar' ) ;

let down = document.getElementById( 'down' ) ;
let down_left_360 = document.getElementById( 'down_left_360' ) ;
let down_right_360 = document.getElementById( 'down_right_360' ) ;

let home_icon = document.getElementById( 'home_icon' ) ;
let mag_icon = document.getElementById( 'mag_icon' ) ;
let walk_icon = document.getElementById( 'walk_icon' ) ;

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

function toVR( s ) {
    if ( vr != 1 ) {
        // --- Into VR camera ---
        cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
        cam.object3D.children[0].rotation.reorder( 'YXZ' ) ;  
        console.log( vrInfo[ s ][ 'vr_pos' ].x, vrInfo[ s ][ 'vr_pos' ].y, vrInfo[ s ][ 'vr_pos' ].z ) ;
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
                console.log( persPos, persRot ) ;
                
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

        btn1.style.backgroundColor = 'white' ;
        btn1.style.opacity = '100%' ;
        btn2.style.backgroundColor = 'darksalmon' ;
        btn2.style.opacity = '90%' ;

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

let p_arr = [] ;
let loadPage = document.getElementById( 'load' ) ;
// Prepare for scene
function createScene( makarScenes ) {

    let sceneObjs = document.createElement( 'a-entity' ) ;
    sceneObjs.setAttribute( 'id', 'sceneObjs' ) ;
    scene_360.appendChild( sceneObjs ) ;

    let allSceneObjLoaded = new Promise( ( resolve, reject ) => {
        for ( var i = 0 ; i < makarScenes.length ; i++ ) {
            if ( i > 3 ) break ; 
            let sceneObj = document.createElement( 'a-entity' ) ;
    
            sceneObj.setAttribute( 'id', makarScenes[ i ].scene_id ) ;
            sceneObjs.appendChild( sceneObj ) ;
    
            let asky = document.createElement( 'a-sky' ) ;
            asky.setAttribute( 'material', { 'src' : makarScenes[ i ].scene_skybox_url } ) ;
            asky.setAttribute( 'id', makarScenes[ i ].scene_id + '_sky' ) ;
            sceneObj.appendChild( asky ) ;
    
            for ( var j = 0 ; j < makarScenes[ i ].objs.length ; j ++ ) {
                let obj = makarScenes[ i ].objs[ j ] ;
    
                let position = new THREE.Vector3().fromArray( obj.transform[ 0 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
                let rotation = new THREE.Vector3().fromArray( obj.transform[ 1 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
                let scale = new THREE.Vector3().fromArray( obj.transform[ 2 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
    
                switch( obj.main_type ) {
                    case 'image' :
                        loadImage( obj, sceneObj, position, rotation, scale ) ; 
                        break ;
                }  
            }
        }

        Promise.all( p_arr ).then( ( resolve ) => {
            loadPage.style.visibility = 'hidden' ;
        } ) ;
    } ) ;
}

function loadImage( obj, sceneObj, position, rotation, scale ) {
    var loader = new THREE.TextureLoader ;
    loader.load( 
        obj.res_url,
        function( texture ) {
            
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
                        if ( evt.target == evt.currentTarget ) {
                            plane.object3D.children[0].scale.set( texture.image.width * 0.01, texture.image.height * 0.01, 1 ) ;
                            plane.object3D.children[0].rotation.set( 0, Math.PI, 0 ) ;
                        }
                    } ) ;
    
                    let pos = position.clone() ;
                    pos.multiply( new THREE.Vector3( -1, 1, 1 ) ) ;
                    plane.setAttribute( 'position', pos ) ;
    
                    let rot = rotation.clone() ;
                    rot.multiply( new THREE.Vector3( 1, -1, -1 ) ) ;
                    plane.setAttribute( 'rotation', rot ) ;
    
                    plane.setAttribute( 'scale', scale ) ;
                    
                    sceneObj.appendChild( plane ) ; 
                }
            } ) ;
            
            p_arr.push( oneLoadPromise ) ;
        }
    ) ;
    return p_arr ;
}

window.onresize = sizing ;

let down_right = document.getElementById( 'down_right_360' ) ;
let down_right_h = down_right.clientHeight ;
let down_right_w = down_right.clientWidth ;

function sizing() {
    // left corner font-size adjusting 
    console.log( 'sizing' ) ;
    var btn1 = document.getElementById( 'btn1' ) ;
    var btn2 = document.getElementById( 'btn2' ) ;
    btn1.style.fontSize = btn1.offsetWidth / 6.8 + 'px' ;
    btn2.style.fontSize = btn2.offsetWidth / 6.8 + 'px' ;

    home_menu.style.fontSize = home_menu.offsetWidth * 0.9 / 5 + 'px' ;

    if ( down_right.clientWidth != 0 && down_right.clientHeight != 0 ) {
        let d_h = Math.abs( down_right.clientHeight - down_right_h ) ;
        let d_w = Math.abs( down_right.clientWidth - down_right_w ) ;
        if ( d_h > d_w ) {
            map_area.style.width = down_right.clientWidth * 0.84 + 'px' ;
            map_area.style.height = map_area.clientWidth / 16 * 9 + 'px' ;           
        }
        else {
            map_area.style.height = down_right.clientHeight + 'px' ;
            map_area.style.width = map_area.clientHeight / 9 * 16 + 'px' ;          
        }
    } 

    var scroll_font = document.getElementById( 'scroll_bar' ) ;
    scroll_font.style.fontSize = scroll_font.offsetHeight / 20 + 'px' ;

    let lastPage = document.getElementById( 'lastPage' ) ;
    lastPage.style.fontSize = lastPage.offsetHeight + 'px' ;

}

function to360( scene_id ) {
    homePage.setAttribute( 'visible', 'false' ) ;
    scene_360.setAttribute( 'visible', 'true' ) ;
    sizing() ;
    console.log( 'Inside 360 scene' ) ;

    // Set all 360 scenes to false
    // Get the camera rotation
    let cam_rot = new THREE.Vector3() ;
    makarScenes.forEach( s => {
        if ( document.getElementById( s.scene_id ) ) {
            document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
            if ( s.scene_id == scene_id ) {
                cam_rot.x = s.camera_rotation.split( ',' )[ 0 ] * Math.PI / 180 ;
                cam_rot.y = s.camera_rotation.split( ',' )[ 1 ] * Math.PI / 180 ;
                cam_rot.z = s.camera_rotation.split( ',' )[ 2 ] * Math.PI / 180 ;
                console.log( cam_rot ) ;
            }
        }
    } ) ;

    tags.style.display = 'none' ;
    down.style.display = 'none' ;
    down_left_360.style.visibility = 'visible' ;
    down_right_360.style.display = 'inline' ;

    SY_img.src = 'source/sccp2.png'
    home_menu.style.visibility = 'hidden' ;
    scroll_menu_icon.style.visibility = 'visible' ;

    cam.setAttribute( 'camera', 'active', false ) ;
    cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
    
    cam_360.setAttribute( 'camera', 'active', true ) ;
    cam_360.object3D.position.y = 2 ;

    // console.log( 'cam_rot : ', cam_rot ) ;
    cam_360.components['look-controls'].pitchObject.rotation.x = cam_rot.x ;
    cam_360.components['look-controls'].yawObject.rotation.y = cam_rot.y ;

    document.getElementById( 'btn1' ).innerHTML = '360 View' ;

    // Active the right scene
    Object.values( id_to_scene ).forEach( v => {
        if ( scene_id == v ) document.getElementById( scene_id ).setAttribute( 'visible', 'true' ) ;
    } ) ;

    makarScenes.forEach( m => { 
        if ( m.scene_id == scene_id ) {
            theRaycaster( m.objs ) ;
        }
    } ) ;

    vr = 1 ;
    start_tick = 0 ;
}

function toOrbit() {
    homePage.setAttribute( 'visible', 'true' ) ;

    makarScenes.forEach( s => {
        if ( document.getElementById( s.scene_id ) ) document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
    } ) ;

    down.style.display = 'inline' ;
    down_left_360.style.visibility = 'hidden' ;
    down_right_360.style.display = 'none' ;

    SY_img.src = 'source/sccp.png'
    home_menu.style.visibility = 'visible' ;
    scroll_bar.style.visibility = 'hidden' ;
    scroll_menu_icon.style.visibility = 'hidden' ;

    mag_icon.style.visibility = 'visible' ;
    walk_icon.style.visibility = 'visible' ;

    cam.setAttribute( 'camera', 'active', true ) ;
    cam_360.setAttribute( 'camera', 'active', false ) ;

    tags.style.display = 'none' ;
    document.getElementById( 'btn1' ).innerHTML = 'Orbit View' ;      
    if ( vr != 0 ) {
        cam.setAttribute( 'look-controls', 'enabled : false' ) ;
        let sceneCamRec = cam.object3D.position.clone() ;
        cam.object3D.children[0].position.x = sceneCamRec.x ;
        cam.object3D.children[0].position.y = sceneCamRec.y ;
        cam.object3D.children[0].position.z = sceneCamRec.z ;
        // console.log( cam.object3D.children[0].position.x, cam.object3D.children[0].position.y, cam.object3D.children[0].position.z ) ;

        let rotRec = { 'x' : cam.components[ 'look-controls' ].pitchObject.rotation.x, 
                    'y' : cam.components[ 'look-controls' ].yawObject.rotation.y, 'z' : 0 } ;
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

        let target_pos = new THREE.Vector3( -8, 10, 15 ) ;

        // use lookat to determine the position to turn to 
        let a = cam.object3D.children[0].clone()
        a.position.x = target_pos.x ;
        a.position.y = target_pos.y ;
        a.position.z = target_pos.z ;
        a.lookAt( new THREE.Vector3( 0, 0, 0 ) ) ;
        a.rotation.reorder( 'YXZ' ) ;

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
                                                  
                },

                complete : function() {
                    cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
                }
        } ) ;
        btn2.style.backgroundColor = 'white' ;
        btn2.style.opacity = '100%' ;
        btn1.style.backgroundColor = 'darksalmon' ;
        btn1.style.opacity = '90%' ;

        vr = 0 ;
        
    } 
    tag = 0 ;
    home_icon.src = 'source/home2.png' ;
    mag_icon.src = 'source/magnifier.png' ;
    walk_icon.src = 'source/walk.png' ; 
}

function tag_apear( s ) {
    start_tick = 1 ;
    tags.style.display = 'inline' ;
    if ( s == 'm' ) {
        tag = 1 ;
        mag_icon.src = 'source/magnifier2.png' ;
        home_icon.src = 'source/home.png' ;
        walk_icon.src = 'source/walk.png' ;   
    }
    else {
        tag = 2 ;
        mag_icon.src = 'source/magnifier.png' ;
        home_icon.src = 'source/home.png' ; 
        walk_icon.src = 'source/walk2.png' ;           
    }
}

class menu { 
    constructor( element, start, end ) {
        this.el = element ;
        this.start = start ;
        this.end = end ;
    }
    hit_menu( visible ) {
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
    scroll_menu_ins.hit_menu( menu_on ) ;
    menu_on = ( menu_on ==  0 ) ? 1 : 0 ;
}

let map_on = 0 ;
function map_func() {
    const map_ins = new menu( map_area, '100%', '100%' ) ;
    map_ins.hit_menu( map_on ) ;
    map_on = ( map_on ==  0 ) ? 1 : 0 ;
}

// Raycaster API
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
        console.log( intersects ) ;
        // console.log( 'Intersects : ', intersects[ 0 ].object.el ) ;

        sceneObjs.forEach( obj => { if ( obj.obj_id == intersects[ 0 ].object.el.id ) {
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
                                  } ) ;
    } ) ;
}


// Down right map 
let map_dot_pos = {
    'b5e7eeb146954a73af7a9248cff19543' : [ 45, 43 ],
    'a344d7bf16d140879724eb2e62a440aa' : [ 58, 41 ],
    '18522ccb12004b1f8b8f3961858c4465' : [ 64, 69 ],
    '673149e6f1b24354a949ff60415c5481' : [ 35, 51 ]
}

let dots = document.getElementById( 'dots' ) ;

class map_dot {
    constructor( scene_id, x, y ) {   // start from the up left corner of the map
        this.sceneId = scene_id ;
        this.x = x.toString() + '%' ;
        this.y = y.toString() + '%' ;
    }
    create_dot( color ) {
        let div = document.createElement( 'div' ) ;
        let num = document.createTextNode( 'O' ) ;
        div.classList.add( 'points' ) ;
        div.style.top = this.y ;
        div.style.left = this.x ;

        div.addEventListener( 'click', function() {
            to360( tag ) ;
        })

        div.appendChild( num ) ;
        dots.appendChild( div ) ;
    }
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

