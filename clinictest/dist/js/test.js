/**
 * Created by pillars on 2018/8/27.
 */
var question_index = -1;
var last_index = -1;

window.onload = function(){
    this.next();
}
function next(){
    //DOM方式获取标签节点
    var question = document.getElementById("question");
    //获取三个选项按钮的元素节点
    var A = document.getElementById("0");
    var B = document.getElementById("1");
    var C = document.getElementById("2");
    //按钮
    var button = document.getElementById("button");
    //用于判断是否选择了答案
    var is_chose = document.getElementsByClassName("right_chose").length;

    //还原button按钮
    //button.style.border = "0px solid #cdcdcd";
    button.style.background = "#cdcdcd";
    button.style.color = "#ffffff";

    //判断是否允许换题,并记录正确答案
    if(question_index == -1){
        //页面刚加载不做处理
        question_index++;
        last_index = question_index;
    }else {
        //判断是否选中选项
        if(is_chose > 0){
            //获取选中的选项
            var right_chose = parseInt(document.getElementsByClassName("right_chose")[0].id);
            if(!isNaN(question_index)){
                question_index = questionArray[question_index].indexArray[right_chose];
            }else {
                question_index = questionArray[last_index].indexArray[right_chose];
            }
            if(question_index == 'A'){
                window.location.href='result.html?1';
                return;
            }else if(question_index == 'B'){
                window.location.href='result.html?2';
                return;
            }else if(question_index == 'C'){
                window.location.href='result.html?3';
                return;
            }else if(question_index == 'D'){
                window.location.href='result.html?4';
                return;
            }else if(question_index == 'E'){
                window.location.href='result.html?5';
                return;
            }else{
                question_index--;
                last_index = question_index;
            }
        }else{

        }
    }

    //重置选项  还原样式
    var answer_array = document.getElementById("answerContainer").children;
    for(var i = 0;i<answer_array.length;i++){
        answer_array[i].className = "chose";
    }

    //更新题目和答案选项
    question.innerHTML = questionArray[last_index].index+"."+questionArray[last_index].question;
    A.innerHTML = questionArray[last_index].answerArray[0];
    B.innerHTML = questionArray[last_index].answerArray[1];
    C.innerHTML = questionArray[last_index].answerArray[2];

    //更换最后一题按钮文字
    //if(question_index == 14){
    //    //最后一道题的处理方式
    //    button.innerHTML = "查看结果";
    //    return;
    //}
}

function chose(x){
    var answer_array = document.getElementById("answerContainer").children;
    var button = document.getElementById("button");
    for(var i = 0;i<answer_array.length;i++){
        answer_array[i].className = "chose";
    }
    x.className = "right_chose";
    button.style.background = "#ffffff";
    //button.style.border = "0px solid #fcee21";
    button.style.color = "#f57c23";
}