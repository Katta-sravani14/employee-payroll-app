$(document).ready(function(){
    console.log("get called",localStorage.getItem('empID'));
    $.ajax({
        url: "http://localhost:3000/employees/" + localStorage.getItem('empID'),
        type: "GET",
        dataType: "json",
        
        success: function(data){
            console.log(data);
            console.log(data.name);
            document.getElementById('name').value = data.name;   
            
            if(document.getElementById('profile1').value == data.profile){
                document.getElementById('profile1').checked = true;
            }else if(document.getElementById('profile2').value == data.profile){
                document.getElementById('profile2').checked = true;
            }else if(document.getElementById('profile3').value == data.profile){
                document.getElementById('profile3').checked = true;
            }else if(document.getElementById('profile4').value == data.profile){
                document.getElementById('profile4').checked = true;
            }

            if(document.getElementById('male').value == data.gender){
                document.getElementById('male').checked = true;
            }else if(document.getElementById('female').value == data.gender){
                document.getElementById('female').checked = true;
            }
            
            console.log(data.department);
            var dept = data.department.split(",");
            console.log(dept);
            var empdpt = dept[0];
            
            if(document.getElementById('hr').value == empdpt){
                document.getElementById('hr').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('sales').value == empdpt){
                document.getElementById('sales').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('finance').value == empdpt){
                document.getElementById('finance').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('others').value == empdpt){
                document.getElementById('others').checked = true;
            }

            document.getElementById('salary').value = data.salary;      
            
            var datearray = data.startdate.split("/");
            console.log(datearray)
            var day = datearray[0];
            var month = datearray[1];
            var year = datearray[2];
            document.getElementById('day').value =  day; 
            document.getElementById('month').value = month;
            document.getElementById('year').value = year;  
        } 
    });
});


updateEmp = () => {
    var sex = document.getElementsByName("gender")[0].checked ? 'Male' : 'Female';

    let reqObj = {
        "name" : document.getElementById('name').value,
        "profile" : imageselect,
        "gender" : sex,
        "department" : empdepartment,
        "salary": document.getElementById('salary').selectedOptions[0].text,
        "startdate": document.getElementById('day').value +"/"+ document.getElementById('month').value +"/"+ document.getElementById('year').value,
    };

    console.log("JSon object is:",reqObj);

    $.ajax({
        url: "http://localhost:3000/employees/" + localStorage.getItem('empID'),
        type: "PUT",
        data: reqObj,
        dataType: "json",

        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

const imageselect = () => {
    var image1 = document.getElementById('profile1').checked;
    var image2 = document.getElementById('profile2').checked;
    var image3 = document.getElementById('profile3').checked;
    var image4 = document.getElementById('profile4').checked;

    if (image1 == true) {
        var pic1 = document.getElementById('profile1').value;
        return pic1;
    }
    else if (image2 == true) {
        var pic2 = document.getElementById('profile2').value;
        return pic2;
    }
    else if (image3 == true) {
        var pic3 = document.getElementById('profile3').value;
        return pic3;
    }
    else if (image4 == true) {
        var pic4 = document.getElementById('profile4').value;
        return pic4;
    }
}

const empdepartment = () => {
    let empDept = [];

    var hrchecked = document.getElementById('hr').checked;
    var saleschecked = document.getElementById('sales').checked;
    var financechecked = document.getElementById('finance').checked;
    var otherschecked = document.getElementById('others').checked;

    if (hrchecked == true) {
        var hrcheck = document.getElementById('hr').value;
        empDept.push(hrcheck);
    }
    if (saleschecked == true) {
        var salescheck = document.getElementById('sales').value;
        empDept.push(salescheck);
    }
    if (financechecked == true) {
        var financecheck = document.getElementById('finance').value;
        empDept.push(financecheck);
    }
    if (otherschecked == true) {
        var othercheck = document.getElementById('others').value;
        empDept.push(othercheck);
    }

    console.log(empDept);
    return empDept;
}
