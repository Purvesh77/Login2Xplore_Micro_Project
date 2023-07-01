/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function validateAndGetFormData() {
    var IdVar = $("#roll").val();
    if (IdVar === "") {
        alert("Roll Number is Required Value");
        $("#roll").focus();
        return "";
    }
    var NameVar = $("#Name").val();
    if (NameVar === "") {
        alert("Student Name is Required Value");
        $("#Name").focus();
        return "";
    }
    var studentclassvar = $("#studentclass").val();
    if (studentclassvar === "") {
        alert("Address is Required Value");
        $("#studentclass").focus();
        return "";
    }
    var studentaddressvar = $("#address").val();
    if (studentaddressvar === "") {
        alert("Employee Email is Required Value");
        $("#address").focus();
        return "";
    }
    var studentenrollvar = $("#Enroll_Date").val();
    if (studentenrollvar === "") {
        alert("Enrollment Date is Required Value");
        $("#Enroll_Date").focus();
        return "";
    }
    var studentbirthvar = $("#Birth_Date").val();
    if (studentbirthvar === "") {
        alert("DOB is Required Value");
        $("#Birth_Date").focus();
        return "";
    }
    var jsonStrObj = {
        roll: IdVar,
        Name: NameVar,
        studentclass: studentclassvar,
        address:studentaddressvar,
        Enroll_Date:studentenrollvar,
        Birth_Date:studentbirthvar
    };
    return JSON.stringify(jsonStrObj);
}
function update(){
    var jsonchg =validateAndGetFormData();
    var updaterequest = createUPDATERecordRequest(connToken,jsonchg,dbName,relName,localStorage.getItem(recno));
    jQuery.ajax({async:false});
    var resJsonObj =executeCommandAtGivenBaseUrl(UpdateRequest,dbBaseUrl,apiEndPointUrl);
    jQuery.ajax({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#roll").focus();
    
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function resetForm() {
    $("#roll").val("");
    $("#Name").val("");
    $("#studentclass").val("");
    $("#address").val("");
    $("#Enroll_Date").val("");
    $("#Birth_Date").val("");
    $("#empId").focus();
}

function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90933078|-31949324292324886|90951585",
            jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putReqStr,
            " http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
}

   