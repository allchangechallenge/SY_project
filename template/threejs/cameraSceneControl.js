
//// 測試使用 FBX model
class CameraViewControl{
    constructor(){

        this.fixPositionPC = new THREE.Vector3( 3.85 , 16.9 , -11.1 ); 
        this.fixTargetPC = new THREE.Vector3( 3.8 , 1.35 , -1 ); 

        let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   

        if (aScene.hasLoaded ){
            console.log('cameraSceneControl.js: aScene 0 ' , aScene );

            onASceneLoaded();

        }else{
            aScene.addEventListener('loaded', loaded );

            function loaded(){
                // console.log('cameraSceneControl.js: aScene 1 ' , aScene );
                onASceneLoaded();
                aScene.removeEventListener('loaded', loaded );
            }   
        }

        function onASceneLoaded(){
            // console.log("cameraSceneControl.js: _onASceneLoaded: ");


        }
    }

    setShowTagsAndDisableOrbitControl( bn ){

        let self = this;

        if ( bn.getAttribute('id') == 'button2-1-hover' ){

            let b_tag = document.getElementById('b_tag');
            let y_tag = document.getElementById('y_tag');
            let r_tag = document.getElementById('r_tag');
            let p_tag = document.getElementById('p_tag');
            
            //// 顯示出全螢幕遮罩
            let tline = gsap.timeline();
            tline.set(sceneMaskDiv, {visibility: 'visible'});

            //// 隱藏另一組對應 div 
            tline.set('.tagModel', {visibility: 'hidden'});
            

            //// 取得相機當前位置
            let camOP = cam.object3D.children[0].position.clone();
            let camFP = self.fixPositionPC.clone() ; 
            let dp = camFP.clone().sub(camOP);

            //// 取得 orbit 控制器當前的 目標數值
            let camOTP = cam.components['orbit-controls'].controls.target.clone();
            let camFTP = self.fixTargetPC.clone();
            let dtp = camFTP.clone().sub(camOTP);


            let dur = dp.length()/30 + 0.05;
            dur = dur > 2? 2: dur;

            console.log('cameraSceneControl: _setAndshowTags: ', dur );

            tline.to(gsapEmpty, {
                duration: dur ,
                onUpdate:function(){
                    
                    let qp = camOP.clone().add( dp.clone().multiplyScalar( this._time/ dur ) );
                    cam.object3D.children[0].position.copy(qp);

                    let qtp = camOTP.clone().add( dtp.clone().multiplyScalar( this._time/ dur ) );
                    cam.components['orbit-controls'].controls.target.copy(qtp);

                },
                onComplete: function(){

                    //// 計算 3D 場景內部的特定點，在2D 的位置
                    set3Dto2D( b_tag , b_cube );
                    set3Dto2D( y_tag , y_cube );
                    set3Dto2D( r_tag , r_cube );
                    set3Dto2D( p_tag , p_cube );

                    function set3Dto2D( div2D, obj3D ){
                        let point3D = new THREE.Vector3() ;
                        let point2D = new THREE.Vector2() ; 

                        point3D = obj3D.object3D.position.clone();
                        point3D.project( aScene.camera ) ;
                        
                        // point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( aScene.canvas.width / window.devicePixelRatio ) ) ;
                        // point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( aScene.canvas.height / window.devicePixelRatio ) ) ;

                        point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( innerWidth ) ) ;
                        point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( innerHeight ) ) ;

                        let ns = 0;
                        div2D.style.top = (point2D.y - ns) + 'px';
                        div2D.style.left = (point2D.x - ns) + 'px';

                    }

                }
            });

            tline.to(gsapEmpty, {
                duration: 0.1,
                onComplete:function(){
                    //// 完成位移後，關閉控制
                    cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
                }
            });

            //// 顯示對應 div 
            tline.set('.tag360', {visibility: 'visible'});
            //// 隱藏遮罩
            tline.set(sceneMaskDiv, {visibility: 'hidden'});


        }
        if ( bn.getAttribute('id') == 'button2-2-hover' ){

            let g_tag = document.getElementById('g_tag');
            let o_tag = document.getElementById('o_tag');
            let m2_tag = document.getElementById('m2_tag');
            let m3_tag = document.getElementById('m3_tag');
            let m4_tag = document.getElementById('m4_tag');
            
            //// 顯示出全螢幕遮罩
            let tline = gsap.timeline();
            tline.set(sceneMaskDiv, {visibility: 'visible'});

            //// 隱藏另一組對應 div 
            tline.set('.tag360', {visibility: 'hidden'});

            //// 取得相機當前位置
            let camOP = cam.object3D.children[0].position.clone();
            let camFP = self.fixPositionPC.clone() ; 
            let dp = camFP.clone().sub(camOP);

            //// 取得 orbit 控制器當前的 目標數值
            let camOTP = cam.components['orbit-controls'].controls.target.clone();
            let camFTP = self.fixTargetPC.clone();
            let dtp = camFTP.clone().sub(camOTP);

            let dur = dp.length()/30 + 0.05;
            dur = dur > 2? 2: dur;

            tline.to(gsapEmpty, {
                duration: dur,
                onUpdate:function(){
                    let qp = camOP.clone().add( dp.clone().multiplyScalar( this._time/ dur ) );
                    cam.object3D.children[0].position.copy(qp);

                    let qtp = camOTP.clone().add( dtp.clone().multiplyScalar( this._time/ dur ) );
                    cam.components['orbit-controls'].controls.target.copy(qtp);

                },
                onComplete: function(){
                    //// 計算 3D 場景內部的特定點，在2D 的位置
                    set3Dto2D( g_tag , g_cube );
                    set3Dto2D( o_tag , o_cube );

                    set3Dto2D( m2_tag , m2_cube );
                    set3Dto2D( m3_tag , m3_cube );
                    set3Dto2D( m4_tag , m4_cube );

                    

                    function set3Dto2D( div2D, obj3D ){
                        let point3D = new THREE.Vector3() ;
                        let point2D = new THREE.Vector2() ; 

                        point3D = obj3D.object3D.position.clone();
                        point3D.project( aScene.camera ) ;

                        // point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( aScene.canvas.width / window.devicePixelRatio ) ) ;
                        // point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( aScene.canvas.height / window.devicePixelRatio ) ) ;

                        point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( innerWidth ) ) ;
                        point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( innerHeight ) ) ;
 

                        div2D.style.top = (point2D.y - 0 ) + 'px';
                        div2D.style.left = (point2D.x - 0 ) + 'px';
                    }
                }
            });

            tline.to(gsapEmpty, {
                duration: 0.1,
                onComplete:function(){
                    //// 完成位移後，關閉控制
                    cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;
                }
            });

            //// 顯示對應 div 
            tline.set('.tagModel', {visibility: 'visible'});
            //// 隱藏遮罩
            tline.set(sceneMaskDiv, {visibility: 'hidden'});
            
        }

    }

    hideTagsAndEnableOrbitControl( bn ){
        console.log('cameraSceneControl.js: _hideTagsAndEnableOrbitControl: bn  ', bn );
        if ( bn.getAttribute('id') == 'button2-1-click' || bn.getAttribute('id') == 'button1-1-hover' ){
            let tline = gsap.timeline();
            ////  顯示遮罩
            tline.set(sceneMaskDiv, {visibility: 'visible'});
            //// 隱藏對應 div tag 
            tline.set('.tag360', {visibility: 'hidden'});
            tline.to( gsapEmpty, { 
                duration: 0.1,
                onStart:function(){
                    cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
                }
            });
            ////  隱藏遮罩
            tline.set(sceneMaskDiv, {visibility: 'hidden'});
        }

        if ( bn.getAttribute('id') == 'button2-2-click' ){
            let tline = gsap.timeline();
            ////  顯示遮罩
            tline.set(sceneMaskDiv, {visibility: 'visible'});
            //// 隱藏對應 div tag 
            tline.set('.tagModel', {visibility: 'hidden'});

            tline.to( gsapEmpty, {
                duration: 0.1, 
                onStart:function(){
                    cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
                }
            });
            ////  隱藏遮罩
            tline.set(sceneMaskDiv, {visibility: 'hidden'});

        }
        //// These are for back buttons of mobile VR and 360
        if ( bn.getAttribute('id') == 'VRbackBtn' || bn.getAttribute('id') == 'rwdBack' ) {
            cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
        }
    }

    //// 「模型體驗」回到「固定視角且顯示模型進入點」
    VRModelBackEvent(){

        let self = this;

        let tline = gsap.timeline();

        //// 顯示遮罩
        tline.set( sceneMaskDiv, {visibility: 'visible'} );

        //// UI 調整
        tline.set(template_vr, {display: 'none' });
        tline.set(homePage, {display: 'block' });
        tline.set(home_menu, {display: 'block', visibility: 'visible' });

        //// 不確定要不要保留
        menu_on = 0;
        //// 相機切換
        tline.to(gsapEmpty, {
            duration: 1,
            onStart:function(){
                self.lookToOrbit();
            },
        });

        //// 切換完成後，把 「對應 tag」給顯示出來
        tline.set('.tagModel', {visibility: 'visible'});

        //// 隱藏遮罩
        tline.set( sceneMaskDiv, {visibility: 'hidden'} );

    }

    mobileVRBackEvent( btn ){

        let self = this;

        let tline = gsap.timeline();

        //// 顯示遮罩
        tline.set( sceneMaskDiv, {visibility: 'visible'} );

        //// UI 調整
        tline.set(RWD_UI.viewVR_obj[ 'template_vr_mobile_2' ], {display: 'none' });
        tline.set(RWD_UI.homePage_obj[ 'homeMobile' ], {display: 'block' });
        tline.set(RWD_UI.homePage_obj[ 'up' ], {pointerEvents: 'initial'});
        tline.set(RWD_UI.homePage_obj[ 'down' ], {pointerEvents: 'initial'});

        //// 不確定要不要保留
        menu_on = 0;
        //// 相機切換
        tline.to(gsapEmpty, {
            duration: 1,
            onStart:function(){
                self.lookToOrbit();
            },
        });

        //// 切換完成後，把 「對應 tag」給顯示出來
        // tline.set('.tagModel', {visibility: 'visible'});

        //// 隱藏遮罩
        tline.set( sceneMaskDiv, {visibility: 'hidden'} );

        this.hideTagsAndEnableOrbitControl( btn );

    }

    //// 從「360體驗」回到「固定視角且顯示 360 進入點」
    VR360BackEvent(){

        let self = this;

        let tline = gsap.timeline();

        //// 顯示遮罩
        tline.set( sceneMaskDiv, {visibility: 'visible'} );

        //// UI 調整
        tline.set(template_360, {display: 'none' });
        tline.set(homePage, {display: 'block' });
        tline.set(home_menu, {display: 'block', visibility: 'visible' });

        //// 不確定要不要保留
        menu_on = 0;
        //// 相機切換
        tline.to(gsapEmpty, {
            duration: 1,
            onStart:function(){

                homeModel.setAttribute( 'visible', 'true' ) ;

                makarScenes.forEach( s => {
                    if ( document.getElementById( s.scene_id ) ) document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
                } ) ;

                self.lookToOrbit();
            },
        });

        //// 切換完成後，把 「對應 tag」給顯示出來
        
        tline.set( tags, {display: 'block'});
        tline.set('.tag360', {visibility: 'visible'});

        //// 隱藏遮罩
        tline.set( sceneMaskDiv, {visibility: 'hidden'} );

    }

    mobile360BackEvent( btn ){

        let self = this;

        let tline = gsap.timeline();

        //// 顯示遮罩
        tline.set( sceneMaskDiv, {visibility: 'visible'} );

        //// UI 調整
        tline.set(RWD_UI.view360_obj[ 'view_360_mobile' ], {display: 'none' });
        tline.set(RWD_UI.homePage_obj[ 'homeMobile' ], {display: 'block' });
        tline.set(RWD_UI.homePage_obj[ 'up' ], {pointerEvents: 'initial'});
        tline.set(RWD_UI.homePage_obj[ 'down' ], {pointerEvents: 'initial'});

        //// 不確定要不要保留
        menu_on = 0;
        //// 相機切換
        tline.to(gsapEmpty, {
            duration: 1,
            onStart:function(){

                homeModel.setAttribute( 'visible', 'true' ) ;

                makarScenes.forEach( s => {
                    if ( document.getElementById( s.scene_id ) ) document.getElementById( s.scene_id ).setAttribute( 'visible', 'false' ) ;
                } ) ;

                self.lookToOrbit();
            },
        });

        //// 切換完成後，把 「對應 tag」給顯示出來
        
        // tline.set( tags, {display: 'block'});
        // tline.set('.tag360', {visibility: 'visible'});

        //// 隱藏遮罩
        tline.set( sceneMaskDiv, {visibility: 'hidden'} );

        this.hideTagsAndEnableOrbitControl( btn );
    }

    lookToOrbit(){
    
        let self = this;

        // Closing each items which its visibility is independent from template360
        menu_on = 0 ;   // Back to initial state
        
        cam.setAttribute( 'camera', 'active', true ) ;
        cam_360.setAttribute( 'camera', 'active', false ) ;

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

        let target_pos = self.fixPositionPC.clone() ; 

        // use lookat to determine the position to turn to 
        let a = cam.object3D.children[0].clone()
        a.rotation.reorder( 'YXZ' ) ;
        a.position.x = target_pos.x ;
        a.position.y = target_pos.y ;
        a.position.z = target_pos.z ;

        //// 會到的 目標位置給定
        // a.lookAt( new THREE.Vector3( 0, 0, 0 ) ) ;
        a.lookAt( self.fixTargetPC.clone() ) ;
        
        distance.ratio = 0 ;

        var persCam = {
            pos_t : new THREE.Vector3( target_pos.x, target_pos.y, target_pos.z ),
            pos_o : new THREE.Vector3( cam.object3D.children[0].position.x, 
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
            pers_pos : persCam.pos_t.clone().sub( persCam.pos_o.clone() ), 
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
                    let persPos = new THREE.Vector3( persCam.pos_o.x + direction.pers_pos.x * distance.ratio / 1000,
                                                    persCam.pos_o.y + direction.pers_pos.y * distance.ratio / 1000,
                                                    persCam.pos_o.z + direction.pers_pos.z * distance.ratio / 1000 )
                    let persRot = new THREE.Vector3( persCam.rot_o.x + direction.pers_rot.x * distance.ratio / 1000,
                                                    persCam.rot_o.y + direction.pers_rot.y * distance.ratio / 1000,
                                                    persCam.rot_o.z + direction.pers_rot.z * distance.ratio / 1000 )

                    cam.object3D.children[0].position.x = persPos.x ;
                    cam.object3D.children[0].position.y = persPos.y ;
                    cam.object3D.children[0].position.z = persPos.z ;

                    cam.object3D.children[0].rotation.x = persRot.x ;
                    cam.object3D.children[0].rotation.y = persRot.y ;
                    cam.object3D.children[0].rotation.z = persRot.z ;

                    // console.log( '***', cam.object3D.rotation , cam.object3D.children[0].rotation ) ;    

                    // console.log( cam.object3D.children[0].rotation ) ;                                      
                },
                
                complete : function() {

                    //// 完成後不用開啟 控制
                    // cam.setAttribute( 'orbit-controls', 'enabled : true' ) ;
                }
        } ) ;

        //// 這邊將狀態改回「不是VR mode」
        mode = 0 ;
        
        tag = 0 ;

    }


}

let cameraViewControl = new CameraViewControl();