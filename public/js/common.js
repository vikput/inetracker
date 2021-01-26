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
  },

  //Current year
  currentYear : function(){
    return new Date().getFullYear();
  },

  //Current month
  currentMonth : function(){
    let monthList = this.monthList(); 
    let month = new Date();
    return monthList[month.getMonth()];  
  },

  //Current date
  currentDate : function(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  },

  datepickerCurrentDate: function(){
    let date = new Date();
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return today;
  } 
}

