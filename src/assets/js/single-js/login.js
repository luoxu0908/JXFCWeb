$(function(){
      return  JSONPost('iCtc1.GetAddressFromPostalCode.json', { 'Country': 'Singapore', 'PostalCode': '018947' }).then(function (data) {
                   if ((data) && (data.d.RetVal === -1)) {
                       var obj = new Object();
                       obj = $.parseJSON(data.d.RetData);
                       $('#BlockNo').val(obj.AddrP1);
                       $('#Unit').val(obj.AddrP2);
                       $('#BuildingName').val(obj.AddrP4);
                       $('#StreetName').val(obj.AddrP3);
                   }
      });  

})
