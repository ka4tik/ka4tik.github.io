$(document).ready(function(){

    console.log("loaded");
    var player=0;
    var grid=new Array(3);
    for(var i=0;i<3;i++){
        grid[i]=new Array(3);
    }
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            grid[i][j]=-1;
        }
    }
    function isover(){
        for(var i=0;i<3;i++){
            var cnt=0;
            for(var j=0;j<3;j++){
                if(grid[i][j]==player){
                    cnt++;
                }
                if(cnt==3){
                    return 1;
                }
            }
        }
        for(var i=0;i<3;i++){
            var cnt=0;
            for(var j=0;j<3;j++){
                if(grid[j][i]==player){
                    cnt++;
                }
                if(cnt==3){
                    return 1;
                }
            }
        }
        var cnt=0;
        if(grid[0][0]==player){
            cnt++;
        }
        if(grid[1][1]==player){
            cnt++;
        }
        if(grid[2][2]==player){
            cnt++;
        }
        if(cnt==3){
            return 1;
        }
        cnt=0;
        if(grid[2][0]==player){
            cnt++;
        }
        if(grid[1][1]==player){
            cnt++;
        }
        if(grid[0][2]==player){
            cnt++;
        }
        if(cnt==3){
            return 1;
        }
        return 0;
    }
    function isdraw(){
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(grid[i][j]==-1){
                    return 0;
                }
            }
        }
        return 1;
    }
    function resetboard(){
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                grid[i][j]=-1;
                $('.square').text("");
            }
        }
    }

    function fadeboard(){
        $("#board").animate({
            opacity:0 ,background:'#000'},4000,
            function(){
                $(".output").text("Reloading in 2sec");
                setTimeout(function(){
                    location.reload();
                },2000);
            });
    }
    var Possible_Wins= 8;
    var Three_in_a_Row = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ]];
    var Heuristic_Array= [
        [     0,   -10,  -100, -1000 ],
        [    10,     0,     0,     0 ],
        [   100,     0,     0,     0 ],
        [  1000,     0,     0,     0 ]];

    var nextX,nextY;

    function evaluatePosition(){
        board = new Array(9);
        var k=0;
        for(var i=0;i<3;i++)
            for(var j=0;j<3;j++)
            {
                board[k]=grid[i][j];
                k++;
            }
        console.log(" board is = " + board);
        var opponent = 1-player,piece;
        var players, others, t = 0, i, j;
        for(i=0; i<8; i++)  {
            players = others = 0;
            for(j=0; j<3; j++)  {
                piece = board[Three_in_a_Row[i][j]];
                console.log("piece = "+ piece);

                if (piece == player)
                    players++;
                else if (piece == opponent)
                    others++;
            }
            console.log("players = "+ players);
            console.log("others = "+ others);
            var temp=Heuristic_Array[players][others];
            if(temp==1000)
                return 1000000;
            t=t+temp;
        }
        console.log("t = "+ t);
        return t;
    }
    function evaluateOppNext(){

        var m=-1000000;
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if(grid[i][j]==-1)
                {
                    grid[i][j]=player;
                    var ev=evaluatePosition();
                    if(ev>m)
                    {
                        m=ev;
                    }
                    grid[i][j]=-1;
                }
            }
        }
        return m;

    }
    function nextMove(){

        var bX,bY;
        var m=-1000000;//INT_MIN;
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if(grid[i][j]==-1)
                {
                    grid[i][j]=player;
                    var ev=evaluatePosition();
                    if(ev==1000000)
                    {
                        //printf("%d %d\n",i,j);
                        nextX=i;
                        nextY=j;
                        return;
                    }
                    else
                    {
                        player=1-player;
                        ev+=(-evaluateOppNext());
                        player=1-player;
                    }
                    if(ev>m)
                    {
                        bX=i;bY=j;
                        m=ev;
                    }
                    grid[i][j]=-1;

                    console.log("ev = " + ev);
                    console.log("m = " + m);

                }
            }
        }
        //printf("%d %d\n",bX,bY);
        nextX=bX;
        nextY=bY;

    }


    function computermove(){
        console.log("computer move started");
        var row=0;
        var col=0;
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(grid[i][j]==-1){
                    row=i;
                    col=j;
                }
            }
        }
        nextMove();
        row=nextX;
        col=nextY;
        console.log(nextX);
        console.log(nextY);
        grid[row][col]=player;
        row++;
        col++;
        var id="#c"+row.toString()+col.toString();
        console.log(id);
        if(player==0){
            $(id).text("0");
            $(id).addClass("zero");
        }
        else{
            $(id).text("X");
            $(id).addClass("cross");
        }
        var result=isover();
        if(result==1)
        {
            if(player==0){
                $(".output").text("0 Won");
                fadeboard();
            }
            else{
                $(".output").text("X Won");
                fadeboard();
            }
        }
        var draw=isdraw();
        if(draw==1)
        {
            $(".output").text("It's a draw");
            fadeboard();
        }
        player=1-player;

    }
    $('button').on("click",function(){
        console.log("button pressed");
        $("#modal").hide();
    });
    $("#reset").on("click",function(){
        location.reload();
    });
    $(".square").on("mouseenter",function(){
        $(this).addClass("highlight");
    });
    $(".square").on("mouseleave",function(){
        $(this).removeClass("highlight");
    });
    $(".square").on("click",function(){
        var id=$(this).attr("id");
        var row=(id[1]-'1');
        var col=(id[2]-'1');
        console.log(id);
        //console.log(row);
        //console.log(col);
        if(grid[row][col]!=-1){
            console.log("invalid move");
            $(".output").text("Invalid move");
            $(".output").addClass("error");
            return;
        }
        else{
            grid[row][col]=player;
            if(player==0){
                $(this).text("0");
                $(this).addClass("zero");

            }
            else{
                $(this).text("X");
                $(this).addClass("cross");
            }
        }
    var result=isover();
    if(result==1)
    {
        if(player==0){
            $(".output").text("0 Won");
            fadeboard();
        }
        else{
            $(".output").text("X Won");
            fadeboard();
        }
    }
    var draw=isdraw();
    console.log(draw);
    if(draw==1)
    {
        $(".output").text("It's a draw");
        fadeboard();
    }
    player=1-player;
    setTimeout(function(){
        computermove();
    },300);
    });

});
