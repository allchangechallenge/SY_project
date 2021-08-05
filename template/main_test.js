// import { resolve } from "path/posix";
// import { stringify } from "querystring";
// import { createSecureContext } from "tls";

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

function toVR( s ) {
    if ( vr != 1 ) {
        // --- Into VR camera ---
        cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
        // console.log( map_x, map_y ) ;
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

// 360 Skies
let sky_360 = { 'b' : document.getElementById( 'b_sky' ),       
                'y' : document.getElementById( 'y_sky' ),
                'r' : document.getElementById( 'r_sky' ),
                'p' : document.getElementById( 'p_sky' ) }
// Different Spots on SongYan Map 
let SY_map = { 'b' : 'source/map/map6.png', 
               'y' : 'source/map/map3.png',
               'r' : 'source/map/map5.png',
               'p' : 'source/map/map8.png' }
// Arrow position for each sky
// 2.856326,-1.558364E-07,-3.442506
let arrow1_pos = { 'b' : [ -5.652, 0, -2.376 ], 'y' : [ -1, -4, 5 ], 'r' : [ -1.9, -2.54, -5 ], 'p' : ( new THREE.Vector3( -2.856326, -1.558364E-07, -3.442506 ) ) }
let arrow2_pos = { 'y' : [ -6, -2.54, -2 ] };
let arrow3_pos = { 'y' : [ -3.14, -2.54, 3.8 ] } ;
// Arrow rotation for each sky
let arrow1_rot = { 'b' : [ 1.57, -1.9, 0 ], 'y' : [ 1.57, 3.2, 0 ], 'r' : [ 0, 1.57, 0 ], 'p' : ( new THREE.Vector3( 1.57, -2.44, 0 ) ) }
let arrow2_rot = { 'y' : [ 1, 1.57, -1.4 ] } ;
let arrow3_rot = { 'y' : [ 1.57, 0, 0 ] } ;
// Opacity and color are shared by three arrows
let arrow_opa = { 'b' : 1, 'y' : 1, 'r' : 1, 'p' : 1 } ;
let arrow_color = { 'b' : [ 1, 1, 1 ], 'y' : [ 1, 1, 1 ], 'r' : [ 1, 1, 1 ], 'p' : [ 0.9, 1, 1 ] } ;

let arrow1 = document.getElementById( 'arrow1' ) ;
let arrow2 = document.getElementById( 'arrow2' ) ;
let arrow3 = document.getElementById( 'arrow3' ) ;

let arrow_arr = [ arrow1, arrow2, arrow3 ] ;
let arrow_pos_arr = [ arrow1_pos, arrow2_pos, arrow3_pos ] ;
let arrow_rot_arr = [ arrow1_rot, arrow2_rot, arrow3_rot ] ;

class arrow {
    constructor( arrow, parameter ) {
        this.arrow = arrow ;
        this.para = parameter ;
        this.obj = document.querySelector ;
        this.pos_data = arrow_pos_arr ;
        this.rot_data = arrow_rot_arr ;
        this.color_data = arrow_color ;
        this.opa_data = arrow_opa ;
    }
    arrow_posing() {
        arrow_arr[ this.arrow ].setAttribute( 'visible', 'true' ) ;
        // arrow_arr[ this.arrow ].object3D.position.x = this.pos_data[ this.arrow ][ this.para ][ 0 ] ;
        // arrow_arr[ this.arrow ].object3D.position.y = this.pos_data[ this.arrow ][ this.para ][ 1 ] ;
        // arrow_arr[ this.arrow ].object3D.position.z = this.pos_data[ this.arrow ][ this.para ][ 2 ] ;
        arrow_arr[ this.arrow ].setAttribute( 'position', ( new THREE.Vector3( -2.856326, -1.558364E-07, -3.442506 ) ) ) ;
    }
    arrow_rotating() {
        // arrow_arr[ this.arrow ].object3D.rotation.x = this.rot_data[ this.arrow ][ this.para ][ 0 ] ;
        // arrow_arr[ this.arrow ].object3D.rotation.y = this.rot_data[ this.arrow ][ this.para ][ 1 ] ;
        // arrow_arr[ this.arrow ].object3D.rotation.z = this.rot_data[ this.arrow ][ this.para ][ 2 ] ;
        arrow_arr[ this.arrow ].setAttribute( 'rotation', ( new THREE.Vector3( 1.57, -2.44, 0 ) ) ) ;
    }
    arrow_styling() {
        arrow_arr[ this.arrow ].object3D.children[ 0 ].material.opacity = this.opa_data[ this.para ] ;
        arrow_arr[ this.arrow ].object3D.children[ 0 ].material.color.r = this.color_data[ this.para ][ 0 ] ;
        arrow_arr[ this.arrow ].object3D.children[ 0 ].material.color.g = this.color_data[ this.para ][ 1 ] ;
        arrow_arr[ this.arrow ].object3D.children[ 0 ].material.color.b = this.color_data[ this.para ][ 2 ] ;
    }

}

class object360 {
    constructor( parameter ) {
        this.para = parameter ;
        this.pic = sky_360[ parameter ] ;
        this.map = SY_map[ parameter ] ;
    }
    sky_select() {
        Object.keys( sky_360 ).forEach( s => {
            if ( s != this.para ) sky_360[ s ].setAttribute( 'visible', 'false' ) ;
            else sky_360[ s ].setAttribute( 'visible', 'true' ) ;
        } ) ;
    }
    map_select() {
        map.src = SY_map[ this.para ] ;
    }
    put_arrow( num ) {
        const first_arrow = new arrow( 0, this.para ) ;
        const second_arrow = new arrow( 1, this.para ) ;
        const third_arrow = new arrow( 2, this.para ) ;
        first_arrow.arrow_posing() ;
        first_arrow.arrow_rotating() ;
        first_arrow.arrow_styling() ;

        if ( num == 2 ) {
            second_arrow.arrow_posing() ;
            second_arrow.arrow_rotating() ;
            second_arrow.arrow_styling() ;
        }

        if ( num == 3 ) {
            second_arrow.arrow_posing() ;
            second_arrow.arrow_rotating() ;
            second_arrow.arrow_styling() ;
            
            third_arrow.arrow_posing() ;
            third_arrow.arrow_rotating() ;
            third_arrow.arrow_styling() ;
        }
    }
}

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

makarData.then( function( resolvedData ) {
    createScene( resolvedData ) ; 
} ) ;


// Prepare for scene
function createScene( makarScenes ) {

    let sceneObjs = document.createElement( 'a-entity' ) ;
    sceneObjs.setAttribute( 'id', 'sceneObjs' ) ;
    aScene.appendChild( sceneObjs ) ;

    for ( var i = 0 ; i < makarScenes.length ; i++ ) {
        if ( i > 1 ) break ; 
        let sceneObj = document.createElement( 'a-entity' ) ;

        sceneObj.setAttribute( 'id', makarScenes[ i ].scene_id ) ;
        sceneObj.setAttribute( 'visible', 'false' ) ;
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
    console.log( 'Ready' ) ;
}

function loadImage( obj, sceneObj, position, rotation, scale ) {
    var loader = new THREE.TextureLoader ;
    loader.load( 
        obj.res_url,
        function( texture ) {
            
            let url_split_length = obj.res_url.split( '.' ).length ;
            let img_form = obj.res_url.split( '.' )[ url_split_length - 1 ].toLowerCase() ;
           

            let plane ;
            if ( img_form == 'jpg' || img_form == 'jpeg' || img_form == 'png' ) {
                
                plane = document.createElement( 'a-plane' ) ;
                plane.setAttribute( 'src', obj.res_url ) ;
                plane.setAttribute( 'id', obj.obj_id ) ;
                plane.setAttribute( 'material', 'shader : flat ; side : double ; opacity : 1.0 ; trasparent : true ; depthTest : true ; depthWrite : true' ) ;

                plane.addEventListener( 'loaded', function( evt ) { 
                    if ( evt.target == evt.currentTarget ) {
                        plane.object3D.children[0].scale.set(texture.image.width * 0.01, texture.image.height * 0.01, 1);
                        
                        plane.object3D.children[0].rotation.set(0, Math.PI, 0);
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
        }
    )

}

function to360( s ) {
    homePage.setAttribute( 'visible', 'false' ) ;
    // scene_360.setAttribute( 'visible', 'true' ) ;

    tags.style.display = 'none' ;
    down.style.display = 'none' ;
    down_left_360.style.display = 'inline' ;
    down_right_360.style.display = 'inline' ;

    SY_img.src = 'source/sccp2.png'
    scroll_menu_icon.style.visibility = 'visible' ;

    cam.setAttribute( 'camera', 'active', false ) ;
    cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
    
    cam_360.setAttribute( 'camera', 'active', true ) ;
    cam_360.components["look-controls"].yawObject.rotation.y = -1.6 ;
    cam_360.components["look-controls"].pitchObject.rotation.x = -0.35 ;
    // cam.setAttribute( 'active', 'false' ) ;
    // document.getElementById( 'tags' ).style.display = 'none' ;
    document.getElementById( 'btn1' ).innerHTML = '360 View' ;

    switch( s ) {
        case 'b' :
            // const b = new object360( 'b' ) ;
            // b.sky_select() ;
            // b.map_select() ;
            // b.put_arrow( 1 ) ;
            
            document.getElementById( "b5e7eeb146954a73af7a9248cff19543" ).onloaded = function () {
                console.log( 'loaded' ) ;
                setAttribute( 'visible', 'true' ) ;
            }
            break ;
        case 'y' : 
            // const y = new object360( 'y' ) ;
            // y.sky_select() ;
            // y.map_select() ;
            // y.put_arrow( 3 ) ;
            document.getElementById( "a344d7bf16d140879724eb2e62a440aa" ).setAttribute( 'visible', 'true' ) ;
            break ;
        case 'r' : 
            const r = new object360( 'r' ) ;
            r.sky_select() ;
            r.map_select() ;
            r.put_arrow( 1 ) ;
            break ;
        case 'p' :
            const p = new object360( 'p' ) ;
            p.sky_select() ;
            p.map_select() ;
            p.put_arrow( 1 ) ;
            break ;
    }
    vr = 1 ;
    start_tick = 0 ;
}

function toOrbit() {
    homePage.setAttribute( 'visible', 'true' ) ;
    scene_360.setAttribute( 'visible', 'false' ) ;

    down.style.display = 'inline' ;
    down_left_360.style.display = 'none' ;
    down_right_360.style.display = 'none' ;

    SY_img.src = 'source/sccp.png'
    scroll_menu.style.visibility = 'hidden' ;
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
                    cam.object3D.children[0].rotation.reorder( 'YXZ' ) ;                                
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

