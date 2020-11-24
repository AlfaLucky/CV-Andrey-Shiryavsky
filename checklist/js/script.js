const cookie_key = "lsst_desc_pre_meeting_checklist_sprintweek2020";
const get_progress = function () {
     return (0.5 + 99.5 / $("input").length * $("input:checked").length);
}

const display_progress = function (animate){
     var p = get_progress();
     if (animate) $("#progress").animate({ width: p + "%" }, 500);
     else $("#progress").css("width", p + "%");
     if (p > 1) $("#progress-text").text(Math.floor(p) + "%");
     else $("#progress-text").text("");
}

$("input").change(function () {
     var target = $("div.text").eq($("input").index(this));
     if (this.checked) target.addClass("done");
     else target.removeClass("done");
     display_progress(1);
     var record = $("input").map(function () { return this.checked ? 1 : 0; }).toArray().join("");
     Cookies.set(cookie_key, record, { expires: 21, path: "/pre-meeting-checklist/" });
});

var read_cookie = function () {
     var record = Cookies.get(cookie_key);
     if (record != undefined) {
          record.split('').forEach((c, i) => {
               if (c == "1") {
                    $("input").eq(i).attr("checked", true);
                    $("div.text").eq(i).addClass("done");
               }
          });
     }
     else{
          $("input").attr("checked", false);
     }
     display_progress();
}
read_cookie();
