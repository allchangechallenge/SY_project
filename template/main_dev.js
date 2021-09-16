let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   // 1315, 898
let loadingLayout = document.getElementById( 'loadingLayout' ) ;

let homeModel = document.getElementById( 'homeModel' ) ;
let scene_360 = document.getElementById( 'scene_360' ) ;
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
let m2_info = { 'vr_pos' : m2_cube.object3D.position,
               'vr_dir' : new THREE.Vector3( 0, 3, 0 ) } ;

let vrInfo = {'g' : g_info, 'o' : o_info , 'm2': m2_info } ;

let homePage = document.getElementById( 'homePage' ) ;
let SY_icon = document.getElementById( 'SY_icon' ) ;
let SY_icon_360 = document.getElementById( 'SY_icon_360' ) ;
let icon_bottom = document.getElementById( 'icon_bottom' ) ;
let home_menu = document.getElementById( 'home_menu' ) ;
let middle_bottom = document.getElementById( 'middle_bottom' ) ;
let icon = document.getElementById( 'icon' ) ;

let templateVR = document.getElementById( 'template_vr' ) ;

let template360 = document.getElementById( 'template_360' ) ;
let icon_bottom_360 = document.getElementById( 'icon_bottom_360' ) ;

let scroll_menu = document.getElementById( 'menu' ) ;
let scroll_menu_icon = document.getElementById( 'menu_icon' ) ;
let scroll_bar = document.getElementById( 'scroll_bar' ) ;

let icon_360 = document.getElementById( 'icon_360' ) ;
let rwd_360_SY = document.getElementById( 'rwd_360_SY' ) ;
let rwd_menu = document.getElementById( 'rwd_menu' ) ;
let view_360_menu = document.getElementById( 'view_360_menu' ) ;

let rwd_scroll_bar = document.getElementById( 'rwd_scroll_bar' ) ;
let mapPage = document.getElementById( 'mapPage' ) ;
let s360_guide = document.getElementById( 's360_guide' ) ;

let down_right = document.getElementById( 'down_right_360' ) ;

let map = document.getElementById( 'map' ) ;
let map_area = document.getElementById( 'map_area' ) ;
let loc_icon = document.getElementById( 'loc_icon' ) ;
let help_icon = document.getElementById( 'help_icon' ) ;

let cam = document.getElementById( 'cam' ) ;
let cam_360 = document.getElementById( 'cam_360' ) ;

let cam_obj = document.getElementById( 'cam_obj' ) ;
let pers = document.getElementById( 'pers' ) ;

let rwd = 0 ; 
let mode = 0 ;   // orbit( 0 ) / vr( 1 ) / 360( 2 )
let tag = 0 ;   // Determine what kind of tags need to be display

let distance = {
                ratio : 0
               } ;
let duration = 1000 ;

let d_180 = THREE.Math.degToRad( 180 ) ;
let d_360 = THREE.Math.degToRad( 360 ) ;

// These 3D land scape models have the same order as ids in 'makarScenes' array
let id_to_scene = { 'b_tag' : 'b5e7eeb146954a73af7a9248cff19543',    // 導覽頁
                    'y_tag' : '3a11c445debc47939074a0c3297694df',   // 閱樂書店
                    'r_tag' : '18522ccb12004b1f8b8f3961858c4465',    // 生態景觀池
                    'p_tag' : '8469b106c80446988d71204a04713fc5' }   // 琉璃工坊-1
            
let scene_in_menu = {
                    // '松山菸廠歷史回顧' : 'd8d672ddb5894b9a92480fcf4649dfc4', 
                    // '製菸工廠' : 'f7878d4894d946ffba58b453e8a13929',
                    // '理葉工廠' : '94d7b04abd6e470ea1d289cb004b3a3c',
                    '雪茄工廠' : '8469b106c80446988d71204a04713fc5',
                    // '切葉工廠' : 'bdc6eda7c23743e8ad5d6d242cf46bc9',
                    // '醫護室' : 'c0b4f403106442f2a83295a4cb5542b6',
                    // '巴洛克花園' : '3a11c445debc47939074a0c3297694df', 
                    // '澡堂' : '99808d3c19b14b3cab81b6821dab447d',
                    // '多功能展演廳' : '15fd655f039d4da3a546ae174333de2f',
                    // '松菸口' : 'b5e7eeb146954a73af7a9248cff19543', 
                    // '辦公廳舍與正門' : 'e6a9716f79fb4dce8fb27136340cba09',
                    // '1-5號倉庫' : '8ed7325295d6420b85f9d796508cacaa',
                    // '2號倉庫與輸送帶' : 'c7827db770f24a4e908cb81a91021f02',
                    // '鍋爐房' : 'faaca8c43d854f1d8c5bf80a612dc8b0',
                    // '機器修理廠' : 'fb1c680e707e4126901d4c6837c94c64',
                    // '生態景觀池' : '18522ccb12004b1f8b8f3961858c4465', 
                    // '育嬰室' : 'c9d3fda09cf444aa8e1e90798e92997f' ,
                    }

function toVR( s ) {
    if ( mode != 1 ) {
        if ( rwd == 0 ) {
            // --- UI ---
            homePage.style.display = 'none' ;
            templateVR.style.display = 'block' ;
        }
        else if ( rwd == 1 ) {
            // --- Mobile UI ---
            RWD_UI.homePage_obj[ 'homeMobile' ].style.display = 'none' ;
            RWD_UI.vr_template_obj[ 'template_vr_mobile' ].style.display = 'none' ;
            RWD_UI.viewVR_obj[ 'template_vr_mobile_2' ].style.display = 'block' ;
        }

        // --- Into VR camera ---
        cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
        cam.object3D.children[0].rotation.reorder( 'YXZ' ) ;  
        // console.log( vrInfo[ s ][ 'vr_pos' ].x, vrInfo[ s ][ 'vr_pos' ].y, vrInfo[ s ][ 'vr_pos' ].z ) ;
        let persCam = {
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

        let direction = {
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

        // for ( let i = 0 ; i < tag_obj.length ; i ++ ) tag_obj[ i ].style.visibility = "hidden" ;

        gsap.set('.tagModel', {visibility: 'hidden'});
        gsap.set('.tag360', {visibility: 'hidden'});
        
        mode = 1 ;
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
let sceneObjLoadList = {} ;

//// 紀錄當前所在的「場景物件」「場景資訊」「場景本體」
let currentSceneObjs = [];
let currentSceneObject3D = null;

makarData.then( function( resolvedData ) {
    makarScenes = resolvedData.map( ( x ) => x ) ;
    let pScenes =  createScene( resolvedData ) ; 

    //// 假如開發時不想要載入模型，就取消這部份
    let pRoot = loadRootModel.loadGLTFModel();

    Promise.all( pScenes.concat( pRoot )  ).then(function( ret ){
        console.log( ' xxx ', ret  );
        main() ;
        map_jump() ;
        theRaycaster();
        loadingLayout.style.visibility = 'hidden' ;
    });
    
} ) ;

let sceneIdArr = [] ;   // Storing scene ids

// Prepare for scene
function createScene( makarScenes ) {  
    let sceneObjs = document.createElement( 'a-entity' ) ;
    sceneObjs.setAttribute( 'id', 'sceneObjs' ) ;
    scene_360.appendChild( sceneObjs ) ;

    let p_arr = [] ;     // Collecting object loading promises from everything needs loading
    

    // create all scene DOM elements but only create objects of the scenes on menu
    for ( let i = 0 ; i < makarScenes.length ; i++ ) {
        // if ( i > 10 ) break ; 
        let sceneObj = document.createElement( 'a-entity' ) ;

        sceneObj.setAttribute( 'id', makarScenes[ i ].scene_id ) ;
        sceneObjs.appendChild( sceneObj ) ;

        sceneIdArr.push( makarScenes[ i ].scene_id ) ;

        let asky = document.createElement( 'a-sky' ) ;
        asky.setAttribute( 'id', makarScenes[ i ].scene_id + '_sky' ) ;
        
        sceneObj.appendChild( asky ) ;

        //// 初始只有載入少數場景。紀錄狀態
        if ( Object.values( scene_in_menu ).includes( makarScenes[ i ].scene_id ) ) {

            let oneSceneLoadPromise = sceneObjsLoad( makarScenes[ i ], sceneObj ) ;  
            p_arr.push( oneSceneLoadPromise ) ;

            let pSky = new Promise(function( pSkyResolve, reject ){
                asky.addEventListener('materialtextureloaded', function(evt){
                    // console.log('_createScene: _asky materialtextureloaded' , i , asky  );
                    sceneObj.loadState = 1; //// 載入狀態 0.未載入 1. 物件載入中  2. 物件載入完成
                    pSkyResolve(asky);
                });
            });

            p_arr.push( pSky ) ;
            asky.setAttribute( 'material', { 'src' : makarScenes[ i ].scene_skybox_url } ) ;

            Promise.all([ pSky, oneSceneLoadPromise ]).then(function(){
                sceneObj.loadState = 2; //// 載入狀態 0.未載入 1. 物件載入中  2. 物件載入完成
            });
        
            // console.log( makarScenes[ i ].scene_id ) ;
            // console.log( oneSceneLoadPromise , makarScenes[ i ].scene_id ) ;
        }else{
            sceneObj.loadState = 0; //// 載入狀態 0.未載入 1. 物件載入中  2. 物件載入完成
        }

    } 


    return p_arr;
}

function sceneObjsLoad( oneSceneObj, sceneObj ) {
    let img_p = [] ;
    let sceneObjsLoadPromise = new Promise( ( resolve, reject ) => {
            for ( let i = 0 ; i < oneSceneObj.objs.length ; i ++ ) {
                let obj = oneSceneObj.objs[ i ] ;
        
                let position = new THREE.Vector3().fromArray( obj.transform[ 0 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
                let rotation = new THREE.Vector3().fromArray( obj.transform[ 1 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
                let scale = new THREE.Vector3().fromArray( obj.transform[ 2 ].split( ',' ).map( function( x ) { return Number( x ) } ) ) ;
            
                switch( obj.main_type ) {
                    case 'image' :
                        let imgReturn = loadImage( obj, sceneObj, position, rotation, scale ) ; 
                        img_p.push( imgReturn ) ;
                        // console.log( oneSceneObj.scene_name, imgReturn ) ;
                        // p_arr.push( imgReturn ) ;
                        break ;
                    case 'text' :
                        // loadChinese( obj, sceneObj, position, rotation, scale ) ;

                        loadText( obj, sceneObj, position, rotation, scale ) ;
                        break ;
                }
            }
            Promise.all( img_p ).then( () => { 
                resolve(oneSceneObj) ; 

                // console.log(' _sceneObjsLoad: resolve ', oneSceneObj );

            } ) ;
        }
    ) ;

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
    
            let texture = new THREE.TextureLoader().load( obj.res_url ) ;
            
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
                            let timeoutID = setInterval( function () {
                                if (texture.image){ 
                                    plane.object3D.children[0].scale.set( texture.image.width * 0.01 , texture.image.height * 0.01 , 1 ) ;
                                    resolve() ;
                                    window.clearInterval(timeoutID);
                                }
                            }, 20 );
                            
                            plane.object3D.children[0].rotation.set( 0, Math.PI, 0 ) ;
                        }
                    } ) ;
        
                    setTransform( plane, position, rotation, scale ) ;
                    
                    sceneObj.appendChild( plane ) ; 
                    
                }    
            } ) ; 
            return oneLoadPromise ;
    
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
        for ( let i = 0 ; i < textList.length ; i ++ ) {
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
        
        let fontUrl = "https://s3-ap-northeast-1.amazonaws.com/makar.webar.defaultobject/resource/fonts/" ;
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


    function loadText( obj, sceneObj , position, rotation, scale ){

        let anchor = document.createElement('a-entity');
            
        setTransform(anchor, position, rotation, scale);

        anchor.setAttribute( "id", obj.obj_id );//// fei add 
        if (obj.behav){
            anchor.setAttribute('class', "clickable" ); //// fei add
        }else if (obj.main_type == "button"){
            anchor.setAttribute('class', "clickable" );
        }
        else{
            anchor.setAttribute('class', "unclickable" ); //// fei add
        }
        

        let textEntity = document.createElement('a-text');

        textEntity.setAttribute("geometry","primitive:plane; width: auto; height: auto; skipCache: true;");
        textEntity.setAttribute("material","opacity: 0.0 ; depthWrite:false; color:#000000; side:double;");

        textList = obj.content.split('\n');
        let longestSplit = 0;
        const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
        const isChinese = (str) => REGEX_CHINESE.test(str);
        for (let i = 0; i < textList.length;i++) {
            textLength = 0;
            for (let j = 0; j <  textList[i].length; j++) {
                if(isChinese(textList[i][j])){  // chinese
                    textLength += 1.6;
                }
                else if(textList[i][j] == textList[i][j].toUpperCase() && textList[i][j] != textList[i][j].toLowerCase()){ // upper-case
                    textLength += 1;
                }
                else if(textList[i][j] == textList[i][j].toLowerCase() && textList[i][j] != textList[i][j].toUpperCase()){ // lower-case
                    // textLength += 0.85;
                    textLength += 1;
                }
                else if(!isNaN(textList[i][j] * 1)){ //numeric
                    textLength += 1;
                }
                else{ // other symbols
                    textLength += 1.25;
                }
                
            }
            // console.log( textList[i], textLength);
            if (textLength > longestSplit) longestSplit =textLength;
        }
        textEntity.setAttribute("value",obj.content);
        textEntity.setAttribute("width",longestSplit*0.08)	// 4 for 0.46  per 0.115
        textEntity.setAttribute("wrap-count",longestSplit); // 1 for 1 
        textEntity.setAttribute("anchor","center");
        textEntity.setAttribute("align","left");
        
        textEntity.setAttribute("backcolor", obj.back_color ); //// 這邊注意一重點，自己設定的 attribute 不能使用 『大寫英文』，否則aframe data內會找不到，參照 text物件
        textEntity.setAttribute("textcolor", obj.color ); //// 暫時沒有用，假如未來文字支援『透明度』功能時候會需要

        textEntity.setAttribute("side","double");

        // textEntity.setAttribute("font","font/bbttf-msdf.json");
        var fontUrl = "https://s3-ap-northeast-1.amazonaws.com/makar.webar.defaultobject/resource/fonts/";
        fonts = [  fontUrl + "1-msdf.json", fontUrl + "2-msdf.json" , fontUrl + "3-msdf.json", fontUrl + "4-msdf.json", fontUrl + "5-msdf.json", 
                    fontUrl + "6-msdf.json", fontUrl + "7-msdf.json" , fontUrl + "8-msdf.json", fontUrl + "9-msdf.json", fontUrl + "10-msdf.json", 
                    fontUrl + "11-msdf.json", fontUrl + "12-msdf.json" ];
        // fonts = [ fontUrl + "1-msdf.json" ];
        textEntity.setAttribute("font", fonts );

        textEntity.setAttribute("negate","false");
        textEntity.setAttribute('crossorigin', 'anonymous');

        let rgb = obj.color.split(",");
        let color = new THREE.Color(parseFloat(rgb[0]),parseFloat(rgb[1]),parseFloat(rgb[2])); 
        textEntity.setAttribute("color", "#"+color.getHexString());

        if (obj.behav){
            textEntity.setAttribute('class', "clickable" ); //// fei add
        }else if (obj.main_type == "button"){
            textEntity.setAttribute('class', "clickable" ); //// fei add
        }
        else{
            textEntity.setAttribute('class', "unclickable" ); //// fei add
        }        

        textEntity.addEventListener("loaded", function(evt){
            if (evt.target == evt.currentTarget){

                let r = new THREE.Vector3();
                r.set(0,Math.PI, 0); 
                textEntity.object3D.rotation.setFromVector3(r);

            }
        });


        ///
        anchor.appendChild(textEntity);
        ///
        
        if(obj.obj_parent_id){
            let timeoutID = setInterval( function () {
                let parent = document.getElementById(obj.obj_parent_id);
                if (parent){ 
                    if(parent.hasLoaded > 0){
                        parent.appendChild(anchor);
                        window.clearInterval(timeoutID);
                    } 
                }
            }, 100 );
        }
        else{
            sceneObj.appendChild(anchor);
        }

     
    }

    return sceneObjsLoadPromise ;
}

// ----- Some flows that needs to go through once the web page is opened -----
function main() {
    sizing() ;
    buttonActive() ;
    if ( window.innerWidth < 990 ) {
        rwd = 1 ; 
    }
    else tagAppear() ;
}

window.onresize = sizing ;

function sizing() {
    if ( home_menu.offsetHeight && home_menu.offsetHeight != 0 ) home_menu.style.width = home_menu.offsetHeight * 0.62 + 'px' ;
    scroll_bar.style.fontSize = scroll_bar.offsetHeight / 20 + 'px' ;
    console.log( "HOMEMENU SIIZING" ) ;
}

function to360( scene_id ) {
    homeModel.setAttribute( 'visible', 'false' ) ;
    scene_360.setAttribute( 'visible', 'true' ) ;

    // old_sizing() ;   
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

    // --- Computer UI ---
    if ( rwd == 0 ) {
        homePage.style.display = 'none' ;
        templateVR.style.display = 'none' ;
        template360.style.display = 'block' ;
        SY_icon_360.style.visibility = 'visible' ;
        icon_bottom_360.style.visibility = 'visible' ;
        tags.style.display = 'none' ;
    
        scroll_menu_icon.style.visibility = 'visible' ;
    }
    // --- Mobile UI ---
    else if ( rwd == 1 ) {
        RWD_UI.homePage_obj[ 'homeMobile' ].style.display = 'none' ;
        RWD_UI.view360_obj[ 'view_360_mobile' ].style.display = 'block' ;
        RWD_UI.exitMobileTemplate() ;
    }

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
            // theRaycaster( m.objs ) ;
            
            if (document.getElementById( scene_id )){
                currentSceneObject3D = document.getElementById( scene_id ).object3D;
                currentSceneObjs = m.objs;
                // console.log(' _to360: set current scene info ' , currentSceneObject3D  );
            }

        }
    } ) ;

    // Move the yellow current point on the map
    if ( map_dot_pos[ scene_id ] ) {
        let current_point = new map_dot( scene_id, map_dot_pos[ scene_id ][ 0 ], map_dot_pos[ scene_id ][ 1 ] ) ;
        current_point.current_pos() ;
    }

    mode = 2 ;
    start_tick = 0 ;
}

function toOrbit() {
    console.log( 'VRVR', mode ) ; 
    homeModel.setAttribute( 'visible', 'true' ) ;
    scene_360.setAttribute( 'visible', 'false' ) ;

    makarScenes.forEach( s => {
        if ( document.getElementById( s.scene_id ) ) document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
    } ) ;

    if ( rwd == 0 ) {
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
    }
    else if ( rwd == 1 ) {
        RWD_UI.view360_obj[ 'view_360_mobile' ].style.display = 'none' ;
        RWD_UI.viewVR_obj[ 'template_vr_mobile_2' ].style.display = 'none' ;
        RWD_UI.homePage_obj[ 'homeMobile' ].style.display = 'block' ;
        RWD_UI.homePage_obj[ 'up' ].style.pointerEvents = 'initial' ;
        RWD_UI.homePage_obj[ 'down' ].style.pointerEvents = 'initial' ;
    }

    cam.setAttribute( 'camera', 'active', true ) ;
    cam_360.setAttribute( 'camera', 'active', false ) ;
   
    if ( mode != 0 ) {
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

        let persCam = {
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

        let direction = {
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

                    console.log( '***', cam.object3D.rotation , cam.object3D.children[0].rotation ) ;    

                    // console.log( cam.object3D.children[0].rotation ) ;                                      
                },
                
                complete : function() {
                    cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
                }
        } ) ;
        mode = 0 ;
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
let rwd_menu_on = 0 ;
function click_menu( n ) {
    if ( n == 1 ) {
        const scroll_menu_ins = new menu( scroll_bar, '0%', '0%' ) ;
        scroll_menu_ins.hit_menu() ;
        
        if ( menu_on == 0 ) {
            scroll_menu.style.visibility = 'visible' ;
            icon_bottom_360.style.visibility = 'hidden' ;
        } else {
            scroll_menu.style.visibility = 'hidden' ;
            icon_bottom_360.style.visibility = 'visible' ;
        }
    
        menu_on = ( menu_on == 0 ) ? 1 : 0 ;
    }
    else if ( n == 2 ) {
        const scroll_menu_ins = new menu( rwd_scroll_bar, '0%', '0%' ) ;
        scroll_menu_ins.hit_menu() ;
        
        if ( rwd_menu_on == 0 ) {
            view_360_menu.style.visibility = 'visible' ;
            rwd_360_SY.style.visibility = 'visible' ;
            rwd_menu.style.transform = 'translateX( 31.3vh )' ;
        } else {
            view_360_menu.style.visibility = 'hidden' ;
            rwd_360_SY.style.visibility = 'hidden' ;
            rwd_menu.style.transform = 'translateX( 0px )' ;
            console.log( 'rwd_menu close 888', view_360_menu.style.visibility ) ;
        }
    
        rwd_menu_on = ( rwd_menu_on == 0 ) ? 1 : 0 ; 
    }
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
let rwdMapPageOn = 0 ;
function openMapPage( n ) {
    if ( n == 1 ) {
        if ( mapPageOn == 0 ) mapPage.style.visibility = 'visible' ;
        else mapPage.style.visibility = 'hidden' ;
        mapPageOn = ( mapPageOn == 0 ) ? 1 : 0 ;
    }
    else if ( n == 2 ) {
        if ( rwdMapPageOn == 0 ) mapPageMobile.style.display = 'block' ;
        else mapPageMobile.style.display = 'none' ;
        rwdMapPageOn = ( rwdMapPageOn == 0 ) ? 1 : 0 ;
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

//// 把「依靠 場景id 判斷場景載入狀況」的功能獨立出來在此

function checkSceneLoadStateAndLoadScene( scene_id ){

    //// 這邊要判斷是否點擊到的場景已經載入完成
    let sceneObject = document.getElementById( scene_id );
                                    
    if (sceneObject){
        if ( sceneObject.loadState == 0 ){
            //// 未載入狀態
            console.log('main_dev.js: _theRaycaster: sceneObject loadState 0 ' , sceneObject , scene_id  );

            sceneObject.loadState = 1; //// 載入狀態 0.未載入 1. 物件載入中  2. 物件載入完成

            loadingLayout.style.visibility = 'visible' ;

            ////  先載入場景物件，再進入
            let sceneJson;
            makarScenes.forEach( m => { 
                if ( m.scene_id == scene_id ) {
                    sceneJson = m;
                }
            }) ;

            if (sceneJson){

                let oneSceneLoadPromise = sceneObjsLoad( sceneJson , sceneObject ) ;  
                let aSky = document.getElementById( scene_id + '_sky' );
                let pSky = new Promise(function( pSkyResolve, reject ){
                    aSky.addEventListener('materialtextureloaded', function(evt){
                        console.log('main_dev.js: _theRaycaster:: _asky materialtextureloaded' , aSky  );
                        pSkyResolve(aSky);
                    });
                });

                aSky.setAttribute( 'material', { 'src' : sceneJson.scene_skybox_url } ) ;

                Promise.all( [oneSceneLoadPromise, pSky] ).then(function(ret){
                    console.log('main_dev.js: _theRaycaster:: promise all' , ret  );

                    sceneObject.loadState = 2; //// 載入狀態 0.未載入 1. 物件載入中  2. 物件載入完成

                    to360( scene_id ) ; 
                    loadingLayout.style.visibility = 'hidden' ;
                });

            }

        }else if (sceneObject.loadState == 1){
            //// 正在載入狀態，直接跳轉
            console.log('main_dev.js: _theRaycaster: sceneObject _loadState 1');
            to360( scene_id ) ; 

        }else if ( sceneObject.loadState == 2 ){
            ///// 已經載入狀態，直接跳轉
            console.log('main_dev.js: _theRaycaster: sceneObject _loadState 2');

            to360( scene_id ) ; 

        }else{
            console.log('main_dev.js: _theRaycaster: sceneObject _loadState error', sceneObject.loadState ,sceneObject );
        }
    }else{

    }


}

// --- Raycaster API ---
function theRaycaster(  ) {


    function getMouse(event){
        let rect = aScene.renderer.domElement.getBoundingClientRect();

        switch ( event.type ) {
            case "mouseup":
            case "mousemove":
            case "mousedown":
                mouse.x = ( (event.clientX - rect.left) / aScene.renderer.domElement.clientWidth ) * 2 - 1; // GLRenderer.domElement.clientWidth window.innerWidth
                mouse.y = - ( (event.clientY - rect.top) / aScene.renderer.domElement.clientHeight ) * 2 + 1; // GLRenderer.domElement.clientHeight  window.innerHeight
                break;
            case "touchend":////// 20190709 Fei: add this event type for cellphone
            case "touchstart":
            case "touchmove":
                mouse.x = ( (event.changedTouches[0].clientX - rect.left) / aScene.renderer.domElement.clientWidth ) * 2 - 1; // GLRenderer.domElement.clientWidth window.innerWidth
                mouse.y = - ( (event.changedTouches[0].clientY - rect.top) / aScene.renderer.domElement.clientHeight ) * 2 + 1; // GLRenderer.domElement.clientHeight  window.innerHeight
                break;
            default:
                // console.log("default endEvent: event.type=", event.type, " not mouseup/touchend, return ");
                return ;
        }
        return mouse.clone();
    }


    let preMouse = new THREE.Vector2();
    let mouse = new THREE.Vector2() ;
    let raycaster = new THREE.Raycaster() ;

    let mouseState = 0; //// 紀錄滑鼠狀態， 0. down , 1. move, 2. up
    aScene.canvas.addEventListener( 'mousedown', function( event ){
        preMouse = getMouse(event);
        mouseState = 0;
    });

    aScene.canvas.addEventListener( 'mousemove', function( event ){
        if ( mouseState == 0){
            let moveMouse = getMouse(event);
            if ( moveMouse.sub(preMouse).length() > 0.05 ){
                mouseState = 1;					
            }
        }
    });

    aScene.canvas.addEventListener( 'mouseup', function( event ){

        //// 假如滑鼠有作過位移，則不往下觸發
        if (mouseState == 1){
            console.log('main_dev.js: _theRaycaster: mouseState 1 return' );
            return;
        }

        if ( currentSceneObjs.length == 0 ){
            console.log('main_dev.js: _theRaycaster: _currentSceneObjs error', currentSceneObjs );
            return;
        }
        if (!currentSceneObject3D){
            console.log('main_dev.js: _theRaycaster: _currentSceneObject3D error', currentSceneObject3D );
            return;
        }

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
        // let intersects = raycaster.intersectObject( aScene.object3D, true ) ;
        let intersects = raycaster.intersectObject( currentSceneObject3D , true ) ;
        if ( intersects.length > 0 ){
            // console.log( 'First Intersect : ', intersects[ 0 ].object , currentSceneObjs  ) ;

            currentSceneObjs.forEach( obj => { 
                if ( intersects[ 0 ].object.el ) {
                    if ( obj.obj_id == intersects[ 0 ].object.el.id ) {
                        if ( obj.behav ) {
                            obj.behav.forEach( b => { 
                                if ( b.simple_behav == 'SceneChange' ) { 

                                    checkSceneLoadStateAndLoadScene( b.scene_id );

                                } 
                            } )
                        }
                    } 
                }
    
            } ) ;
            
        }      
    } ) ;
}

// Create a button object to do the control things
const buttonController = {

    buttonSelect : {
        "button1-1-click" : 0 ,
        "button1-2-click" : 0 ,
        "button1-6-click" : 0 ,
    
        "button2-1-click" : 0 ,
        "button2-2-click" : 0 ,
    },

    buttonObj : {
        "button1-1" : document.getElementById( "button1-1" ),
        "button1-2" : document.getElementById( "button1-2" ),
        "button1-6" : document.getElementById( "button1-6" ),

        "button2-1" : document.getElementById( "button2-1" ),
        "button2-2" : document.getElementById( "button2-2" ),
    },

    rwdButtonObj : {
        "rwd-button1-3" : document.getElementById( "rwd-button1-3" ),
        "rwd-button1-4" : document.getElementById( "rwd-button1-4" ),

        "rwd-button1-1" : document.getElementById( "rwd-button1-1" ),
        "rwd-button1-2" : document.getElementById( "rwd-button1-2" ),
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

    rwdButtonObj_click : {
        "rwd-button1-3-click" : document.getElementById( "rwd-button1-3-click" ),
        "rwd-button1-4-click" : document.getElementById( "rwd-button1-4-click" ),

        "rwd-button1-1-click" : document.getElementById( "rwd-button1-1-click" ),
        "rwd-button1-2-click" : document.getElementById( "rwd-button1-2-click" ),
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

        'button1-1-click' : [ 'button1-1-hover', 'button1-1' ], 
        'button1-2-click' : [ 'button1-2-hover', 'button1-2' ],
        'button1-6-click' : [ 'button1-6-hover', 'button1-6' ],
        'button2-1-click' : [ 'button2-1-hover', 'button2-1' ],
        'button2-2-click' : [ 'button2-2-hover', 'button2-2' ],

        'rwd-button1-3' : 'rwd-button1-3-click',
        'rwd-button1-4' : 'rwd-button1-4-click',
        'rwd-button1-1' : 'rwd-button1-1-click',
        'rwd-button1-2' : 'rwd-button1-2-click',

        'rwd-button1-3-click' : 'rwd-button1-3',
        'rwd-button1-4-click' : 'rwd-button1-4',
        'rwd-button1-1-click' : 'rwd-button1-1',
        'rwd-button1-2-click' : 'rwd-button1-2',
    },

    allUnselect : function( clickBtn ) {
        if ( getComputedStyle( homePage ).display == 'block' ) {
            if ( clickBtn == 'button2-1-click' || clickBtn == 'button2-2-click' ) {   // The small two buttons can only set each other to normal
                Object.keys( this.buttonObj_click ).forEach( b => {
                    if ( b != clickBtn && ( b == 'button2-1-click' || b == 'button2-2-click' ) ) {
                        this.buttonObj_click[ b ].style.visibility = 'hidden' ;
                        this.buttonObj[ this.buttonChange[ b ][ 1 ] ].style.visibility = 'visible' ;
                        this.buttonSelect[ b ] = 0 ;
                    }
                } ) ;
            } else {
                Object.keys( this.buttonObj_click ).forEach( b => {   // Big three buttons should remove the small two buttons 
                    if ( b != clickBtn ) {
                        this.buttonObj_click[ b ].style.visibility = 'hidden' ;
                        if ( b != 'button2-1-click' && b != 'button2-2-click' ) {
                            this.buttonObj[ this.buttonChange[ b ][ 1 ] ].style.visibility = 'visible' ;
                        }
                        this.buttonSelect[ b ] = 0 ;
                    }
                } ) ;
            }
        } else {
            Object.keys( this.rwdButtonObj_click ).forEach( b => {
                if ( b != clickBtn ) {
                    this.rwdButtonObj_click[ b ].style.visibility = 'hidden' ;
                    if ( ! ( RWD_UI.record[ 'homeMenuOn' ] == 0 && ( b == 'rwd-button1-3' || b == 'rwd-button1-3-click' || b == 'rwd-button1-4' || b == 'rwd-button1-4-click' ) ) ) {
                        this.rwdButtonObj[ this.buttonChange[ b ] ].style.visibility = 'visible' ;
                    }
                }
            } ) ;
        }
    }, 

    // --- Add hover event to normal button ---
    addEventToNormal : function() {
        let ctrl = buttonController ;
        if ( getComputedStyle( homePage ).display == 'block'  ) {
            Object.values( this.buttonObj ).forEach( btnEle => {
                btnEle.addEventListener( 'mouseover', function( event ) {
                    btnEle.style.visibility = 'hidden' ;
                    ctrl.buttonObj_hover[ ctrl.buttonChange[ btnEle.id ] ].style.visibility = 'visible' ;
    
                    event.stopPropagation() ;
                } ) ;
            } ) ;
        } else {
            Object.values( this.rwdButtonObj ).forEach( btnEle => {
                btnEle.addEventListener( 'click', function( event ){
                    // console.log( 'Hi Normal Click' ) ;
                    btnEle.style.visibility = 'hidden' ;
                    ctrl.allUnselect( ctrl.buttonChange[ btnEle.id ]  ) ;
                    ctrl.rwdButtonObj_click[ ctrl.buttonChange[ btnEle.id] ].style.visibility = 'visible' ;
                } ) ;
            } ) ;
        }

    }, 

    // --- Add mouseout & click event to hover button ---
    addEventToHover : function() {
        let ctrl = buttonController ;
        if ( getComputedStyle( homePage ).display == 'block'  ) {
            Object.values( this.buttonObj_hover ).forEach( btnEle => {
                btnEle.addEventListener( 'mouseout', function( event ) {      
                    if ( ctrl.buttonSelect[ ctrl.buttonChange[ btnEle.id ][ 1 ] ] == 0 ) {
                        btnEle.style.visibility = 'hidden' ;
                        ctrl.buttonObj[ ctrl.buttonChange[ btnEle.id ][ 0 ] ].style.visibility = 'visible' ;
                        // console.log( 'MOUSE OUT', event ) ;
                    }  
                    event.stopPropagation() ;
                } ) ;
    
                btnEle.addEventListener( 'click', function( event ) {
                    ctrl.buttonSelect[ ctrl.buttonChange[ btnEle.id ][ 1 ] ] = 1 ;
                    ctrl.allUnselect( ctrl.buttonChange[ btnEle.id ][ 1 ] ) ;
                    btnEle.style.visibility = 'hidden' ;
                    
                    ctrl.buttonObj_click[ ctrl.buttonChange[ btnEle.id ][ 1 ] ].style.visibility = 'visible' ;
                    // console.log( '222', ctrl.buttonSelect ) ;
                    cameraViewControl.hideTagsAndEnableOrbitControl( btnEle );
                    
                    event.stopPropagation() ;
                } ) ;
            } ) ;
        } 
    }, 

    // --- Add click event to selected button ---
    addEventToSelect : function() {

        let ctrl = buttonController ;
        if ( getComputedStyle( homePage ).display == 'block' ) {
            Object.values( this.buttonObj_click ).forEach( btnEle => {
                btnEle.addEventListener( 'click', function( event ) {
                    if ( btnEle.id == 'button1-1-click' ) ctrl.allUnselect( ctrl.buttonChange[ btnEle.id ][ 1 ]  ) ;
                    btnEle.style.visibility = 'hidden' ;
                    ctrl.buttonObj_hover[ ctrl.buttonChange[ btnEle.id ][ 0 ] ].style.visibility = 'visible' ;
    
                    // console.log( '222', ctrl.buttonSelect ) ;
                    cameraViewControl.hideTagsAndEnableOrbitControl( btnEle );
                    
                    event.stopPropagation() ;
                } ) ;
            } ) ;
        } else {
            Object.values( this.rwdButtonObj_click ).forEach( btnEle => {
                btnEle.addEventListener( 'click', function( event ){
                    // console.log( 'Hi Select Click' ) ;
                    btnEle.style.visibility = 'hidden' ;
                    ctrl.allUnselect( ctrl.buttonChange[ btnEle.id ]  ) ;
                    ctrl.rwdButtonObj[ ctrl.buttonChange[ btnEle.id] ].style.visibility = 'visible' ;
                } ) ;
            } ) ;
        }
    }, 

} ; 

function showModelControl( n ) {   // when hover (0) => show the two normal / when clicked (1) => hide two normal
    let b = buttonController ;
    let enter360 = [ b.buttonObj[ 'button2-1' ], b.buttonObj_hover[ 'button2-1-hover' ], b.buttonObj_click[ 'button2-1-click' ] ] ;
    let enterModel = [ b.buttonObj[ 'button2-2' ], b.buttonObj_hover[ 'button2-2-hover' ], b.buttonObj_click[ 'button2-2-click' ] ] ;

    if ( n == 0 ) {
        enter360.forEach( ele => { ele.style.visibility = 'hidden' } ) ;
        enterModel.forEach( ele => { ele.style.visibility = 'hidden' } ) ;
        enter360[ 0 ].style.visibility = 'visible' ;
        enterModel[ 0 ].style.visibility = 'visible' ;

        toOrbit() ;
    }
    else if ( n == 1 ) {
        console.log( "SHOULDN'T" ) ;
        enter360[ 0 ].style.visibility = 'hidden' ;
        enterModel[ 0 ].style.visibility = 'hidden' ;
    } 
    else if ( n == 2 ) {
        enter360.forEach( ele => { ele.style.visibility = 'hidden' } ) ;
        enterModel.forEach( ele => { ele.style.visibility = 'hidden' } ) ;   
    }
}

// Use for activating button events in onload function
function buttonActive() {
    buttonController.addEventToNormal() ;
    buttonController.addEventToHover() ;
    buttonController.addEventToSelect() ;

    //// 從 VR360 / VRModel 返回到原本狀態
    
    VRbackModel.onclick = function(){
        cameraViewControl.VRModelBackEvent();
    }

    s360backModel.onclick = function(){
        cameraViewControl.VR360BackEvent();
    }

    RWD_UI.homeButtonEvents() ;
    RWD_UI.viewVR_obj[ 'VRbackBtn' ].onclick = function( event ) {
        cameraViewControl.mobileVRBackEvent( event.target );
    }
    RWD_UI.view360_obj[ 'rwdBack' ].onclick = function( event ) {
        cameraViewControl.mobile360BackEvent( event.target );
    }
}

// --- Attach tag_appearing function to button2-1 and button2-2
function tagAppear() {
    // console.log( btnController.buttonObj[ 'button2-1' ] ) ;
    let tagControll = [ buttonController.buttonObj_hover[ 'button2-1-hover' ], buttonController.buttonObj_hover[ 'button2-2-hover' ] ] ;
    tagControll.forEach( t => {
        t.addEventListener( 'click', function( event ) {
            if ( t.id == 'button2-1-hover' ) tag = 2 ;
            else tag = 1 ;

            start_tick = 1 ;
            tags.style.display = 'inline' ;
            event.stopPropagation() ;

            // console.log('button2 click ', t  );
            cameraViewControl.setShowTagsAndDisableOrbitControl( t );

            buttonController.buttonSelect[ buttonController.buttonChange[ t.id ][ 1 ] ] = 1 ;
        } ) ;
    } ) ;

    //// 建構「tag hover」的對應事件

    [ b_tag, y_tag, r_tag, p_tag, g_tag, o_tag, m2_tag ].forEach( e => {

        let tline = gsap.timeline();
        let tag_top = e.getElementsByClassName('tag_top')[0];
            
        e.onmouseenter = function(){
            tline.clear();
            tline.to(tag_top, {duration: 0.01, display: 'block' });
            // tline.to(e, {duration: 0.3, scale: 5 });
            tline.to(e, {duration: 0.3, width: "200px", height: "200px", fontSize:'20px' });
        }

        e.onmouseleave = function(){
            tline.clear();

            tline.to(tag_top, {duration: 0.01, display: 'none' });
            // tline.to(e, {duration: 0.3, scale: 1 });
            tline.to(e, {duration: 0.3, width: "40px", height: "40px" , fontSize:'12px' });
        }
    });

}

// --- Full screen function ---
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

let guideOn = 0 ;
let rwdGuideOn = 0 ;
function openGuide( n ) {
    console.log( "onclick ques" ) ;
    if ( n == 1 ) {
        if ( guideOn == 0 ) {
            s360_guide.style.display = 'block' ;
        } else {
            s360_guide.style.display = 'none' ;
        }
        guideOn = ( guideOn == 1 ) ? 0 : 1 ;
    }
    else if ( n == 2 ) {
        if ( rwdGuideOn == 0 ) {
            RWD_UI.view360_obj[ 's360_guide_mobile' ].style.display = 'block' ;
        } else {
            RWD_UI.view360_obj[ 's360_guide_mobile' ].style.display = 'none' ;
        }
        rwdGuideOn = ( rwdGuideOn == 1 ) ? 0 : 1 ;
    }
}

function goShop() {
    console.log( 'INSEDE GOSHOP' ) ;
    showModelControl( 2 ) ;
}

function goGame() {
    console.log( 'INSEDE GOGAME' ) ;
    showModelControl( 2 ) ;
}

const RWD_UI = {

    homePage_obj : {
        'homeMobile' : document.getElementById( 'homeMobile' ),
        'homeMobile_menu' : document.getElementById( 'homeMobile_menu' ),

        'up' : document.getElementById( 'up' ),
        'down' : document.getElementById( 'down' ),

        'rwd-button1-3' : document.getElementById( 'rwd-button1-3' ),
        'rwd-button1-4' : document.getElementById( 'rwd-button1-4' ),
        'rwd-button1-3-click' : document.getElementById( 'rwd-button1-3-click' ),
        'rwd-button1-4-click' : document.getElementById( 'rwd-button1-4-click' ),

        'rwd-button1-1' : document.getElementById( 'rwd-button1-1' ),
        'rwd-button1-2' : document.getElementById( 'rwd-button1-2' ),
        'rwd-button1-1-click' : document.getElementById( 'rwd-button1-1-click' ),
        'rwd-button1-2-click' : document.getElementById( 'rwd-button1-2-click' ),


        'up_buttons' : [ document.getElementById( 'rwd-button1-3' ),
                         document.getElementById( 'rwd-button1-3-click' ),
                         document.getElementById( 'rwd-button1-4' ),
                         document.getElementById( 'rwd-button1-4-click' )
                        ], 
    },

    vr_template_obj : {
        'template_vr_mobile' : document.getElementById( 'template_vr_mobile' ),
        'x_circle_vr_mobile' : document.getElementById( 'x_circle_vr_mobile' ),
    }, 

    s360_template_obj : {
        'template_360_mobile' : document.getElementById( 'template_360_mobile' ),
        'x_circle_360_mobile' : document.getElementById( 'x_circle_360_mobile' ),
    },

    view360_obj : {
        'view_360_mobile' : document.getElementById( 'view_360_mobile' ),
        'mapPageMobile' : document.getElementById( 'mapPageMobile' ), 
        's360_guide_mobile' : document.getElementById( 's360_guide_mobile' ),
        'rwdBack' : document.getElementById( 'rwdBack' ),
    },

    viewVR_obj : {
        'template_vr_mobile_2' : document.getElementById( 'template_vr_mobile_2' ),  
        'VRbackBtn' : document.getElementById( 'VRbackBtn' ), 
    },


    record : {
        'homeMenuOn' : 0,
    },

    homeMenuClick : function() {
        console.log( 'You click the home menu' ) ;

        let self = RWD_UI ;
        let homePage_obj = self.homePage_obj ;

        if ( self.record[ 'homeMenuOn' ] == 0 ) {
            homePage_obj[ 'homeMobile_menu' ].style.backgroundColor = '#88AB85' ;
            homePage_obj[ 'rwd-button1-3' ].style.visibility = 'visible' ;
            homePage_obj[ 'rwd-button1-4' ].style.visibility = 'visible' ;

            self.record[ 'homeMenuOn' ] = 1 ;
        } else {
            homePage_obj[ 'homeMobile_menu' ].style.backgroundColor = '#eac788' ;
            homePage_obj[ 'up_buttons' ].forEach( b => {
                b.style.visibility = 'hidden' ;
            } ) ;
            self.record[ 'homeMenuOn' ] = 0 ;
        }

    },

    enter360Click : function() {
        let self = RWD_UI ;
        let template360_obj = self.s360_template_obj ;  
        
        template360_obj[ 'template_360_mobile' ].style.display = 'block' ;
    },

    enterModelClick : function() {
        let self = RWD_UI ;
        let templateVR_obj = self.vr_template_obj ;  
        
        templateVR_obj[ 'template_vr_mobile' ].style.display = 'block' ;
        self.homePage_obj[ 'up' ].style.pointerEvents = 'none' ;
        self.homePage_obj[ 'down' ].style.pointerEvents = 'none' ;
    }, 

    exitMobileTemplate : function( n ) {
        let self = RWD_UI ;
        self.vr_template_obj[ 'template_vr_mobile' ].style.display = 'none' ;
        self.s360_template_obj[ 'template_360_mobile' ].style.display = 'none' ;
        self.homePage_obj[ 'up' ].style.pointerEvents = 'initial' ;
        self.homePage_obj[ 'down' ].style.pointerEvents = 'initial' ;
    },

    homeButtonEvents : function() {
        let homeBtn = this.homePage_obj ;
        homeBtn[ 'homeMobile_menu' ].onclick = this.homeMenuClick ;
        homeBtn[ 'rwd-button1-1' ].onclick = this.enter360Click ;
        homeBtn[ 'rwd-button1-2' ].onclick = this.enterModelClick ;

        let vrBtn = this.vr_template_obj ;
        vrBtn[ 'x_circle_vr_mobile' ].onclick = this.exitMobileTemplate ;

        let s360Btn = this.s360_template_obj ;
        s360Btn[ 'x_circle_360_mobile' ].onclick = this.exitMobileTemplate ;
    },

}

// --- Not currently using ---
let down_right_h ;   // Initially equals to 0
let down_right_w ;
let dots = document.getElementById( 'dots' ) ;

function old_sizing() {
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

    // home_menu.style.fontSize = home_menu.offsetWidth / 6 + 'px' ;

}

function map_func() {
    const map_ins = new menu( map_area, '100%', '100%' ) ;
    map_ins.hit_menu() ;
    old_sizing() ;
}

function mobileMouseEvent() {
    view_360_mobile.addEventListener('mousedown', function(event){
        view_360_mobile.style.cursor = "grabbing";
        
        let cEvent = new event.constructor(event.type , {
            button:event.button,
            screenX:event.screenX,
            screenY:event.screenY,
        });
        console.log(" mousedown ", event, cEvent );
        aScene.canvas.dispatchEvent(cEvent);
    });

    view_360_mobile.addEventListener('mousemove', function(event){
        view_360_mobile.style.cursor = "grabbing";
        
        let cEvent = new event.constructor(event.type , {
            button:event.button,
            screenX:event.screenX,
            screenY:event.screenY,
        });
        console.log(" mousemove ", event, cEvent );
        aScene.canvas.dispatchEvent(cEvent);
    });

    view_360_mobile.addEventListener('mouseup', function(event){
        view_360_mobile.style.cursor = "grabbing";
        
        let cEvent = new event.constructor(event.type , {
            button:event.button,
            screenX:event.screenX,
            screenY:event.screenY,
        });
        console.log(" mouseup ", event, cEvent );
        aScene.canvas.dispatchEvent(cEvent);
    });
}