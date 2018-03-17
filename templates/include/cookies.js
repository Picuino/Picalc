
    // Init calculations
    function init() {
       if  (getCookie("saved") == 'true')
          load_var();
       else
          reset_var();
       calc();
    }

    // Save variables to cookie
    function save_var() {
       var expiresdate = new Date(2068, 1, 02, 11, 20);
       expiresdate = "expires=" + expiresdate.toUTCString();
       var names = [{%- for datarow in rows %} {%- if datarow.type == 'var' %}"{{datarow.id}}", {% endif %} {%- endfor %} ];
       for(var i=0; i<names.length; i++) {
          document.cookie = names[i] + " = " + encodeURIComponent(tonum(names[i])) + "; " + expiresdate;
       }
       document.cookie = "saved = true; " + expiresdate
    }

    // Load variables from cookie
    function load_var() {
       {%- for datarow in rows %} {%- if datarow.type == 'var' %}
       document.getElementById("{{datarow.id}}").value = getCookie("{{datarow.id}}");
       {%- endif %} {%- endfor %}
       calc();
    }

    // Read cookies
    function getCookie(name) {
       var re = new RegExp(name + "=([^;]+)");
       var value = re.exec(document.cookie);
       return (value != null) ? unescape(value[1]) : null;
    }
