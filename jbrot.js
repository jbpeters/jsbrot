      
            var C_array = [142,37,85];
            var max =4096;
            var radius=3.25 ;
            var _x =-0.75;  // -0.7520;
            var _y = 0.00;  //  0.035;
            var fudge_x=13;
            var fudge_y=-13;                     
            
            function colors(C_array,count,max){
                var W=new Array();
                var d=new Array();
                var kolor=new Array();
                for (v=0;v<3;v++){
                    W[v]=Math.PI*C_array[v]*2/max;
                    d[v]=Math.PI*(1-2*C_array[v]);
                    kolor[v]=(255/2)*(1+Math.cos(W[v]*count+d[v]));
                }
                return kolor;
            }

            function setPixel(imageData, x,y, colors,a){
                //document.write(":");
                index=(x + y * imageData.width) * 4;
                imageData.data[index+0]= colors[0];
                imageData.data[index+1]= colors[1];
                imageData.data[index+2]= colors[2];
                imageData.data[index+3]= a;
            }

            function mandelbrot( C_ID, cx, cy, radius, RGB_array, max){
                alert( "mandelbrot "+ cx +","+ cy +","+ radius +" ["+ RGB_array +"], "+ max );
                element = document.getElementById( C_ID );
                context = element.getContext("2d");
                width  = element.width;
                height = element.height;
                imageData = context.createImageData(width, height);
                dx = 2*radius/width;
                dy = 2*radius/height;
                zx0 = cx-radius;
                zy0 = cy-radius;
                alert("zx0, zy0 = "+zx0+","+zy0);
                for(jj=0; jj<height;jj++){
                    j=height-jj;
                    var cy=zy0+j*dy;
                    for(i=0;i<width;i++){
                        var cx=zx0+i*dx;
                        var d=cx*cx+cy*cy;
                        var zx=0;
                        var zy=0;
                        for( count=0 ; d<4 && count<max ; ++count){
                            var nzx=cx+(zx*zx-zy*zy);
                            var nzy=cy+(2*zx*zy);
                            d=nzx*nzx+nzy*nzy;
                            zx=nzx;
                            zy=nzy;
                        }
                        if( cy < 0 ){
                            var k= colors( RGB_array.reverse(),count,max);
                        }
                        else{
                            var k=colors(RGB_array,count,max); 
                        }
                        setPixel(imageData,i,j,k,255);               
                                 
                    }
                    context.putImageData(imageData, 0, 0);  
                    //if( j % 110 === 0){ 
                    //    alert("row = "+(height-j));
                    //}
                }
            }
                       
            function start(){ 
                var canvas = document.getElementById('canvas1');
                canvas.addEventListener( "mousemove" , doMouseMove, false );
                canvas.addEventListener( "mousedown" , doMouseDown, false );
            }

            function doMouseMove(event){
                canvas_x = event.layerX;
                canvas_y = event.layerY;
                document.getElementById("fx").innerHTML=(canvas_x-fudge_x);
                document.getElementById("fy").innerHTML=((height-canvas_y)-fudge_y);
               // alert("mousemove:zx0, zy0 = "+zx0+","+zy0);
                canvas_cx=zx0+dx*(canvas_x-fudge_x);
                canvas_cy=zy0+dy*((height-canvas_y)-fudge_y);
                document.getElementById("gx").innerHTML=zx0+dx*(canvas_x-fudge_x);
                document.getElementById("gy").innerHTML=zy0+dy*((height-canvas_y)-fudge_y);
                document.getElementById("gr").innerHTML=radius;
            }

            function doMouseDown(event){
                radius *= .333 ;
                mandelbrot( "canvas1" , canvas_cx , canvas_cy , radius , C_array , max );
            }
