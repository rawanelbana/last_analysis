$(document).ready(function () {
    $("#formDetails").css("display", "none");
    $(function () {
        $("#navbartoggler").bind('blur focusout', function () {
            var screenWidth = window.innerWidth;
            if (screenWidth < 606.99) {
                $("#nav").collapse('hide');
            }
        });
    });




    function load_json_data(id, parent_id) {
        var html_code = '';
        $.getJSON('js/analysis.json', function (data) {

            html_code += '<option value="">Select ' + id + '</option>';
            $.each(data, function (key, value) {
                if (id == 'analysis') {
                    if (value.parent_id == '0') {
                        html_code += '<option value="' + value.id + '">' + value.analysis + '</option>';
                    }
                }
                else {
                    if (value.parent_id == parent_id) {
                        html_code += '<option value="' + value.id + '">' + value.analysis + '</option>';
                    }
                }
            });
            $('#' + id).html(html_code);
        });
    }
    load_json_data('analysis');
    $(document).on('change', '#analysis', function () {
        var analysis_id = $(this).val();
        if (analysis_id != '') {
            load_json_data('sub-analysis', analysis_id);
        }
        else {
            $('#sub-analysis').html('<option value="">Select sub analysis</option>');
        }
    });
    $('#analysis').change(function () {
        var y = this.options[this.selectedIndex].text;
        $('#sub-analysis').change(function () {
            var x = this.options[this.selectedIndex].text;
            $("#submitanalysis").click(function () {

                // To chane select to div
                $("#analysis").replaceWith("<div class=\"form-control input-lg\">" + y + "<span> <a class=\"link text-right\" href=\"analysis.html\">Change</a>" + "</span>");
                $("#sub-analysis").replaceWith("<div class=\"form-control input-lg\">" + x + "<span> <a class=\"link text-right\" href=\"analysis.html\">Change</a>" + "</span>");
                //for the Form Application to appear 
                $("#formDetails").show("slow");
                //to stop refresh of submit button
                $(".formApp").submit(function (event) {
                    event.preventDefault();
                });
            });
        });
    });










    //When the first option is selected 
    // $('#analysis').change(function () {
    //     var y = this.options[this.selectedIndex].text;
    //     //$("#analysis").replaceWith("<div class=\"form-control input-lg\">" + y + "<span> <a class=\"link text-right\" href=\"analysis.html\">Change</a>" + "</span>");
    // });
    // //when the second option is selected
    // $('#sub-analysis').change(function () {
    //     var x = this.options[this.selectedIndex].text;
    //     document.getElementById("selected").innerHTML = x;
    //     //$("#sub-analysis").replaceWith("<div class=\"form-control input-lg\">" + x + "<span> <a class=\"link text-right\" href=\"analysis.html\">Change</a>" + "</span>");
    //     //for the Form Application to appear 
    //     $("#formDetails").css("display", "block");
    //     //to stop refresh of submit button
    //     $(".formApp").submit(function (event) {
    //         event.preventDefault();
    //     });
    // });
});

function copy(element_id) {
    var aux = document.createElement("div");
    aux.style.position = "absolute";
    aux.style.top = 0;
    aux.setAttribute("contentEditable", true);
    aux.innerHTML = document.getElementById(element_id).innerHTML;
    aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
    document.body.appendChild(aux);
    aux.focus();
    document.execCommand("copy");

    document.body.removeChild(aux);
}
