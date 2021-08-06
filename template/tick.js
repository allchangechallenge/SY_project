let bTag = document.getElementById( 'b_tag' ) ;
let gTag = document.getElementById( 'g_tag') ; 
let yTag = document.getElementById( 'y_tag') ;
let oTag = document.getElementById( 'o_tag') ; 
let rTag = document.getElementById( 'r_tag') ; 
let pTag = document.getElementById( 'p_tag') ; 
let tag_obj = [ bTag, gTag, yTag, oTag, rTag, pTag ] ;

var start_tick = 0 ;

AFRAME.registerComponent( 'tag-monitor', {
     tick : function( time, timeDelta ) {
        let point3D = new THREE.Vector3() ;
        let point2D = new THREE.Vector2() ;
        let tag_point = [] ;
        let x_bias = [ -317, -307, -327, -380, -307, -327 ] ;   // b, g, y, o, r, p
        let y_bias = [ 0, -100, 15, -10, -120, 15 ] ;

        for ( var i = 0 ; i < cube_obj.length ; i ++ ) {
            point3D.x = cube_obj[ i ].object3D.position.x ;
            point3D.y = cube_obj[ i ].object3D.position.y ;
            point3D.z = cube_obj[ i ].object3D.position.z ;
            
            point3D.project( aScene.camera ) ;
            // console.log( 'Points in 3D', point3D ) ;
            point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( aScene.canvas.width / window.devicePixelRatio ) ) ;
            point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( aScene.canvas.height / window.devicePixelRatio ) ) ;
            // console.log( 'Points in 2D', point2D ) ;

            var x = - 1 * point2D.x + x_bias[ i ] ;
            var y = point2D.y + y_bias[ i ] ;

            tag_point[ i ] = [ x, y ] ;          
        }
        // console.log( tag_point ) ;

        if ( start_tick == 1 ) {
            var over = [] ;   // Determine the overlap status for every tags in this tick
            for ( var i = 0 ; i < tag_point.length ; i ++ ) over[ i ] = 0 ;
            
            for ( var i = 0 ; i < tag_point.length ; i ++ ) {     
                for ( var j = 0 ; j < i ; j ++ ) {
                    // console.log( tag_obj[ i ].id, tag_obj[ j ].id ) ;
                    let x_over = 1, y_over = 1 ;
                    if ( tag_point[ i ][ 0 ] + tag_obj[ i ].offsetWidth < tag_point[ j ][ 0 ] || 
                        tag_point[ i ][ 0 ] > tag_point[ j ][ 0 ] + tag_obj[ j ].offsetWidth ) {
                        x_over = 0 ;
                        // console.log( "x_same", tag_point[ i ][ 0 ], tag_point[ i ][ 0 ] + tag_obj[ i ].offsetWidth, 
                        //             tag_point[ j ][ 0 ], tag_point[ j ][ 0 ] + tag_obj[ j ].offsetWidth ) ;
                    }
                    if ( tag_point[ i ][ 1 ] > tag_point[ j ][ 1 ] + tag_obj[ j ].offsetHeight || 
                        tag_point[ i ][ 1 ] + tag_obj[ i ].offsetHeight < tag_point[ j ][ 1 ] ) {
                        y_over = 0 ;
                        // console.log( "y_same", tag_point[ i ][ 1 ], tag_point[ i ][ 1 ] + tag_obj[ i ].offsetHeight, 
                        //             tag_point[ j ][ 1 ], tag_point[ j ][ 1 ] + tag_obj[ j ].offsetHeight ) ;
                    }
                    if ( ! ( x_over == 0 || y_over == 0 ) ) {   // This pair of tags have overlaps in this tick
                        over[ i ] = 1 ;
                        over[ j ] = 1 ;
                    }                          
                }    
            }
            for ( var i = 0 ; i < over.length ; i ++ ) {
                if ( over[ i ] == 0 ) {
                    tag_obj[ i ].style.right = tag_point[ i ][ 0 ].toString() + 'px' ;  
                    tag_obj[ i ].style.top = tag_point[ i ][ 1 ].toString() + 'px' ;
                }
            }
        } 
        else {
            for ( var i = 0 ; i < tag_obj.length ; i ++ ) {
                tag_obj[ i ].style.right = tag_point[ i ][ 0 ].toString() + 'px' ;  
                tag_obj[ i ].style.top = tag_point[ i ][ 1 ].toString() + 'px' ;
            }
        }

        if ( vr == 0 ) {
            if ( tag == 1 ) {
                for ( var i = 0 ; i < tag_point.length ; i ++ ) {
                    if ( tag_obj[ i ].id == 'o_tag' || tag_obj[ i ].id == 'g_tag' ) tag_obj[ i ].style.visibility = "visible" ;
                    else tag_obj[ i ].style.visibility = "hidden" ;
                }
            }
            if ( tag == 2 ) {
                for ( var i = 0 ; i < tag_point.length ; i ++ ) {
                    if ( tag_obj[ i ].id == 'b_tag' || tag_obj[ i ].id == 'y_tag' || tag_obj[ i ].id == 'r_tag' || tag_obj[ i ].id == 'p_tag'  ) tag_obj[ i ].style.visibility = "visible" ;
                    else tag_obj[ i ].style.visibility = "hidden" ;
                }                        
            }
            
        } else {
            for ( var i = 0 ; i < tag_point.length ; i ++ ) tag_obj[ i ].style.visibility = "hidden" ;
        }
    }
} ) ;

AFRAME.registerComponent( 'arrow-monitor', {
    tick : function( time, timeDelta ) {
        
    }
} )