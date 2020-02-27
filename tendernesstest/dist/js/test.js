/**
 * Created by pillars on 2018/8/27.
 */
var question_index = -1;
var true_count = 0;
var all_count = 0;
window.onload = function(){
    this.next();
}
function next(){
    //DOM方式获取标签节点
    var question = document.getElementById("question");
    var A = document.getElementById("A");
    var B = document.getElementById("B");
    var C = document.getElementById("C");
    var D = document.getElementById("D");
    var button = document.getElementById("button");
    var is_chose = document.getElementsByClassName("right_chose").length;

    //还原button按钮
    button.style.border = "2px solid #cdcdcd";
    button.style.color = "#cdcdcd";


    //最后一题直接跳转
    if(question_index == 14){
        if(is_chose > 0){
            all_count++;
            var right_chose = document.getElementsByClassName("right_chose")[0].id;
            if(right_chose == questionArray[question_index].correctAnswer){
                if(all_count > 15){

                }else {
                    true_count++;
                }
                console.log(true_count);
            }
            //console.log("选择的是:"+right_chose);
        }else {
            alert("您还没有选择答案");
            return;
        }
        if(true_count <= 3){
            window.location.href='result.html?1';
        }else if(true_count <= 6){
            window.location.href='result.html?2';
        }else if(true_count <= 9){
            window.location.href='result.html?3';
        }else if(true_count <= 12){
            window.location.href='result.html?4';
        }else {
            window.location.href='result.html?5';
        }
        return;
    }


    //判断是否允许换题,并记录正确答案
    if(question_index == -1){
        //页面刚加载不做处理
    }else {
        if(is_chose > 0){
            all_count++;
            var right_chose = document.getElementsByClassName("right_chose")[0].id;
            if(right_chose == questionArray[question_index].correctAnswer){
                true_count++;
                console.log(true_count);
            }
            //console.log("选择的是:"+right_chose);
        }else {
            alert("您还没有选择答案");
            return;
        }
    }

    //重置选项
    var answer_array = document.getElementById("answerContainer").children;
    for(var i = 0;i<answer_array.length;i++){
        answer_array[i].className = "chose";
    }
    //更新题目和答案选项
    question_index++;
    question.innerHTML = questionArray[question_index].index+"."+questionArray[question_index].question;
    A.innerHTML = "A."+questionArray[question_index].answerArray[0];
    B.innerHTML = "B."+questionArray[question_index].answerArray[1];
    C.innerHTML = "C."+questionArray[question_index].answerArray[2];
    D.innerHTML = "D."+questionArray[question_index].answerArray[3];
    //更换最后一题按钮文字
    if(question_index == 14){
        //最后一道题的处理方式
        button.innerHTML = "查看结果";
        return;
    }
}
function chose(x){
    var answer_array = document.getElementById("answerContainer").children;
    var button = document.getElementById("button");
    for(var i = 0;i<answer_array.length;i++){
        answer_array[i].className = "chose";
    }
    x.className = "right_chose";
    button.style.border = "2px solid #fcee21";
    button.style.color = "#fcee21";
}