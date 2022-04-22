$(document).ready(function(){
    function KiemTraHoTen(){
        var re=/^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;
        //var re=/^[A-Z]/
        if($("#ten").val() == ""){
            $("#erten").html("Không được bỏ trống");
            return false;
        }
        if(!re.test($("#ten").val())){
            $("#erten").html("Ký tự đầu phải viết hoa");
            return false;
        }
        $("#erten").html("*");
        return true;
    }
    $("#ten").blur(KiemTraHoTen);

    function KiemTraSDT(){
        var re=/^(09\d{8})|(08\d{8})|(07\d{8})$/
        if($("#txtSDT").val() == ""){
            $("#tbSDT").html("Không được bỏ trống");
            return false;
        }
        if(!re.test($("#txtSDT").val())){
            $("#tbSDT").html("Nhập theo đúng định dạng")
            return false;
        }
        $("#tbSDT").html("*")
        return true;
    }
    $("#txtSDT").blur(KiemTraSDT)

    function KiemTraDC(){
        var re=/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\s)/
        if($("#txtDC").val() == ""){
            $("#tbDC").html("Không được bỏ trống");
            return false;
        }
        if(!re.test($("#txtDC").val())){
            $("#tbDC").html("Nhập theo đúng định dạng")
            return false;
        }
        $("#tbDC").html("*")
        return true;
    }
    $("#txtDC").blur(KiemTraDC);

    function KiemTraMK() {
        var re = /^(?=.*\d).{6,}/;
        if($("#mk").val() == ""){
            $("#tbmk").html("Không được bỏ trống");
            return false;
        }
        if(!re.test($("#mk").val())){
            $("#tbmk").html("Nhập theo đúng định dạng")
            return false;
        }
        $("#tbmk").html("*")
        return true;
    }
    $("#mk").blur(KiemTraMK);

    function KiemTraXNMK() {
        if($("#xnmk").val() == ""){
            $("#tbxnmk").html("Không được bỏ trống");
            return false;
        }
        if ($("#xnmk").val() !=
           $("#mk").val()) {
             $("#tbxnmk").html("* phải giống ô mật khẩu");
            return false;
        }
        else {
           $("#tbxnmk").html("*")
            return true;
        }
    }
    $("#xnmk").blur(KiemTraXNMK);

    $("#btnsave").click(function(){
        var  ten,gioitinh,sdt,dc,tp;
        ten = $("#ten").val();
        gt = $("input[type='radio']:checked").val()
        sdt =  $("#txtSDT").val();
        dc =  $("#txtDC").val();
        tp = $("#tp option:selected").val();
        var trnew = "<tr></td> <td>"+ten+"</td> <td>"+gt+"</td> <td>"+sdt+"</td> <td>"+dc+"</td> <td>"+tp+"</td> </tr>";
        $("#mytable").append(trnew);
    })

    $("#btndathang").click(function(){

        if(!KiemTraHoTen()|| !KiemTraSDT()|| !KiemTraDC() ){
            $("#thongbao").html("Mời bạn nhập đúng và đủ thông tin");
            return false;
        }
        alert("Đặt hàng thành công!");

    })
})