let commonObj = {
    //Escape tags in javascript
    escapeHtml : function (text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      
      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },

    //Year list
    yearList : function() {
      let yearList = [];
      for(i=2020; i<=2035; i++) {
        yearList.push(i)
      }

      return yearList;
    },

    //Month list
    monthList : function(){
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
}

