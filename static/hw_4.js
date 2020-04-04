$(document).ready(function (){
    $("#orders-box").html("");
    listing();
});

function make_orders() {
    if ($('#name').val().length === 0) {
        alert("이름을 입력해주세요");
        $('#name').focus();
    } else if ($('#count')[0].selectedIndex <= 0) {
        alert("수량을 선택해주세요");
        $('#count').focus();
    } else if ($('#address').val().length === 0) {
        alert("주소를 입력해주세요");
        $('#address').focus();
    } else if ($('#contact').val().length === 0) {
        alert("연락처를 입력해주세요");
        $('#contact').focus();
    }

    $.ajax({
        url: "/orders",
        method: "post",
        data: {
            name: $("#name").val(),
            amount: $("#count").val(),
            address: $("#address").val(),
            contact: $("#contact").val(),
        },
        success: function(resp) {
            if(resp["result"] == "success"){
                alert(resp['msg']);
                window.location.reload();
            }
        }
    })
}

function listing() {
    $.ajax({
        url: "/orders",
        method: "get",
        data: {},
        success: function(resp) {
            if (resp["result"] == "success") {
                let orders = resp["orders"];
                for (let order of resp["orders"]) {
                    make_card(order.name, order.amount, order.address, order.contact);
                }
            } else {
                alert("주문서를 받아오지 못했습니다");
            }
        }
    })
}

function make_card(name, amount, address, contact) {
    let temp_html = `
        <tr>
            <td>${name}</td>
            <td>${amount}</td>
            <td>${address}</td>
            <td>${contact}</td>
        </tr>
        `
    $("#orders-box").append(temp_html);
}