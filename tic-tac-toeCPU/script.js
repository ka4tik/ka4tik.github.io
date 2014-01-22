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
    },1000);
    });

});
