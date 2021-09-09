
//// 測試使用 FBX model
class CameraViewControl{
    constructor(){
        let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   

        if (aScene.hasLoaded ){
            console.log('cameraSceneControl.js: aScene 0 ' , aScene );

            onASceneLoaded();

        }else{
            aScene.addEventListener('loaded', loaded );

            function loaded(){
                console.log('cameraSceneControl.js: aScene 1 ' , aScene );
                onASceneLoaded();
                aScene.removeEventListener('loaded', loaded );
            }   
        }

        function onASceneLoaded(){
            console.log("cameraSceneControl.js: _onASceneLoaded: ");


        }
    }

    setAndshowTags( bn ){

        let self = this;

        if ( bn.getAttribute('id') == 'button2-1-hover' || bn.getAttribute('id') == 'rwd-button1-1' ){

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
            let camFP = new THREE.Vector3( 12 , 19 , 18 ); 

            let dp = camFP.clone().sub(camOP);

            let dur = dp.length()/30 + 0.05;
            dur = dur > 2? 2: dur;

            console.log('cameraSceneControl: _setAndshowTags: ', dur );

            tline.to(gsapEmpty, {
                duration: dur ,
                onUpdate:function(){
                    
                    let qp = camOP.clone().add( dp.clone().multiplyScalar( this._time/ dur ) );
                    
                    cam.object3D.children[0].position.copy(qp);

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
                        point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( aScene.canvas.width / window.devicePixelRatio ) ) ;
                        point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( aScene.canvas.height / window.devicePixelRatio ) ) ;
                        div2D.style.top = point2D.y + 'px';
                        div2D.style.left = point2D.x + 'px';
                        div2D.innerText = '';
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
        if ( bn.getAttribute('id') == 'button2-2-hover' || bn.getAttribute('id') == 'rwd-button1-2' ){

            let g_tag = document.getElementById('g_tag');
            let o_tag = document.getElementById('o_tag');
            
            //// 顯示出全螢幕遮罩
            let tline = gsap.timeline();
            tline.set(sceneMaskDiv, {visibility: 'visible'});

            //// 隱藏另一組對應 div 
            tline.set('.tag360', {visibility: 'hidden'});

            //// 取得相機當前位置
            let camOP = cam.object3D.children[0].position.clone();
            let camFP = new THREE.Vector3( 12 , 19 , 18 ); 
            let dp = camFP.clone().sub(camOP);

            let dur = dp.length()/30 + 0.05;
            dur = dur > 2? 2: dur;

            tline.to(gsapEmpty, {
                duration: dur,
                onUpdate:function(){
                    
                    let qp = camOP.clone().add( dp.clone().multiplyScalar( this._time/ dur ) );
                    
                    cam.object3D.children[0].position.copy(qp);

                },
                onComplete: function(){
                    

                    //// 計算 3D 場景內部的特定點，在2D 的位置
                    set3Dto2D( g_tag , g_cube );
                    set3Dto2D( o_tag , o_cube );

                    function set3Dto2D( div2D, obj3D ){
                        let point3D = new THREE.Vector3() ;
                        let point2D = new THREE.Vector2() ; 

                        point3D = obj3D.object3D.position.clone();
                        point3D.project( aScene.camera ) ;
                        point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( aScene.canvas.width / window.devicePixelRatio ) ) ;
                        point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( aScene.canvas.height / window.devicePixelRatio ) ) ;
                        div2D.style.top = point2D.y + 'px';
                        div2D.style.left = point2D.x + 'px';
                        div2D.innerText = '';
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

    hideTags( bn ){

        console.log('cameraSceneControl.js: _hideTags: bn  ', bn );
        
        if ( bn.getAttribute('id') == 'button2-1-click' ){
            
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


    }


}

let cameraViewControl = new CameraViewControl();