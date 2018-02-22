   var isBlack = true;//默认为黑棋 


function colorChoose(val){
  $(".chessChoose").hide(1000);
  $(".chessBoard").show(1000);
  if(val==1) isBlack = true;
  else isBlack = false;
}


var chess = document.getElementById("mycanvas");
        var context = chess.getContext('2d');



        var chessBox = [];//用于存放棋盘中落子的情况
        function statusIni(){
         for(var i=0;i<15;i++){
            chessBox[i]=[];
            for(var j=0;j<15;j++){
                chessBox[i][j]=0;//初始值为0
            }
         }
       }
       statusIni();//落子状态初始化
       

        function drawChessBoard(){//画棋盘程序
            for(var i=0;i<15;i++){
                context.strokeStyle="#D6D1D1";
                context.moveTo(15+i*30,15);//垂直方向画15根线，相距30px;
                context.lineTo(15+i*30,435);
                context.stroke();
                context.moveTo(15,15+i*30);//水平方向画15根线，相距30px;棋盘为14*14；
                context.lineTo(435,15+i*30);
                context.stroke();
            }
        }
        drawChessBoard();//绘制棋盘


        function oneStep(i,j,k){//每步画棋子
           
            context.beginPath();
            context.arc(15+i*30,15+j*30,13,0,2*Math.PI);//绘制棋子
            var g=context.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,0);//设置渐变
            if(k){                           //k=true是黑棋，否则是白棋
                g.addColorStop(0,'#0A0A0A');//黑棋
                g.addColorStop(1,'#636766');
            }else {
                g.addColorStop(0,'#D1D1D1');//白棋
                g.addColorStop(1,'#F9F9F9');
            }
            context.fillStyle=g;
            context.fill();
            context.closePath();
        }


        chess.onclick=function(e){//当棋盘上有按键点击的程序
            var x = e.offsetX;//相对于棋盘左上角的x坐标
            var y = e.offsetY;//相对于棋盘左上角的y坐标
            var i = Math.floor(x/30);
            var j = Math.floor(y/30);
          
          
            if( chessBox[i][j] == 0 ) {
                oneStep(i,j,isBlack);
                if(isBlack){
                    chessBox[i][j]=1;
                }else{
                    chessBox[i][j]=2;
                }
              isBlack=!isBlack;//下一步换棋子颜色 
          
          
           }
          
          
          var end = horFiveInLine(i,j) ||  verFiveInLine(i,j) || lcroFiveInLine(i,j) || rcroFiveInLine(i,j);//判断是否已经五子相连
             
    if(end){
           
      var audio = document.getElementById("bgMusic");
      audio.play();
                
            if(isBlack) 
              $('.result').text("White Player Wins!");   
            else  
              $('.result').text("Black Player Wins!");  
            isBlack=!isBlack;//下一局赢的人先落子
           }
         
          var r = window.setTimeout(reset,10000);
          window.clearTimeout(r);
      
         
        }
        
      
        
        
        function newRound(){// 恢复到初始棋盘状态
          if(isBlack) $('.result').text('Last Round winner: Black Player');
          else $('.result').text('Last Round winner: White Player');
          chess.height = chess.height;
          drawChessBoard();//绘制棋盘
          statusIni();//落子状态初始化
           
        }

       function horFiveInLine(i,j){//横起来有五子
         var count = 1;
         var xp =i;
         var status = chessBox[i][j];
         
            while( --i >= 0){
              if(chessBox[i][j]== status){
                count++;
               if(count == 5)
                return true;
              }
              else
                break;
             
            }
           while(++xp <= 14){
             if(chessBox[xp][j]== status){
                count++;
             if(count == 5)
                return true;
             }
             else
                break;
              
           }
   }

function verFiveInLine(i,j){//竖起来有五子
         var count = 1;
         var yp = j;
         var status = chessBox[i][j];
         
            while( --j >= 0){
              if(chessBox[i][j]== status){
                count++;
               if(count == 5)
                return true;
              }
              else
                break;
             
            }
           while(++yp <= 14){
             if(chessBox[i][yp]== status){
                count++;
             if(count == 5)
                return true;
             }
             else
                break;
              
           }
   }

function lcroFiveInLine(i,j){//左斜起来有五子
         var count = 1;
         var xp = i;
         var yp = j;
         var status = chessBox[i][j];
         
            while( --j >= 0 && --i >= 0 ){
              if(chessBox[i][j]== status){
                count++;
               if(count == 5)
                return true;
              }
              else
                break;
             
            }
           while(++yp <= 14 && ++xp <= 14){
             if(chessBox[xp][yp]== status){
                count++;
             if(count == 5)
                return true;
             }
             else
                break;
              
           }
   }

function rcroFiveInLine(i,j){//右斜起来有五子
         var count = 1;
         var xp = i;
         var yp = j;
         var status = chessBox[i][j];
         
            while( --j >= 0 && ++i <= 14 ){
              if(chessBox[i][j]== status){
                count++;
               if(count == 5)
                return true;
              }
              else
                break;
             
            }
           while(++yp <= 14 && --xp >= 0){
             if(chessBox[xp][yp]== status){
                count++;
             if(count == 5)
                return true;
             }
             else
                break;
              
           }
   }